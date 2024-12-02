import {GASES} from '@constants';

/**
 * Converts a value from one unit to another for a specified gas.
 *
 * @param {Object} params - The conversion parameters.
 * @param {string|number} params.input - The value to be converted.
 * @param {string} params.from - The unit to convert from.
 * @param {string} params.to - The unit to convert to.
 * @param {string} params.gas - The gas type (e.g., 'n', 'co2').
 * @returns {string|undefined} The converted value as a string, or undefined if conversion is not possible.
 */
export function converter({input, from, to, gas}) {
  const inputNo = Number(input);
  if (isNaN(inputNo)) {
    console.warn('Invalid input: must be a number');
    return;
  }

  if (from === to) {
    return inputNo.toString();
  }

  const gasData = GASES[gas];
  if (!gasData) {
    console.warn(`Invalid gas type: ${gas}`);
    return;
  }

  const conversionRates = gasData.conversionRates[from];
  if (!conversionRates || isNaN(conversionRates[to])) {
    console.warn(
      `Conversion not supported from ${from} to ${to} for gas ${gas}`,
    );
    return;
  }

  const conversionFactor = Number(conversionRates[to]);
  const result = inputNo * conversionFactor;
  return result.toString();
}

//FIXME: Large no issue
export function formatLargeNumber(num) {
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

export function getAllGases() {
  return Object.values(GASES).map(gas => ({name: gas.name, unit: gas.unit}));
}
