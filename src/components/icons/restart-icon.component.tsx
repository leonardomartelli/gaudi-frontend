import { IconContract } from "../components.interface";

export function RestartIcon(props: IconContract) {
  return (
    <svg width="49" height="57" viewBox="0 0 49 57" fill="none">
      <path
        d="M46.8696 33.0659C46.951 37.813 45.4559 42.4626 42.6011 46.3216C39.7458 50.1814 35.6814 53.0452 31.0093 54.4784C26.3369 55.9116 21.3132 55.835 16.6895 54.2603C12.0661 52.6857 8.09628 49.6999 5.36666 45.7557C2.6375 41.8123 1.29236 37.1199 1.526 32.3776C1.75966 27.6352 3.56012 23.0884 6.66608 19.4158C9.77259 15.7426 14.0197 13.14 18.778 12.0038C23.5366 10.8676 28.5445 11.2607 33.0531 13.1228"
        stroke={props.style?.color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.9553 23.049L33.0656 13.9387C33.8467 13.1577 33.8467 11.8914 33.0656 11.1103L23.9553 2"
        stroke={props.style?.color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
