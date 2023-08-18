import { CommonComponentContract } from "../../components.interface";

export interface StructureViewerContract extends CommonComponentContract{
    densities: number[],
    width: number,
    height: number
}