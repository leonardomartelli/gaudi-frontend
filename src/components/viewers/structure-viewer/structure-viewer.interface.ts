import { CommonComponentContract } from "../../components.interface";

export interface StructureViewerContract extends CommonComponentContract {
  densities: Array<number>;
  width: number;
  height: number;
  triggerUpdate: (trigger: number) => void;
}
