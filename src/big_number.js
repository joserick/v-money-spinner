import Utils from 'v-money3/src/BigNumber';

export default class BigNumber extends Utils {
  constructor(number) {
    super(number);
  }

  add(addNumber) {
    const numbers = this.adjustComparisonNumbers(addNumber);
    this.number = numbers[0] + numbers[1];

    return this
  }

  subtract(subtractNumber) {
    const numbers = this.adjustComparisonNumbers(subtractNumber);
    this.number = numbers[0] - numbers[1];

    return this
  }

  minMax(plusMinus, number, thatBigNumber){
    if(thatBigNumber){
      if (this[plusMinus ? 'add' : 'subtract'](number)
        [plusMinus ? 'lessThan' : 'biggerThan'](thatBigNumber)) {
        return this
      }else{
        return thatBigNumber
      }
    }else{
      return this[plusMinus ? 'add' : 'subtract'](number)
    }
  }

  lessEqualThan(thatBigNumber) {
    const numbers = this.adjustComparisonNumbers(thatBigNumber);
    return numbers[0] <= numbers[1];
  }

  biggerEqualThan(thatBigNumber) {
    const numbers = this.adjustComparisonNumbers(thatBigNumber);
    return numbers[0] >= numbers[1];
  }
}
