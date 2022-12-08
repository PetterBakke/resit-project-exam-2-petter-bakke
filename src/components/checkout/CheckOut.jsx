import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ValidationError from "../../common/FormErrors";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter your full name"),
  address: yup.string().required("Please enter your address"),
  creditcard: yup.string().required("Please enter your credit card number"),
});

const modalDisplayTime = 1500;


function CheckOut() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const itemsInCart = (product) => {
		const cartItems = JSON.parse(localStorage.getItem("Favourites"));
		console.log("This item is in the cart");
		setCart([...cart, product]);
	};

  

  const navigate = useNavigate();

  useEffect(() => {
    setSubmitting(false);
    setCheckoutError(null);
    let timeout;
    if (showModal) {
      timeout = setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, modalDisplayTime);
    }
    return () => clearTimeout(timeout);
  }, [navigate, showModal]);

  const handleClick = () => {
    setShowModal(true);
  }

  return (
    <>
    <h5 className='checkout-cart'>{itemsInCart.length}</h5>
    <Form onSubmit={handleSubmit}>
      <fieldset disabled={submitting}>

    {checkoutError && <ValidationError>{checkoutError}</ValidationError>}
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label {...register('fullname')} className="form-labels">Full name</Form.Label>
        {errors.username && <ValidationError>{errors.fullname.message}</ValidationError>}
        <Form.Control type="full name" placeholder="Enter Full Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label {...register('address')} className="form-labels">Address</Form.Label>
        {errors.username && <ValidationError>{errors.address.message}</ValidationError>}
        <Form.Control type="address" placeholder="Address" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCreditCard">
        <Form.Label {...register('creditcard')} className="form-labels">Credit card details</Form.Label>
        {errors.username && <ValidationError>{errors.creditcard.message}</ValidationError>}
        <Form.Control type="credit card" placeholder="Credit Card" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleClick}>
        {submitting ? "Confirming" : "Confirm Checkout"}
      </Button>
      {showModal && <div>Checkout is Confirmed! You will be redirecte to homepage</div>}
      </fieldset>
    </Form>
    </>
  );
}

export default CheckOut;
