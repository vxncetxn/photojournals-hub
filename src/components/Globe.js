import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { select } from "d3-selection";
import { geoOrthographic, geoPath } from "d3-geo";
import { timer } from "d3-timer";

import countryShapes from "../world-geojson.json";

let dimensions = {
  width: window.innerWidth * 0.6,
  height: window.innerHeight,
  margins: {
    top: 50,
    right: 150,
    bottom: 50,
    left: 150,
  },
};

dimensions.boundedWidth =
  dimensions.width - dimensions.margins.left - dimensions.margins.right;
dimensions.boundedHeight =
  dimensions.height - dimensions.margins.top - dimensions.margins.bottom;

const config = {
  speed: 0.005,
  verticalTilt: -30,
  horizontalTilt: 0,
};

const sphere = { type: "Sphere" };
const projection = geoOrthographic().fitWidth(dimensions.boundedWidth, sphere);
const geoPathGenerator = geoPath(projection);

// const [[x0, y0], [x1, y1]] = geoPathGenerator.bounds(sphere);
// dimensions.boundedHeight = y1;
// dimensions.height =
//   dimensions.boundedHeight + dimensions.margins.top + dimensions.margins.bottom;

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
    .attr("d", geoPathGenerator)
    .attr("fill", "#f8f6ff");

  bounds
    .selectAll(".country")
    .data(countryShapes.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", geoPathGenerator)
    .style("stroke", "#9fb2ee")
    .style("stroke-width", "1px")
    .style("fill", (d, i) => "#f1eeff");

  //   timer(function (elapsed) {
  //     projection.rotate([
  //       config.speed * elapsed - 120,
  //       config.verticalTilt,
  //       config.horizontalTilt,
  //     ]);
  //     bounds.selectAll("path").attr("d", geoPathGenerator);
  //   });
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
