import { CommonButton } from "../../buttons/common-button/common-button.component";
import React, { useRef } from "react";
import { ProjectToolBarContract } from "./project-toolbar.interface";
import { FileSelection } from "../../file-selection/file-selection.component";

export function ProjectToolBar(props: ProjectToolBarContract) {
  const exportProject = () => {};

  const importProject = () => {
    // fileSelectionRef?.current?.click();
  };

  const fileSelectionRef = useRef<HTMLInputElement>(null);

  const onFileLoaded = async (file: File) => {
    const project = JSON.parse(await file.text());

    props.updateProject(project);
  };

  let style = {
    background: "#FF0000",
    width: "100%",
  };

  return (
    <div style={style}>
      <FileSelection
        inputReference={fileSelectionRef}
        onFileSelection={onFileLoaded}
      />
      <CommonButton
        onClick={exportProject}
        label="Salvar Projeto"
        icon="arrow.down.doc.svg"
      />
      <CommonButton
        onClick={importProject}
        label="Carregar Projeto"
        icon="arrow.up.doc.svg"
      />
    </div>
  );
}
