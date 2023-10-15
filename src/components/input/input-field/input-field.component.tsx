import { InputFieldContract } from "./input-field.interface";
import styles from "./input-field.module.scss";

export function InputField(props: InputFieldContract) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label> <br />
      <input
        className={styles.input}
        type="number"
        value={props.value}
        onChange={(changeEvent) =>
          props.changeValue(Number(changeEvent.target.value))
        }
        step={props.step}
      />
    </div>
  );
}
