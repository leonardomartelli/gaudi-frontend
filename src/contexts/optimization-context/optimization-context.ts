import { createContext } from "react";
import { Project, defaultProject } from "../../models/project/project.model";
import { OptimizationContextContract } from "./optimization-context.interface";

export const OptimizationContext = createContext<OptimizationContextContract>({
  project: defaultProject,
  onOptimizationStart: () => {},
  densities: [0],
  objective: 0,
  volume: 0,
  setTriggerUpdate: (c: number) => {},
  updateProject: (p: Project) => {},
});
