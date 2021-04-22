import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let updatedItems;
  let updatedTotalAmount;
  switch (action.type) {
    case "ADD":
      updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE":
      const cartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      let cartItem = state.items[cartItemIndex];
      if (cartItem) {
        if (cartItem.amount > 1) {
          //decrease
          cartItem = { ...cartItem, amount: cartItem.amount - 1 };
          updatedItems = [...state.items];
          updatedItems[cartItemIndex] = cartItem;
        } else {
          //remove
          updatedItems = [...state.items];
          updatedItems.splice(cartItemIndex, 1);
        }
        // upadate TotalAmount
        updatedTotalAmount = state.totalAmount - cartItem.price;
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }
      return state;

    case "CLEAR":
      return defaultCartState;

    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: "ADD", item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id });
  };
  const clearCartHandler = () => {
    dispatchCartState({ type: "CLEAR" });
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
