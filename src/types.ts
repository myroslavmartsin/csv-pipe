export interface CpConfig {
  quote?: string;
  filename?: string;
  headers?: string[];
  separator?: string;
  autoHeaders?: boolean;
  showHeaders?: boolean;
  infinityText?: string;
  nullDisplay?: string;
  undefDisplay?: string;
  boolStyle?: { true: string; false: string };
  newLine?: string;
  NaNText?: string;
  charset?: string;
}

type PrimitiveData = string | number | boolean | null | undefined;

export type CpValue = PrimitiveData[] | PrimitiveData;

export type CpRow<T = any> = Record<keyof T, CpValue>;

export type CpDataset<T = unknown> = CpRow<T>[];

export type CpFileType = 'csv' | 'txt';

export abstract class CpGenerationResult {
  public abstract get charset(): string;

  public abstract get filename(): string;

  public abstract get data(): string;
}
