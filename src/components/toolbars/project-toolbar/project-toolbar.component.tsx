import { CommonButton } from "../../buttons/common-button/common-button.component";
import React, { useRef } from "react";
import styles from "./project-toolbar.module.scss";
import { ProjectToolBarContract } from "./project-toolbar.interface";

export function ProjectToolBar(props: ProjectToolBarContract) {
  const exportProject = () => {};

  const onFileLoaded = async (file: File) => {
    const project = JSON.parse(await file.text());

    props.updateProject(project);
  };

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      let file = event.target.files[0];

      if (file) {
        onFileLoaded(file);
      }
    }
  };

  return (
    <div className={styles.toolbar}>
      <label>
        <input
          type="file"
          hidden={true}
          onChange={(e) => {
            onFileSelected(e);
          }}
        />
        <img src="images/arrow.up.doc.svg" />
        Upload
      </label>
    </div>
  );
}
