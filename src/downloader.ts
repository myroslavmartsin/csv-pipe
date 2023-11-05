import { CpConfig, CpDownloader } from './types';

enum FileType {
  CSV = 'text/csv',
  TXT = 'text/plain'
}

const FILE_EXTENSION = {
  [FileType.CSV]: '.csv',
  [FileType.TXT]: '.txt'
};

export class CsvDownloader extends CpDownloader {
  constructor(
    private _csvPayload: string,
    private _config: CpConfig
  ) {
    super();
  }

  downloadCsv(filename?: string): void {
    this.download(FileType.CSV, filename);
  }

  downloadTxt(filename?: string): void {
    this.download(FileType.TXT, filename);
  }

  private download(type: FileType, filename?: string): void {
    const blob = new Blob([this._csvPayload], {
      type: `${type};charset=${this._config.charset}`
    });

    const aElement: HTMLElement = document.createElement('a');

    aElement.setAttribute('href', window.URL.createObjectURL(blob));

    const fName: string = `${filename || this._config.filename}${
      FILE_EXTENSION[type]
    }`;

    aElement.setAttribute('download', fName);

    aElement.click();
  }
}
