import { IconContract } from "../components.interface";

export function StartIcon(props: IconContract) {
  return (
    <svg width="53" height="60" viewBox="0 0 53 60" fill="none">
      <path
        d="M49.25 33.8971L8.75 57.2798C5.75 59.0119 2 56.8468 2 53.3827L2 6.61731C2 3.15321 5.75 0.98815 8.75 2.7202L49.25 26.1029C52.25 27.8349 52.25 32.1651 49.25 33.8971Z"
        fill={props.style?.color}
        stroke={props.style?.color}
        strokeWidth="3"
      />
    </svg>
  );
}
