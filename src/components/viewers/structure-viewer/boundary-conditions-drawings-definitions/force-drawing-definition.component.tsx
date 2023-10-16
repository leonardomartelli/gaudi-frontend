import constants from "../../../../assets/constants";
import { BoundaryConditionsDrawingDefinitionsContract } from "./boundary-conditions-defintions.interface";

export function ForceDrawingDefinition(
  props: BoundaryConditionsDrawingDefinitionsContract
) {
  return (
    <g id={props.id} transform={props.transform}>
      <path
        d="M 0.01549114,52 -7.7787369,34 h 15.588428 z"
        fill={constants.FROG_GREEN}
      />
      <rect
        x="-2.0154908"
        y="-34"
        width="4"
        height="26"
        transform="scale(-1)"
        fill={constants.FROG_GREEN}
      />
      <circle
        cx="-0.015491216"
        cy="-3"
        r="3"
        transform="scale(-1)"
        fill={constants.FROG_GREEN}
      />
    </g>
  );
}
