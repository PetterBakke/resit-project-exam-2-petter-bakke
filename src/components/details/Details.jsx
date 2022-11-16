import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Details_url } from "../../constants/api";
import { AiOutlineHeart } from "react-icons/ai";

function PageDetail() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  const url = Details_url + id + "/?populate=*";

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(function (err) {
        setError(err);
      });
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='page-detail'>
        <div>
          <img src={product.data.attributes.image.data[0].attributes.url} alt="This is the product cover" className="product-img" />
          <AiOutlineHeart className="fav-button" />
          <p key={product.data.attributes.title} className="p-title">{product.data.attributes.title}</p>
        </div>
        <div className='subgrid'>
          <h5 className='heading-description'>{product.data.attributes.description}</h5>
        </div>
      </div>
    </>
  );
}

export default PageDetail;