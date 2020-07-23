import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { geoOrthographic, geoPath, geoInterpolate } from "d3-geo";
import { transition } from "d3-transition";
import { json } from "d3-fetch";
import * as topojson from "topojson-client";

let tourIdx = -1;
const touredLocations = [
  { name: "Singapore", tag: "europe2k19", coords: [103.851959, 1.29027] },
  { name: "Switzerland", tag: "europe2k19", coords: [8.5417, 47.3769] },
  { name: "Poland", tag: "europe2k19", coords: [17.038538, 51.107883] },
  { name: "Portugal", tag: "europe2k19", coords: [-8.61099, 41.14961] },
  { name: "Singapore", tag: "europe2k19", coords: [103.851959, 1.29027] },
  { name: "Taiwan", tag: "taiwanexchange", coords: [120.9675, 24.8138] },
  { name: "Beijing", tag: "taiwanexchange", coords: [116.4074, 39.9042] },
  { name: "Luoyang", tag: "taiwanexchange", coords: [112.4539, 34.6202] },
  { name: "Shanghai", tag: "taiwanexchange", coords: [121.4737, 31.2304] },
];

let dimensions = {
  height: window.innerHeight,
  translateX: 150,
};

if (window.innerWidth > 1200) {
  dimensions.width = 1000;
  dimensions.translateY = 150;
} else if (window.innerWidth > 896) {
  dimensions.width = 900;
  dimensions.translateY = 150;
} else if (window.innerWidth > 600) {
  dimensions.width = 750;
  dimensions.translateY = 200;
} else {
  dimensions.width = 500;
  dimensions.translateY = 300;
}

const Globe = styled.canvas`
  position: absolute;
  right: 0;
  top: 0;

  width: ${(props) => {
    switch (props.screenSize) {
      case "desktop-large":
        return 1000;
      case "desktop-small":
        return 900;
      case "mobile-large":
        return 750;
      default:
        return 500;
    }
  }}px;
  height: ${window.innerHeight}px;
`;

const dpi = window.devicePixelRatio;
const sphere = { type: "Sphere" };

const createD3Globe = async (canvas, theme) => {
  const world = await json(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  );
  const land = topojson.feature(world, world.objects.land);
  const borders = topojson.mesh(
    world,
    world.objects.countries,
    (a, b) => a !== b
  );
  const projection = geoOrthographic().fitWidth(dimensions.width, sphere);

  const ctx = canvas.getContext("2d");
  ctx.canvas.width = dimensions.width * dpi;
  ctx.canvas.height = dimensions.height * dpi;
  ctx.scale(dpi, dpi);
  ctx.translate(dimensions.translateX, dimensions.translateY);

  const geoPathGenerator = geoPath(projection, ctx);

  step();

  function step() {
    tourIdx++;

    const p1 = touredLocations[tourIdx % 9].coords;
    const p2 = touredLocations[(tourIdx + 1) % 9].coords;
    const rotateIp = geoInterpolate([-p1[0], -p1[1]], [-p2[0], -p2[1]]);
    const adjustedRotateIp = (t) => {
      let rotateArr = rotateIp(t);
      return [rotateArr[0] - 5, rotateArr[1] + 25];
    };
    const arcIp = geoInterpolate(p1, p2);

    transition()
      .duration(1250)
      .tween("rotate", function () {
        return function (t) {
          projection.rotate(adjustedRotateIp(t));
          draw({
            geo: {
              type: "LineString",
              coordinates: [p1, arcIp(t)],
            },
            color:
              touredLocations[(tourIdx + 1) % 9].tag === "europe2k19"
                ? "#db7093"
                : "#7b68ee",
          });
        };
      })
      .transition()
      .tween("render", () => (t) => {
        draw({
          geo: {
            type: "LineString",
            coordinates: [arcIp(t), p2],
          },
          color:
            touredLocations[(tourIdx + 1) % 9].tag === "europe2k19"
              ? "#db7093"
              : "#7b68ee",
        });
      })
      .on("end", step);
  }

  function draw(arcInfo) {
    ctx.clearRect(
      -dimensions.translateX,
      -dimensions.translateY,
      dimensions.width,
      dimensions.height
    );

    ctx.beginPath();
    geoPathGenerator(sphere);
    ctx.fillStyle = theme === "light" ? "#dae7f1" : "#0b0b41";
    ctx.fill();

    ctx.beginPath();
    geoPathGenerator(land);
    ctx.fillStyle = theme === "light" ? "#c7dbea" : "#0f0f57";
    ctx.fill();
    ctx.strokeStyle = "#7d96e8";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    geoPathGenerator(borders);
    ctx.strokeStyle = "#7d96e8";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    geoPathGenerator(arcInfo.geo);
    ctx.fillStyle = "transparent";
    ctx.fill();
    ctx.strokeStyle = arcInfo.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    touredLocations.forEach((loc) => {
      ctx.beginPath();
      geoPathGenerator({ type: "Point", coordinates: loc.coords });
      switch (loc.tag) {
        case "europe2k19":
          ctx.fillStyle = "#db7093";
          break;
        case "taiwanexchange":
          ctx.fillStyle = "#7b68ee";
          break;
        default:
          ctx.fillStyle = "#db7093";
      }
      ctx.fill();
    });

    return ctx.canvas;
  }
};

