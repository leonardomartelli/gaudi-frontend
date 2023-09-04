import { IconContract } from "../components.interface";

export function MaterialPropertiesIcon(props: IconContract) {
  return (
    <svg width="69" height="55" viewBox="0 0 69 55" fill="none">
      <rect
        y="2.61905"
        width="68.0952"
        height="5.2381"
        rx="2"
        fill={props.style?.color}
      />
      <circle cx="14.4048" cy="5.2381" r="5.2381" fill={props.style?.color} />
      <rect
        y="47.1429"
        width="68.0952"
        height="5.2381"
        rx="2"
        fill={props.style?.color}
      />
      <circle cx="34.0476" cy="49.7619" r="5.2381" fill={props.style?.color} />
      <rect
        y="23.5714"
        width="68.0952"
        height="5.2381"
        rx="2"
        fill={props.style?.color}
      />
      <circle cx="56.3095" cy="26.1905" r="5.2381" fill={props.style?.color} />
    </svg>
  );
}
