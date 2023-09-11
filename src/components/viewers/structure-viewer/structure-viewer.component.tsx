import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { StructureViewerContract } from "./structure-viewer.interface";
import constants from "../../../assets/constants";
import { Force } from "../../../models/project/force.model";
import styles from "./structure-viewer.module.scss";
import { Support } from "../../../models/project/support.model";
import { ConstantRegion } from "../../../models/project/constantRegion.model";
import { Position } from "../../../models/project/position.model";
import { PositionalCondition } from "../../../models/project/positionalCondition.model";

export function StructureViewer(props: StructureViewerContract) {
  const width = props.width;
  const height = props.height;
  const densities = props.densities;

  const viewerHeight = 800;

  let [counter, setCounter] = useState(1);

  const ref = useRef(null);

  const squareSize = viewerHeight / height;

  const innerPadding = viewerHeight * 0.2;

  useEffect(() => {
    const svg = d3.select(ref.current);

    svg
      .attr("viewBox", [
        -innerPadding,
        -innerPadding,
        (viewerHeight / height) * width * (1 + 0.2),
        viewerHeight * 1.3,
      ])
      .attr("width", (viewerHeight / height) * width)
      .attr("height", viewerHeight)
      .attr("style", "max-width: 100%; height: auto;");

    function to_id(x: number, y: number) {
      return x * height + y;
    }

    svg
      .selectAll(".dens")
      .data(d3.range(height * width))
      .join("rect")
      .attr("x", (d: number) => (d % width) * squareSize)
      .attr("y", (d: number) => Math.floor(d / width) * squareSize)
      .attr("width", squareSize)
      .attr("height", squareSize)
      .attr("class", "dens")
      .attr("fill", "#0f1b42")
      .attr(
        "fill-opacity",
        (d: number) => densities[to_id(d % width, Math.floor(d / width))]
      );

    setCounter(counter + 1);
    props.triggerUpdate(counter);
  }, [densities]);

  let [positionChanged, setPositionChenged] = useState(0);

  let deltaX = 0;
  let deltaY = 0;

  const dragStarted = (event: any, force: PositionalCondition) => {
    deltaX = force.position.x * squareSize - Math.round(event.x);
    deltaY = force.position.y * squareSize - Math.round(event.y);
  };

  const dragging = (event: any, force: PositionalCondition) => {
    const x = Math.round((event.x + deltaX) / squareSize);
    const y = Math.round((event.y + deltaY) / squareSize);

    force.setPosition(x, y, props.width, props.height);
  };

  const dragEnded = (event: any, force: PositionalCondition) => {
    setPositionChenged(positionChanged + 1);
  };

  const handler = d3
    .drag<SVGElement, PositionalCondition>()
    .on("start", dragStarted)
    .on("drag", dragging)
    .on("end", dragEnded);

  useEffect(() => {
    const svg = d3.select(ref.current);

    const force = svg
      .selectAll<SVGElement, Force>(".forces")
      .data<PositionalCondition>(props.forces)
      .join("use")
      .attr("class", "forces")
      .attr("href", "#icon")
      .attr("x", (f: PositionalCondition) => f.position.x * squareSize - 15)
      .attr("y", (f: PositionalCondition) => f.position.y * squareSize);

    force.on("click", () => {
      const datum = force.datum();
      if (datum.selected == false) {
        force
          .datum(datum)
          .attr("stroke", constants.POPPY)
          .attr("stroke-width", 3);
        datum.selected = true;
      } else {
        datum.selected = false;
        force.datum(datum).attr("stroke", "none");
      }
    });

    handler(force);
  }, [positionChanged, props.forces]);

  useEffect(() => {
    const svg = d3.select(ref.current);

    const constantRegion = svg
      .selectAll<SVGElement, ConstantRegion>(".constant")
      .data<PositionalCondition>(props.constantRegions)
      .join("rect")
      .attr("class", "constant")
      .attr("width", (f: PositionalCondition) => {
        const p = f as ConstantRegion;

        return p.dimensions.width * squareSize;
      })
      .attr("height", (f: PositionalCondition) => {
        const p = f as ConstantRegion;

        return p.dimensions.height * squareSize;
      })
      .attr("stroke", (f: PositionalCondition) => {
        const p = f as ConstantRegion;

        return p.type == 0 ? constants.POPPY : constants.ALICE_BLUE;
      })
      .attr("stroke-width", 3)
      .attr("fill", (f: PositionalCondition) => {
        const p = f as ConstantRegion;

        return p.type == 1 ? constants.POPPY : constants.ALICE_BLUE;
      })
      .attr("x", (f: PositionalCondition) => f.position.x * squareSize)
      .attr("y", (f: PositionalCondition) => f.position.y * squareSize);

    // handler(voidRegion);

    const point1 = svg
      .selectAll(".rectPoint1")
      .data<ConstantRegion>(props.constantRegions)
      .attr("fill", constants.HONOLULU_BLUE)
      .join("circle")
      .attr("class", "rectPoint1")
      .attr("cx", (f: ConstantRegion) => f.position.x * squareSize)
      .attr("cy", (f: ConstantRegion) => f.position.y * squareSize)
      .attr("r", 7);

    const point2 = svg
      .selectAll(".rectPoint2")
      .data<ConstantRegion>(props.constantRegions)
      .attr("fill", constants.HONOLULU_BLUE)
      .join("circle")
      .attr("class", "rectPoint2")
      .attr(
        "cx",
        (f: ConstantRegion) => (f.position.x + f.dimensions.width) * squareSize
      )
      .attr("cy", (f: ConstantRegion) => f.position.y * squareSize)
      .attr("r", 7);

    const point3 = svg
      .selectAll(".rectPoint3")
      .data<ConstantRegion>(props.constantRegions)
      .attr("fill", constants.HONOLULU_BLUE)
      .join("circle")
      .attr("class", "rectPoint3")
      .attr(
        "cx",
        (f: ConstantRegion) => (f.position.x + f.dimensions.width) * squareSize
      )
      .attr(
        "cy",
        (f: ConstantRegion) => (f.position.y + f.dimensions.height) * squareSize
      )
      .attr("r", 7);

    const point4 = svg
      .selectAll(".rectPoint4")
      .data<ConstantRegion>(props.constantRegions)
      .join("circle")
      .attr("fill", constants.HONOLULU_BLUE)
      .attr("class", "rectPoint4")
      .attr("cx", (f: ConstantRegion) => f.position.x * squareSize)
      .attr(
        "cy",
        (f: ConstantRegion) => (f.position.y + f.dimensions.height) * squareSize
      )
      .attr("r", 7);

    handler(constantRegion);

    constantRegion.on("click", () => {});
  }, [props.constantRegions, positionChanged]);

  useEffect(() => {
    const svg = d3.select(ref.current);

    const support = svg
      .selectAll<SVGElement, Support>(".supports")
      .data<PositionalCondition>(props.supports)
      .join("use")
      .attr("class", "supports")
      .attr("href", "#support")
      .attr("x", (f: PositionalCondition) => f.position.x * squareSize)
      .attr("y", (f: PositionalCondition) => f.position.y * squareSize)
      .call(drag);

    support.on("click", () => {});

    handler(support);
  }, [positionChanged, props.supports]);

  const drag = () => {
    function dragstarted(event: any) {
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event: any, force: any) {
      force.position.x = event.x / squareSize;
      force.position.y = event.y / squareSize;

      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event: any) {
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  return (
    <div className={styles.viewer}>
      <svg ref={ref}>
        <defs>
          <g id="icon" transform="scale(2.0)">
            <path
              d="M8 55L0.205772 37L15.7942 37L8 55Z"
              fill={constants.HONOLULU_BLUE}
            />
            <rect
              x="6"
              y="8"
              width="4"
              height="29"
              fill={constants.HONOLULU_BLUE}
            />
            <circle cx="8" cy="3" r="3" fill={constants.HONOLULU_BLUE} />
          </g>
          <g
            id="support"
            transform="scale(2.0) rotate(90)"
            fill={constants.ALICE_BLUE}
            fillOpacity={0}
          >
            <path
              d="m -16,43 4.6278,10"
              stroke={constants.HONOLULU_BLUE}
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M -0.8139,43 3.8139,53"
              stroke={constants.HONOLULU_BLUE}
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M 14.3722,43 19,53"
              stroke={constants.HONOLULU_BLUE}
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M 4.3971,3.75 22.1506,34.5 c 1.7321,3 -0.433,6.75 -3.8971,6.75 h -35.50702 c -3.4641,0 -5.62917,-3.75 -3.89712,-6.75 L -3.3971,3.75 c 1.732,-2.999999 6.0622,-3 7.7942,0 z"
              stroke={constants.HONOLULU_BLUE}
              stroke-width="3"
            />
          </g>
        </defs>
      </svg>
    </div>
  );
}
