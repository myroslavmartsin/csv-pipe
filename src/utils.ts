import { CpConfig, CpValue } from './types';
import { CpValidators } from './validators';

const SPECIFIC_VALUES: Set<Partial<CpValue>> = new Set([
  NaN,
  Infinity,
  null,
  undefined,
  true,
  false
]);

const SPECIFIC_VALUES_MAPPER: Map<CpValue, (c: Required<CpConfig>) => string> =
  new Map<CpValue, (c: Required<CpConfig>) => string>([
    [NaN, ({ NaNText }) => NaNText],
    [Infinity, ({ infinityText }) => infinityText],
    [null, ({ nullDisplay }) => nullDisplay],
    [undefined, ({ undefDisplay }) => undefDisplay],
    [true, ({ boolStyle }) => boolStyle.true],
    [false, ({ boolStyle }) => boolStyle.false]
  ]);

export class CpUtils {
  static addQuotes(value: any, config: Required<CpConfig>): string {
    return `${config.quote}${value}${config.quote}`;
  }

  static handleValue(value: CpValue, config: Required<CpConfig>): any {
    CpValidators.validateParentValue(value);

    if (this.isSpecificValue(value)) {
      return this.addQuotes(this.handleSpecificValue(value, config), config);
    }

    return this.addQuotes(this.handleCommonValue(value, config), config);
  }

  static getRandomFilename() {
    const now = new Date();
    const timestamp =
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0') +
      '_' +
      now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0');

    return `file_${timestamp}`;
  }

  private static isSpecificValue(value: CpValue): boolean {
    return SPECIFIC_VALUES.has(value);
  }

  private static handleCommonValue(
    value: CpValue,
    config: Required<CpConfig>
  ): string {
    if (value instanceof Array) {
      const stringifiedArray: string = value
        .map((_value: CpValue) => {
          CpValidators.validateChildValue(_value);

          if (this.isSpecificValue(_value)) {
            return this.handleSpecificValue(_value, config);
          }

          return this.handleCommonValue(_value, config);
        })
        .join(`${config.separator} `);

      return stringifiedArray;
    }

    return `${value}`;
  }

  private static handleSpecificValue(
    value: CpValue,
    config: Required<CpConfig>
  ): string | undefined {
    return SPECIFIC_VALUES_MAPPER.get(value)?.(config);
  }
}
