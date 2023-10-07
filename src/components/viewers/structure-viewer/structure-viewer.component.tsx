import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { StructureViewerContract } from "./structure-viewer.interface";
import constants from "../../../assets/constants";
import { Force } from "../../../models/project/force.model";
import styles from "./structure-viewer.module.scss";
import { Support } from "../../../models/project/support.model";
import { ConstantRegion } from "../../../models/project/constantRegion.model";
import { Dimensionable } from "../../../models/project/dimensionsable.model";
import { PositionalCondition } from "../../../models/project/positionalCondition.model";
import { eCreationState } from "../../../models/enums/eCreationState";
import { Position } from "../../../models/project/position.model";
import { Dimensions } from "../../../models/project/dimensions.model";

export function StructureViewer(props: StructureViewerContract) {
  const width = props.width;
  const height = props.height;
  const densities = props.densities;

  let [counter, setCounter] = useState(1);

  const ref = useRef(null);

  const squareSize = 12;
  const viewerHeight = squareSize * height;
  const viewerWidth = squareSize * width;

  const paddingRate = 0.2;
  const innerPaddingX = viewerWidth * paddingRate;
  const innerPaddingY = viewerHeight * paddingRate;

  let [creationXPosition, setCreationXPosition] = useState(0);
  let [creationYPosition, setCreationYPosition] = useState(0);
  let [positionChanged, setPositionChanged] = useState(0);

  useEffect(() => {
    const creationPosition = new Position(creationXPosition, creationYPosition);

    switch (props.creationState) {
      case eCreationState.FORCE:
        props.forces.push(
          new Force(-1, 1, creationPosition, undefined, props.forces.length)
        );
        setPositionChanged(positionChanged + 1);
        break;
      case eCreationState.SUPPORT:
        props.supports.push(
          new Support(creationPosition, 0, undefined, props.supports.length)
        );
        setPositionChanged(positionChanged + 1);
        break;
      case eCreationState.VOID:
        props.constantRegions.push(
          new ConstantRegion(
            creationPosition,
            new Dimensions(10, 10),
            0,
            props.constantRegions.length
          )
        );
        setPositionChanged(positionChanged + 1);
        break;
      case eCreationState.MATERIAL:
        props.constantRegions.push(
          new ConstantRegion(
            creationPosition,
            new Dimensions(10, 10),
            1,
            props.constantRegions.length
          )
        );
        setPositionChanged(positionChanged + 1);
        break;
      default:
        break;
    }

    props.setCreationState(eCreationState.NONE);
  }, [creationXPosition, creationYPosition]);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg
      .selectAll(".contour")
      .data<number>(d3.range(1))
      .join("rect")
      .attr("class", "contour")
      .attr("x", "-5")
      .attr("y", "-5")
      .attr("width", width * squareSize + 10)
      .attr("height", height * squareSize + 10)
      .attr("stroke-width", "10")
      .attr("fill", "none")
      .attr("stroke", constants.POPPY);
  }, [width, height]);

  useEffect(() => {
    function to_id(x: number, y: number) {
      return x * height + y;
    }

    const svg = d3.select(ref.current);

    svg
      .attr("viewBox", [
        -innerPaddingX,
        -innerPaddingY,
        viewerWidth + 2 * innerPaddingX,
        viewerHeight + 2 * innerPaddingY,
      ])
      .attr("width", viewerWidth)
      .attr("height", viewerHeight)
      .attr("style", "width: 100%; height: 90%");

    const structure = svg
      .selectAll<SVGRectElement, number>(".dens")
      .data<number>(d3.range(height * width))
      .join("rect")
      .attr("x", (d: number) => (d % width) * squareSize)
      .attr("y", (d: number) => Math.floor(d / width) * squareSize)
      .attr("width", squareSize)
      .attr("height", squareSize)
      .attr("class", "dens")
      .attr("fill", constants.NIGHT_BLACK)
      .attr(
        "fill-opacity",
        (d: number) => densities[to_id(d % width, Math.floor(d / width))]
      );

    structure.on("click", (event: any) => {
      const x = event.target.x.animVal.value;
      const y = event.target.y.animVal.value;

      setCreationXPosition(Math.round(x / squareSize));
      setCreationYPosition(Math.round(y / squareSize));
    });

    // svg.selectAll("use").raise();

    if (props.optimizationIdentifier !== "") {
      setCounter(counter + 1);
      props.triggerUpdate(counter);
    }
  }, [
    densities,
    width,
    height,
    innerPaddingX,
    innerPaddingY,
    viewerWidth,
    viewerHeight,
    counter,
    positionChanged,
    props,
  ]);

  let deltaX = 0;
  let deltaY = 0;

  let item: any = undefined;

  const dragStarted = (event: any, force: PositionalCondition) => {
    deltaX = force.position.x * squareSize - Math.round(event.x);
    deltaY = force.position.y * squareSize - Math.round(event.y);
    item = event.sourceEvent.target;
  };

  const dragging = (event: any, positionalCondition: PositionalCondition) => {
    const x = Math.round((event.x + deltaX) / squareSize);
    const y = Math.round((event.y + deltaY) / squareSize);

    let position = positionalCondition.position;

    if (isDimensionable(positionalCondition)) {
      const objectin = new ConstantRegion(
        positionalCondition.position,
        positionalCondition.dimensions,
        0
      );

      objectin.setPosition(x, y, props.width, props.height);

      position = objectin.position;

      positionalCondition.position = position;

      rerenderConstantRegion(positionalCondition as ConstantRegion);
    } else {
      const objectin = new Force(0, 0, positionalCondition.position);
      objectin.setPosition(x, y, props.width, props.height);

      position = objectin.position;

      positionalCondition.position = position;

      const selection = d3.select(item);

      selection
        .attr("x", position.x * squareSize)
        .attr("y", position.y * squareSize);
    }
  };

  const draggingCorner1 = (event: any, constantRegion: ConstantRegion) => {
    const x = Math.round(event.x / squareSize);
    const y = Math.round(event.y / squareSize);

    let position = constantRegion.position;

    var widthChange = position.x - x;
    var heightChange = position.y - y;

    constantRegion.dimensions.width += widthChange;
    constantRegion.dimensions.height += heightChange;

    if (constantRegion.dimensions.width < 10)
      constantRegion.dimensions.width = 10;
    else position.x -= widthChange;

    if (constantRegion.dimensions.height < 10)
      constantRegion.dimensions.height = 10;
    else position.y -= heightChange;

    constantRegion.position = position;

    const selection = d3.select(item);

    selection.attr("cx", event.x).attr("cy", event.y);
    rerenderConstantRegion(constantRegion);
  };

  const draggingCorner2 = (event: any, constantRegion: ConstantRegion) => {
    const x = Math.round(event.x / squareSize);
    const y = Math.round(event.y / squareSize);

    let position = constantRegion.position;

    var widthChange = position.x + constantRegion.dimensions.width - x;
    var heightChange = position.y - y;

    constantRegion.dimensions.width -= widthChange;
    constantRegion.dimensions.height += heightChange;

    if (constantRegion.dimensions.width < 10)
      constantRegion.dimensions.width = 10;

    if (constantRegion.dimensions.height < 10)
      constantRegion.dimensions.height = 10;
    else position.y -= heightChange;

    constantRegion.position = position;
    const selection = d3.select(item);

    selection.attr("cx", event.x).attr("cy", event.y);
    rerenderConstantRegion(constantRegion);
  };

  const draggingCorner3 = (event: any, constantRegion: ConstantRegion) => {
    const x = Math.round(event.x / squareSize);
    const y = Math.round(event.y / squareSize);

    let position = constantRegion.position;

    var widthChange = position.x + constantRegion.dimensions.width - x;
    var heightChange = position.y + constantRegion.dimensions.height - y;

    constantRegion.dimensions.width -= widthChange;
    constantRegion.dimensions.height -= heightChange;

    if (constantRegion.dimensions.width < 10)
      constantRegion.dimensions.width = 10;

    if (constantRegion.dimensions.height < 10)
      constantRegion.dimensions.height = 10;
    const selection = d3.select(item);

    selection.attr("cx", event.x).attr("cy", event.y);

    rerenderConstantRegion(constantRegion);
  };

  const draggingCorner4 = (event: any, constantRegion: ConstantRegion) => {
    const x = Math.round(event.x / squareSize);
    const y = Math.round(event.y / squareSize);

    let position = constantRegion.position;

    var widthChange = position.x - x;
    var heightChange = position.y + constantRegion.dimensions.height - y;

    constantRegion.dimensions.width += widthChange;
    constantRegion.dimensions.height -= heightChange;

    if (constantRegion.dimensions.width < 10)
      constantRegion.dimensions.width = 10;
    else position.x -= widthChange;

    if (constantRegion.dimensions.height < 10)
      constantRegion.dimensions.height = 10;

    constantRegion.position = position;
    const selection = d3.select(item);

    selection.attr("cx", event.x).attr("cy", event.y);

    rerenderConstantRegion(constantRegion);
  };

  const dragEnded = (event: any, force: PositionalCondition) => {
    setPositionChanged(positionChanged + 1);
    item = undefined;
  };

  const handler = d3
    .drag<SVGElement, PositionalCondition>()
    .on("start", dragStarted)
    .on("drag", dragging)
    .on("end", dragEnded);

  const handlerCorner1 = d3
    .drag<SVGCircleElement, ConstantRegion>()
    .on("start", dragStarted)
    .on("drag", draggingCorner1)
    .on("end", dragEnded);

  const handlerCorner2 = d3
    .drag<SVGCircleElement, ConstantRegion>()
    .on("start", dragStarted)
    .on("drag", draggingCorner2)
    .on("end", dragEnded);
  const handlerCorner3 = d3
    .drag<SVGCircleElement, ConstantRegion>()
    .on("start", dragStarted)
    .on("drag", draggingCorner3)
    .on("end", dragEnded);
  const handlerCorner4 = d3
    .drag<SVGCircleElement, ConstantRegion>()
    .on("start", dragStarted)
    .on("drag", draggingCorner4)
    .on("end", dragEnded);

  useEffect(() => {
    const svg = d3.select(ref.current);

    const force = svg
      .selectAll<SVGElement, Force>(".forces")
      .data<PositionalCondition>(props.forces)
      .join("use")
      .attr("class", "forces")
      .attr("href", "#force")
      .attr("x", (f: PositionalCondition) => f.position.x * squareSize - 15)
      .attr("y", (f: PositionalCondition) => f.position.y * squareSize)
      .attr("id", (f: PositionalCondition) => `f${f.id}`);

    //force.raise();

    force.on("click", (event: any) => {
      const datum = force.datum();

      if (datum.selected === false) {
        force
          .selectAll(`#f${datum.id}`)
          .attr("stroke", constants.POPPY)
          .attr("stroke-width", 3);
        datum.selected = true;
      } else {
        datum.selected = false;
        force.selectAll(`#f${datum.id}`).attr("stroke", "none");
      }
    });

    handler(force);
  }, [handler, positionChanged, props.forces]);

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

        return p.type === 0 ? constants.POPPY : constants.ALICE_BLUE;
      })
      .attr("stroke-width", 7.5)
      .attr("fill", (f: PositionalCondition) => {
        const p = f as ConstantRegion;

        return p.type === 1 ? constants.POPPY : constants.ALICE_BLUE;
      })
      .attr("x", (f: PositionalCondition) => f.position.x * squareSize)
      .attr("y", (f: PositionalCondition) => f.position.y * squareSize)
      .attr("id", (cr: PositionalCondition) => `cr${cr.id}`);

    const point1 = svg
      .selectAll<SVGCircleElement, ConstantRegion>(".rectPoint1")
      .data<ConstantRegion>(props.constantRegions)
      .attr("fill", constants.HONOLULU_BLUE)
      .join("circle")
      .attr("class", "rectPoint1")
      .attr("cx", (f: ConstantRegion) => f.position.x * squareSize)
      .attr("cy", (f: ConstantRegion) => f.position.y * squareSize)
      .attr("r", 15)
      .attr("id", (cr: PositionalCondition) => `cr${cr.id}p1`);

    const point2 = svg
      .selectAll<SVGCircleElement, ConstantRegion>(".rectPoint2")
      .data<ConstantRegion>(props.constantRegions)
      .attr("fill", constants.HONOLULU_BLUE)
      .join("circle")
      .attr("class", "rectPoint2")
      .attr(
        "cx",
        (f: ConstantRegion) => (f.position.x + f.dimensions.width) * squareSize
      )
      .attr("cy", (f: ConstantRegion) => f.position.y * squareSize)
      .attr("r", 15)
      .attr("id", (cr: PositionalCondition) => `cr${cr.id}p2`);

    const point3 = svg
      .selectAll<SVGCircleElement, ConstantRegion>(".rectPoint3")
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
      .attr("r", 15)
      .attr("id", (cr: PositionalCondition) => `cr${cr.id}p3`);

    const point4 = svg
      .selectAll<SVGCircleElement, ConstantRegion>(".rectPoint4")
      .data<ConstantRegion>(props.constantRegions)
      .join("circle")
      .attr("fill", constants.HONOLULU_BLUE)
      .attr("class", "rectPoint4")
      .attr("cx", (f: ConstantRegion) => f.position.x * squareSize)
      .attr(
        "cy",
        (f: ConstantRegion) => (f.position.y + f.dimensions.height) * squareSize
      )
      .attr("r", 15)
      .attr("id", (cr: PositionalCondition) => `cr${cr.id}p4`);

    constantRegion.raise();
    point1.raise();
    point2.raise();
    point3.raise();
    point4.raise();

    handler(constantRegion);

    handlerCorner1(point1);
    handlerCorner2(point2);
    handlerCorner3(point3);
    handlerCorner4(point4);
  }, [
    props.constantRegions,
    positionChanged,
    handler,
    handlerCorner1,
    handlerCorner2,
    handlerCorner3,
    handlerCorner4,
  ]);

  useEffect(() => {
    const svg = d3.select(ref.current);

    const support = svg
      .selectAll<SVGElement, Support>(".supports")
      .data<PositionalCondition>(props.supports)
      .join("use")
      .attr("class", "supports")
      .attr("id", (f: PositionalCondition) => `sup${f.id}`)
      .attr("href", "#support")
      .attr("x", (f: PositionalCondition) => f.position.x * squareSize)
      .attr("y", (f: PositionalCondition) => f.position.y * squareSize);

    support.on("click", (event: any) => {
      if (event.shiftKey) {
        const datum = support.datum();

        props.removeSupport(datum.id ?? event.target.x);

        setPositionChanged(positionChanged + 1);
      }
    });

    // support.raise();
    handler(support);
  }, [handler, positionChanged, props.supports]);

  return (
    <div className={styles.viewer}>
      <svg ref={ref}>
        <defs>
          <g id="force" transform={"scale(2.5)"}>
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
            fill={constants.ALICE_BLUE}
            fillOpacity={0}
            transform={"scale(2.5) rotate(90)"}
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

  function rerenderConstantRegion(constantRegion: ConstantRegion) {
    const svg = d3.select(ref.current);

    const regionElement = svg.select(`#cr${constantRegion.id}`);

    regionElement
      .attr("x", constantRegion.position.x * squareSize)
      .attr("y", constantRegion.position.y * squareSize)
      .attr("width", constantRegion.dimensions.width * squareSize)
      .attr("height", constantRegion.dimensions.height * squareSize);

    const point1 = svg.select(`#cr${constantRegion.id}p1`);

    point1
      .attr("cx", constantRegion.position.x * squareSize)
      .attr("cy", constantRegion.position.y * squareSize);

    const point2 = svg.select(`#cr${constantRegion.id}p2`);

    point2
      .attr(
        "cx",
        (constantRegion.position.x + constantRegion.dimensions.width) *
          squareSize
      )
      .attr("cy", constantRegion.position.y * squareSize);

    const point3 = svg.select(`#cr${constantRegion.id}p3`);

    point3
      .attr(
        "cx",
        (constantRegion.position.x + constantRegion.dimensions.width) *
          squareSize
      )
      .attr(
        "cy",
        (constantRegion.position.y + constantRegion.dimensions.height) *
          squareSize
      );

    const point4 = svg.select(`#cr${constantRegion.id}p4`);

    point4
      .attr("cx", constantRegion.position.x * squareSize)
      .attr(
        "cy",
        (constantRegion.position.y + constantRegion.dimensions.height) *
          squareSize
      );
  }
}

function isDimensionable(obj: any): obj is Dimensionable {
  return (
    "dimensions" in obj &&
    obj.dimensions &&
    obj.dimensions.width + obj.dimensions.height > 0
  );
}
