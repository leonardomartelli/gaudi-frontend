import React, { useContext } from "react";
import { StructureViewer } from "../../viewers/structure-viewer/structure-viewer.component";
import styles from "./project-configurator.module.scss";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";

export function ProjectConfigurator() {
  let optimizationContext = useContext(OptimizationContext);

  return (
    <div className={styles.project}>
      <StructureViewer
        width={optimizationContext.project.domain.dimensions.width}
        height={optimizationContext.project.domain.dimensions.height}
        densities={optimizationContext.densities}
        triggerUpdate={(target) => optimizationContext.setTriggerUpdate(target)}
      />

      {/* {boundaryConditions viewer} */}
    </div>
  );
}
