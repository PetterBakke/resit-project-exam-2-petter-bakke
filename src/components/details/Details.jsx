import { Details_url, BASE_URI } from "../../constants/api";
import { BsFillCartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/logo.png";

function PageDetail() {
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const url = Details_url + id + "?populate=*";

  useEffect(function () {
    if (JSON.parse(localStorage.getItem("Favourites"))) {
      setCart(JSON.parse(localStorage.getItem("Favourites")));
    }
  }, []);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setProduct(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }
  const addToCart = (product) => {

    if (cart.filter(prod => product.id === prod.id).length === 0) {
      setCart([...cart, product]);
      localStorage.setItem("Favourites", JSON.stringify([...cart, product]));
      console.log("This item is in the cart");
    }
    else {
      let newCart = cart.filter(prod => product.id !== prod.id);
      setCart(newCart);
      localStorage.setItem("Favourites", JSON.stringify(newCart));
    }
  };

  const imagePath = `${BASE_URI}${product.data.attributes.image.data[0].attributes.url}`;

  return (

    <>
      <div className="logo-container">
        <img src={logo} alt="" className="App-logo" />
      </div>
      <div className='page-detail'>
        <div className='flex-child'>
          <BsFillCartFill className="fav-button-details" onClick={() => addToCart(product)}
            style={cart.filter(prod => product.id === prod.id).length === 0 ? { color: "green" } : { color: "red" }}
          />
          <h2 key={product.data.attributes.title} className="heading">{product.data.attributes.title}</h2>
          <img src={imagePath} alt={product.data.attributes.title} className="detail-img" />
          <p className='heading-description'>{product.data.attributes.description}</p>
        </div>
        
      </div>
    </>
  );
}

export default PageDetail;