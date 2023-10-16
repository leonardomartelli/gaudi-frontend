import { Force } from "../../../models/project/force.model";
import { Dimensionable } from "../../../models/project/dimensionsable.model";
import { Support } from "../../../models/project/support.model";

function isDimensionable(obj: any): obj is Dimensionable {
  return (
    "dimensions" in obj &&
    obj.dimensions &&
    (obj.dimensions.width ?? 0) + (obj.dimensions.height ?? 0) > 0
  );
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

function getSupportIcon(s: Support) {
  return s.type === 0 ? "mobile_support" : "fixed_support";
}

export { getForceRotation, getSupportIcon, isDimensionable };
