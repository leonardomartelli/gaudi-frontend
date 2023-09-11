import { DesignVariablesViewerContract } from "./design-variables-viewer.interface";
import styles from "./design-variables-viewer.module.scss";

export function DesignVariablesViewer(props: DesignVariablesViewerContract) {
  return (
    <div className={styles.variables}>
      Variáveis de Projeto <br />
      Objetivo: {props.objective.toFixed(3)}
      <br />
      Volume: {props.volume.toFixed(3)}
    </div>
  );
}
