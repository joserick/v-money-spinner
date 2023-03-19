import { BigNumber as Utils } from 'v-money3'

type NumberParam = bigint | number | string

export default class BigNumber extends Utils {
  // Performs the operation sum or subtraction
  operation (number: NumberParam | BigNumber, plusMinus: boolean): BigNumber {
    // Adjusts the numbers to have the same decimal precision
    const numbers = this.adjustComparisonNumbers(number)

    // Performs the operation
    this.number = (plusMinus ? numbers[0] + numbers[1] : numbers[0] - numbers[1])

    return this
  }

  // Performs the min-max operation
  minMax (plusMinus: boolean, step: number, maxMin: string | number | null): BigNumber | number | string {
    // Check if the maxMin parameter is not null
    if (maxMin != null) {
      // Check if the result of the operation is less or bigger than the given max or min
      if (this.operation(step, plusMinus)[plusMinus ? 'lessThan' : 'biggerThan'](maxMin)) {
        // Return the current object
        return this
      } else {
        // Return the maxMin parameter
        return maxMin
      }
    } else {
      // Return the result of the operation
      return this.operation(step, plusMinus)
    }
  }

  // Determines if it is less or equal than
  lessEqualThan (thatBigNumber: NumberParam | BigNumber): boolean {
    const numbers = this.adjustComparisonNumbers(thatBigNumber)
    return numbers[0] <= numbers[1]
  }

  // Determines if it is bigger or equal than
  biggerEqualThan (thatBigNumber: NumberParam | BigNumber): boolean {
    const numbers = this.adjustComparisonNumbers(thatBigNumber)
    return numbers[0] >= numbers[1]
  }
}
