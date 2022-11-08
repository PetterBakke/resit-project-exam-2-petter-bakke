import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import neon from '../src/assets/Neon city.png';
import golf from '../src/assets/The golf.png';
import space from '../src/assets/Space adventure.png';

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={neon}
          alt="Neon city game cover"
        />
        <Carousel.Caption>
          <h3>Neon City</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={golf}
          alt="The golf game cover"
        />

        <Carousel.Caption>
          <h3>The Golf</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={space}
          alt="Space adventure game cover"
        />

        <Carousel.Caption>
          <h3>Space Adventure</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;