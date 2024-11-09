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
            label="Width"
          />
          <InputField
            value={props.height}
            changeValue={props.configureHeight}
            label="Height"
          />
          <InputField
            value={optimizationContext.penalization}
            changeValue={optimizationContext.configurePenalization}
            label="Penalization"
          />
        </div>
        <div className={styles.configurator}>
          <InputField
            value={optimizationContext.materialYoung}
            changeValue={optimizationContext.configureMaterialYoung}
            label="Young Modulus"
            step={0.1}
          />
          <InputField
            value={optimizationContext.materialPoisson}
            changeValue={optimizationContext.configureMaterialPoisson}
            label="Poisson Coefficient"
            step={0.1}
          />
          <InputField
            value={optimizationContext.filterRadius}
            changeValue={optimizationContext.configureFilterRadius}
            label="Filter Radius"
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
