import { CP_DEFAULT_CONFIG } from './config';
import { CpConfig, CpValue, CpDataset, CpDownloader, CpRow } from './types';
import { CsvDownloader } from './downloader';
import { CpUtils } from './utils';

export class CsvPipe {
  private config: Required<CpConfig> = CP_DEFAULT_CONFIG;

  constructor(_config: CpConfig) {
    this.config = { ...this.config, ..._config };
  }

  public generate(dataset: CpDataset): CpDownloader {
    const rows: string[] = [];

    const _config: Required<CpConfig> = this.config;

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

    return new CsvDownloader(csvPayload, _config);
  }

  private getHeaders(row: CpRow): string {
    if (this.config.autoHeaders) {
      return Object.keys(row).join(this.config.separator);
    }

    return this.config.headers.join(this.config.separator);
  }
}
