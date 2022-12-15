import { Details_url, BASE_URI } from "../../constants/api";
import { BsFillCartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
    // localStorage.setItem("Favourites", JSON.stringify(product));
    // console.log("This item is in the cart");
    // setCart([...cart, product]);
  };

  const imagePath = `${BASE_URI}${product.data.attributes.image.data[0].attributes.url}`;

  return (

    <>
      <img src={logo} alt="" className="App-logo" />
       <p>
        Cart({cart.length})   
        </p> 
      <div className='page-detail'>
        <div className='flex-child'>
          <h1 key={product.data.attributes.title} className="heading">{product.data.attributes.title}</h1>
          <img src={imagePath} alt="This is the product cover" className="product-img" />
          <BsFillCartFill className="fav-button" onClick={() => addToCart(product)}
            style={cart.filter(prod => product.id === prod.id).length === 0 ? { color: "green" } : { color: "red" }}
          />
        </div>
        <div className='subgrid'>
          <p className='heading-description'>{product.data.attributes.description}</p>
        </div>
      </div>
    </>
  );
}

export default PageDetail;