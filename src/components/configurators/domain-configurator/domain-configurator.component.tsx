import { useContext, useState } from "react";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import { InputField } from "../../input/input-field/input-field.component";
import styles from "./domain-configurator.module.scss";

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

  return (
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
      <InputField
        value={filterRadius}
        changeValue={changeFilterRadius}
        label="Raio da Filtragem"
      />
    </div>
  );
}
