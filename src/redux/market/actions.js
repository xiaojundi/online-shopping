import { PRODUCT_TYPE } from './action-types';

export const selectCategory = (categoryName) => {
  return {
    type: PRODUCT_TYPE,
    payload: categoryName,
  };
};
