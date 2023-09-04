import { IconContract } from "../components.interface";

export function MobileSupportIcon(props: IconContract) {
  return (
    <svg width="49" height="56" viewBox="0 0 49 56" fill="none">
      <path
        d="M28.3971 3.75L46.1506 34.5C47.8827 37.5 45.7176 41.25 42.2535 41.25L6.74648 41.25C3.28238 41.25 1.11731 37.5 2.84936 34.5L20.6029 3.75C22.3349 0.750001 26.6651 0.75 28.3971 3.75Z"
        stroke={props.style?.color}
        strokeWidth="3"
      />
      <circle
        cx="39"
        cy="50"
        r="4.5"
        stroke={props.style?.color}
        strokeWidth="3"
      />
      <circle
        cx="9"
        cy="50"
        r="4.5"
        stroke={props.style?.color}
        strokeWidth="3"
      />
      <circle
        cx="24"
        cy="50"
        r="4.5"
        stroke={props.style?.color}
        strokeWidth="3"
      />
    </svg>
  );
}
