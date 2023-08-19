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
