import constants from "../../../../../assets/constants";
import { BoundaryConditionsDrawingDefinitionsContract } from "../boundary-conditions-defintions.interface";

export function MobileSupportDrawingDefinition(
  props: BoundaryConditionsDrawingDefinitionsContract
) {
  return (
    <g
      id={props.id}
      fill={constants.ALICE_BLUE}
      fillOpacity={0}
      transform={props.transform}
    >
      <path
        d="m -4.15913,3.7031329 c 1.732,-3.00000003 6.0622,-3.00000003 7.7942,0 l 17.7535,30.7500001 c 1.7321,3 -0.433,6.75 -3.8971,6.75 h -35.507 c -3.4641,0 -5.62919,-3.75 -3.8971,-6.75 z"
        stroke={constants.HONOLULU_BLUE}
        strokeWidth="3"
      />
      <circle
        cx="14.237968"
        cy="48.953133"
        r="4.5"
        stroke={constants.HONOLULU_BLUE}
        strokeWidth="3"
      />
      <circle
        cx="-15.76203"
        cy="48.953133"
        r="4.5"
        stroke={constants.HONOLULU_BLUE}
        strokeWidth="3"
      />
      <circle
        cx="-0.76202965"
        cy="48.953133"
        r="4.5"
        stroke={constants.HONOLULU_BLUE}
        strokeWidth="3"
      />
    </g>
  );
}
