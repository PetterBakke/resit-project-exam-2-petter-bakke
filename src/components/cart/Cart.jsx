import { Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URI } from "../../constants/api";
import {BsFillCartXFill} from "react-icons/bs";

function Cart() {
  const cartItems = JSON.parse(localStorage.getItem("Favourites"));
  console.log(cartItems);

  const removeFromCart = () => {
    localStorage.removeItem();
  }

  return (
    <>
    <div className="cart-container">
      {cartItems.map(function (item) {
      let imagePath = `${BASE_URI}${item.attributes.image.data[0].attributes.url}`;
        
        return (
          <div className="jsnda" key={item.id}>
            <BsFillCartXFill onClick={(event) => removeFromCart(event, item)}/>
            <h5>{item.attributes.title}</h5>
            <img src={imagePath} alt={item.title} className="product-img"/>
            {/* <p>{item.attributes.description}</p> */}
            <p>{item.attributes.price}</p>
          </div>
        )
      })
      }
    </div>
      <Link to={`/checkout`} className="link-tag">Checkout</Link>
    </>
  )
}

export default Cart;