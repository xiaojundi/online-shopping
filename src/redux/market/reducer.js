import { PRODUCT_TYPE } from './action-types';

const initialState = '';

function market(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_TYPE:
      return action.payload;
    default:
      return state;
  }
}

export default market;
