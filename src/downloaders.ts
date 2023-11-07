import { CpFileType, CpGenerationResult } from './types';

const FILE_EXTENSION: { [key in CpFileType]: string } = {
  csv: '.csv',
  txt: '.txt'
};

const FILE_MIME_TYPE: { [key in CpFileType]: string } = {
  csv: 'text/csv',
  txt: 'text/plain'
};

export const cpDownload = (
  result: CpGenerationResult,
  fileType: CpFileType = 'csv'
): void => {
  const blob = new Blob([result.data], {
    type: `${FILE_MIME_TYPE[fileType]};charset=${result.charset}`
  });

  const aElement: HTMLElement = document.createElement('a');

  aElement.setAttribute('href', window.URL.createObjectURL(blob));

  const fName: string = `${result.filename}${FILE_EXTENSION[fileType]}`;

  aElement.setAttribute('download', fName);

  aElement.click();
};
