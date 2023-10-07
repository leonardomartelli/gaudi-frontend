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

    if (constantRegions) {
      this.constantRegions = constantRegions;
      this.constantRegions.forEach((r, i, a) => (r.id = i));
    }

    this.supports.forEach((r, i, a) => (r.id = i));
    this.forces.forEach((r, i, a) => (r.id = i));
  }
}
