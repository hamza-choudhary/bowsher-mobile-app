export const STORAGE = {CONVERSION_HISTORY : '@conversionHistory'};

export const TOASTER = {
  ERROR: 'Error',
  SUCCESS: 'Success',
  WARNING: 'Warning',
  INFO: 'Info',
};

//it should contain all units
export const UNITS = {
  //?weights
  kg: {unit: 'kg', name: 'Kilogram'},
  lb: {unit: 'lb', name: 'Pounds'},
  tonne: {unit: 'tonne', name: 'Metric Ton'},
  ton: {unit: 'ton', name: 'Short Ton - US'},
  //?liquid
  l: {unit: 'l', name: 'Liter'},
  gal: {unit: 'gal', name: 'Gallons - US'},
  //?gases
  m3: {unit: 'm3', name: 'Cubic Meter'},
  mmscf: {unit: 'MMscf', name: 'Million Standard Cubic Feet'},
  nm3: {unit: 'nm3', name: 'Normal Cubic Meter'},
  scf: {unit: 'scf', name: 'Standard Cubic Feet'},
};

export const GASES = {
  n: {
    unit: 'n',
    name: 'Nitrogen',
    conversionRates: {
      kg: {lb: 2.205, tonne: 0.001, ton: 0.0011,l: 1.23737, gal: 0.32691, m3: 0.862, mmscf: 0.00,  nm3: 0.79978, scf: 30.43478,},
      lb: {kg: 0.45351, tonne: 0.00045, ton: 0.0005,l: 0.56117, gal: 0.14826, m3: 0.391, mmscf: 0.00,  nm3: 0.36271, scf: 13.80262,},
      tonne: {kg: 1000, lb: 2205, ton: 1.1025,l: 1237.37374, gal: 326.90882, m3: 862.00, mmscf: 0.030,  nm3: 799.78237, scf: 30434.78261,},
      ton: {kg: 907.02948, lb: 2000, tonne: 0.90703,l: 1122.33446, gal: 296.51594, m3: 782.00, mmscf: 0.028,  nm3: 725.42619, scf: 27605.245,},
      l: {kg: 0.80816, lb: 1.782, tonne: 0.00081, ton: 0.00089, gal: 0.2642, m3: 0.697, mmscf: 0.00,  nm3: 0.64635, scf: 24.59627,},
      gal: {kg: 3.05896, lb:6.745 , tonne:0.00306 , ton:0.00337 ,l: 3.78507 , m3: 2.637, mmscf: 0.00,  nm3: 2.4465, scf: 93.09869,},
      m3: {kg:0.000000 , lb:0.000000 , tonne:0.000000 , ton:0.000000 ,l:0.000000 , gal:0.000000  , mmscf:0.000000 ,  nm3:0.000000 , scf:0.000000 ,},
      mmscf: {kg:0.0000000 , lb:0.0000000 , tonne:0.0000000 , ton:0.0000000 ,l:0.0000000 , gal:0.0000000 , m3:0.0000000 ,  nm3:0.0000000 , scf:0.0000000 ,},
      nm3: {kg: 1.25034, lb: 2.757, tonne: 0.00125, ton:0.00138 ,l: 1.54714, gal: 0.40875, m3:  0.0000, mmscf:  0.0000, scf: 38.05383,},
      scf: {kg: 0.03286, lb: 0.07245, tonne: 0.00003, ton: 0.00004,l: 0.04066, gal: 0.01074, m3: 0.0000, mmscf: 0.0000,  nm3: 0.02628, },
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb, UNITS.tonne, UNITS.ton]},
      {title: 'Gas', data: [UNITS.m3, UNITS.mmscf, UNITS.nm3, UNITS.scf]},
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
