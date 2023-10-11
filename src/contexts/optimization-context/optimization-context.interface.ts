import { eCreationState } from "../../models/enums/eCreationState";
import { Project } from "../../models/project/project.model";

export interface OptimizationContextContract {
  removeSupport: (id: number) => void;
  removeForce: (id: number) => void;
  removeConstantRegion: (id: number) => void;
  optimizationIdentifier: string;
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
  configureVolumeFraction: (nV: number) => void;
  volumeFraction: number;
  volumes: Array<number>;
  objectives: Array<number>;
}
