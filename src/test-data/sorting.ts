import {
  inventoryNamesAz,
  inventoryPricesAz,
  sauceLabsBackpack,
  sauceLabsBikeLight,
  sauceLabsBoltTShirt,
  sauceLabsFleeceJacket,
  sauceLabsOnesie,
  testAllTheThingsTShirtRed
} from './products';

export type SortOptionValue = 'az' | 'za' | 'lohi' | 'hilo';

export interface SortScenario {
  optionValue: SortOptionValue;
  optionLabel: string;
  expectedNames: readonly string[];
  expectedPrices: readonly string[];
}

export const sortScenarios: readonly SortScenario[] = [
  {
    optionValue: 'az',
    optionLabel: 'Name (A to Z)',
    expectedNames: inventoryNamesAz,
    expectedPrices: inventoryPricesAz
  },
  {
    optionValue: 'za',
    optionLabel: 'Name (Z to A)',
    expectedNames: [...inventoryNamesAz].reverse(),
    expectedPrices: [...inventoryPricesAz].reverse()
  },
  {
    optionValue: 'lohi',
    optionLabel: 'Price (low to high)',
    expectedNames: [
      sauceLabsOnesie.name,
      sauceLabsBikeLight.name,
      sauceLabsBoltTShirt.name,
      testAllTheThingsTShirtRed.name,
      sauceLabsBackpack.name,
      sauceLabsFleeceJacket.name
    ],
    expectedPrices: ['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']
  },
  {
    optionValue: 'hilo',
    optionLabel: 'Price (high to low)',
    expectedNames: [
      sauceLabsFleeceJacket.name,
      sauceLabsBackpack.name,
      sauceLabsBoltTShirt.name,
      testAllTheThingsTShirtRed.name,
      sauceLabsBikeLight.name,
      sauceLabsOnesie.name
    ],
    expectedPrices: ['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99']
  }
];
