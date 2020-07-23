import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { window } from "browser-monads";
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
  "desktop-large": {
    width: 1000,
    translateY: 150,
  },
  "desktop-small": {
    width: 900,
    translateY: 150,
  },
  "mobile-large": {
    width: 750,
    translateY: 200,
  },
  "mobile-small": {
    width: 500,
    translateY: 300,
  },
};

const dpi = window.devicePixelRatio;
const sphere = { type: "Sphere" };

const Globe = styled.canvas`
  position: absolute;
  right: 0;
  top: 0;

  width: ${(props) => dimensions[props.screenSize].width}px;
  height: ${window.innerHeight}px;
`;

const createD3Globe = async (canvas, geoFeatures, theme, screenSize) => {
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = dimensions[screenSize].width * dpi;
  ctx.canvas.height = window.innerHeight * dpi;
  ctx.scale(dpi, dpi);
  ctx.translate(150, dimensions[screenSize].translateY);

  const [land, borders] = geoFeatures;
  const projection = geoOrthographic().fitWidth(
    dimensions[screenSize].width,
    sphere
  );
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
    ctx.clearRect(0, 0, dimensions[screenSize].width, window.innerHeight);

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
  const [geoFeatures, setGeoFeatures] = useState(null);

  const resizeHandler = () => {
    if (window.innerWidth > 1200) {
      setScreenSize("desktop-large");
    } else if (window.innerWidth > 896) {
      setScreenSize("desktop-small");
    } else if (window.innerWidth > 600) {
      setScreenSize("mobile-large");
    } else {
      setScreenSize("mobile-small");
    }
  };

  useEffect(() => {
    const initGeoFeatures = async () => {
      const world = await json(
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
      );
      const land = topojson.feature(world, world.objects.land);
      const borders = topojson.mesh(
        world,
        world.objects.countries,
        (a, b) => a !== b
      );

      setGeoFeatures([land, borders]);
    };

    initGeoFeatures();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const resizeTimeout = setTimeout(resizeHandler, 500);

      return () => clearTimeout(resizeTimeout);
    });
  }, []);

  useEffect(() => {
    if (geoFeatures) {
      createD3Globe(globeRef.current, geoFeatures, theme, screenSize);
    }
  }, [geoFeatures, theme, screenSize]);

  return <Globe ref={globeRef} screenSize={screenSize} />;
};

export default GlobeComp;
