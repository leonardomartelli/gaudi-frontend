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
      ).fill(project.domain.materialProperties.density)
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

  const [objectives, setObjectives] = useState<number[]>([]);
  const [volumes, setVolumes] = useState<number[]>([]);

  const onOptimizationStart = async () => {
    setOptimizationIdentifier(await OptimizationApi.startOptimization(project));

    setObjectives([]);
    setVolumes([]);
  };

  useEffect(() => {
    if (optimizationIdentifier === "") return;

    const fetchResult = async () => {
      let result = await OptimizationApi.getResult(optimizationIdentifier);

      if (!result.finished) {
        setDensitites(result.densities);
        setObjective(result.objective);
        setVolume(result.volume);
        objectives.push(result.objective);
        volumes.push(result.volume);
      } else {
        OptimizationApi.terminateOptimization(optimizationIdentifier);
        setOptimizationIdentifier("");
      }
    };

    fetchResult().catch(console.error);
  }, [objectives, optimizationIdentifier, triggerUpdate, volumes]);

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

  let [volumeFraction, setVolumeFraction] = useState(
    project.domain.volumeFraction * 100
  );

  const configureVolumeFraction = (val: number) => {
    project.domain.volumeFraction = val / 100;
    setVolumeFraction(val);
  };

  const removeSupport = (id: number) => {
    project.boundaryConditions.supports =
      project.boundaryConditions.supports.filter((sup) => sup.id !== id);
  };

  const removeForce = (id: number) => {
    project.boundaryConditions.forces =
      project.boundaryConditions.forces.filter((sup) => sup.id !== id);
  };

  const removeConstantRegion = (id: number) => {
    project.boundaryConditions.constantRegions =
      project.boundaryConditions.constantRegions?.filter(
        (sup) => sup.id !== id
      );
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
      volumeFraction: volumeFraction,
      configureVolumeFraction: configureVolumeFraction,
      objectives: objectives,
      volumes: volumes,
      optimizationIdentifier: optimizationIdentifier,
      removeSupport: removeSupport,
      removeConstantRegion: removeConstantRegion,
      removeForce: removeForce,
    };
  };

  return (
    <OptimizationContext.Provider value={getInitialValue()}>
      {props.children}
    </OptimizationContext.Provider>
  );
}
