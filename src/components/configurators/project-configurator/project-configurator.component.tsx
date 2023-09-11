import React, { useContext } from "react";
import { StructureViewer } from "../../viewers/structure-viewer/structure-viewer.component";
import styles from "./project-configurator.module.scss";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import { BoundaryConditionsViewer } from "../../viewers/boundary-conditions-viewer/boundary-conditions-viewer.component";
import { ConstantRegion } from "../../../models/project/constantRegion.model";
import { Project } from "../../../models/project/project.model";

export function ProjectConfigurator() {
  let optimizationContext = useContext(OptimizationContext);

  return (
    <div className={styles.project}>
      {/* <BoundaryConditionsViewer /> */}

      <StructureViewer
        width={optimizationContext.project.domain.dimensions.width}
        height={optimizationContext.project.domain.dimensions.height}
        densities={optimizationContext.densities}
        forces={optimizationContext.project.boundaryConditions.forces}
        supports={optimizationContext.project.boundaryConditions.supports}
        constantRegions={
          optimizationContext.project.boundaryConditions.constantRegions
            ? optimizationContext.project.boundaryConditions.constantRegions
            : Array<ConstantRegion>()
        }
        triggerUpdate={(target: number) =>
          optimizationContext.setTriggerUpdate(target)
        }
      />
    </div>
  );
}
