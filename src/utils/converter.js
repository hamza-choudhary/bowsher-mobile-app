import {nitrogenConversionsDirect} from '@constants';

export function converter({input, from, to}) {
  const inputNo = Number(input);
  if (isNaN(inputNo)) {
    //FIXME: hanlde toast
    return;
    // throw new Error('Input must be a valid number');
  }

  if (from === to) {
    return inputNo.toString();
  }

  const fromConversions = nitrogenConversionsDirect[from];
  if (!fromConversions || !fromConversions[to]) {
    return;
    //FIXME: handle toast
    // throw new Error(`Unable to convert from ${from} to ${to}`);
  }
  const result = inputNo * fromConversions[to];
  return (result);
}
//FIXME: Large no issue
function formatLargeNumber(num) {
  let numStr = String(num);
  if (numStr.includes('e')) {
    let [coefficient, exponent] = numStr.split('e');
    exponent = parseInt(exponent, 10);
    coefficient = coefficient.replace('.', '');
    if (exponent > 0) {
      numStr = coefficient.padEnd(exponent + 1, '0');
    } else {
      numStr = '0.' + '0'.repeat(Math.abs(exponent) - 1) + coefficient;
    }
  }

  numStr = numStr.replace(/\.?0+$/, '');
  return numStr;
}
