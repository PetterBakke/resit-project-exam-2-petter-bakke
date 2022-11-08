import React, {useState} from "react";
import { useEffect } from "react";
import { BASE_URL } from "./constants/api";

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
      <div className="products-container">
        {products.map(function (product) {
          return (
            <div className="products-container" key={product.attributes.id}>
              <img src={product.attributes.image.data[0].attributes.url} alt="" className="product-img" />
              <p key={product.attributes.name}>{product.attributes.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Products;