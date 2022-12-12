import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL, BASE_URI } from "../../constants/api";
import { Container } from "react-bootstrap";
import { BsFillCartPlusFill, BsFillCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import logOut from "../logout/LogOut";
import { useNavigate } from "react-router-dom";

function Products() {
	const [cart, setCart] = useState([]);
	const [checked, setChecked] = useState({ action: false, sport: false, sim: false });
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	let navigate = useNavigate();

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

	useEffect(filterProductsOnGenre, [checked, products]);
	function filterProductsOnGenre() {

		let filteredProds = products.filter((prod) => (
			(checked.action && prod.attributes.genre === "Action") ||
			(checked.sport && prod.attributes.genre === "Sport") ||
			(checked.sim && prod.attributes.genre === "Simulation")
		));

		if (!checked.action && !checked.sport && !checked.sim) {
			setFilteredProducts(products);
		} else {
			setFilteredProducts(filteredProds);
		}
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: An error occured</div>;
	}

	const addToCart = (product) => {

		if (cart.filter(prod => product.id === prod.id).length === 0) {

			localStorage.setItem("Favourites", JSON.stringify(product));
			console.log("This item is in the cart");
			setCart([...cart, product]);
		}
	};

	const handleActionChange = () => {
		setChecked({ ...checked, action: !checked.action });
	};

	const handleSportChange = () => {
		setChecked({ ...checked, sport: !checked.sport });
	};

	const handleSimulationChange = () => {
		setChecked({ ...checked, sim: !checked.sim });
	};

	return (
		<>
			<label>
				<input type="checkbox" checked={checked.action} onChange={handleActionChange} className="genre-search" />
				Action
			</label>

			<label>
				<input type="checkbox" checked={checked.sport} onChange={handleSportChange} className="genre-search" />
				Sport
			</label>

			<label>
				<input type="checkbox" checked={checked.sim} onChange={handleSimulationChange} className="genre-search" />
				Simulation
			</label>

			<button onClick={() => logOut(navigate)} className="link-tag">
				Log Out
			</button>
			<Link to={`/cart`} className="link-tag">
				Cart({cart.length})
			</Link>
			<Container className="container">
				{filteredProducts.map(function (product) {
					// console.log(product);

					const imagePath = `${BASE_URI}${product.attributes.image.data[0].attributes.formats.medium.url}`;

					return (
						<div className="products-container" key={product.id}>
							<div>
								<img src={imagePath} alt={product.title} className="product-img" />
								<BsFillCartPlusFill className="fav-button" onClick={() => addToCart(product)} style={{ color: "green", pointerEvents: "all" }} />
								<BsFillCartCheckFill className="fav-button" style={{ color: "red", pointerEvents: "none" }} />
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