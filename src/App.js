import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShow, setCartIsShow] = useState(false);

  const toggleShowHandler = () => {
    setCartIsShow((prevCartIsShow) => !prevCartIsShow);
  };

  return (
    <CartProvider>
      {cartIsShow && <Cart onClose={toggleShowHandler} />}
      <Header onShowCart={toggleShowHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
