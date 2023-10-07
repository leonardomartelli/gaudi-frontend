import { createContext } from "react";
import { Project, defaultProject } from "../../models/project/project.model";
import { OptimizationContextContract } from "./optimization-context.interface";
import { eCreationState } from "../../models/enums/eCreationState";

export const OptimizationContext = createContext<OptimizationContextContract>({
  project: defaultProject,
  onOptimizationStart: () => {},
  densities: [0],
  objective: 0,
  volume: 0,
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
});
