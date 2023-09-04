import { IconContract } from "../components.interface";

export function ForceIcon(props: IconContract) {
  return (
    <svg width="16" height="55" viewBox="0 0 16 55" fill="none">
      <path d="M8 55L0.205772 37L15.7942 37L8 55Z" fill={props.style?.color} />
      <rect x="6" y="8" width="4" height="29" fill={props.style?.color} />
      <circle cx="8" cy="3" r="3" fill={props.style?.color} />
    </svg>
  );
}
