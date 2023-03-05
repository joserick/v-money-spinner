import { BigNumber as Utils } from 'v-money3';

type NumberParam = bigint | number | string;

export default class BigNumber extends Utils {
  constructor(number: NumberParam) {
    super(number);
  }

  operation(number: NumberParam | BigNumber, plusMinus: boolean){
    const numbers = this.adjustComparisonNumbers(number);
    const total = (plusMinus ? numbers[0] + numbers[1] : numbers[0] - numbers[1]).toString().split('')
    total.splice(-1*this.getDecimalPrecision(), 0, '.')
    this.setNumber(total.join(''))

    return this
  }

  minMax(plusMinus: boolean, step: number, maxMin: string | number | null) {
    if (maxMin) {
      if (this['operation'](step, plusMinus)
      [plusMinus ? 'lessThan' : 'biggerThan'](maxMin)) {
        return this
      } else {
        return maxMin
      }
    } else {
      return this['operation'](step, plusMinus)
    }
  }

  lessEqualThan(thatBigNumber: NumberParam | BigNumber) {
    const numbers = this.adjustComparisonNumbers(thatBigNumber);
    return numbers[0] <= numbers[1];
  }

  biggerEqualThan(thatBigNumber: NumberParam | BigNumber) {
    const numbers = this.adjustComparisonNumbers(thatBigNumber);
    return numbers[0] >= numbers[1];
  }
}
