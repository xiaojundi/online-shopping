import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  EMPTY_CART,
  GET_SHOPPING_CART_LIST,
  REMOVE_SHOPPING_CART_ITEM,
} from './action-type';

const initialState = {
  products: [],
};
/*
product: {
  id:
  quantity:
}
*/
export default function shoppingCart(state = initialState, action) {
  switch (action.type) {
    case REMOVE_SHOPPING_CART_ITEM:
      return { ...state, products: action.payload };
    case GET_SHOPPING_CART_LIST:
      return { ...state, products: action.payload };
    case ADD_TO_CART:
      let has = false;
      let arr = [];
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i]._id === action.payload._id) {
          has = true;
          arr.push({
            ...state.products[i],
            quantity: state.products[i].quantity + 1,
          });
        } else {
          arr.push({
            ...state.products[i],
            quantity: state.products[i].quantity,
          });
        }
      }
      if (!has) {
        arr.push({ ...action.payload, quantity: 1 });
      }
      return {
        ...state,
        products: action.payload || [],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id != action.payload._id
        ),
      };
    case ADD_QUANTITY:
      return {
        ...state,
        products: action.payload.data || [],
      };
    case SUB_QUANTITY:
      return {
        ...state,
        products: action.payload.data || [],
      };
    case EMPTY_CART:
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
}
