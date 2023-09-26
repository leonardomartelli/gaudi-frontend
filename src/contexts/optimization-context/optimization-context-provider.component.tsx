import React, { PropsWithChildren, useEffect, useState } from "react";
import { OptimizationContext } from "./optimization-context";
import OptimizationApi from "../../services/Optimization/apis/OptimizationApi";
import { Project, defaultProject } from "../../models/project/project.model";
import { OptimizationContextProviderContract } from "./optimization-context-provider.interface";
import { eCreationState } from "../../models/enums/eCreationState";

export function OptimizationContextProvider(
  props: PropsWithChildren<OptimizationContextProviderContract>
) {
  let [project, setProject] = useState(defaultProject);

  const updateProject = (newProject: Project) => {
    setProject(newProject);
    setDensitites(
      Array(
        project.domain.dimensions.width * project.domain.dimensions.height
      ).fill(1)
    );

    setWidth(newProject.domain.dimensions.width);
    setHeight(newProject.domain.dimensions.height);
  };

  let [densities, setDensitites] = useState<Array<number>>(
    Array(
      project.domain.dimensions.width * project.domain.dimensions.height
    ).fill(1)
  );

  let [triggerUpdate, setTriggerUpdate] = useState(0);

  let [optimizationIdentifier, setOptimizationIdentifier] = useState("");

  let [objective, setObjective] = useState(0);
  let [volume, setVolume] = useState(0);

  let [creationState, setCreationState] = useState<eCreationState>(
    eCreationState.NONE
  );

  const onOptimizationStart = async () => {
    setOptimizationIdentifier(await OptimizationApi.startOptimization(project));

    setDensitites(
      Array(
        project.domain.dimensions.width * project.domain.dimensions.height
      ).fill(1)
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
  }, [optimizationIdentifier, triggerUpdate]);

  const [height, setHeight] = useState(project.domain.dimensions.height);

  const configureHeight = (newHeight: number) => {
    setHeight(newHeight);
    project.domain.dimensions.height = newHeight;
  };

  const [width, setWidth] = useState(project.domain.dimensions.width);

  const configureWidth = (newWidth: number) => {
    setWidth(newWidth);
    project.domain.dimensions.width = newWidth;
  };

  const getInitialValue = () => {
    return {
      densities: densities,
      project: project,
      updateProject: updateProject,
      onOptimizationStart: onOptimizationStart,
      objective: objective,
      volume: volume,
      setTriggerUpdate: setTriggerUpdate,
      creationState: creationState,
      setCreationState: setCreationState,
      width: width,
      configureWidth: configureWidth,
      height: height,
      configureHeight: configureHeight,
    };
  };

  return (
    <OptimizationContext.Provider value={getInitialValue()}>
      {props.children}
    </OptimizationContext.Provider>
  );
}
