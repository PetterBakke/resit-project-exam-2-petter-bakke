import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ValidationError from "../../common/FormErrors";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter your full name"),
  address: yup.string().required("Please enter your address"),
  creditcard: yup.string().required("Please enter your credit card number").min(16, "Number must have 16 digits").max(16, "Number must have 16 digits"),
});


function CheckOut() {
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const numItems = JSON.parse(localStorage.getItem("Favourites")).length;

  const navigate = useNavigate();

  const handleForm = (event) => {
    setSubmitting(true);
    handleShowModal();
    console.log(event);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSubmitting(false);
  }
  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleConfirm = () => {
    setLoading(true);
    setSubmitting(false);
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 800)
  }

  return (
    <>
      <Container >
        <h5 className='checkout-cart'>{numItems}</h5>
        <Form noValidate onSubmit={handleSubmit(handleForm)}>
          <fieldset disabled={submitting}>

            {checkoutError && <ValidationError>{checkoutError}</ValidationError>}
            <Form.Group className="mb-3" controlId="formBasicFullName">
              <Form.Label className="form-labels">Full name</Form.Label>
              {errors.fullname && <ValidationError>{errors.fullname.message}</ValidationError>}
              <Form.Control required type="text" {...register('fullname')} placeholder="Enter Full Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label className="form-labels">Address</Form.Label>
              {errors.address && <ValidationError>{errors.address.message}</ValidationError>}
              <Form.Control required type="text" {...register('address')} placeholder="Address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCreditCard">
              <Form.Label className="form-labels">Credit card details</Form.Label>
              {errors.creditcard && <ValidationError>{errors.creditcard.message}</ValidationError>}
              <Form.Control required type="text" {...register('creditcard')} placeholder="Credit Card" />
            </Form.Group>
           
            <Button className='checkoutButton' type="submit">
              {submitting ? "Confirming" : "Confirm Checkout"}
            </Button>
          </fieldset>
        </Form>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to confirm the order?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              {loading && <Spinner animation="border" size="sm" />}
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </>
  );
}

export default CheckOut;
