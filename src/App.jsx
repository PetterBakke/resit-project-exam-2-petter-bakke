import logo from '../src/assets/logo.png';
import "../src/sass/styles.scss";
import { Routes, Route } from 'react-router-dom';
import Products from './products/Products';
import Home from './home/Home';
import PageDetail from './details/Details';
import LoginForm from './login/Login';
import RegisterForm from './register/Register';
import { AuthProvider } from "../src/context/AuthContext"

function App() {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/product/:id" element={<PageDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </AuthProvider>


    </>
  );
}

export default App;
