import { Dimensions } from "./dimensions.model";
import { MaterialProperties } from "./materialProperties.model";

export class Domain {
  materialProperties: MaterialProperties;
  dimensions: Dimensions;
  volumeFraction: number;

  constructor(
    materialProperties: MaterialProperties,
    dimensions: Dimensions,
    volumeFraction: number
  ) {
    this.materialProperties = materialProperties;
    this.dimensions = dimensions;
    this.volumeFraction = volumeFraction;
  }
}
