export class Result {
  densities: number[];
  objective: number;
  volume: number;
  finished: boolean;

  constructor(
    densities: number[],
    objective: number,
    volume: number,
    finished: boolean
  ) {
    this.densities = densities;
    this.objective = objective;
    this.volume = volume;
    this.finished = finished;
  }
}
