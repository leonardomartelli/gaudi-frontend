import { Support } from "../../models/project/support.model";
import { isDimensionable } from "./common.utils";

function getSupportIcon(s: Support, isRight: boolean) {
  const isHorizontal = (s.direction ?? 0) === 0;

  const inverted =
    (isRight && isHorizontal) ||
    (!isHorizontal && isDimensionable(s) && !isRight)
      ? "inverted_"
      : "";

  const type = s.type === 0 ? "mobile_support" : "fixed_support";

  return `#${inverted}${type}${isHorizontal ? "_h" : ""}`;
}

export { getSupportIcon };
