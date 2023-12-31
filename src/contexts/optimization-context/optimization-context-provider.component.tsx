import React, { PropsWithChildren, useEffect, useState } from "react";
import { OptimizationContext } from "./optimization-context";
import OptimizationApi from "../../services/Optimization/apis/OptimizationApi";
import { Project, defaultProject } from "../../models/project/project.model";
import { OptimizationContextProviderContract } from "./optimization-context-provider.interface";
import { eCreationState } from "../../models/enums/eCreationState";
import toast from "react-hot-toast";
import constants from "../../assets/constants";
import { eAppState } from "../../models/enums/eAppState";

export function OptimizationContextProvider(
  props: PropsWithChildren<OptimizationContextProviderContract>
) {
  let [project, setProject] = useState(defaultProject);

  const updateProject = (newProject: Project) => {
    setProject(newProject);
    resetDensities();

    setWidth(newProject.domain.dimensions.width);
    setHeight(newProject.domain.dimensions.height);

    setFilterRadius(newProject.filterRadius);
    setMaterialPoisson(newProject.domain.materialProperties.poisson);
    setMaterialYoung(newProject.domain.materialProperties.young);
    setPenalization(newProject.penalization);
  };

  let [densities, setDensitites] = useState<Array<number>>(
    Array(
      project.domain.dimensions.width * project.domain.dimensions.height
    ).fill(1)
  );

  const [optimizationIdentifier, setOptimizationIdentifier] = useState("");

  const [objective, setObjective] = useState(0);
  const [volume, setVolume] = useState(0);

  const [creationState, setCreationState] = useState<eCreationState>(
    eCreationState.NONE
  );

  const [appState, setAppState] = useState(eAppState.NONE);

  const [objectives, setObjectives] = useState<number[]>([]);
  const [volumes, setVolumes] = useState<number[]>([]);

  const onOptimizationStart = async () => {
    setAppState(eAppState.INITIALIZING_OPTIMIZATION);

    const validationResult = await OptimizationApi.startOptimization(project);

    setOptimizationIdentifier(validationResult.optimizationId ?? "");

    if (validationResult.validationResults)
      validationResult.validationResults.forEach((result: string) =>
        toast.error(result, {
          duration: 6000,
          style: {
            padding: "16px",
            color: constants.ALICE_BLUE,
            background: constants.POPPY,
            width: "30%",
          },
          iconTheme: {
            primary: constants.ALICE_BLUE,
            secondary: constants.POPPY,
          },
        })
      );

    setObjectives([]);
    setVolumes([]);
    setAppState(eAppState.NONE);
  };

  useEffect(() => {
    if (optimizationIdentifier === "") return;

    const fetchResult = async () => {
      let result = await OptimizationApi.getResult(optimizationIdentifier);

      if (result && !result.finished) {
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
  }, [objectives, optimizationIdentifier, volumes, densities]);

  const [height, setHeight] = useState(project.domain.dimensions.height);

  const configureHeight = (newHeight: number) => {
    setHeight(newHeight);
    project.domain.dimensions.height = newHeight;
    resetDensities();
  };

  const [width, setWidth] = useState(project.domain.dimensions.width);

  const configureWidth = (newWidth: number) => {
    setWidth(newWidth);
    project.domain.dimensions.width = newWidth;
    resetDensities();
  };

  let [volumeFraction, setVolumeFraction] = useState(
    project.domain.volumeFraction * 100
  );

  const configureVolumeFraction = (val: number) => {
    project.domain.volumeFraction = val / 100;
    setVolumeFraction(val);
  };

  const [materialYoung, setMaterialYoung] = useState(
    project.domain.materialProperties.young
  );

  const configureMaterialYoung = (val: number) => {
    project.domain.materialProperties.young = val;
    setMaterialYoung(val);
  };

  const [materialPoisson, setMaterialPoisson] = useState(
    project.domain.materialProperties.poisson
  );

  const configureMaterialPoisson = (val: number) => {
    project.domain.materialProperties.poisson = val;
    setMaterialPoisson(val);
  };

  const [filterRadius, setFilterRadius] = useState(project.filterRadius);

  const configureFilterRadius = (val: number) => {
    project.filterRadius = val;
    setFilterRadius(val);
  };

  const [penalization, setPenalization] = useState(project.penalization);

  const configurePenalization = (val: number) => {
    project.penalization = val;
    setPenalization(val);
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
      project: project,
      densities: densities,
      currentObjective: objective,
      currentVolume: volume,
      width: width,
      height: height,
      volumeFraction: volumeFraction,

      optimizationIdentifier: optimizationIdentifier,
      creationState: creationState,
      objectives: objectives,
      volumes: volumes,

      updateProject: updateProject,
      onOptimizationStart: onOptimizationStart,

      setCreationState: setCreationState,

      setAppState: setAppState,
      appState: appState,

      removeSupport: removeSupport,
      removeConstantRegion: removeConstantRegion,
      removeForce: removeForce,

      configureWidth: configureWidth,
      configureHeight: configureHeight,
      configureVolumeFraction: configureVolumeFraction,

      penalization: penalization,
      configurePenalization: configurePenalization,
      filterRadius: filterRadius,
      configureFilterRadius: configureFilterRadius,
      materialYoung: materialYoung,
      configureMaterialYoung: configureMaterialYoung,
      materialPoisson: materialPoisson,
      configureMaterialPoisson: configureMaterialPoisson,
    };
  };

  return (
    <OptimizationContext.Provider value={getInitialValue()}>
      {props.children}
    </OptimizationContext.Provider>
  );

  function resetDensities() {
    setDensitites(
      Array(
        project.domain.dimensions.width * project.domain.dimensions.height
      ).fill(1)
    );
  }
}
