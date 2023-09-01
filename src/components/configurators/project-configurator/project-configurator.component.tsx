import React from "react";
import { StructureViewer } from "../../viewers/structure-viewer/structure-viewer.component";
import { CommonButton } from "../../buttons/common-button/common-button.component";
import { ProjectConfiguratorContract } from "./project-configurator.interface";
import styles from "./project-configurator.module.scss";

export function ProjectConfigurator(props: ProjectConfiguratorContract) {
  let project = props.project;
  let densities = props.densities;

  return (
    <div className={styles.project}>
      <StructureViewer
        width={project.domain.dimensions.width}
        height={project.domain.dimensions.height}
        densities={densities}
        triggerUpdate={(target) => props.setTriggerUpdate(target)}
      />

      <CommonButton onClick={props.onOptimizationStart} label="Otimizar" />
    </div>
  );
}
