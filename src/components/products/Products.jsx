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
	const [genre, setGenre] = useState("");
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	// const [q, setQ] = useState("");
	const [searchParam] = useState(["genre"]);

	// const navigate = useNavigate();

	useEffect(function () {
		async function fetchProducts() {
			try {
				const response = await fetch(BASE_URL);

				if (response.ok) {
					const json = await response.json();
					// console.log(json.data);
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
	// navigate("/", { replace: true });

	function searchGenre(product) {
		return product.filter((genre) => {
			return searchParam.some((newGenre) => {
				return (
					genre[newGenre].toString().toLowerCase().indexOf(product.toLowerCase()) > -1
					)
				})
			})
		}
		console.log("search Filter: ", genre);

	return (
		<>
			<div>
				<input type="checkbox" label="Action" className="genre-search" value={genre} onClick={(e) => setGenre(e.genre)}></input>
				<input type="checkbox" label="Sport" className="genre-search" value={genre} onClick={(e) => setGenre(e.genre)}></input>
				<input type="checkbox" label="Simulation" className="genre-search" value={genre} onClick={(e) => setGenre(e.genre)}></input>
			</div>
			<button onClick={clearClick} className="link-tag">
				Log Out
			</button>
			<Link to={`/cart`} className="link-tag">
				Cart({cart.length})
			</Link>
			<Container className="container">
				{products.map(function (product) {
					// console.log(product);

					const imagePath = `${BASE_URI}${product.attributes.image.data[0].attributes.url}`;

					return (
						<>
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
						</>
					);
				})}
			</Container>
		</>
	);
}

export default Products;