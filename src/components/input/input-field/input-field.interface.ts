export interface InputFieldContract {
  step?: number;
  label: string;
  value: number;
  changeValue: (newVal: number) => void;
}
