import { MutableRefObject } from "react";
import * as d3 from "d3";
import { ConstantRegion } from "../models/project/constantRegion.model";
import constants from "../assets/constants";
import { PositionalCondition } from "../models/project/positionalCondition.model";
import ConstantRegionDragHandler from "./drag-handlers/ConstantRegionDragHandler";

function renderConstantRegions(
  ref: MutableRefObject<null>,
  constantRegions: ConstantRegion[],
  width: number,
  height: number,
  squareSize: number,
  onClick: (event: any) => void
) {
  const svg = d3.select(ref.current);

  renderRegion(svg, constantRegions, width, height, squareSize, ref, onClick);

  renderCorners(svg, constantRegions, squareSize, ref);
}

function renderRegion(
  svg: d3.Selection<null, unknown, null, undefined>,
  constantRegions: ConstantRegion[],
  width: number,
  height: number,
  squareSize: number,
  ref: MutableRefObject<null>,
  onClick: (event: any) => void
) {
  const constantRegion = svg
    .selectAll<SVGElement, ConstantRegion>(".constant")
    .data<ConstantRegion>(constantRegions)
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
    .attr("stroke", constants.POPPY)
    .attr("stroke-width", 7.5)
    .attr("fill", (p: ConstantRegion) =>
      p.type === 1 ? constants.POPPY : constants.ALICE_BLUE
    )
    .attr("x", (f: ConstantRegion) => f.position.x * squareSize)
    .attr("y", (f: ConstantRegion) => f.position.y * squareSize)
    .attr("id", (cr: ConstantRegion) => `cr${cr.id}`)
    .attr("fill-opacity", 0.6);

  constantRegion.on("click", onClick);

  const constantRegionDragHandler =
    ConstantRegionDragHandler.getConstantRegionDragHandler(
      width,
      height,
      squareSize,
      (cr: ConstantRegion) => rerenderConstantRegion(ref, cr, squareSize)
    );

  constantRegionDragHandler(constantRegion);
}

function renderCorners(
  svg: d3.Selection<null, unknown, null, undefined>,
  constantRegions: ConstantRegion[],
  squareSize: number,
  ref: MutableRefObject<null>
) {
  renderTopLeftCorner(svg, constantRegions, squareSize, ref);

  renderTopRightCorner(svg, constantRegions, squareSize, ref);

  renderBottomRightCorner(svg, constantRegions, squareSize, ref);

  renderBottomLeftCorner(svg, constantRegions, squareSize, ref);
}

function renderBottomLeftCorner(
  svg: d3.Selection<null, unknown, null, undefined>,
  constantRegions: ConstantRegion[],
  squareSize: number,
  ref: MutableRefObject<null>
) {
  const bottomLeftCorner = svg
    .selectAll<SVGCircleElement, ConstantRegion>(".bottomLeftCorner")
    .data<ConstantRegion>(constantRegions)
    .join("circle")
    .attr("fill", constants.HONOLULU_BLUE)
    .attr("class", "bottomLeftCorner")
    .attr("cx", (f: ConstantRegion) => f.position.x * squareSize)
    .attr(
      "cy",
      (f: ConstantRegion) => (f.position.y + f.dimensions.height) * squareSize
    )
    .attr("r", 15)
    .attr("id", (cr: PositionalCondition) => `cr${cr.id}bl`);

  const constantRegionBottomLeftCornerHandler =
    ConstantRegionDragHandler.getConstantRegionBottomLeftCornerHandler(
      squareSize,
      (cr: ConstantRegion) => rerenderConstantRegion(ref, cr, squareSize)
    );

  constantRegionBottomLeftCornerHandler(bottomLeftCorner);
}

function renderBottomRightCorner(
  svg: d3.Selection<null, unknown, null, undefined>,
  constantRegions: ConstantRegion[],
  squareSize: number,
  ref: MutableRefObject<null>
) {
  const bottomRightCorner = svg
    .selectAll<SVGCircleElement, ConstantRegion>(".bottomRightCorner")
    .data<ConstantRegion>(constantRegions)
    .join("circle")
    .attr("fill", constants.HONOLULU_BLUE)
    .attr("class", "bottomRightCorner")
    .attr(
      "cx",
      (f: ConstantRegion) => (f.position.x + f.dimensions.width) * squareSize
    )
    .attr(
      "cy",
      (f: ConstantRegion) => (f.position.y + f.dimensions.height) * squareSize
    )
    .attr("r", 15)
    .attr("id", (cr: PositionalCondition) => `cr${cr.id}br`);

  const constantRegionBottomRightCornerHandler =
    ConstantRegionDragHandler.getConstantRegionBottomRightCornerHandler(
      squareSize,
      (cr: ConstantRegion) => rerenderConstantRegion(ref, cr, squareSize)
    );

  constantRegionBottomRightCornerHandler(bottomRightCorner);
}

