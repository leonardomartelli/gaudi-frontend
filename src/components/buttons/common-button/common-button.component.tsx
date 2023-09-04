import React from "react";
import { CommonButtonContract } from "./common-button.interface";
import styles from "./common-button.module.scss";

export function CommonButton(props: CommonButtonContract) {
  let iconStyle = {
    size: props.size,
    style: { color: props.iconColor },
  };

  return (
    <button onClick={props.onClick} className={styles.button}>
      <div className={styles.icon}>
        {props.icon && <props.icon {...iconStyle} />}
      </div>

      <label className={styles.label}>{props.label}</label>
    </button>
  );
}
