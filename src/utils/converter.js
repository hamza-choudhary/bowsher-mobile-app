import {nitrogenConversionsDirect} from '@constants';

export function converter({input, from, to}) {
  const inputNo = Number(input);
  if (isNaN(inputNo)) {
    //FIXME: hanlde toast
    throw new Error('Input must be a valid number');
  }

  if (from === to) {
    return inputNo.toString();
  }

  const fromConversions = nitrogenConversionsDirect[from];
  if (!fromConversions || !fromConversions[to]) {
    //FIXME: handle toast
    throw new Error(`Unable to convert from ${from} to ${to}`);
  }
  const result = inputNo * fromConversions[to];
  return result.toString();
}
