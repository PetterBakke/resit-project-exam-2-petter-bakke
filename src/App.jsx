import "../src/sass/styles.scss";
import { Routes, Route } from 'react-router-dom';
import Products from "../src/components/products/Products";
import Home from "../src/components/home/Home";
import PageDetail from "../src/components/details/Details";
import SignIn from './components/signin/SignIn';
import SignUp from "./components/signup/SignUp";
import Cart from './components/cart/Cart';
import CheckOut from './components/checkout/CheckOut';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/product/:id" element={<PageDetail />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </>
  );
}

export default App;