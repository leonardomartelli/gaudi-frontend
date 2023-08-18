import { CommonComponentContract } from "../../components.interface";

export interface CommonButtonContract extends CommonComponentContract{
    label?: string,
    onClick: () => void
}