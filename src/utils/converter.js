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
  return formatResult(result);
}


function formatResult(value) {
  const MAX_DECIMALS = 6;
  // eslint-disable-next-line no-unused-vars
  const [_, decimalPart] = value.toString().split('.');
  if (decimalPart && decimalPart.length > MAX_DECIMALS) {
    return parseFloat(value.toFixed(MAX_DECIMALS)).toString();
  }
  return value.toString();
}

export function getAllGases() {
  return Object.values(GASES).map(gas => ({name: gas.name, unit: gas.unit}));
}
