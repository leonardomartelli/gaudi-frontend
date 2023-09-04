import React, { PropsWithChildren, useEffect, useState } from "react";
import { OptimizationContext } from "./optimization-context";
import OptimizationApi from "../../services/Optimization/apis/OptimizationApi";
import { defaultProject } from "../../models/project/project.model";
import { OptimizationContextProviderContract } from "./optimization-context-provider.interface";

export function OptimizationContextProvider(
  props: PropsWithChildren<OptimizationContextProviderContract>
) {
  let [project, setProject] = useState(defaultProject);

  let [densities, setDensitites] = useState<Array<number>>(
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

  const getInitialValue = () => {
    return {
      densities: densities,
      project: project,
      updateProject: setProject,
      onOptimizationStart: onOptimizationStart,
      objective: objective,
      volume: volume,
      setTriggerUpdate: setTriggerUpdate,
    };
  };

  return (
    <OptimizationContext.Provider value={getInitialValue()}>
      {props.children}
    </OptimizationContext.Provider>
  );
}
