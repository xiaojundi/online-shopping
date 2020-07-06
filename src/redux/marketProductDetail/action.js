import { DISPLAY_PRODUCT_DETAIL } from './action-type';
export const displayProductDetail = (product) => {
  return {
    type: DISPLAY_PRODUCT_DETAIL,
    payload: product,
  };
};
