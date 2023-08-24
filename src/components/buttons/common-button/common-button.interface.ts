import { CommonComponentContract } from "../../components.interface";

export interface CommonButtonContract extends CommonComponentContract {
  label?: string;
  icon?: string;
  onClick: () => void;
}
