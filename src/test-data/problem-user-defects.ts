import type { Product } from './products';
import {
  sauceLabsBackpack,
  sauceLabsBikeLight,
  sauceLabsBoltTShirt,
  sauceLabsFleeceJacket,
  sauceLabsOnesie,
  testAllTheThingsTShirtRed
} from './products';

/**
 * Confirmed problem_user defect matrix from manual QA validation.
 * These values describe defective application behavior, not accepted product behavior.
 */
export interface ProblemUserProductDefect {
  product: Product;
  addByListingWorks: boolean;
  addByDetailWorks: boolean;
  correctListingImage: boolean;
  correctDetail: boolean;
  /** Onesie-specific confirmed title defect when opening detail from the listing. */
  detailTitleIncorrect?: boolean;
}

export const problemUserProductDefects: readonly ProblemUserProductDefect[] = [
  {
    product: sauceLabsBackpack,
    addByListingWorks: true,
    addByDetailWorks: false,
    correctListingImage: false,
    correctDetail: true
  },
  {
    product: sauceLabsBikeLight,
    addByListingWorks: true,
    addByDetailWorks: false,
    correctListingImage: false,
    correctDetail: true
  },
  {
    product: sauceLabsBoltTShirt,
    addByListingWorks: false,
    addByDetailWorks: true,
    correctListingImage: false,
    correctDetail: true
  },
  {
    product: sauceLabsFleeceJacket,
    addByListingWorks: false,
    addByDetailWorks: true,
    correctListingImage: false,
    correctDetail: false
  },
  {
    product: sauceLabsOnesie,
    addByListingWorks: true,
    addByDetailWorks: false,
    correctListingImage: false,
    correctDetail: false,
    detailTitleIncorrect: true
  },
  {
    product: testAllTheThingsTShirtRed,
    addByListingWorks: false,
    addByDetailWorks: true,
    correctListingImage: false,
    correctDetail: true
  }
];
