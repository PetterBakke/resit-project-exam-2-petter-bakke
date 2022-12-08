import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URI } from "../../constants/api";

function Cart() {
  const cartItems = JSON.parse(localStorage.getItem("Favourites"));
  console.log(cartItems);

  const imagePath = `${BASE_URI}${cartItems.attributes.image.data[0].attributes.url}`;

  return (
    <>
    <div className="cart-container">
      <h5>{cartItems.attributes.title}</h5>
      <img src={imagePath} alt={cartItems.title} className="product-img"/>
      {/* <p>{cartItems.attributes.description}</p> */}
      <p>{cartItems.attributes.price}</p>
    </div>
      <Link to={`/checkout`} className="link-tag">Checkout</Link>
    </>
  )
}

export default Cart;