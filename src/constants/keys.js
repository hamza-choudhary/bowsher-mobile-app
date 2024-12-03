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
  mmscf: {unit: 'mmscf', name: 'Million Standard Cubic Feet'},
  nm3: {unit: 'nm3', name: 'Normal Cubic Meter'},
  scf: {unit: 'scf', name: 'Standard Cubic Feet'},
};

export const GASES = {
  n: {
    unit: 'n2',
    name: 'Nitrogen',
    conversionRates: {
      kg: {lb: 2.205, tonne: 0.001, ton: 0.0011, l: 1.23737, gal: 0.32691, m3: 0.862, mmscf: 0.00,  nm3: 0.79978, scf: 30.43478},
      lb: {kg: 0.45351, tonne: 0.00045, ton: 0.0005,l: 0.56117, gal: 0.14826, m3: 0.391, mmscf: 0.00,  nm3: 0.36271, scf: 13.80262},
      tonne: {kg: 1000, lb: 2205, ton: 1.1025,l: 1237.37374, gal: 326.90882, m3: 862.00, mmscf: 0.030,  nm3: 799.78237, scf: 30434.78261},
      ton: {kg: 907.02948, lb: 2000, tonne: 0.90703,l: 1122.33446, gal: 296.51594, m3: 782.00, mmscf: 0.028,  nm3: 725.42619, scf: 27605.245},
      l: {kg: 0.80816, lb: 1.782, tonne: 0.00081, ton: 0.00089, gal: 0.2642, m3: 0.697, mmscf: 0.00,  nm3: 0.64635, scf: 24.59627},
      gal: {kg: 3.05896, lb:6.745 , tonne:0.00306 , ton:0.00337 ,l: 3.78507 , m3: 2.637, mmscf: 0.00,  nm3: 2.4465, scf: 93.09869},
      m3: {kg: 1.161 , lb: 2.559, tonne: 0.001, ton: 0.001,l: 1.436, gal:  0.379, mmscf: 0.000,  nm3: 0.928, scf: 35.310},
      mmscf: {kg:  32869, lb:  72464, tonne:  32.869, ton:  36.232,l:  40655, gal:  10740, m3:  28317,  nm3:  26280, scf: 1000000},
      nm3: {kg: 1.25034, lb: 2.757, tonne: 0.00125, ton:0.00138 ,l: 1.54714, gal: 0.40875, m3:  1.078, mmscf:  0.000, scf: 38.05383},
      scf: {kg: 0.03286, lb: 0.07245, tonne: 0.00003, ton: 0.00004,l: 0.04066, gal: 0.01074, m3: 0.028, mmscf: 0.000,  nm3: 0.02628},
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
      kg: {lb: 2.205, tonne: 0.001, ton: 0.0011, l: 0.98525, gal: 0.26033, m3: 0.546, mmscf: 0.00, nm3: 0.50585, scf: 19.27448},
      lb: {kg: 0.45351, tonne: 0.00045, ton: 0.0005, l: 0.44683, gal: 0.11806, m3: 0.248, mmscf: 0.00, nm3: 0.22941, scf: 8.74126},
      tonne: {kg: 1000, lb: 2205, ton: 1.1025,l: 985.25469, gal: 260.33058, m3: 545.800, mmscf: 0.019, nm3: 505.84997, scf: 19274.47552},
      ton: {kg: 907.02948, lb: 2000, tonne: 0.90703, l: 893.65505, gal: 236.12751, m3: 496.99, mmscf: 0.017, nm3: 458.82083, scf: 17482.51748},
      l: {kg: 1.01497, lb: 2.238, tonne: 0.00101, ton: 0.00112, gal: 0.26423, m3: 0.554, mmscf: 0.00, nm3: 0.51342, scf: 19.56294},
      gal: {kg: 3.84127, lb: 8.47, tonne: 0.00384, ton: 0.00424, l:  3.78463, m3: 2.097, mmscf: 0.00, nm3: 1.94311, scf: 74.03846},
      m3: {kg: 1.832, lb: 4.039, tonne: 0.002, ton: 0.002, l: 1.805, gal: 0.447, mmscf: 0.00,  nm3: 0.927, scf: 35.310},
      mmscf: {kg: 51890, lb:  114400, tonne: 51.890, ton:  57.200, l: 51130, gal: 13506.00, m3: 28317.00, nm3: 26280, scf: 1000000},
      nm3: {kg: 1.97687, lb: 4.359, tonne: 0.00198, ton: 0.00218, l: 1.94772, gal: 0.51464 , m3: 1.081, mmscf: 0.00, scf: 38.10315},
      scf: {kg: 0.05188, lb: 0.1144, tonne: 0.00005, ton: 0.00006,l: 0.05112, gal: 0.01351, m3: 0.028, mmscf: 0.00, nm3: 0.02624},
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb, UNITS.tonne, UNITS.ton]},
      {title: 'Gas', data: [UNITS.m3, UNITS.mmscf, UNITS.nm3, UNITS.scf]},
      {title: 'Liquid', data: [UNITS.gal, UNITS.l]},
    ],
  },
  he: {
    unit: 'he',
    name: 'Helium',
    conversionRates: {
      kg: {lb: , tonne: , ton:  l: , gal: , m3: , mmscf: ,  nm3: , scf: },
      lb: {kg: , tonne: , ton: , l: , gal: , m3: , mmscf: ,  nm3: , scf: },
      tonne: {kg: , lb: , ton: ,l: , gal: , m3: , mmscf: ,  nm3: , scf: },
      ton: {kg: , lb: , tonne: ,l: , gal: , m3: , mmscf: ,  nm3: , scf: },
      l: {kg: , lb: , tonne: , ton: , gal: , m3: , mmscf: ,  nm3: , scf: },
      gal: {kg: 0.47278, lb: 1.04230, tonne: 0.00047, ton: 0.00052,l:  3.78541, m3: , mmscf: ,  nm3: 2.64992, scf: 100.803},
      m3: {kg: , lb: , tonne: , ton: ,l: , gal:  , mmscf: ,  nm3: , scf: },
      mmscf: {kg:, lb:  , tonne:  , ton:  ,l:  , gal:  , m3:  ,  nm3:  , scf: },
      nm3: {kg: 0.17841, lb: 0.39333, tonne: 0.00018, ton: 0.00020,l: 1.42850, gal: 0.37737, m3:  , mmscf:  , scf: 38.0400},
      scf: {kg: 0.00469, lb: 0.01034, tonne: 0.00000, ton: 0.00001,l: 0.03755, gal: 0.00992, m3: , mmscf: , nm3: 0.02629},
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb, UNITS.tonne, UNITS.ton]},
      {title: 'Gas', data: [UNITS.m3, UNITS.mmscf, UNITS.nm3, UNITS.scf]},
      {title: 'Liquid', data: [UNITS.gal, UNITS.l]},
    ],
  },
  h2: {
    unit: 'h2',
    name: 'Hydrogen',
    conversionRates: {
      kg: {lb: 2.20462, tonne: 0.001, ton: 0.0011, l: 14.1304, gal: 3.733, m3: "", mmscf: "", nm3: 11.126, scf: 423.233},
      lb: {kg: 0.4536, tonne: 0.00045, ton: 0.0005, l: 6.40943, gal: 1.69319, m3: "", mmscf: "", nm3: 5.04667, scf: 191.975},
      tonne: {kg: 1000, lb: 2204.62, ton: 1.10231, l: 14130.4, gal: 3732.85, m3: "", mmscf: "", nm3: 11126, scf: 423233},
      ton: {kg: 907.185, lb: 2000, tonne: 0.90718, l: 12818.9, gal: 3386.39, m3: "", mmscf: "", nm3: 10093.4, scf: 383951},
      l: {kg: 0.07077, lb: 0.15602, tonne: 0.00007, ton: 0.00008, gal: 0.26417, m3: "", mmscf: "", nm3: 0.78738, scf: 29.952},
      gal: {kg: 0.2679, lb: 0.5906, tonne: 0.00027, ton: 0.0003, l: 3.78541, m3: "", mmscf: "", nm3: 2.98057, scf: 113.381},
      m3: {kg: "", lb: "", tonne: "", ton: "", l: "", gal: "", mmscf: "", nm3: "", scf: ""},
      mmscf: {kg: "", lb: "", tonne: "", ton: "", l: "", gal: "", m3: "", nm3: "", scf: ""},
      nm3: {kg: 0.08988, lb: 0.19815, tonne: 0.00009, ton: 0.0001, l: 1.27003, gal: 0.33551, m3: "", mmscf: "", scf: 38.04},
      scf: {kg: 0.00236, lb: 0.00521, tonne: 0.0000, ton: 0.0000, l: 0.03339, gal: 0.00882, m3: , mmscf: "", nm3: 0.02629}
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb, UNITS.tonne, UNITS.ton]},
      {title: 'Gas', data: [UNITS.m3, UNITS.mmscf, UNITS.nm3, UNITS.scf]},
      {title: 'Liquid', data: [UNITS.gal, UNITS.l]},
    ],
  },
  o2: {
    unit: 'o2',
    name: 'Oxygen',
    conversionRates: {
      kg: {lb: 2.205, tonne: 0.001, ton: 0.0011, l: 0.87604, gal: 0.23145, m3: 0.754, mmscf: 0.00, nm3: 0.69978, scf: 26.62722},
      lb: {kg: 0.45351, tonne: 0.00045, ton: 0.0005, l: 0.3973, gal: 0.10496, m3: 0.342, mmscf: 0.00, nm3: 0.31736, scf: 12.07584},
      tonne: {kg: 1000, lb: 2205, ton: 1.1025, l: 876.04291, gal: 231.44747, m3: 754.00, mmscf: 0.027,  nm3: 699.77785, scf: 26627.21893},
      ton: {kg: 907.02948, lb: 2000, tonne: 0.90703, l: 794.59674, gal: 209.92967, m3: 684.00, mmscf: 0.024,  nm3: 634.71914, scf: 24151.6725},
      l: {kg: 1.1415, lb: 2.517, tonne: 0.00114, ton: 0.00126, gal: 0.2642, m3: 0.861, mmscf: 0.00, nm3: 0.79879, scf: 30.39488},
      gal: {kg: 4.32063, lb: 9.527, tonne: 0.00432, ton: 0.00476, l: 3.78506, m3: 3.258, mmscf: 0.00, nm3: 3.02348, scf: 115.04649},
      m3: {kg: 1.326, lb: 2.923, tonne: 0.001, ton: 0.001, l: 1.162, gal: 0.307, mmscf: 0.00,  nm3: 0.928, scf: 35.310},
      mmscf: {kg: 37549, lb: 82780, tonne: 37.549, ton: 41.390, l: 32902, gal: 8692, m3: 28317, nm3: 26280, scf: 1000000},
      nm3: {kg: 1.42902, lb: 3.151, tonne: 0.00143, ton: 0.00158,l: 1.25189, gal: 0.33074, m3: 1.078, mmscf:  0.00, scf: 38.05096},
      scf: {kg: 0.03756, lb: 0.08281, tonne: 0.00004, ton: 0.00004, l: 0.0329, gal: 0.00869, m3: 0.028, mmscf: 0.00, nm3: 0.02628},
    },
    unitList: [
      {title: 'Weights', data: [UNITS.kg, UNITS.lb, UNITS.tonne, UNITS.ton]},
      {title: 'Gas', data: [UNITS.m3, UNITS.mmscf, UNITS.nm3, UNITS.scf]},
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
