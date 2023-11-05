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

export type CpRow<T = any> = {
  [K in keyof T]: CpValue;
};

export type CpDataset = CpRow[];

export abstract class CpDownloader {
  abstract downloadCsv(filename?: string): void;

  abstract downloadTxt(filename?: string): void;
}
