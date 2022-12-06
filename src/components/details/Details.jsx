import { Details_url, BASE_URI } from "../../constants/api";
import { AiOutlineHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';

function PageDetail() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const url = Details_url + id + "?populate=*";

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setProduct(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  const imagePath = `${BASE_URI}${product.data.attributes.image.data[0].attributes.url}`;

  return (
    <Container>
      <>
        <div className='page-detail'>
          <div>
            <img src={imagePath} alt="This is the product cover" className="product-img" />
            <AiOutlineHeart className="fav-button" />
            <p key={product.data.attributes.title} className="p-title">{product.data.attributes.title}</p>
          </div>
          <div className='subgrid'>
            <h5 className='heading-description'>{product.data.attributes.title}</h5>
          </div>
        </div>
      </>
    </Container>
  );

}

export default PageDetail;