function renderTopRightCorner(
  svg: d3.Selection<null, unknown, null, undefined>,
  constantRegions: ConstantRegion[],
  squareSize: number,
  ref: MutableRefObject<null>
) {
  const topRightCorner = svg
    .selectAll<SVGCircleElement, ConstantRegion>(".topRightCorner")
    .data<ConstantRegion>(constantRegions)
    .join("circle")
    .attr("fill", constants.HONOLULU_BLUE)
    .attr("class", "topRightCorner")
    .attr(
      "cx",
      (f: ConstantRegion) => (f.position.x + f.dimensions.width) * squareSize
    )
    .attr("cy", (f: ConstantRegion) => f.position.y * squareSize)
    .attr("r", 15)
    .attr("id", (cr: PositionalCondition) => `cr${cr.id}tr`);

  const constantRegionTopRightCornerHandler =
    ConstantRegionDragHandler.getConstantRegionTopRightCornerHandler(
      squareSize,
      (cr: ConstantRegion) => rerenderConstantRegion(ref, cr, squareSize)
    );

  constantRegionTopRightCornerHandler(topRightCorner);
}

function renderTopLeftCorner(
  svg: d3.Selection<null, unknown, null, undefined>,
  constantRegions: ConstantRegion[],
  squareSize: number,
  ref: MutableRefObject<null>
) {
  const topLeftCorner = svg
    .selectAll<SVGCircleElement, ConstantRegion>(".topLeftCorner")
    .data<ConstantRegion>(constantRegions)
    .join("circle")
    .attr("fill", constants.HONOLULU_BLUE)
    .attr("class", "topLeftCorner")
    .attr("cx", (f: ConstantRegion) => f.position.x * squareSize)
    .attr("cy", (f: ConstantRegion) => f.position.y * squareSize)
    .attr("r", 15)
    .attr("id", (cr: PositionalCondition) => `cr${cr.id}tl`);

  const constantRegionTopLeftCornerHandler =
    ConstantRegionDragHandler.getConstantRegionTopLeftCornerHandler(
      squareSize,
      (cr: ConstantRegion) => rerenderConstantRegion(ref, cr, squareSize)
    );

  constantRegionTopLeftCornerHandler(topLeftCorner);
}

function rerenderConstantRegion(
  ref: MutableRefObject<null>,
  constantRegion: ConstantRegion,
  squareSize: number
) {
  const svg = d3.select(ref.current);

  const regionElement = svg.select(`#cr${constantRegion.id}`);

  regionElement
    .attr("x", constantRegion.position.x * squareSize)
    .attr("y", constantRegion.position.y * squareSize)
    .attr("width", constantRegion.dimensions.width * squareSize)
    .attr("height", constantRegion.dimensions.height * squareSize);

  const topLeftCorner = svg.select(`#cr${constantRegion.id}tl`);

  topLeftCorner
    .attr("cx", constantRegion.position.x * squareSize)
    .attr("cy", constantRegion.position.y * squareSize);

  const topRightCorner = svg.select(`#cr${constantRegion.id}tr`);

  topRightCorner
    .attr(
      "cx",
      (constantRegion.position.x + constantRegion.dimensions.width) * squareSize
    )
    .attr("cy", constantRegion.position.y * squareSize);

  const bottomRightCorner = svg.select(`#cr${constantRegion.id}br`);

  bottomRightCorner
    .attr(
      "cx",
      (constantRegion.position.x + constantRegion.dimensions.width) * squareSize
    )
    .attr(
      "cy",
      (constantRegion.position.y + constantRegion.dimensions.height) *
        squareSize
    );

  const bottomLeftCorner = svg.select(`#cr${constantRegion.id}bl`);

  bottomLeftCorner
    .attr("cx", constantRegion.position.x * squareSize)
    .attr(
      "cy",
      (constantRegion.position.y + constantRegion.dimensions.height) *
        squareSize
    );
}

const out = { renderConstantRegions, rerenderConstantRegion };

export default out;
