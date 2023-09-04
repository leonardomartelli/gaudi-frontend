import { IconContract } from "../components.interface";

export function MaterialConstanRegionIcon(props: IconContract) {
  return (
    <svg width="59" height="59" viewBox="0 0 59 59" fill="none">
      <path
        d="M2 2V57H24.1642V39.4306H39.7612V22.0676H57V2H2Z"
        fill={props.style?.color}
        stroke={props.style?.color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
