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
  { name: "Singapore", tag: "taiwanexchange", coords: [103.851959, 1.29027] },
  { name: "Taiwan", tag: "taiwanexchange", coords: [120.9675, 24.8138] },
  { name: "Beijing", tag: "taiwanexchange", coords: [116.4074, 39.9042] },
  { name: "Luoyang", tag: "taiwanexchange", coords: [112.4539, 34.6202] },
  { name: "Shanghai", tag: "taiwanexchange", coords: [121.4737, 31.2304] },
  { name: "Singapore", tag: "", coords: [103.851959, 1.29027] },
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
const pinPath = new Path2D(
  "m216.210938 0c-122.664063 0-222.460938 99.796875-222.460938 222.460938 0 154.175781 222.679688 417.539062 222.679688 417.539062s222.242187-270.945312 222.242187-417.539062c0-122.664063-99.792969-222.460938-222.460937-222.460938zm67.121093 287.597656c-18.507812 18.503906-42.8125 27.757813-67.121093 27.757813-24.304688 0-48.617188-9.253907-67.117188-27.757813-37.011719-37.007812-37.011719-97.226562 0-134.238281 17.921875-17.929687 41.761719-27.804687 67.117188-27.804687 25.355468 0 49.191406 9.878906 67.121093 27.804687 37.011719 37.011719 37.011719 97.230469 0 134.238281zm0 0"
);
const heartPath = new Path2D(
  "m376 30c-27.783 0-53.255 8.804-75.707 26.168-21.525 16.647-35.856 37.85-44.293 53.268-8.437-15.419-22.768-36.621-44.293-53.268-22.452-17.364-47.924-26.168-75.707-26.168-77.532 0-136 63.417-136 147.514 0 90.854 72.943 153.015 183.369 247.118 18.752 15.981 40.007 34.095 62.099 53.414 2.912 2.55 6.652 3.954 10.532 3.954s7.62-1.404 10.532-3.953c22.094-19.322 43.348-37.435 62.111-53.425 110.414-94.093 183.357-156.254 183.357-247.108 0-84.097-58.468-147.514-136-147.514z"
);
const transMatrix = document
  .createElementNS("http://www.w3.org/2000/svg", "svg")
  .createSVGMatrix();

const Globe = styled.canvas`
  position: absolute;
  right: 0;
  top: 0;
  width: 1000px;
  height: 100vh;

  @media (max-width: 1200px) {
    width: 900px;
  }

  @media (max-width: 896px) {
    width: 750px;
  }

  @media (max-width: 600px) {
    width: 500px;
  }
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

  const visibilityGeoPath = geoPath(projection);
  function isVisible(coords) {
    return !!visibilityGeoPath({ type: "Point", coordinates: coords });
  }

  step();

  function step() {
    const numTours = touredLocations.length - 1;
    tourIdx = (tourIdx + 1) % numTours;

    const p1 = touredLocations[tourIdx].coords;
    const p2 = touredLocations[(tourIdx + 1) % numTours].coords;
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
              touredLocations[tourIdx].tag === "europe2k19"
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
            touredLocations[tourIdx].tag === "europe2k19"
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
      if (loc.name !== "Singapore") {
        if (isVisible(loc.coords)) {
          const pinIcon = new Path2D();
          pinIcon.addPath(
            pinPath,
            transMatrix
              .translate(
                projection(loc.coords)[0] - 6,
                projection(loc.coords)[1] - 18
              )
              .scale(0.03)
          );
          ctx.beginPath();
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
          ctx.fill(pinIcon);
        }
      }
    });

    if (isVisible([103.851959, 1.29027])) {
      const heartIcon = new Path2D();
      heartIcon.addPath(
        heartPath,
        transMatrix
          .translate(
            projection([103.851959, 1.29027])[0] - 5,
            projection([103.851959, 1.29027])[1] - 5
          )
          .scale(0.03)
      );
      ctx.beginPath();
      ctx.fillStyle = "#d7443e";
      ctx.fill(heartIcon);
    }
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
