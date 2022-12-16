import { Link } from "react-router-dom";
import { BASE_URI } from "../../constants/api";
import { BsFillCartXFill } from "react-icons/bs";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";


function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(function () {
    if (JSON.parse(localStorage.getItem("Favourites"))) {
      setCartItems(JSON.parse(localStorage.getItem("Favourites")));
    }
  }, []);

  const removeFromCart = (item) => {
    console.log(item);
    let newCart = cartItems.filter(prod => item.id !== prod.id);
    setCartItems(newCart);

    localStorage.setItem("Favourites", JSON.stringify(newCart));
  }

  return (
    <>
    <div className="logo-container">
      <img src={logo} alt="" className="App-logo" />
    </div>
      <div className="container-cart">
          <h1 className="title-heading">Cart</h1>
        <div className="cart-container">
          {cartItems ?
            cartItems.map(function (item) {
              let imagePath = `${BASE_URI}${item.attributes.image.data[0].attributes.formats.medium.url}`;
              
              return (
                <div className="cart-items" key={item.id}>
                  <BsFillCartXFill className="remove-btn" onClick={() => removeFromCart(item)} />
                  <h5>{item.attributes.title}</h5>
                  <img src={imagePath} alt={item.title} className="product-img" />
                  <p>{item.attributes.price}</p>
                </div>
              )
            })
            :
            <div>No products in cart.</div>}
        </div>
            <Link to={`/checkout`} className="checkout-tag" style={cartItems ? { pointerEvents: "all" } : { pointerEvents: "none" }}>Checkout</Link>
      </div>
    </>
  )
}

export default Cart;