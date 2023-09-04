import { Project } from "../../models/project/project.model";

export interface OptimizationContextContract {
  project: Project;
  onOptimizationStart: () => void;
  densities: Array<number>;
  objective: number;
  volume: number;
  setTriggerUpdate: (c: number) => void;
  updateProject: (newPropject: Project) => void;
}
