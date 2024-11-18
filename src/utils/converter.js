import {nitrogenConversionsDirect} from '@constants';

export function converter({input, from, to}) {
  if (typeof input !== 'number' || isNaN(input)) {
    throw new Error('Input must be a valid number');
  }

  if (from === to) {
    return input;
  }

  const fromConversions = nitrogenConversionsDirect[from];
  if (!fromConversions || !fromConversions[to]) {
    throw new Error(`Unable to convert from ${from} to ${to}`);
  }

  return input * fromConversions[to];
}
