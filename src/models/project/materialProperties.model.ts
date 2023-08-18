export class MaterialProperties {
  elasticity: number;
  density: number;
  flow: number;

  constructor(elasticity: number, density: number, flow: number) {
    this.elasticity = elasticity;
    this.density = density;
    this.flow = flow;
  }
}
