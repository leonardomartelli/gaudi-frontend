import React from "react";
import { CommonButtonContract } from "./common-button.interface";

export function CommonButton(props: CommonButtonContract) {
  const label = props.label;

  return <button title={label} onClick={props.onClick}></button>;
}
