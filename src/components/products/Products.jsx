import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL, BASE_URI } from "../../constants/api";
import { Container } from "react-bootstrap";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import logOut from "../logout/LogOut";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import logo from "../../assets/logo.png";

function Products() {
	const [cart, setCart] = useState([]);
	const [checked, setChecked] = useState({ action: false, sport: false, sim: false });
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	let navigate = useNavigate();

	useEffect(function () {
		async function fetchProducts() {
			try {
				const response = await fetch(BASE_URL);

				if (response.ok) {
					setLoading(true);
					const json = await response.json();
					setTimeout(() => { setProducts(json.data); setLoading(false); }, 500);
				} else {
					setError("An error occured");
				}
			} catch (error) {
				setError(error.toString());
			}
			finally {
				//
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

	if (error) {
		return <div>Error: An error occured</div>;
	}

	const addToCart = (event, product) => {

		if (cart.filter(prod => product.id === prod.id).length === 0) {

			event.target.style.color = "red";
			event.target.fill = "red";
			event.target.stroke = "red";

			setCart([...cart, product]);
			localStorage.setItem("Favourites", JSON.stringify([...cart, product]));
			console.log("This item is in the cart");
		}
		else {

			event.target.style.color = "green";
			event.target.fill = "green";
			event.target.stroke = "green";

			let newCart = cart.filter(prod => product.id !== prod.id);
			setCart(newCart);
			localStorage.setItem("Favourites", JSON.stringify(newCart));

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
			<img src={logo} alt="" className="App-logo" />
			<button onClick={() => logOut(navigate)} className="logout-btn">
				Log Out
			</button>
			<Link to={`/cart`} className="cart-link">
				Cart({cart.length})
			</Link>


			{loading &&
				<div style={{ width: "100%", textAlign: "center" }}>
					<Spinner animation="border" className="spinner" />
				</div>
			}
			
			<div className="search">
			<label className="search-label">
				<input type="checkbox" checked={checked.action} onChange={handleActionChange} className="genre-search" />
				Action
			</label>

			<label className="search-label">
				<input type="checkbox" checked={checked.sport} onChange={handleSportChange} className="genre-search" />
				Sport
			</label>

			<label className="search-label">
				<input type="checkbox" checked={checked.sim} onChange={handleSimulationChange} className="genre-search" />
				Simulation
			</label>
			</div>
			<Container className="container">
				{filteredProducts.map(function (product) {
					// console.log(product);
					const imagePath = `${BASE_URI}${product.attributes.image.data[0].attributes.formats.medium.url}`;

					return (
						<div className="products-container" key={product.id}>
							<BsFillCartFill className="fav-button" onClick={(event) => addToCart(event, product)} />
							<Link to={`product/${product.id}`} className="link-page">
								<div>
									<img src={imagePath} alt={product.title} className="product-img" />
								</div>
								<div className="title-tag">
									<h5 key={product.attributes.title}>{product.attributes.title}</h5>
								</div>
								<div className="link-tag">
									View more
								</div>
							</Link>
						</div>
					);
				})}
			</Container>
		</>
	);
}

export default Products;