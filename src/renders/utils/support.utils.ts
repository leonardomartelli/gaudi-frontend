import { isDimensionable } from "./common.utils";
import { Support } from "../../models/project/support.model";

function getSupportIcon(s: Support) {
  return s.type === 0 ? "mobile_support" : "fixed_support";
}

export { getSupportIcon };
