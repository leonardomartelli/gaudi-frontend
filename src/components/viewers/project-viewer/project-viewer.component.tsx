import React, { useContext, useEffect, useState } from "react";
import { ProjectConfigurator } from "../../configurators/project-configurator/project-configurator.component";
import { DesignVariablesViewer } from "../design-variables-viewer/design-variables-viewer.component";
import styles from "./project-viewer.module.scss";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";

export function ProjectViewer() {
  let context = useContext(OptimizationContext);
  return (
    <div className={styles.project}>
      <ProjectConfigurator />
      <DesignVariablesViewer
        objective={context.objective}
        volume={context.volume}
      />
    </div>
  );
}
