import { IconContract } from "../components.interface";

export function SeparatorIcon(props: IconContract) {
  return (
    <svg width="2" height={props.size ?? 75} viewBox="0 0 2 75" fill="none" style={props.style}>
      <path d="M1 0V74.5" stroke={props.style?.color} strokeWidth="2" />
    </svg>
  );
}
