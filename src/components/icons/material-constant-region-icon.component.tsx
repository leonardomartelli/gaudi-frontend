import { IconContract } from "../components.interface";

export function ForceIcon(props: IconContract) {
  return (
    <svg width="41" height="41" viewBox="0 0 41 41" fill="none">
      <path
        d="M1 1V40H16.7164V27.5417H27.7761V15.2297H40V1H1Z"
        fill={props.style?.color}
        stroke={props.style?.color}
        stroke-linejoin="round"
      />
    </svg>
  );
}
