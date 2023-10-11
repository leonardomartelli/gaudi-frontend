import { eCreationState } from "../../../models/enums/eCreationState";
import { ConstantRegion } from "../../../models/project/constantRegion.model";
import { Force } from "../../../models/project/force.model";
import { Support } from "../../../models/project/support.model";
import { CommonComponentContract } from "../../components.interface";

export interface StructureViewerContract extends CommonComponentContract {
  optimizationIdentifier: string;
  densities: Array<number>;
  forces: Array<Force>;
  supports: Array<Support>;
  constantRegions: Array<ConstantRegion>;
  width: number;
  height: number;
  triggerUpdate: (trigger: number) => void;
  creationState: eCreationState;
  setCreationState: (newState: eCreationState) => void;
  removeSupport: (id: number) => void;
  removeConstantRegion: (id: number) => void;
  removeForce: (id: number) => void;
}
