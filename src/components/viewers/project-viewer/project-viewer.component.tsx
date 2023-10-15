import React, { useContext } from "react";
import { DesignVariablesViewer } from "../design-variables-viewer/design-variables-viewer.component";
import styles from "./project-viewer.module.scss";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import { ConstantRegion } from "../../../models/project/constantRegion.model";
import { StructureViewer } from "../structure-viewer/structure-viewer.component";
import { DomainConfigurator } from "../../configurators/domain-configurator/domain-configurator.component";

export function ProjectViewer() {
  let optimizationContext = useContext(OptimizationContext);

  if (
    optimizationContext.project.boundaryConditions.constantRegions === undefined
  )
    optimizationContext.project.boundaryConditions.constantRegions =
      new Array<ConstantRegion>();

  const removeCondition = (
    removeSpecificCondition: (id: number) => void,
    id: number
  ) => {
    removeSpecificCondition(id);
    optimizationContext.updateProject(optimizationContext.project);
  };

  return (
    <div className={styles.project}>
      <StructureViewer
        width={optimizationContext.width}
        height={optimizationContext.height}
        densities={optimizationContext.densities}
        forces={optimizationContext.project.boundaryConditions.forces}
        supports={optimizationContext.project.boundaryConditions.supports}
        constantRegions={
          optimizationContext.project.boundaryConditions.constantRegions
            ? optimizationContext.project.boundaryConditions.constantRegions
            : Array<ConstantRegion>()
        }
        creationState={optimizationContext.creationState}
        setCreationState={optimizationContext.setCreationState}
        triggerUpdate={(target: number) =>
          optimizationContext.setTriggerUpdate(target)
        }
        optimizationIdentifier={optimizationContext.optimizationIdentifier}
        removeSupport={(id: number) =>
          removeCondition(optimizationContext.removeSupport, id)
        }
        removeConstantRegion={(id: number) =>
          removeCondition(optimizationContext.removeConstantRegion, id)
        }
        removeForce={(id: number) =>
          removeCondition(optimizationContext.removeForce, id)
        }
      />

      <div className={styles.rightSide}>
        <div className={styles.half}>
          <DomainConfigurator
            width={optimizationContext.width}
            height={optimizationContext.height}
            configureWidth={optimizationContext.configureWidth}
            configureHeight={optimizationContext.configureHeight}
          />
        </div>

        <div className={styles.half}>
          <DesignVariablesViewer
            objective={optimizationContext.currentObjective}
            volume={optimizationContext.currentVolume}
            objectives={optimizationContext.objectives}
            volumes={optimizationContext.volumes}
          />
        </div>
      </div>
    </div>
  );
}
