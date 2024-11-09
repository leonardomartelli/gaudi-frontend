import { CommonSliderContract } from "./common-slider.interface";
import styles from "./common-slider.module.scss";

export function CommonSlider(props: CommonSliderContract) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Maximum Volume Fraction</label>
      <br />
      <input
        type="range"
        className={styles.slider}
        value={props.value}
        onChange={(changeEvent) =>
          props.setValue(Number(changeEvent.target.value))
        }
      />
      <br />
      <label className={styles.volume}>{props.value}%</label>
    </div>
  );
}
