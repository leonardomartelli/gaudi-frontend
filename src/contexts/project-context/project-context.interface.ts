import { Project } from "../../models/project/project.model";

export interface ProjectContextContract {
  ProjectObject?: Project;
  exportProject: () => string;
  importProject: (project: string) => void;
}
