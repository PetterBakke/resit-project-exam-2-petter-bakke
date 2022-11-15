import logo from '../src/assets/logo.png';
import "../src/sass/styles.scss";
import { Routes, Route } from 'react-router-dom';
import Products from './products/Products';
import Home from './home/Home';
import PageDetail from './details/Details';

function App() {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/product/:id" element={<PageDetail />} />
      </Routes>


    </>
  );
}

export default App;
