import { CommonButton } from "../../buttons/common-button/common-button.component";
import React, { useContext, useRef, useState } from "react";
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
import { MaterialPropertiesIcon } from "../../icons/material-properties-icon.component";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import { eCreationState } from "../../../models/enums/eCreationState";
import { CommonSlider } from "../../sliders/common-slider/common-slider.component";

export function ProjectToolBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  let context = useContext(OptimizationContext);

  const onClick = () => {
    inputRef.current!.click();
  };

  const exportProject = () => {
    download(JSON.stringify(context.project), `project.json`, "text/plain");
  };

  const onFileLoaded = async (file: File) => {
    const project = JSON.parse(await file.text());

    context.updateProject(project);

    setVolFrac(project.domain.volumeFraction * 100);
  };

  let [volFrac, setVolFrac] = useState(
    context.project.domain.volumeFraction * 100
  );

  const setValue = (val: number) => {
    context.project.domain.volumeFraction = val / 100;
    setVolFrac(val);
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
      />

      <CommonButton
        icon={ArrowDownIcon}
        iconColor={constants.ALICE_BLUE}
        label="Salvar Projeto"
        onClick={exportProject}
      />

      <SeparatorIcon
        style={{
          color: constants.ALICE_BLUE,
          alignSelf: "center",
          padding: "3%",
        }}
      />

      <CommonButton
        icon={MobileSupportIcon}
        iconColor={constants.ALICE_BLUE}
        label="Criar Suporte Móvel"
        onClick={() => {}}
      />
      <CommonButton
        icon={FixedSupportIcon}
        iconColor={constants.ALICE_BLUE}
        label="Criar Suporte Fixo"
        onClick={() => {
          context.setCreationState(eCreationState.SUPPORT);
        }}
      />
      <CommonButton
        icon={ForceIcon}
        iconColor={constants.ALICE_BLUE}
        label="Criar Carga"
        onClick={() => {
          context.setCreationState(eCreationState.FORCE);
        }}
      />
      <CommonButton
        icon={VoidConstantRegionIcon}
        iconColor={constants.ALICE_BLUE}
        label="Criar Vazio Constante"
        onClick={() => {
          context.setCreationState(eCreationState.VOID);
        }}
      />
      <CommonButton
        icon={MaterialConstanRegionIcon}
        iconColor={constants.ALICE_BLUE}
        label="Criar Material Constante"
        onClick={() => {
          context.setCreationState(eCreationState.MATERIAL);
        }}
      />

      <SeparatorIcon
        style={{
          color: constants.ALICE_BLUE,
          alignSelf: "center",
          padding: "3%",
        }}
      />

      <CommonButton
        icon={MaterialPropertiesIcon}
        iconColor={constants.ALICE_BLUE}
        label="Editar Propriedades Materiais"
        onClick={() => {}}
      />

      <CommonSlider value={volFrac} setValue={setValue} />

      <CommonButton
        icon={StartIcon}
        iconColor={constants.ALICE_BLUE}
        label="Iniciar Otimização"
        onClick={context.onOptimizationStart}
      />
    </div>
  );
}
