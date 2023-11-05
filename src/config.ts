import { CpConfig } from './types';
import { CpUtils } from './utils';

export const CP_DEFAULT_CONFIG: Required<CpConfig> = {
  quote: '"',
  filename: CpUtils.getRandomFilename(),
  headers: [],
  separator: ',',
  autoHeaders: false,
  showHeaders: true,
  infinityText: 'Infinity',
  nullDisplay: 'null',
  undefDisplay: 'undefined',
  boolStyle: { true: 'TRUE', false: 'FALSE' },
  charset: 'utf8',
  newLine: '\r\n',
  NaNText: ''
};
