import React from "react";
import { useState } from "react";
import { CommonButton } from "../../components/buttons/common-button/common-button.component";
import { StructureViewer } from "../../components/viewers/structure-viewer/structure-viewer.component";
import OptimizationApi from "../../services/Optimization/apis/OptimizationApi";

export function GaudiMain() {

  
  let [densities, setDensitites] = useState(Array<number>())

  return (
    <div>
      <StructureViewer
        width={project.domain.dimensions.width}
        height={project.domain.dimensions.height}
        densities={densities}
      />
    </div>
  );
}

const project = {
  domain: {
    materialProperties: {
      elasticity: 0.3,
      density: 1,
      flow: 0.3,
    },
    dimensions: {
      width: 120,
      height: 40,
    },
    volumeFraction: 0.4,
  },
  boundaryConditions: {
    supports: [
      {
        orientation: 1,
        position: {
          x: 0,
          y: 40,
        },
        type: 1,
      },
      {
        orientation: 1,
        position: {
          x: 120,
          y: 40,
        },
        type: 1,
      },
    ],
    forces: [
      {
        load: -1,
        orientation: 1,
        position: {
          x: 25,
          y: 0,
        },
      },
    ],
    constantRegions: [
      {
        position: {
          x: 0,
          y: 60,
        },
        dimensions: {
          width: 600,
          height: 120,
        },
        type: 1,
      },
    ],
  },
  penalization: 3,
  filterIndex: 5.4,
};
