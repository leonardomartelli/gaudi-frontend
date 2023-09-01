import { IconContract } from "../components.interface";

export function MobileSupportIcon(props: IconContract) {
  return (
    <svg
      width={props.size ?? 65}
      height={props.size ?? 65}
      viewBox="0 0 65 65"
      fill="none"
    >
      <path
        d="M28.6029 9.75C30.3349 6.75 34.6651 6.75 36.3971 9.75L54.1506 40.5C55.8827 43.5 53.7176 47.25 50.2535 47.25L14.7465 47.25C11.2824 47.25 9.11731 43.5 10.8494 40.5L28.6029 9.75Z"
        stroke={props.style?.color}
        stroke-width="3"
      />
      <circle
        cx="47"
        cy="55"
        r="4.5"
        stroke={props.style?.color}
        stroke-width="3"
      />
      <circle
        cx="17"
        cy="55"
        r="4.5"
        stroke={props.style?.color}
        stroke-width="3"
      />
      <circle
        cx="32"
        cy="55"
        r="4.5"
        stroke={props.style?.color}
        stroke-width="3"
      />
    </svg>
  );
}
