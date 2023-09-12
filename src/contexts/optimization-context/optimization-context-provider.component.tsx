import React, { PropsWithChildren, useEffect, useState } from "react";
import { OptimizationContext } from "./optimization-context";
import OptimizationApi from "../../services/Optimization/apis/OptimizationApi";
import { Project, defaultProject } from "../../models/project/project.model";
import { OptimizationContextProviderContract } from "./optimization-context-provider.interface";
import { eCreationState } from "../../models/enums/eCreationState";
import { Position } from "../../models/project/position.model";
import { Force } from "../../models/project/force.model";
import { Support } from "../../models/project/support.model";
import { ConstantRegion } from "../../models/project/constantRegion.model";
import { Dimensions } from "../../models/project/dimensions.model";

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
  }, [triggerUpdate]);

  const createCondition = (position: Position) => {
    switch (creationState) {
      case eCreationState.FORCE:
        project.boundaryConditions.forces.push(new Force(-1, 1, position));
        break;
      case eCreationState.SUPPORT:
        project.boundaryConditions.supports.push(
          new Support(position, 0, undefined)
        );
        break;
      case eCreationState.VOID:
        if (project.boundaryConditions.constantRegions === undefined)
          project.boundaryConditions.constantRegions =
            new Array<ConstantRegion>();

        project.boundaryConditions.constantRegions.push(
          new ConstantRegion(position, new Dimensions(10, 10), 0)
        );
        break;
      case eCreationState.MATERIAL:
        if (project.boundaryConditions.constantRegions === undefined)
          project.boundaryConditions.constantRegions =
            new Array<ConstantRegion>();

        project.boundaryConditions.constantRegions.push(
          new ConstantRegion(position, new Dimensions(10, 10), 1)
        );
        break;
      default:
        break;
    }

    // setCreationState(eCreationState.NONE);
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
      createCondition: createCondition,
    };
  };

  return (
    <OptimizationContext.Provider value={getInitialValue()}>
      {props.children}
    </OptimizationContext.Provider>
  );
}
