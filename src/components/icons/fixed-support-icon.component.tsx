import { IconContract } from "../components.interface";

export function FixedSupportIcon(props: IconContract) {
  return (
    <svg
      width={props.size ?? 59}
      height={props.size ?? 59}
      viewBox="0 0 59 59"
      fill="none"
    >
      <path
        d="M55.25 28.6029C58.25 30.3349 58.25 34.6651 55.25 36.3971L24.5 54.1506C21.5 55.8827 17.75 53.7176 17.75 50.2535L17.75 14.7465C17.75 11.2824 21.5 9.11731 24.5 10.8494L55.25 28.6029Z"
        stroke={props.style?.color}
        stroke-width="3"
      />
      <path
        d="M16.6667 16L7.64706 20.6759"
        stroke={props.style?.color}
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M16.6667 31.344L7.64706 36.0199"
        stroke={props.style?.color}
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M16.6667 46.6879L7.64706 51.3638"
        stroke={props.style?.color}
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
}
