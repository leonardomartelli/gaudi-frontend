import React, { useEffect, useState } from "react";
import { ProjectConfigurator } from "../../configurators/project-configurator/project-configurator.component";
import { DesignVariablesViewer } from "../design-variables-viewer/design-variables-viewer.component";
import { Project } from "../../../models/project/project.model";
import OptimizationApi from "../../../services/Optimization/apis/OptimizationApi";
import styles from "./project-viewer.module.scss";

export function ProjectViewer(props: { project: Project }) {
  let project = props.project;

  let [densities, setDensitites] = useState(
    Array(
      project.domain.dimensions.width * project.domain.dimensions.height
    ).fill(0)
  );

  let [triggerUpdate, setTriggerUpdate] = useState(0);

  let [optimizationIdentifier, setOptimizationIdentifier] = useState("");

  let [objective, setObjective] = useState(0);
  let [volume, setVolume] = useState(0);

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
        setObjective(result.objective);
        setVolume(result.volume);
      } else {
        OptimizationApi.terminateOptimization(optimizationIdentifier);
      }
    };

    fetchResult().catch(console.error);
  }, [triggerUpdate]);

  return (
    <div className={styles.project}>
      <ProjectConfigurator
        setTriggerUpdate={(t) => setTriggerUpdate(t)}
        onOptimizationStart={onOptimizationStart}
        densities={densities}
        project={project}
      />
      <DesignVariablesViewer objective={objective} volume={volume} />
    </div>
  );
}
