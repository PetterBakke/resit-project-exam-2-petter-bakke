import { useState } from "react";
import { Container } from "react-bootstrap";

function Cart() {
  // const [favs, setFavs] = useState([]);
  const cartItems = JSON.parse(localStorage.getItem("Favourites"));
  console.log(cartItems);

  return (
    <Container className="container">
      <h5>{cartItems.attributes.title}</h5>
      <p>{cartItems.attributes.description}</p>
      <p>{cartItems.attributes.price}</p>
    </Container>
  )
}

export default Cart;