const GlobeComp = ({ theme }) => {
  const globeRef = useRef();
  const [screenSize, setScreenSize] = useState(() => {
    if (window.innerWidth > 1200) {
      return "desktop-large";
    } else if (window.innerWidth > 896) {
      return "desktop-small";
    } else if (window.innerWidth > 600) {
      return "mobile-large";
    } else {
      return "mobile-small";
    }
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1200) {
        dimensions.width = 1000;
        dimensions.translateY = 150;
        setScreenSize("desktop-large");
      } else if (window.innerWidth > 896) {
        dimensions.width = 900;
        dimensions.translateY = 150;
        setScreenSize("desktop-small");
      } else if (window.innerWidth > 600) {
        dimensions.width = 750;
        dimensions.translateY = 200;
        setScreenSize("mobile-large");
      } else {
        dimensions.width = 500;
        dimensions.translateY = 300;
        setScreenSize("mobile-small");
      }
    });
  }, []);

  useEffect(() => {
    createD3Globe(globeRef.current, theme);
  }, [theme, screenSize]);

  return <Globe ref={globeRef} screenSize={screenSize} />;
};

export default GlobeComp;

/* SVG RENDERER CODE BITS - REMOVE AFTER MIGRATION FULLY COMPLETE */

// const Globe = styled.svg`
//   width: ${dimensions.width}px;
//   height: ${dimensions.height}px;

//   //   border: 5px solid green;
// `;

// const geoPathGenerator = geoPath(projection);

// function isVisible(d) {
//   return geoPathGenerator({ type: "Point", coordinates: d });
// }

// dimensions.boundedHeight = geoPathGenerator.bounds(sphere)[1][1];
// dimensions.height =
//   dimensions.boundedHeight + dimensions.margins.top + dimensions.margins.bottom;

// const bounds = wrapper
//   .append("g")
//   .attr("width", dimensions.boundedWidth)
//   .attr("height", dimensions.boundedHeight)
//   .style(
//     "transform",
//     `translate(${dimensions.margins.left}px, ${dimensions.margins.top}px)`
//   );

// bounds
//   .append("path")
//   .datum(sphere)
//   .attr("class", "sphere")
//   .attr("d", geoPathGenerator)
//   .style("fill", "var(--color-secondary");

// const countries = bounds
//   .selectAll(".country")
//   .data(countryShapes.features)
//   .enter()
//   .append("path")
//   .attr("class", "country")
//   .attr("d", geoPathGenerator)
//   .style("stroke", "#7d96e8")
//   .style("stroke-width", "1px")
//   .style("fill", "var(--color-primary)");

