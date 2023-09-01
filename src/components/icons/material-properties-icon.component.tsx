import { IconContract } from "../components.interface";

export function MaterialPropertiesICon(props: IconContract) {
  return (
    <svg width="52" height="42" viewBox="0 0 52 42" fill="none">
      <rect y="2" width="52" height="4" rx="2" fill={props.style?.color} />

      <circle cx="11" cy="4" r="4" fill={props.style?.color} />

      <rect y="36" width="52" height="4" rx="2" fill={props.style?.color} />

      <circle cx="26" cy="38" r="4" fill={props.style?.color} />

      <rect y="18" width="52" height="4" rx="2" fill={props.style?.color} />

      <circle cx="43" cy="20" r="4" fill={props.style?.color} />
    </svg>
  );
}
