import { CommonButton } from "../../buttons/common-button/common-button.component";
import React, { useContext, useRef } from "react";
import styles from "./project-toolbar.module.scss";
import { ArrowDownIcon } from "../../icons/arrow-down-icon.component";
import constants from "../../../assets/constants";
import { SeparatorIcon } from "../../icons/separator-icon.component";
import { MobileSupportIcon } from "../../icons/mobile-support-icon.component";
import { FixedSupportIcon } from "../../icons/fixed-support-icon.component";
import { ForceIcon } from "../../icons/force-icon.component";
import { ArrowUpIcon } from "../../icons/arrow-up-icon.component";
import { FileSelection } from "../../misc/file-selector/file-selection.component";
import { VoidConstantRegionIcon } from "../../icons/void-constant-region-icon.component";
import { MaterialConstanRegionIcon } from "../../icons/material-constant-region-icon.component";
import { StartIcon } from "../../icons/start-icon.component";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import { eCreationState } from "../../../models/enums/eCreationState";
import { eAppState } from "../../../models/enums/eAppState";

export function ProjectToolBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  let context = useContext(OptimizationContext);

  const onClick = () => {
    context.setAppState(eAppState.LOADING_PROJECT);
    inputRef.current!.click();
    context.setAppState(eAppState.NONE);
  };

  const exportProject = () => {
    context.setAppState(eAppState.DOWNLOADING_PROJECT);
    download(JSON.stringify(context.project), `project.json`, "text/plain");
    context.setAppState(eAppState.NONE);
  };

  const onFileLoaded = async (file: File) => {
    const project = JSON.parse(await file.text());

    context.updateProject(project);

    context.configureVolumeFraction(project.domain.volumeFraction * 100);

    context.setAppState(eAppState.NONE);
  };

  const download = (content: string, fileName: string, contentType: string) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  return (
    <div className={styles.toolbar}>
      <FileSelection inputReference={inputRef} onFileSelection={onFileLoaded} />

      <CommonButton
        icon={ArrowUpIcon}
        iconColor={constants.ALICE_BLUE}
        label="Carregar Projeto"
        onClick={onClick}
        isSelected={() => context.appState === eAppState.LOADING_PROJECT}
      />

      <CommonButton
        icon={ArrowDownIcon}
        iconColor={constants.ALICE_BLUE}
        label="Salvar Projeto"
        onClick={exportProject}
        isSelected={() => context.appState === eAppState.DOWNLOADING_PROJECT}
      />

      <SeparatorIcon
        style={{
          color: constants.ALICE_BLUE,
          alignSelf: "center",
          padding: "3%",
        }}
      />

      <CommonButton
        icon={FixedSupportIcon}
        iconColor={constants.ALICE_BLUE}
        label="Criar Suporte Fixo"
        onClick={() => {
          context.setCreationState(eCreationState.FIXED_SUPPORT);
        }}
        isSelected={() =>
          context.creationState === eCreationState.FIXED_SUPPORT
        }
      />

      <CommonButton
        icon={MobileSupportIcon}
        iconColor={constants.ALICE_BLUE}
        label="Criar Suporte Móvel"
        onClick={() => {
          context.setCreationState(eCreationState.MOBILE_SUPPORT);
        }}
        isSelected={() =>
          context.creationState === eCreationState.MOBILE_SUPPORT
        }
      />

      <CommonButton
        icon={ForceIcon}
        iconColor={constants.ALICE_BLUE}
        label="Criar Força"
        onClick={() => {
          context.setCreationState(eCreationState.FORCE);
        }}
        isSelected={() => context.creationState === eCreationState.FORCE}
      />
      <CommonButton
        icon={VoidConstantRegionIcon}
        iconColor={constants.ALICE_BLUE}
        label="Criar Vazio Constante"
        onClick={() => {
          context.setCreationState(eCreationState.VOID);
        }}
        isSelected={() => context.creationState === eCreationState.VOID}
      />
      <CommonButton
        icon={MaterialConstanRegionIcon}
        iconColor={constants.ALICE_BLUE}
        label="Criar Material Constante"
        onClick={() => {
          context.setCreationState(eCreationState.MATERIAL);
        }}
        isSelected={() => context.creationState === eCreationState.MATERIAL}
      />

      <SeparatorIcon
        style={{
          color: constants.ALICE_BLUE,
          alignSelf: "center",
          padding: "3%",
        }}
      />

      <CommonButton
        icon={StartIcon}
        iconColor={constants.ALICE_BLUE}
        label="Iniciar Otimização"
        onClick={context.onOptimizationStart}
        isSelected={() =>
          context.appState === eAppState.INITIALIZING_OPTIMIZATION
        }
      />
    </div>
  );
}
