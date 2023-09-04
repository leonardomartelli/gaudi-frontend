import { Domain } from "./domain.model";
import { BoundaryConditions } from "./boundaryConditions.model";

export class Project {
  domain: Domain;
  boundaryConditions: BoundaryConditions;
  penalization: number;
  filterIndex: number;

  constructor(
    domain: Domain,
    boundaryConditions: BoundaryConditions,
    penalization: number,
    filterIndex: number
  ) {
    this.domain = domain;
    this.boundaryConditions = boundaryConditions;
    this.penalization = penalization;
    this.filterIndex = filterIndex;
  }
}

export const defaultProject: Project = {
  domain: {
    materialProperties: {
      elasticity: 0.3,
      density: 1,
      flow: 0.3,
    },
    dimensions: {
      width: 120,
      height: 60,
    },
    volumeFraction: 0.4,
  },
  boundaryConditions: {
    supports: [
      {
        position: {
          x: 0,
          y: 0,
        },
        type: 1,
      },
      {
        position: {
          x: 0,
          y: 60,
        },
        type: 1,
      },
    ],
    forces: [
      {
        load: -1,
        orientation: 1,
        position: {
          x: 120,
          y: 30,
        },
      },
    ],
  },
  penalization: 3,
  filterIndex: 5.4,
};
