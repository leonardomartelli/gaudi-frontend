import { useEffect, useState } from "react";
import React from "react";
import { StructureViewer } from "../../viewers/structure-viewer/structure-viewer.component";
import OptimizationApi from "../../../services/Optimization/apis/OptimizationApi";
import { Project } from "../../../models/project/project.model";
import { CommonButton } from "../../buttons/common-button/common-button.component";

export function ProjectConfigurator(props: { project: Project }) {
  let project = props.project;

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

      <CommonButton onClick={onOptimizationStart} label="Otimizar" />
    </div>
  );
}
