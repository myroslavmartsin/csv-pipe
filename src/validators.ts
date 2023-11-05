import { WrongValueFormatError, createErrorMessage } from './errors';
import { CpValue } from './types';

const EXPECTED_CHILD_VALUE = 'String | Number | Boolean | Null | Undefined';

const EXPECTED_PARENT_VALUE = `Array<${EXPECTED_CHILD_VALUE}> | ${EXPECTED_CHILD_VALUE}`;

export class CpValidators {
  static validateParentValue(value: CpValue): void {
    this.validateIsObject(value);
  }

  static validateChildValue(value: CpValue): void {
    this.validateIsObject(value);

    if (value instanceof Array) {
      const message: string = createErrorMessage(
        'Nested arrays are not acceptable.',
        `[..., ${JSON.stringify(value)}, ...]`,
        `[${EXPECTED_CHILD_VALUE}]`
      );

      throw new WrongValueFormatError(message);
    }
  }

  private static validateIsObject(value: CpValue): void {
    if (value instanceof Object && !(value instanceof Array)) {
      const message: string = createErrorMessage(
        'Object is not acceptable as dataset entry value.',
        JSON.stringify(value),
        EXPECTED_PARENT_VALUE
      );

      throw new WrongValueFormatError(message);
    }
  }
}
