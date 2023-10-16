import { eCreationState } from "../../models/enums/eCreationState";
import { ConstantRegion } from "../../models/project/constantRegion.model";
import { Dimensions } from "../../models/project/dimensions.model";
import { Force } from "../../models/project/force.model";
import { Position } from "../../models/project/position.model";
import { Support } from "../../models/project/support.model";

export class BoundaryConditionCreator {
  forces: Force[];
  supports: Support[];
  constantRegions: ConstantRegion[];

  constructor(
    forces: Force[],
    supports: Support[],
    constantRegions: ConstantRegion[]
  ) {
    this.forces = forces;
    this.supports = supports;
    this.constantRegions = constantRegions;
  }

  create(creationPosition: Position, creationState: eCreationState) {
    switch (creationState) {
      case eCreationState.FORCE:
        this.forces.push(
          new Force(
            -1,
            1,
            creationPosition,
            undefined,
            (this.forces[this.forces.length - 1]?.id ?? -1) + 1
          )
        );
        break;
      case eCreationState.FIXED_SUPPORT:
        this.supports.push(
          new Support(
            creationPosition,
            1,
            undefined,
            (this.supports[this.supports.length - 1]?.id ?? -1) + 1
          )
        );
        break;
      case eCreationState.MOBILE_SUPPORT:
        this.supports.push(
          new Support(
            creationPosition,
            0,
            undefined,
            (this.supports[this.supports.length - 1]?.id ?? -1) + 1
          )
        );
        break;
      case eCreationState.VOID:
        this.constantRegions.push(
          new ConstantRegion(
            creationPosition,
            new Dimensions(10, 10),
            0,
            (this.constantRegions[this.constantRegions.length - 1]?.id ?? -1) +
              1
          )
        );
        break;
      case eCreationState.MATERIAL:
        this.constantRegions.push(
          new ConstantRegion(
            creationPosition,
            new Dimensions(10, 10),
            1,
            (this.constantRegions[this.constantRegions.length - 1]?.id ?? -1) +
              1
          )
        );
        break;
      default:
        return;
    }
  }
}
