import { MutableRefObject } from "react";
import * as d3 from "d3";
import { isDimensionable } from "./utils/common.utils";
import { Support } from "../models/project/support.model";
import constants from "../assets/constants";
import SupportHandler from "./drag-handlers/SupportDragHandler";
import { getSupportIcon } from "./utils/support.utils";

function renderSupports(
  ref: MutableRefObject<null>,
  supports: Support[],
  width: number,
  height: number,
  squareSize: number,
  onLeftSupportClick: (event: any) => void,
  onRightSupportClick: (event: any) => void,
  onSupportRectangleClick: (event: any) => void
) {
  const svg = d3.select(ref.current);

  const rectangle = svg
    .selectAll<SVGElement, Support>(".supportRectangle")
    .data<Support>(supports)
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
    )
    .on("click", onSupportRectangleClick);

  const firstSupport = svg
    .selectAll<SVGElement, Support>(".leftSupport")
    .data<Support>(supports)
    .join("use")
    .attr("class", "leftSupport")
    .attr("id", (f: Support) => `sl${f.id}`)
    .attr("href", (s: Support) => `#${getSupportIcon(s)}`)
    .attr("x", (f: Support) => f.position.x * squareSize)
    .attr("y", (f: Support) => f.position.y * squareSize)
    .attr("style", "visibility:visible")
    .on("click", onLeftSupportClick);

  const secondSupport = svg
    .selectAll<SVGElement, Support>(".rightSupport")
    .data<Support>(supports)
    .join("use")
    .attr("class", "rightSupport")
    .attr("id", (f: Support) => `sr${f.id}`)
    .attr("href", (s: Support) => `#inverted_${getSupportIcon(s)}`)
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
      (f: Support) => `visibility:${isDimensionable(f) ? "visible" : "hidden"}`
    )
    .on("click", onRightSupportClick);

  const supportRectangleHandler = SupportHandler.getRectangleSupportDragHandler(
    width,
    height,
    squareSize,
    (support: Support) => rerenderSupport(ref, support, squareSize)
  );
  supportRectangleHandler(rectangle);

  const leftSupportHandler = SupportHandler.getLeftSupportDragHandler(
    width,
    height,
    squareSize,
    (support: Support) => rerenderSupport(ref, support, squareSize)
  );
  leftSupportHandler(firstSupport);

  const rightSupportHandler = SupportHandler.getRightSupportDragHandler(
    squareSize,
    (support: Support) => rerenderSupport(ref, support, squareSize)
  );

  rightSupportHandler(secondSupport);
}

function rerenderSupport(
  ref: MutableRefObject<null>,
  support: Support,
  squareSize: number
) {
  const svg = d3.select(ref.current);

  const leftSupport = svg.select(`#sl${support.id}`);

  leftSupport
    .attr("x", support.position.x * squareSize)
    .attr("y", support.position.y * squareSize);

  const supportRectangle = svg.select(`#srect${support.id}`);
  const rightSupport = svg.select(`#sr${support.id}`);
  if (isDimensionable(support)) {
    supportRectangle
      .attr("x", support.position.x * squareSize)
      .attr("y", support.position.y * squareSize)
      .attr("width", support.dimensions.width * squareSize)
      .attr("height", support.dimensions.height * squareSize)
      .attr("style", "visibility: visible");

    rightSupport
      .attr(
        "x",
        (support.position.x + (support.dimensions?.width ?? 1)) * squareSize
      )
      .attr(
        "y",
        (support.position.y + (support.dimensions?.height ?? 1)) * squareSize
      )
      .attr("style", "visibility: visible");
  } else {
    supportRectangle.attr("style", "visibility: hidden");

    rightSupport.attr("style", "visibility: hidden");
  }
}

const out = { renderSupports, rerenderSupport };

export default out;
