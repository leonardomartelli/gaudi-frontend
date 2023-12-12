import { eCreationState } from "../../models/enums/eCreationState";
import { eAppState } from "../../models/enums/eAppState";
import { Project } from "../../models/project/project.model";

export interface OptimizationContextContract {
  project: Project;
  densities: Array<number>;
  width: number;
  height: number;
  volumeFraction: number;

  currentObjective: number;
  currentVolume: number;

  penalization: number;
  materialYoung: number;
  materialPoisson: number;
  filterRadius: number;
  configurePenalization: (c: number) => void;
  configureMaterialYoung: (c: number) => void;
  configureMaterialPoisson: (c: number) => void;
  configureFilterRadius: (c: number) => void;

  onOptimizationStart: () => void;

  optimizationIdentifier: string;
  volumes: Array<number>;
  objectives: Array<number>;
  creationState: eCreationState;
  appState: eAppState;

  setCreationState: (newState: eCreationState) => void;
  setAppState: (newState: eAppState) => void;
  updateProject: (newProject: Project) => void;

  configureWidth: (nW: number) => void;
  configureHeight: (nH: number) => void;

  configureVolumeFraction: (nV: number) => void;
  removeSupport: (id: number) => void;
  removeForce: (id: number) => void;
  removeConstantRegion: (id: number) => void;
}
