import React, { useEffect } from "react";
import { useState } from "react";
import { Project } from "../../models/project/project.model";
import { ProjectToolBar } from "../../components/toolbars/project-toolbar/project-toolbar.component";
import { ProjectViewer } from "../../components/viewers/project-viewer/project-viewer.component";

export function GaudiMain(props: any) {
  let [project, setProject] = useState<Project>(defaultProject);

  let style = {
    width: "80%",
    height: "400px",
  };

  let [input, setInput] = useState("");

  return (
    <div>
      <ProjectToolBar
        updateProject={(newProj: Project) => setProject(newProj)}
      ></ProjectToolBar>

      <ProjectViewer project={project} />
    </div>
  );
}

const defaultProject: Project = {
  domain: {
    materialProperties: {
      elasticity: 0.3,
      density: 1,
      flow: 0.3,
    },
    dimensions: {
      width: 120,
      height: 60,
    },
    volumeFraction: 0.4,
  },
  boundaryConditions: {
    supports: [
      {
        position: {
          x: 0,
          y: 0,
        },
        type: 1,
      },
      {
        position: {
          x: 0,
          y: 60,
        },
        type: 1,
      },
    ],
    forces: [
      {
        load: -1,
        orientation: 1,
        position: {
          x: 120,
          y: 30,
        },
      },
    ],
  },
  penalization: 3,
  filterIndex: 5.4,
};
