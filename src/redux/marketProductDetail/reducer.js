import { DISPLAY_PRODUCT_DETAIL } from './action-type';
const initialState = {};

export default function displayProductDetail(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_PRODUCT_DETAIL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
