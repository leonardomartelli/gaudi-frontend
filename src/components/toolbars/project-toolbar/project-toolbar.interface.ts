import { Project } from "../../../models/project/project.model";

export interface ProjectToolBarContract {
  updateProject: (newProject: Project) => void;
  startOptimization: () => void;
}
