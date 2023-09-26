import styles from "./input-field.module.scss";

export function InputField(props: {
  label: string;
  value: number;
  changeValue: (newVal: number) => void;
}) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}:</label>
      <input
        className={styles.input}
        type="number"
        value={props.value}
        onChange={(changeEvent) =>
          props.changeValue(Number(changeEvent.target.value))
        }
      />
    </div>
  );
}
