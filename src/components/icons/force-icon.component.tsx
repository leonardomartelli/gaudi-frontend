import { IconContract } from "../components.interface";

export function ForceIcon(props: IconContract) {
  return (
    <svg width="16" height={props.size ?? 93} viewBox="0 0 16 93" fill="none">
      <path d="M8 93L0.205772 75H15.7942L8 93Z" fill={props.style?.color} />
      <rect
        x="10"
        y="75"
        width="4"
        height="26"
        transform="rotate(-180 10 75)"
        fill={props.style?.color}
      />
      <rect
        x="10"
        y="75"
        width="4"
        height="26"
        transform="rotate(-180 10 75)"
        fill={props.style?.color}
      />
      <circle
        cx="8"
        cy="44"
        r="3"
        transform="rotate(-180 8 44)"
        fill={props.style?.color}
      />
    </svg>
  );
}
