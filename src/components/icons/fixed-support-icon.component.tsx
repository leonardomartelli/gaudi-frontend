import { IconContract } from "../components.interface";

export function FixedSupportIcon(props: IconContract) {
  return (
    <svg width="49" height="55" viewBox="0 0 49 55" fill="none">
      <path
        d="M8 43L12.6278 53"
        stroke={props.style?.color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M23.1861 43L27.8139 53"
        stroke={props.style?.color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M38.3722 43L43 53"
        stroke={props.style?.color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M28.3971 3.75L46.1506 34.5C47.8827 37.5 45.7176 41.25 42.2535 41.25H6.74648C3.28238 41.25 1.11731 37.5 2.84936 34.5L20.6029 3.75C22.3349 0.750001 26.6651 0.75 28.3971 3.75Z"
        stroke={props.style?.color}
        strokeWidth="3"
      />
    </svg>
  );
}
