import React from "react";
import { CommonButtonContract } from "./common-button.interface";
import styles from "./common-button.module.scss";

export function CommonButton(props: CommonButtonContract) {
  return (
    <button onClick={props.onClick} className={styles.button}>
      <img src={props.icon} />
      {props.label}
    </button>
  );
}
