import { CommonComponentContract } from "../../components.interface";

export interface CommonButtonContract extends CommonComponentContract {
  isSelected?: () => boolean;
  label?: string;
  size?: number;
  icon?: React.ComponentType<any>;
  iconColor?: string;
  onClick: () => void;
}
