import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { select } from "d3-selection";
import { geoOrthographic, geoPath, geoInterpolate } from "d3-geo";
import { transition } from "d3-transition";

import countryShapes from "../world-geojson.json";

let dimensions = {
  width: window.innerWidth * 0.6,
  margins: {
    top: 50,
    right: 150,
    bottom: 50,
    left: 150,
  },
};

dimensions.boundedWidth =
  dimensions.width - dimensions.margins.left - dimensions.margins.right;

const sphere = { type: "Sphere" };
const projection = geoOrthographic().fitWidth(dimensions.boundedWidth, sphere);
projection.rotate([255, 0, 0]);
const geoPathGenerator = geoPath(projection);

function isVisible(d) {
  return geoPathGenerator({ type: "Point", coordinates: d });
}

dimensions.boundedHeight = geoPathGenerator.bounds(sphere)[1][1];
dimensions.height =
  dimensions.boundedHeight + dimensions.margins.top + dimensions.margins.bottom;

const GlobePanel = styled.div`
  width: 60%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  //   border: 1px solid blue;
`;

const Globe = styled.svg`
  width: ${dimensions.width}px;
  height: ${dimensions.height}px;

  //   border: 5px solid green;
`;

let tourIdx = -1;

const touredLocations = [
  { name: "Singapore", tag: "europe2k19", coords: [103.851959, 1.29027] },
  { name: "Switzerland", tag: "europe2k19", coords: [8.5417, 47.3769] },
  { name: "Poland", tag: "europe2k19", coords: [17.0385, 51.1079] },
  { name: "Portugal", tag: "europe2k19", coords: [8.6291, 41.1579] },
  { name: "Singapore", tag: "europe2k19", coords: [103.851959, 1.29027] },
  { name: "Taiwan", tag: "taiwanexchange", coords: [120.9675, 24.8138] },
  { name: "Beijing", tag: "taiwanexchange", coords: [116.4074, 39.9042] },
  { name: "Luoyang", tag: "taiwanexchange", coords: [112.4539, 34.6202] },
  { name: "Shanghai", tag: "taiwanexchange", coords: [121.4737, 31.2304] },
];

const createD3Globe = (wrapper) => {
  const bounds = wrapper
    .append("g")
    .attr("width", dimensions.boundedWidth)
    .attr("height", dimensions.boundedHeight)
    .style(
      "transform",
      `translate(${dimensions.margins.left}px, ${dimensions.margins.top}px)`
    );

  bounds
    .append("path")
    .datum(sphere)
    .attr("class", "sphere")
    .attr("d", geoPathGenerator)
    .style("fill", "var(--color-secondary");

  const countries = bounds
    .selectAll(".country")
    .data(countryShapes.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", geoPathGenerator)
    .style("stroke", "#7d96e8")
    .style("stroke-width", "1px")
    .style("fill", "var(--color-primary)");

  const locations = bounds
    .selectAll(".locations")
    .data(touredLocations)
    .enter()
    .append("svg")
    .attr("enable-background", "new 0 0 512 512")
    .attr("viewBox", "0 0 512 512")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("x", (d) => projection(d.coords)[0])
    .attr("y", (d) => projection(d.coords)[1])
    .attr("width", 20)
    .attr("height", 20)
    .style("transform", "translate(-10px, -19px)")
    .html(
      `<path d="m441.554 133.088c-18.037-58.288-65.454-105.719-123.742-123.758-61.692-19.11-127.33-8.489-177.431 28.427-49.732 36.661-79.419 95.389-79.419 157.093 0 42.567 13.466 83.008 38.933 116.944l156.125 200.206 156.125-200.221c38.113-50.816 48.839-115.947 29.409-178.691zm-185.534 166.792c-57.908 0-105.031-47.123-105.031-105.031s47.123-105.031 105.031-105.031 105.031 47.123 105.031 105.031-47.123 105.031-105.031 105.031z"/><path d="m256.02 120.027c-41.365 0-75.022 33.457-75.022 74.822s33.657 75.022 75.022 75.022 75.022-33.657 75.022-75.022c.001-41.365-33.657-74.822-75.022-74.822z"/>`
    )
    // .append("circle")
    // .attr("cx", (d) => projection(d.coords)[0])
    // .attr("cy", (d) => projection(d.coords)[1])
    // .attr("r", 5)
    .attr("fill", (d) => {
      switch (d.tag) {
        case "europe2k19":
          return "var(--color-accent-one)";
        case "taiwanexchange":
          return "var(--color-accent-two)";
        default:
          return "var(--color-accent-one)";
      }
    })
    .style("opacity", (d) => (isVisible(d.coords) ? 1 : 0));

  const labels = bounds
    .selectAll(".locations")
    .data(touredLocations)
    .enter()
    .append("text")
    .text((d) => d.name)
    .attr("x", (d) => projection(d.coords)[0])
    .attr("y", (d) => projection(d.coords)[1] - 25)
    .style("font-family", "var(--font-primary)")
    .style("font-size", "12px")
    .style("fill", "var(--color-text)")
    .style("text-anchor", "middle")
    .style("opacity", (_, i) => (i === (tourIdx + 1) % 9 ? 1 : 0));

  // step();

  function step() {
    tourIdx++;

    var arc = bounds
      .append("path")
      .datum([touredLocations[tourIdx % 9], touredLocations[(tourIdx + 1) % 9]])
      .attr("d", (d) =>
        geoPathGenerator({
          type: "LineString",
          coordinates: [d[0].coords, d[1].coords],
        })
      )
      .style("stroke", (d) => {
        switch (d[1].tag) {
          case "europe2k19":
            return "var(--color-accent-one)";
          case "taiwanexchange":
            return "var(--color-accent-two)";
          default:
            return "var(--color-accent-one)";
        }
      })
      .style("stroke-width", "2px")
      .style("fill", "transparent");

    var arcLength = arc.node().getTotalLength();

    arc
      .attr("stroke-dasharray", arcLength)
      .attr("stroke-dashoffset", arcLength)
      .transition()
      .delay(250)
      .duration(1250)
      .attr("stroke-dashoffset", 0)
      .remove()
      .transition()
      .attr("stroke-dashoffset", -arcLength)
      .remove();

    transition()
      .delay(250)
      .duration(1250)
      .tween("rotate", function () {
        var point = touredLocations[(tourIdx + 1) % 9].coords,
          rotate = geoInterpolate(projection.rotate(), [-point[0], -point[1]]);
        return function (t) {
          projection.rotate(rotate(t));
          countries.attr("d", geoPathGenerator);
          locations
            .attr("x", (d) => projection(d.coords)[0])
            .attr("y", (d) => projection(d.coords)[1])
            // .attr("cx", (d) => projection(d.coords)[0])
            // .attr("cy", (d) => projection(d.coords)[1])
            .style("opacity", (d) => (isVisible(d.coords) ? 1 : 0));
          labels
            .attr("x", (d) => projection(d.coords)[0])
            .attr("y", (d) => projection(d.coords)[1] - 25)
            .style("opacity", (d, i) => (i === (tourIdx + 1) % 9 ? 1 : 0));
          arc.attr("d", (d) =>
            geoPathGenerator({
              type: "LineString",
              coordinates: [d[0].coords, d[1].coords],
            })
          );
        };
      })
      .transition()
      .on("end", step);
  }
};

const GlobeComp = () => {
  const globeRef = useRef();

  useEffect(() => {
    createD3Globe(select(globeRef.current));
  }, []);

  return (
    <GlobePanel>
      <Globe ref={globeRef} />
    </GlobePanel>
  );
};

export default GlobeComp;
