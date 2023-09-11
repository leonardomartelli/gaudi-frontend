import { ConstantRegion } from "../../../models/project/constantRegion.model";
import { Force } from "../../../models/project/force.model";
import { Support } from "../../../models/project/support.model";
import { CommonComponentContract } from "../../components.interface";

export interface StructureViewerContract extends CommonComponentContract {
  densities: Array<number>;
  forces: Array<Force>;
  supports: Array<Support>;
  constantRegions: Array<ConstantRegion>;
  width: number;
  height: number;
  triggerUpdate: (trigger: number) => void;
}
