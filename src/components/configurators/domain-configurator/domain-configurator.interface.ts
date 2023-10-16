export interface DomainConfiguratorContract {
  width: number;
  height: number;
  configureWidth: (nW: number) => void;
  configureHeight: (nH: number) => void;
}
