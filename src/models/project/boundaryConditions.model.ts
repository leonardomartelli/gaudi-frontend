import { ConstantRegion } from "./constantRegion.model";
import { Force } from "./force.model";
import { Support } from "./support.model";

export class BoundaryConditions {
  supports: Support[];
  forces: Force[];
  constantRegions?: ConstantRegion[];

  constructor(
    supports: Support[],
    forces: Force[],
    constantRegions?: ConstantRegion[] | undefined
  ) {
    this.supports = supports;
    this.forces = forces;
    this.constantRegions = constantRegions;
  }
}
