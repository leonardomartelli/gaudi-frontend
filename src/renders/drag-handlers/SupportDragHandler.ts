import { isDimensionable } from "../utils/common.utils";
import { Support } from "../../models/project/support.model";
import { get } from "./CommonDragHandler";

let deltaX = 0;
let deltaY = 0;

function getLeftSupportDragHandler(
  width: number,
  height: number,
  squareSize: number,
  rerenderSupport: (support: Support) => void
) {
  const draggingLeftSupport = (event: any, leftSupport: Support) => {
    const x = Math.round((event.x + deltaX) / squareSize);
    const y = Math.round((event.y + deltaY) / squareSize);

    console.log(y);

    const newSupport = new Support(
      leftSupport.position,
      leftSupport.type,
      leftSupport.direction,
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

      if (leftSupport.dimensions.width < 1) leftSupport.dimensions.width = 0;
      else positionX -= widthChange;

      if (leftSupport.dimensions.height < 1) leftSupport.dimensions.height = 0;
      else positionY -= heightChange;
    } else {
      positionX -= widthChange;
      positionY -= heightChange;
    }

    newSupport.setPosition(positionX, positionY, width, height);

    leftSupport.position = newSupport.position;

    rerenderSupport(leftSupport);
  };

  return get<SVGElement, Support>(
    squareSize,
    (dX: number) => {
      deltaX = dX;
    },
    (dY: number) => {
      deltaY = dY;
    },
    (i: any) => {},
    draggingLeftSupport
  );
}

function getRectangleSupportDragHandler(
  width: number,
  height: number,
  squareSize: number,
  rerenderSupport: (support: Support) => void
) {
  const draggingSupport = (event: any, support: Support) => {
    const x = Math.round((event.x + deltaX) / squareSize);
    const y = Math.round((event.y + deltaY) / squareSize);

    const newSupport = new Support(
      support.position,
      support.type,
      support.direction,
      support.dimensions,
      support.id
    );

    newSupport.setPosition(x, y, width, height);

    support.position = newSupport.position;

    rerenderSupport(support);
  };

  return get<SVGElement, Support>(
    squareSize,
    (dX: number) => {
      deltaX = dX;
    },
    (dY: number) => {
      deltaY = dY;
    },
    (i: any) => {},
    draggingSupport
  );
}

function getRightSupportDragHandler(
  squareSize: number,
  rerenderSupport: (support: Support) => void
) {
  const draggingRightSupport = (event: any, rightSupport: Support) => {
    const x = Math.round(event.x / squareSize);
    const y = Math.round(event.y / squareSize);
    let position = rightSupport.position;

    var widthChange = position.x + rightSupport.dimensions.width - x;
    var heightChange = position.y + rightSupport.dimensions.height - y;

    rightSupport.dimensions.width -= widthChange;
    rightSupport.dimensions.height -= heightChange;

    if (rightSupport.dimensions.width < 1) rightSupport.dimensions.width = 0;

    if (rightSupport.dimensions.height < 1) rightSupport.dimensions.height = 0;

    rerenderSupport(rightSupport);
  };

  return get<SVGElement, Support>(
    squareSize,
    (dX: number) => {
      deltaX = dX;
    },
    (dY: number) => {
      deltaY = dY;
    },
    (i: any) => {},
    draggingRightSupport
  );
}

const out = {
  getLeftSupportDragHandler,
  getRectangleSupportDragHandler,
  getRightSupportDragHandler,
};

export default out;
