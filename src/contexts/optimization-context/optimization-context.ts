import { createContext } from "react";
import { Project, defaultProject } from "../../models/project/project.model";
import { OptimizationContextContract } from "./optimization-context.interface";
import { eCreationState } from "../../models/enums/eCreationState";

export const OptimizationContext = createContext<OptimizationContextContract>({
  project: defaultProject,
  onOptimizationStart: () => {},
  densities: [0],
  currentObjective: 0,
  currentVolume: 0,
  setTriggerUpdate: (c: number) => {},
  updateProject: (p: Project) => {},
  creationState: eCreationState.NONE,
  setCreationState: (ns: eCreationState) => {},
  width: defaultProject.domain.dimensions.width,
  height: defaultProject.domain.dimensions.height,
  configureWidth: (nW: number) => {},
  configureHeight: (nH: number) => {},
  configureVolumeFraction: (nv: number) => {},
  volumeFraction: defaultProject.domain.volumeFraction,
  volumes: [0],
  objectives: [0],
  optimizationIdentifier: "",
  removeSupport: (id: number) => {},
  removeForce: (id: number) => {},
  removeConstantRegion: (id: number) => {},

  penalization: 0,
  materialYoung: 0,
  materialPoisson: 0,
  filterRadius: 0,
  configurePenalization: (c: number) => {},
  configureMaterialYoung: (c: number) => {},
  configureMaterialPoisson: (c: number) => {},
  configureFilterRadius: (c: number) => {},
});
