export class ValidationResult {
  optimizationId: string;
  validationResults: string[];

  constructor(optimzationId?: string, validationResults?: string[]) {
    this.optimizationId = optimzationId ?? "";
    this.validationResults = validationResults ?? [];
  }
}
