export const TOASTER = {
  ERROR: 'Error',
  SUCCESS: 'Success',
  WARNING: 'Warning',
  INFO: 'Info',
};

//it should contain all units
export const UNITS = {
  kg: {unit: 'kg', name: 'Kilogram'},
  lb: {unit: 'lb', name: 'Pounds'},
  scf: {unit: 'scf', name: 'Cubic Feet'},
  nm3: {unit: 'nm3', name: 'Cubic Meter'},
  gal: {unit: 'gal', name: 'Gallons'},
  l: {unit: 'l', name: 'Liter'},
};

export const GASES = {
  n: {
    unit: 'n',
    name: 'Nitrogen',
    conversionRates: {
      lb: {kg: 0.4536, scf: 13.803, nm3: 0.3627, gal: 0.1481, l: 0.5606},
      kg: {lb: 2.2046, scf: 30.42, nm3: 0.7996, gal: 0.3262, l: 1.2349},
      scf: {lb: 0.0724, kg: 0.0329, nm3: 0.02628, gal: 0.01074, l: 0.04065},
      nm3: {lb: 2.7571, kg: 1.2506, scf: 38.0518, gal: 0.408, l: 1.5443},
      gal: {lb: 6.7522, kg: 3.0656, scf: 93.1099, nm3: 2.451, l: 3.785},
      l: {lb: 1.7838, kg: 0.8098, scf: 24.6002, nm3: 0.6475, gal: 0.2642},
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb]},
      {title: 'Gas', data: [UNITS.scf, UNITS.nm3]},
      {title: 'Liquid', data: [UNITS.gal, UNITS.l]},
    ],
  },
  co2: {
    unit: 'co2',
    name: 'Carbon Dioxide',
    conversionRates: {
      lb: {kg: 0.4536, scf: 13.803, nm3: 0.3627, gal: 0.1481, l: 0.5606},
      kg: {lb: 2.2046, scf: 30.42, nm3: 0.7996, gal: 0.3262, l: 1.2349},
      scf: {lb: 0.0724, kg: 0.0329, nm3: 0.02628, gal: 0.01074, l: 0.04065},
      nm3: {lb: 2.7571, kg: 1.2506, scf: 38.0518, gal: 0.408, l: 1.5443},
      gal: {lb: 6.7522, kg: 3.0656, scf: 93.1099, nm3: 2.451, l: 3.785},
      l: {lb: 1.7838, kg: 0.8098, scf: 24.6002, nm3: 0.6475, gal: 0.2642},
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb]},
      {title: 'Gas', data: [UNITS.scf, UNITS.nm3]},
      {title: 'Liquid', data: [UNITS.gal, UNITS.l]},
    ],
  },
  he: {
    unit: 'he',
    name: 'Helium',
    conversionRates: {
      lb: {kg: 0.4536, scf: 13.803, nm3: 0.3627, gal: 0.1481, l: 0.5606},
      kg: {lb: 2.2046, scf: 30.42, nm3: 0.7996, gal: 0.3262, l: 1.2349},
      scf: {lb: 0.0724, kg: 0.0329, nm3: 0.02628, gal: 0.01074, l: 0.04065},
      nm3: {lb: 2.7571, kg: 1.2506, scf: 38.0518, gal: 0.408, l: 1.5443},
      gal: {lb: 6.7522, kg: 3.0656, scf: 93.1099, nm3: 2.451, l: 3.785},
      l: {lb: 1.7838, kg: 0.8098, scf: 24.6002, nm3: 0.6475, gal: 0.2642},
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb]},
      {title: 'Gas', data: [UNITS.scf, UNITS.nm3]},
      {title: 'Liquid', data: [UNITS.gal, UNITS.l]},
    ],
  },
  h2: {
    unit: 'h2',
    name: 'Hydrogen',
    conversionRates: {
      lb: {kg: 0.4536, scf: 13.803, nm3: 0.3627, gal: 0.1481, l: 0.5606},
      kg: {lb: 2.2046, scf: 30.42, nm3: 0.7996, gal: 0.3262, l: 1.2349},
      scf: {lb: 0.0724, kg: 0.0329, nm3: 0.02628, gal: 0.01074, l: 0.04065},
      nm3: {lb: 2.7571, kg: 1.2506, scf: 38.0518, gal: 0.408, l: 1.5443},
      gal: {lb: 6.7522, kg: 3.0656, scf: 93.1099, nm3: 2.451, l: 3.785},
      l: {lb: 1.7838, kg: 0.8098, scf: 24.6002, nm3: 0.6475, gal: 0.2642},
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb]},
      {title: 'Gas', data: [UNITS.scf, UNITS.nm3]},
      {title: 'Liquid', data: [UNITS.gal, UNITS.l]},
    ],
  },
  o2: {
    unit: 'o2',
    name: 'Oxygen',
    conversionRates: {
      lb: {kg: 0.4536, scf: 13.803, nm3: 0.3627, gal: 0.1481, l: 0.5606},
      kg: {lb: 2.2046, scf: 30.42, nm3: 0.7996, gal: 0.3262, l: 1.2349},
      scf: {lb: 0.0724, kg: 0.0329, nm3: 0.02628, gal: 0.01074, l: 0.04065},
      nm3: {lb: 2.7571, kg: 1.2506, scf: 38.0518, gal: 0.408, l: 1.5443},
      gal: {lb: 6.7522, kg: 3.0656, scf: 93.1099, nm3: 2.451, l: 3.785},
      l: {lb: 1.7838, kg: 0.8098, scf: 24.6002, nm3: 0.6475, gal: 0.2642},
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb]},
      {title: 'Gas', data: [UNITS.scf, UNITS.nm3]},
      {title: 'Liquid', data: [UNITS.gal, UNITS.l]},
    ],
  },
  lng: {
    unit: 'lng',
    name: 'Liquefied Natural Gas',
    conversionRates: {
      lb: {kg: 0.4536, scf: 13.803, nm3: 0.3627, gal: 0.1481, l: 0.5606},
      kg: {lb: 2.2046, scf: 30.42, nm3: 0.7996, gal: 0.3262, l: 1.2349},
      scf: {lb: 0.0724, kg: 0.0329, nm3: 0.02628, gal: 0.01074, l: 0.04065},
      nm3: {lb: 2.7571, kg: 1.2506, scf: 38.0518, gal: 0.408, l: 1.5443},
      gal: {lb: 6.7522, kg: 3.0656, scf: 93.1099, nm3: 2.451, l: 3.785},
      l: {lb: 1.7838, kg: 0.8098, scf: 24.6002, nm3: 0.6475, gal: 0.2642},
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb]},
      {title: 'Gas', data: [UNITS.scf, UNITS.nm3]},
      {title: 'Liquid', data: [UNITS.gal, UNITS.l]},
    ],
  },
};
