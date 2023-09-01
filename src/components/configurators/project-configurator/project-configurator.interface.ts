import { Project } from "../../../models/project/project.model";

export interface ProjectConfiguratorContract {
  project: Project;
  densities: Array<number>;
  setTriggerUpdate: (t: number) => void;
  onOptimizationStart: () => void;
}
