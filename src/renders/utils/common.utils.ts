import { Dimensionable } from "../../models/project/dimensionsable.model";

function isDimensionable(obj: any): obj is Dimensionable {
  return (
    "dimensions" in obj &&
    obj.dimensions &&
    (obj.dimensions.width ?? 0) + (obj.dimensions.height ?? 0) > 0
  );
}
export { isDimensionable };