// const locations = bounds
//   .selectAll(".locations")
//   .data(touredLocations)
//   .enter()
//   .append("svg")
//   .attr("enable-background", "new 0 0 512 512")
//   .attr("viewBox", "0 0 512 512")
//   .attr("xmlns", "http://www.w3.org/2000/svg")
//   .attr("x", (d) => projection(d.coords)[0])
//   .attr("y", (d) => projection(d.coords)[1])
//   .attr("width", 20)
//   .attr("height", 20)
//   .style("transform", "translate(-10px, -19px)")
//   .html((d) =>
//     d.name === "Singapore"
//       ? `<path d="m376 30c-27.783 0-53.255 8.804-75.707 26.168-21.525 16.647-35.856 37.85-44.293 53.268-8.437-15.419-22.768-36.621-44.293-53.268-22.452-17.364-47.924-26.168-75.707-26.168-77.532 0-136 63.417-136 147.514 0 90.854 72.943 153.015 183.369 247.118 18.752 15.981 40.007 34.095 62.099 53.414 2.912 2.55 6.652 3.954 10.532 3.954s7.62-1.404 10.532-3.953c22.094-19.322 43.348-37.435 62.111-53.425 110.414-94.093 183.357-156.254 183.357-247.108 0-84.097-58.468-147.514-136-147.514z"/>`
//       : `<path d="m441.554 133.088c-18.037-58.288-65.454-105.719-123.742-123.758-61.692-19.11-127.33-8.489-177.431 28.427-49.732 36.661-79.419 95.389-79.419 157.093 0 42.567 13.466 83.008 38.933 116.944l156.125 200.206 156.125-200.221c38.113-50.816 48.839-115.947 29.409-178.691zm-185.534 166.792c-57.908 0-105.031-47.123-105.031-105.031s47.123-105.031 105.031-105.031 105.031 47.123 105.031 105.031-47.123 105.031-105.031 105.031z"/><path d="m256.02 120.027c-41.365 0-75.022 33.457-75.022 74.822s33.657 75.022 75.022 75.022 75.022-33.657 75.022-75.022c.001-41.365-33.657-74.822-75.022-74.822z"/>`
//   )
//   .attr("fill", (d) => {
//     if (d.name === "Singapore") {
//       return "#d7443e";
//     } else {
//       switch (d.tag) {
//         case "europe2k19":
//           return "var(--color-accent-one)";
//         case "taiwanexchange":
//           return "var(--color-accent-two)";
//         default:
//           return "var(--color-accent-one)";
//       }
//     }
//   })
//   .style("opacity", (d) => (isVisible(d.coords) ? 1 : 0));

// const labels = bounds
//   .selectAll(".locations")
//   .data(touredLocations)
//   .enter()
//   .append("text")
//   .text((d) => d.name)
//   .attr("x", (d) => projection(d.coords)[0])
//   .attr("y", (d) => projection(d.coords)[1] - 25)
//   .style("font-family", "var(--font-primary)")
//   .style("font-size", "12px")
//   .style("fill", "var(--color-text)")
//   .style("text-anchor", "middle")
//   .style("opacity", (_, i) => (i === (tourIdx + 1) % 9 ? 1 : 0));

// var arc = bounds
//   .append("path")
//   .datum([touredLocations[tourIdx % 9], touredLocations[(tourIdx + 1) % 9]])
//   .attr("d", (d) =>
//     geoPathGenerator({
//       type: "LineString",
//       coordinates: [d[0].coords, d[1].coords],
//     })
//   )
//   .style("stroke", (d) => {
//     switch (d[1].tag) {
//       case "europe2k19":
//         return "var(--color-accent-one)";
//       case "taiwanexchange":
//         return "var(--color-accent-two)";
//       default:
//         return "var(--color-accent-one)";
//     }
//   })
//   .style("stroke-width", "2px")
//   .style("fill", "transparent");

// var arcLength = arc.node().getTotalLength();

// arc
//   .attr("stroke-dasharray", arcLength)
//   .attr("stroke-dashoffset", arcLength)
//   .transition()
//   .delay(250)
//   .duration(1250)
//   .ease(easeQuadInOut)
//   .attr("stroke-dashoffset", 0)
//   .remove()
//   .transition()
//   .attr("stroke-dashoffset", -arcLength)
//   .remove();

// countries.attr("d", geoPathGenerator);
// locations
//   .attr("x", (d) => projection(d.coords)[0])
//   .attr("y", (d) => projection(d.coords)[1])
//   .style("opacity", (d) => (isVisible(d.coords) ? 1 : 0));
// labels
//   .attr("x", (d) => projection(d.coords)[0])
//   .attr("y", (d) => projection(d.coords)[1] - 25)
//   .style("opacity", (d, i) => (i === (tourIdx + 1) % 9 ? 1 : 0));
// arc.attr("d", (d) =>
//   geoPathGenerator({
//     type: "LineString",
//     coordinates: [d[0].coords, d[1].coords],
//   })
// );
