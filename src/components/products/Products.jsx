import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL, BASE_URI } from "../../constants/api";
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
		localStorage.setItem("Favourites", JSON.stringify(product));
		console.log("This item is in the cart");
		setCart([...cart, product]);
	};

	return (
		<>
			<button onClick={clearClick} className="link-tag">
				Log Out
			</button>
			<Link to="/cart" className="link-tag">
				Cart({cart.length})
			</Link>
			<Container className="container">
				{products.map(function (product) {
					console.log(product);

					const imagePath = `${BASE_URI}${product.attributes.image.data[0].attributes.url}`;

					return (
						<div className="products-container" key={product.id}>
							<div>
								<img src={imagePath} alt={product.title} className="product-img" />
								<AiOutlineHeart className="fav-button" onClick={() => addToCart(product)} />
							</div>
							<div className="title-tag">
								<h5 key={product.attributes.title}>{product.attributes.title}</h5>
							</div>
							<div className="link-tag">
								<Link to={`product/${product.id}`} className="link-page">
									View more
								</Link>
							</div>
						</div>
					);
				})}
			</Container>
		</>
	);
}

export default Products;