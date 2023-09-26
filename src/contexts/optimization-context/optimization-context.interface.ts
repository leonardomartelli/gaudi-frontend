import { eCreationState } from "../../models/enums/eCreationState";
import { Project } from "../../models/project/project.model";

export interface OptimizationContextContract {
  project: Project;
  onOptimizationStart: () => void;
  densities: Array<number>;
  objective: number;
  volume: number;
  setTriggerUpdate: (c: number) => void;
  updateProject: (newProject: Project) => void;
  creationState: eCreationState;
  setCreationState: (newState: eCreationState) => void;
  width: number;
  height: number;
  configureWidth: (nW: number) => void;
  configureHeight: (nH: number) => void;
}
