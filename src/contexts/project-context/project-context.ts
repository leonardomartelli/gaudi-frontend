import React from "react";
import { ProjectContextContract } from "./project-context.interface";
import { Project } from "../../models/project/project.model";

export const ProjectContext = React.createContext<ProjectContextContract>({
  ProjectObject: undefined,
  exportProject: () => {
    return JSON.stringify(Project);
  },
  importProject: (project: string) => {
    //ProjectObject = JSON.parse(project);
  },
});
