import logo from '../src/assets/logo.png';
import "../src/sass/styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingSlider from './Home';

function App() {
  return (
    <div className='container'>
        <img src={logo} className="App-logo" alt="logo" />
        <LandingSlider />
    </div>
        
    
  );
}

export default App;
