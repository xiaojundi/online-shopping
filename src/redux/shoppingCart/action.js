import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  EMPTY_CART,
  GET_SHOPPING_CART_LIST,
  REMOVE_SHOPPING_CART_ITEM,
} from './action-type';
import {
  reqAddToCart,
  reqGetShoppingCartList,
  reqRemoveFromCart,
} from '../../api';

export const getShoppingCartList = (userId) => {
  return async (dispatch) => {
    let data = await reqGetShoppingCartList(userId);
    dispatch({ type: GET_SHOPPING_CART_LIST, payload: data.data });
  };
};

export const removeProductFromShoppingCart = (productId, userId) => {
  return async (dispatch) => {
    let data = await reqRemoveFromCart(productId, userId);
    console.log(data);
    dispatch({ type: REMOVE_SHOPPING_CART_ITEM, payload: data.data });
  };
};

export const addToCart = (product, user) => {
  return async (dispatch) => {
    let { imgs, name, price, detail, quantity } = product;
    let productId = product._id;
    let userId = user._id;
    let result = await reqAddToCart(
      {
        productId,
        userId,
        imgs,
        name,
        price,
        detail,
        quantity: quantity ? quantity : 1,
      },
      userId
    );
    dispatch({
      type: ADD_TO_CART,
      payload: result.data,
    });
  };
};
export const removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
};
export const subtractQuantity = (product) => {
  return {
    type: SUB_QUANTITY,
    payload: product,
  };
};
export const addQuantity = (product) => {
  return {
    type: ADD_QUANTITY,
    payload: product,
  };
};
export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};
