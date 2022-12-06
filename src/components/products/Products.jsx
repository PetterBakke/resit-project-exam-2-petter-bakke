import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../../constants/api";
import { Container } from "react-bootstrap";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
// import FavLocalStorage from "../localstorage/favLocalStorage";
import { clearClick } from "../logout/LogOut";

function Products() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchProducts() {
      try {
        const response = await fetch(BASE_URL);

        if (response.ok) {
          const json = await response.json();
          console.log(json.data);
          setProducts(json.data);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }

    }
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: An error occured</div>;
  }

  const addToCart = (product) => {
    localStorage.setItem("Favourites" , JSON.stringify(product));
    console.log("we are in add to cart");
    setCart([...cart, product]);
  };

  return (
    <>
      <button onClick={clearClick} className="link-tag">Log Out</button>
      <Link to="/cart" className="link-tag" >Cart({cart.length})</Link>
      <Container className="container">
        {products.map(function (product) {
          return (
            <div className="products-container" key={product.id}>
              <div>
                <img src={"http://localhost:1337/uploads/Project_1_5f342a5036.png"} alt="This is the product cover" className="product-img" />
                <AiOutlineHeart className="fav-button" onClick={() => addToCart(product)} />
              </div>
              <div className="title-tag">
                <h5 key={product.attributes.title}>{product.attributes.title}</h5>
              </div>
              <div className="link-tag">
                <Link to={`product/${product.id}`} className="link-page">View more</Link>
              </div>
            </div>
          );
        })}

      </Container>
    </>
  );
}

export default Products;