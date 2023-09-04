import { CommonComponentContract } from "../../components.interface";

export interface CommonButtonContract extends CommonComponentContract {
  label?: string;
  size?: number;
  icon?: React.ComponentType<any>;
  iconColor?: string;
  onClick: () => void;
}
