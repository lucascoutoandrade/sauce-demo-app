export interface Product {
  id: string;
  name: string;
  price: string;
  slug: string;
  /** Stable substring of the standard_user listing/detail image src. */
  imageSrcFragment: string;
}

export const sauceLabsBackpack: Product = {
  id: '4',
  name: 'Sauce Labs Backpack',
  price: '$29.99',
  slug: 'sauce-labs-backpack',
  imageSrcFragment: 'sauce-backpack'
};

export const sauceLabsBikeLight: Product = {
  id: '0',
  name: 'Sauce Labs Bike Light',
  price: '$9.99',
  slug: 'sauce-labs-bike-light',
  imageSrcFragment: 'bike-light'
};

export const sauceLabsBoltTShirt: Product = {
  id: '1',
  name: 'Sauce Labs Bolt T-Shirt',
  price: '$15.99',
  slug: 'sauce-labs-bolt-t-shirt',
  imageSrcFragment: 'bolt-shirt'
};

export const sauceLabsFleeceJacket: Product = {
  id: '5',
  name: 'Sauce Labs Fleece Jacket',
  price: '$49.99',
  slug: 'sauce-labs-fleece-jacket',
  imageSrcFragment: 'sauce-pullover'
};

export const sauceLabsOnesie: Product = {
  id: '2',
  name: 'Sauce Labs Onesie',
  price: '$7.99',
  slug: 'sauce-labs-onesie',
  imageSrcFragment: 'red-onesie'
};

export const testAllTheThingsTShirtRed: Product = {
  id: '3',
  name: 'Test.allTheThings() T-Shirt (Red)',
  price: '$15.99',
  slug: 'test.allthethings()-t-shirt-(red)',
  imageSrcFragment: 'red-tatt'
};

export const inventoryProducts: readonly Product[] = [
  sauceLabsBackpack,
  sauceLabsBikeLight,
  sauceLabsBoltTShirt,
  sauceLabsFleeceJacket,
  sauceLabsOnesie,
  testAllTheThingsTShirtRed
];

/** Default catalog order shown after login (Name A to Z). */
export const inventoryNamesAz: readonly string[] = inventoryProducts.map(
  (product: Product): string => product.name
);

export const inventoryPricesAz: readonly string[] = inventoryProducts.map(
  (product: Product): string => product.price
);
