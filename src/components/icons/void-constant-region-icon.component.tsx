import { IconContract } from "../components.interface";

export function VoidConstantRegionIcon(props: IconContract) {
  return (
    <svg
      width={props.size ?? 43}
      height={props.size ?? 43}
      viewBox="0 0 43 43"
      fill="none"
    >
      <path
        d="M2 2V41H17.7164V28.5417H28.7761V16.2297H41V2H2Z"
        stroke={props.style?.color}
        stroke-width="3"
        stroke-linejoin="round"
      />
    </svg>
  );
}
