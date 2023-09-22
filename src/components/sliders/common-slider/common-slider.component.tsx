import styles from "./common-slider.module.scss";

export function CommonSlider(props: {
  value: number;
  setValue(val: number): void;
}) {
  return (
    <div className={styles.container}>
      <label>{props.value}%</label> <br />
      <input
        type="range"
        className={styles.slider}
        value={props.value}
        onChange={(changeEvent) =>
          props.setValue(Number(changeEvent.target.value))
        }
      ></input>
    </div>
  );
}
