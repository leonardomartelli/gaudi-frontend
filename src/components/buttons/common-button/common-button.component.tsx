import React from "react";
import { CommonButtonContract } from "./common-button.interface";

export function CommonButton(props: CommonButtonContract) {
  return (
    <button onClick={props.onClick}>
      <img src={props.icon} />
      {props.label}
    </button>
  );
}
