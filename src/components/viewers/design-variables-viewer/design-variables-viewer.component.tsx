import { EvolutionViewer } from "../evolution-viewer/evolution-viewer.component";
import { DesignVariablesViewerContract } from "./design-variables-viewer.interface";
import styles from "./design-variables-viewer.module.scss";

export function DesignVariablesViewer(props: DesignVariablesViewerContract) {
  return (
    <div className={styles.container}>
      <div className={styles.variables}>
        <label className={styles.label}>
          Objective: {props.objective.toFixed(3)}
        </label>
        <label className={styles.label}>
          Volume: {props.volume.toFixed(3)}
        </label>
      </div>
      <EvolutionViewer objectives={props.objectives} volumes={props.volumes} />
    </div>
  );
}
