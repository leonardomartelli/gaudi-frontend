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

  const draggingForce = (event: any, force: Force) => {
    const x = Math.round((event.x + deltaX) / squareSize);
    const y = Math.round((event.y + deltaY) / squareSize);
    const selection = d3.select(item);

    if (force.selected) {
      const angle =
        angleBetween(force.position.x, force.position.y + 10, x, y) - 90;
      //console.log(angle);
      if (angle < -225) {
        force.orientation = 0;
        if (force.load < 0) force.load *= -1;
      } else if (angle < -135) {
        force.orientation = 1;
        if (force.load < 0) force.load *= -1;
      } else if (angle < -45) {
        force.orientation = 0;
        if (force.load > 0) force.load *= -1;
      } else {
        force.orientation = 1;
        if (force.load > 0) force.load *= -1;
      }
      //console.log(force.orientation, force.load);
      selection.attr(
        "transform",
        `rotate( ${getForceRotation(force)} ${force.position.x * squareSize} ${
          force.position.y * squareSize
        })`
      );
    } else {
      const newForce = new Force(
        force.load,
        force.orientation,
        force.position,
        force.size,
        force.id
      );

      newForce.setPosition(x, y, props.width, props.height);
      const selection = d3.select(item);

      selection
        .attr("x", newForce.position.x * squareSize)
        .attr("y", newForce.position.y * squareSize);
    }
  };

  const draggingSupport = (event: any, support: Support) => {
    const x = Math.round((event.x + deltaX) / squareSize);
    const y = Math.round((event.y + deltaY) / squareSize);

    const newSupport = new Support(
      support.position,
      support.type,
      support.dimensions,
      support.id
    );

    newSupport.setPosition(x, y, props.width, props.height);

    support.position = newSupport.position;

    rerenderSupport(support);
  };

  const draggingConstantRegion = (
    event: any,
    constantRegion: ConstantRegion
  ) => {
    const x = Math.round((event.x + deltaX) / squareSize);
    const y = Math.round((event.y + deltaY) / squareSize);

    const newConstantRegion = new ConstantRegion(
      constantRegion.position,
      constantRegion.dimensions,
      constantRegion.type,
      constantRegion.id
    );

    newConstantRegion.setPosition(x, y, props.width, props.height);

    constantRegion.position = newConstantRegion.position;

    rerenderConstantRegion(constantRegion);
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

  const draggingLeftSupport = (event: any, leftSupport: Support) => {
    const x = Math.round((event.x + deltaX) / squareSize);
    const y = Math.round((event.y + deltaY) / squareSize);

    console.log(y);

    const newSupport = new Support(
      leftSupport.position,
      leftSupport.type,
      leftSupport.dimensions,
      leftSupport.id
    );

    let positionX = leftSupport.position.x;
    let positionY = leftSupport.position.y;

    let widthChange = positionX - x;
    let heightChange = positionY - y;

    if (isDimensionable(leftSupport)) {
      leftSupport.dimensions.width += widthChange;
      leftSupport.dimensions.height += heightChange;

      if (leftSupport.dimensions.width < 0) leftSupport.dimensions.width = 0;
      else positionX -= widthChange;

      if (leftSupport.dimensions.height < 0) leftSupport.dimensions.height = 0;
      else positionY -= heightChange;
    } else {
      positionX -= widthChange;
      positionY -= heightChange;
    }

    newSupport.setPosition(positionX, positionY, width, height);

    leftSupport.position = newSupport.position;

    rerenderSupport(leftSupport);
  };

  const draggingRightSupport = (event: any, rightSupport: Support) => {
    const x = Math.round(event.x / squareSize);
    const y = Math.round(event.y / squareSize);
    let position = rightSupport.position;

    var widthChange = position.x + rightSupport.dimensions.width - x;
    var heightChange = position.y + rightSupport.dimensions.height - y;

    rightSupport.dimensions.width -= widthChange;
    rightSupport.dimensions.height -= heightChange;

    if (rightSupport.dimensions.width < 0) rightSupport.dimensions.width = 0;

    if (rightSupport.dimensions.height < 0) rightSupport.dimensions.height = 0;

    rerenderSupport(rightSupport);
  };

  const forceHandler = d3
    .drag<SVGElement, Force>()
    .on("start", dragStarted)
    .on("drag", draggingForce)
    .on("end", dragEnded);

  const constantRegionHandler = d3
    .drag<SVGElement, ConstantRegion>()
    .on("start", dragStarted)
    .on("drag", draggingConstantRegion)
    .on("end", dragEnded);

  const supportRectangleHandler = d3
    .drag<SVGElement, Support>()
    .on("start", dragStarted)
    .on("drag", draggingSupport)
    .on("end", dragEnded);

  const leftSupportHandler = d3
    .drag<SVGElement, Support>()
    .on("start", dragStarted)
    .on("drag", draggingLeftSupport)
    .on("end", dragEnded);

  const rightSupportHandler = d3
    .drag<SVGElement, Support>()
    .on("start", dragStarted)
    .on("drag", draggingRightSupport)
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
      .data<Force>(props.forces)
      .join("use")
      .attr("class", "forces")
      .attr("href", "#force")
      .attr("x", (f: Force) => f.position.x * squareSize - 15)
      .attr("y", (f: Force) => f.position.y * squareSize)
      .attr(
        "transform",
        (f: Force) => `rotate(${getForceRotation(f)}
       ${f.position.x * squareSize} ${f.position.y * squareSize})`
      )
      .attr("id", (f: Force) => `f${f.id}`);

    //force.raise();

    force.on("click", (event: any) => {
      const datum = event.target.__data__;

      if (datum.selected === false) {
        svg
          .selectAll(`#f${datum.id}`)
          .attr("stroke", constants.POPPY)
          .attr("stroke-width", 1);

        datum.selected = true;
      } else {
        datum.selected = false;
        svg.selectAll(`#f${datum.id}`).attr("stroke", "none");
      }
    });

    forceHandler(force);
  }, [forceHandler, positionChanged, props.forces]);

  useEffect(() => {
    const svg = d3.select(ref.current);

    const constantRegion = svg
      .selectAll<SVGElement, ConstantRegion>(".constant")
      .data<ConstantRegion>(props.constantRegions)
      .join("rect")
      .attr("class", "constant")
      .attr("width", (f: ConstantRegion) => {
        const p = f as ConstantRegion;
        return p.dimensions.width * squareSize;
      })
      .attr("height", (f: ConstantRegion) => {
        const p = f as ConstantRegion;

        return p.dimensions.height * squareSize;
      })
      .attr("stroke", (p: ConstantRegion) =>
        p.type === 0 ? constants.POPPY : constants.ALICE_BLUE
      )
      .attr("stroke-width", 7.5)
      .attr("fill", (p: ConstantRegion) =>
        p.type === 1 ? constants.POPPY : constants.ALICE_BLUE
      )
      .attr("x", (f: ConstantRegion) => f.position.x * squareSize)
      .attr("y", (f: ConstantRegion) => f.position.y * squareSize)
      .attr("id", (cr: ConstantRegion) => `cr${cr.id}`);

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

    constantRegionHandler(constantRegion);

    handlerCorner1(point1);
    handlerCorner2(point2);
    handlerCorner3(point3);
    handlerCorner4(point4);
  }, [
    props.constantRegions,
    positionChanged,
    constantRegionHandler,
    handlerCorner1,
    handlerCorner2,
    handlerCorner3,
    handlerCorner4,
  ]);

  useEffect(() => {
    const svg = d3.select(ref.current);

    const rectangle = svg
      .selectAll<SVGElement, Support>(".supportRectangle")
      .data<Support>(props.supports)
      .join("rect")
      .attr("class", "supportRectangle")
      .attr("id", (f: Support) => `srect${f.id}`)
      .attr("x", (f: Support) => f.position.x * squareSize)
      .attr("y", (f: Support) => f.position.y * squareSize)
      .attr("width", (f: Support) => (f.dimensions?.width ?? 1) * squareSize)
      .attr("height", (f: Support) => (f.dimensions?.height ?? 1) * squareSize)
      .attr("stroke", constants.HONOLULU_BLUE)
      .attr("stroke-width", 10)
      .attr("fill", constants.HONOLULU_BLUE)
      .attr("fill-opacity", 0.6)
      .style("visibility", (f: Support) =>
        isDimensionable(f) ? "visible" : "hidden"
      );
    supportRectangleHandler(rectangle);

    const firstSupport = svg
      .selectAll<SVGElement, Support>(".leftSupport")
      .data<Support>(props.supports)
      .join("use")
      .attr("class", "leftSupport")
      .attr("id", (f: Support) => `sl${f.id}`)
      .attr("href", "#support")
      .attr("x", (f: Support) => f.position.x * squareSize)
      .attr("y", (f: Support) => f.position.y * squareSize);

    leftSupportHandler(firstSupport);

    const secondSupport = svg
      .selectAll<SVGElement, Support>(".rightSupport")
      .data<Support>(props.supports)
      .join("use")
      .attr("class", "rightSupport")
      .attr("id", (f: Support) => `sr${f.id}`)
      .attr("href", "#supportInverted")
      .attr(
        "x",
        (sup: Support) =>
          (sup.position.x + (sup.dimensions?.width ?? 1)) * squareSize
      )
      .attr(
        "y",
        (sup: Support) =>
          (sup.position.y + (sup.dimensions?.height ?? 1)) * squareSize
      )
      .attr(
        "style",
        (f: Support) =>
          `visibility:${isDimensionable(f) ? "visible" : "hidden"}`
      );

    rightSupportHandler(secondSupport);

    // support.on("click", (event: any) => {
    //   if (event.shiftKey) {
    //     const datum = support.datum();

    //     props.removeSupport(datum.id ?? event.target.x);

    //     setPositionChanged(positionChanged + 1);
    //   }
    // });

    // support.raise();
  }, [
    leftSupportHandler,
    positionChanged,
    props.supports,
    rightSupportHandler,
    supportRectangleHandler,
  ]);

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
          <g
            id="supportInverted"
            fill={constants.ALICE_BLUE}
            fillOpacity={0}
            transform={"scale(2.5) rotate(-90)"}
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

  function rerenderSupport(support: Support) {
    const svg = d3.select(ref.current);

    const leftSupport = svg.select(`#sl${support.id}`);

    leftSupport
      .attr("x", support.position.x * squareSize)
      .attr("y", support.position.y * squareSize);

    if (isDimensionable(support)) {
      const supportRectangle = svg.select(`#srect${support.id}`);

      supportRectangle
        .attr("x", support.position.x * squareSize)
        .attr("y", support.position.y * squareSize)
        .attr("width", support.dimensions.width * squareSize)
        .attr("height", support.dimensions.height * squareSize);

      const rightSupport = svg.select(`#sr${support.id}`);

      rightSupport
        .attr(
          "x",
          (support.position.x + (support.dimensions?.width ?? 1)) * squareSize
        )
        .attr(
          "y",
          (support.position.y + (support.dimensions?.height ?? 1)) * squareSize
        );
    }
  }

  function getForceRotation(force: Force) {
    let angle = 0;

    if (force.orientation === 0) {
      angle = 90;

      if (force.load < 0) angle *= -1;
    } else if (force.load > 0) {
      angle = 180;
    }

    return angle;
  }

  function angleBetween(x1: number, y1: number, x2: number, y2: number) {
    return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  }
}

function isDimensionable(obj: any): obj is Dimensionable {
  return (
    "dimensions" in obj &&
    obj.dimensions &&
    (obj.dimensions.width ?? 0) + (obj.dimensions.height ?? 0) > 0
  );
}
