import { CP_DEFAULT_CONFIG } from './config';
import {
  CpConfig,
  CpValue,
  CpDataset,
  CpRow,
  CpGenerationResult
} from './types';
import { CpUtils } from './utils';

export class CsvPipe {
  private _config: Required<CpConfig> = CP_DEFAULT_CONFIG;

  constructor(config: CpConfig) {
    this._config = { ...this._config, ...config };
  }

  public generate(dataset: CpDataset): CpGenerationResult {
    const rows: string[] = [];

    const _config: Required<CpConfig> = this._config;

    dataset.forEach((data: CpRow) => {
      const row: string[] = [];

      Object.values(data).forEach((value: CpValue) => {
        const sValue: string = CpUtils.handleValue(value, _config);

        row.push(sValue);
      });

      rows.push(row.join(_config.separator));
    });

    let csvPayload: string = '';

    if (_config.showHeaders) {
      const headers: string = this.getHeaders(dataset[0] || []);

      csvPayload = `${headers}${_config.newLine}`;
    }

    const _sRows: string = rows.join(_config.newLine);

    csvPayload = `${csvPayload}${_sRows}`;

    return new GenerationResult(this._config, csvPayload);
  }

  public get filename(): string {
    return this._config.filename;
  }

  private getHeaders(row: CpRow): string {
    if (this._config.autoHeaders) {
      return Object.keys(row).join(this._config.separator);
    }

    return this._config.headers.join(this._config.separator);
  }
}

class GenerationResult extends CpGenerationResult {
  constructor(
    public config: Required<CpConfig>,
    private _csvPayload: string
  ) {
    super();
  }

  public get charset(): string {
    return this.config.charset;
  }

  public get filename(): string {
    return this.config.filename;
  }

  public get data(): string {
    return this._csvPayload;
  }
}
