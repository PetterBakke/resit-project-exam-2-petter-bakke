import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../constants/api";
import { Container } from "react-bootstrap";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

function Products() {
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

  return (
    <>
      <Container className="container">
        {products.map(function (product) {
          return (
            <div className="products-container" key={product.id}>
              <div>
              <img src={product.attributes.image.data[0].attributes.url} alt="This is the product cover" className="product-img" />
              <AiOutlineHeart className="fav-button" />
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