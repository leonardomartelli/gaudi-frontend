import { useContext, useState } from "react";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import { InputField } from "../../input/input-field/input-field.component";
import styles from "./domain-configurator.module.scss";
import { CommonSlider } from "../../input/common-slider/common-slider.component";

export function DomainConfigurator(props: {
  width: number;
  height: number;
  configureWidth: (nW: number) => void;
  configureHeight: (nH: number) => void;
}) {
  const optimizationContext = useContext(OptimizationContext);

  const [penalization, setPenalization] = useState(
    optimizationContext.project.penalization
  );

  const changePenalization = (newPenalization: number) => {
    setPenalization(newPenalization);
    optimizationContext.project.penalization = newPenalization;
  };

  const [filterRadius, setFilterRadius] = useState(
    optimizationContext.project.filterIndex
  );

  const changeFilterRadius = (newFilterRadius: number) => {
    setFilterRadius(newFilterRadius);
    optimizationContext.project.filterIndex = newFilterRadius;
  };

  const [elasticity, setElasticity] = useState(
    optimizationContext.project.domain.materialProperties.elasticity
  );

  const changeElasticity = (newElasticity: number) => {
    setElasticity(newElasticity);
    optimizationContext.project.domain.materialProperties.elasticity =
      newElasticity;
  };

  const [density, setDensity] = useState(
    optimizationContext.project.domain.materialProperties.density
  );
  const changeDensity = (newDensity: number) => {
    setDensity(newDensity);
    optimizationContext.project.domain.materialProperties.density = newDensity;
  };

  return (
    <div className={styles.completeConfiguration}>
      <div className={styles.configurationFields}>
        <div className={styles.configurator}>
          <InputField
            value={props.width}
            changeValue={props.configureWidth}
            label="Largura"
          />
          <InputField
            value={props.height}
            changeValue={props.configureHeight}
            label="Altura"
          />
          <InputField
            value={penalization}
            changeValue={changePenalization}
            label="Penalização"
          />
        </div>
        <div className={styles.configurator}>
          <InputField
            value={density}
            changeValue={changeDensity}
            label="Densidade do Material"
          />
          <InputField
            value={elasticity}
            changeValue={changeElasticity}
            label="Elasticidade do Material"
          />
          <InputField
            value={filterRadius}
            changeValue={changeFilterRadius}
            label="Raio da Filtragem"
          />
        </div>
      </div>
      <CommonSlider
        value={optimizationContext.volumeFraction}
        setValue={optimizationContext.configureVolumeFraction}
      />
      ;
    </div>
  );
}
