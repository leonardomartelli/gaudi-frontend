import { Force } from "../../models/project/force.model";

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

export { getForceRotation };
