import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import neon from '../../src/assets/Neon city.png';
import golf from '../../src/assets/The golf.png';
import space from '../../src/assets/Space adventure.png';

function Home() {
  return (
    <>
    
        <Carousel className='img-slider'>
          <Carousel.Item>
            <img className="d-flex justify-content-center" width={300} height={450}
              src={neon}
              alt="Neon city game cover"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-flex justify-content-center" width={300} height={450}
              src={golf}
              alt="The golf game cover"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-flex justify-content-center" width={300} height={450}
              src={space}
              alt="Space adventure game cover"
            />
          </Carousel.Item>
        </Carousel>
        <div className='browse-button'>
          <Link to="/login" className='browse-link'>Login |</Link>
          <Link to="/register" className='browse-link'>Register |</Link>
          <Link to="/products" className='browse-link'>Browse</Link>
        </div>
    </>
  );
}

export default Home;