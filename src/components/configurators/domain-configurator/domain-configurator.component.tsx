import { useContext } from "react";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import { InputField } from "../../input/input-field/input-field.component";
import styles from "./domain-configurator.module.scss";
import { CommonSlider } from "../../input/common-slider/common-slider.component";
import { DomainConfiguratorContract } from "./domain-configurator.interface";

export function DomainConfigurator(props: DomainConfiguratorContract) {
  const optimizationContext = useContext(OptimizationContext);

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
            value={optimizationContext.penalization}
            changeValue={optimizationContext.configurePenalization}
            label="Penalização"
          />
        </div>
        <div className={styles.configurator}>
          <InputField
            value={optimizationContext.materialDensity}
            changeValue={optimizationContext.configureMaterialDensity}
            label="Densidade do Material"
            step={0.1}
          />
          <InputField
            value={optimizationContext.materialElasticity}
            changeValue={optimizationContext.configureMaterialElasticity}
            label="Elasticidade do Material"
            step={0.1}
          />
          <InputField
            value={optimizationContext.filterRadius}
            changeValue={optimizationContext.configureFilterRadius}
            label="Raio da Filtragem"
            step={0.1}
          />
        </div>
      </div>
      <CommonSlider
        value={optimizationContext.volumeFraction}
        setValue={optimizationContext.configureVolumeFraction}
      />
    </div>
  );
}
