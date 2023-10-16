import { ConstantRegion } from "../../models/project/constantRegion.model";
import { get } from "./CommonDragHandler";
import * as d3 from "d3";

let deltaX = 0;
let deltaY = 0;
let item: any = undefined;

function getConstantRegionDragHandler(
  width: number,
  height: number,
  squareSize: number,
  rerenderConstantRegion: (c: ConstantRegion) => void
) {
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

    newConstantRegion.setPosition(x, y, width, height);

    constantRegion.position = newConstantRegion.position;

    rerenderConstantRegion(constantRegion);
  };
  return get<SVGElement, ConstantRegion>(
    squareSize,
    (dX: number) => {
      deltaX = dX;
    },
    (dY: number) => {
      deltaY = dY;
    },
    (i: any) => {
      item = i;
    },
    draggingConstantRegion
  );
}

function getConstantRegionTopLeftCornerHandler(
  squareSize: number,
  rerenderConstantRegion: (c: ConstantRegion) => void
) {
  const draggingCorner = (event: any, constantRegion: ConstantRegion) => {
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

  return get<SVGCircleElement, ConstantRegion>(
    squareSize,
    (dX: number) => {
      deltaX = dX;
    },
    (dY: number) => {
      deltaY = dY;
    },
    (i: any) => {
      item = i;
    },
    draggingCorner
  );
}

function getConstantRegionTopRightCornerHandler(
  squareSize: number,
  rerenderConstantRegion: (c: ConstantRegion) => void
) {
  const draggingCorner = (event: any, constantRegion: ConstantRegion) => {
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

  return get<SVGCircleElement, ConstantRegion>(
    squareSize,
    (dX: number) => {
      deltaX = dX;
    },
    (dY: number) => {
      deltaY = dY;
    },
    (i: any) => {
      item = i;
    },
    draggingCorner
  );
}

function getConstantRegionBottomRightCornerHandler(
  squareSize: number,
  rerenderConstantRegion: (c: ConstantRegion) => void
) {
  const draggingCorner = (event: any, constantRegion: ConstantRegion) => {
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

  return get<SVGCircleElement, ConstantRegion>(
    squareSize,
    (dX: number) => {
      deltaX = dX;
    },
    (dY: number) => {
      deltaY = dY;
    },
    (i: any) => {
      item = i;
    },
    draggingCorner
  );
}
function getConstantRegionBottomLeftCornerHandler(
  squareSize: number,
  rerenderConstantRegion: (c: ConstantRegion) => void
) {
  const draggingCorner = (event: any, constantRegion: ConstantRegion) => {
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

  return get<SVGCircleElement, ConstantRegion>(
    squareSize,
    (dX: number) => {
      deltaX = dX;
    },
    (dY: number) => {
      deltaY = dY;
    },
    (i: any) => {
      item = i;
    },
    draggingCorner
  );
}

const out = {
  getConstantRegionDragHandler,
  getConstantRegionTopLeftCornerHandler,
  getConstantRegionTopRightCornerHandler,
  getConstantRegionBottomRightCornerHandler,
  getConstantRegionBottomLeftCornerHandler,
};

export default out;
