import { IconContract } from "../components.interface";

export function ForceIcon(props: IconContract) {
  return (
    <svg width="2" height="75" viewBox="0 0 2 75" fill="none">
      <path d="M1 0V74.5" stroke={props.style?.color} stroke-width="2" />
    </svg>
  );
}
