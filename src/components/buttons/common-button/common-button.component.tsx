import React from "react";
import { CommonButtonContract } from "./common-button.interface";
import styles from "./common-button.module.scss";

export function CommonButton(props: CommonButtonContract) {
  let iconStyle = {
    size: props.size,
    style: { color: props.iconColor },
  };

  const _default = () => false;

  const isSelected = props.isSelected ?? _default;

  return (
    <button
      onClick={props.onClick}
      className={isSelected() ? styles.loading : styles.button}
    >
      <div className={styles.icon}>
        {props.icon && <props.icon {...iconStyle} />}
      </div>

      <label className={styles.label}>{props.label}</label>
    </button>
  );
}
