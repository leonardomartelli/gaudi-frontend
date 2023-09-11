import React, { useContext } from "react";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import { ForcesViewer } from "../forces-viewer/forces-viewer.component";

export function BoundaryConditionsViewer() {
  let context = useContext(OptimizationContext);

  return (
    <ForcesViewer
      forces={context.project.boundaryConditions.forces}
      width={context.project.domain.dimensions.width}
      height={context.project.domain.dimensions.height}
    />
  );
}
