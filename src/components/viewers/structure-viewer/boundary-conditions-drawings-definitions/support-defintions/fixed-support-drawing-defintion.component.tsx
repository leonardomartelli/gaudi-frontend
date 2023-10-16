import constants from "../../../../../assets/constants";
import { BoundaryConditionsDrawingDefinitionsContract } from "../boundary-conditions-defintions.interface";

export function FixedSupportDrawingDefinition(
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
        d="m -16,43 4.6278,10"
        stroke={constants.HONOLULU_BLUE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M -0.8139,43 3.8139,53"
        stroke={constants.HONOLULU_BLUE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 14.3722,43 19,53"
        stroke={constants.HONOLULU_BLUE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 4.3971,3.75 22.1506,34.5 c 1.7321,3 -0.433,6.75 -3.8971,6.75 h -35.50702 c -3.4641,0 -5.62917,-3.75 -3.89712,-6.75 L -3.3971,3.75 c 1.732,-2.999999 6.0622,-3 7.7942,0 z"
        stroke={constants.HONOLULU_BLUE}
        strokeWidth="3"
      />
    </g>
  );
}
