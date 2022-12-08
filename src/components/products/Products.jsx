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
	const [checked, setChecked] = useState(false);
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

	function searchGenre(genre) {
		return genre.filter((genres) => {
			return searchParam.some((newGenre) => {
				return (
					genres[newGenre].toString().toLowerCase().indexOf(genre.toLowerCase())
				)
			})
		})
	}
	console.log("search Filter: ", setGenre);

	const handleChange = () => {
		setChecked(!checked);
	};

	return (
		<>
			<label>
				<input type="checkbox" checked={checked} onChange={handleChange} className="genre-search" onClick={() => searchGenre(setGenre)} />
				Action
			</label>

			<label>
				<input type="checkbox" checked={checked} onChange={handleChange} className="genre-search" />
				Sport
			</label>

			<label>
				<input type="checkbox" checked={checked} onChange={handleChange} className="genre-search" />
				Simulation
			</label>

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