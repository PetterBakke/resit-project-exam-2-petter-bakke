import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Details_url } from "../constants/api";

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
         <img src={product.data.attributes.image.data[0].attributes.url} alt="This is the product cover" className="detail-img" />
         <p key={product.id} className="p-description">{product.data.attributes.description}</p>
         <div className='subgrid'>
         <p key={product.data.attributes.title} className="p-title">{product.data.attributes.title}</p>
         </div>
        </div>    
    </>
  );
}

export default PageDetail;