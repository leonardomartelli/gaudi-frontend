import { IconContract } from "../components.interface";

export function ArrowDownIcon(props: IconContract) {
  return (
    <svg width="44" height="55" viewBox="0 0 44 55" fill="none">
      <path
        d="M22.1915 27L22.1915 43.383"
        stroke={props.style?.color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30.383 37.5319L23.6057 44.3092C22.8247 45.0903 21.5584 45.0903 20.7773 44.3092L14 37.5319"
        stroke={props.style?.color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M22 2V18.7234C22 19.828 22.8954 20.7234 24 20.7234H40.7234"
        stroke={props.style?.color}
        strokeWidth="3"
      />
      <path
        d="M25.9536 3.43793L39.1907 19.011C40.0359 20.0054 40.5 21.2679 40.5 22.573V48C40.5 51.0376 38.0376 53.5 35 53.5H9C5.96244 53.5 3.5 51.0376 3.50001 48L3.50004 7C3.50004 3.96243 5.96247 1.5 9.00004 1.5H21.7629C23.3764 1.5 24.9086 2.20852 25.9536 3.43793Z"
        stroke={props.style?.color}
        strokeWidth="3"
      />
    </svg>
  );
}
