import React, { useEffect } from "react";
import { useState } from "react";
import { CommonButton } from "../../components/buttons/common-button/common-button.component";
import { StructureViewer } from "../../components/viewers/structure-viewer/structure-viewer.component";
import OptimizationApi from "../../services/Optimization/apis/OptimizationApi";
import { Project } from "../../models/project/project.model";

export function GaudiMain(props: any) {
  let [densities, setDensitites] = useState(
    Array(
      project.domain.dimensions.width * project.domain.dimensions.height
    ).fill(0)
  );

  let [triggerUpdate, setTriggerUpdate] = useState(0);

  let [optimizationIdentifier, setOptimizationIdentifier] = useState("");

  const onOptimizationStart = async () => {
    setOptimizationIdentifier(await OptimizationApi.startOptimization(project));

    setDensitites(
      Array(
        project.domain.dimensions.width * project.domain.dimensions.height
      ).fill(0.1)
    );
  };

  useEffect(() => {
    if (optimizationIdentifier === "") return;

    const fetchResult = async () => {
      let result = await OptimizationApi.getResult(optimizationIdentifier);

      if (!result.finished) {
        setDensitites(result.densities);
      }
    };

    fetchResult().catch(console.error);
  }, [triggerUpdate]);

  return (
    <div>
      <StructureViewer
        width={project.domain.dimensions.width}
        height={project.domain.dimensions.height}
        densities={densities}
        triggerUpdate={(target) => setTriggerUpdate(target)}
      />
      <button onClick={onOptimizationStart}> Otimizar </button>
    </div>
  );
}

const project: Project = {
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
