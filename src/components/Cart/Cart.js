import { useContext, useState } from "react";
import useAxioshttp from "../../hooks/use-axioshttp";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  const [isOrder, setIsOrder] = useState(false);
  const { isLoading, error, sendRequest } = useAxioshttp();
  const [isSended, setIsSended] = useState(false);

  const cartItemRomveHandler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderClickHandler = () => {
    setIsOrder(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRomveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const showResponse = (response) => {
    console.log(response);
    if (response.success) {
      setIsSended(true);
      cartContext.clearCart();
    } else {
      //show the error
    }
  };

  const setDataformat = (data) => {
    return {
      meals: cartContext.items,
      user: (({
        name: { value: name },
        password: { value: password },
        email: { value: email },
        street: { value: street },
        postal: { value: postal },
        city: { value: city },
      }) => ({ name, password, email, street, postal, city }))(data),
    };
  };

  const ConfirmHandler = (ClientData) => {
    sendRequest(
      {
        url: "orders",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: setDataformat(ClientData),
      },
      showResponse
    );
  };

  const showCart = (
    <>
      {error && <h3 className={classes.cartError}>{error}</h3>}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrder && (
        <Checkout onCancel={props.onClose} onConfirm={ConfirmHandler} />
      )}
      <div className={classes.actions}>
        {!isOrder && (
          <>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={orderClickHandler}>
                Order
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
  const showWasSended = (
    <>
      <h3 className={classes.sended}>
        🎉 🎉 Your order was generated successfully 🎉 🎉{" "}
      </h3>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSended && !isLoading && showCart}
      {isLoading && <p className={classes.cartLoading}>Sending...</p>}
      {isSended && showWasSended}
    </Modal>
  );
};

export default Cart;
