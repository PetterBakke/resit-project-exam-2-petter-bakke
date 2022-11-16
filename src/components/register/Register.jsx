import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import { auth_url } from '../../constants/api';
import * as yup from 'yup';
import axios from 'axios';
import FormError from "../login/FormError";
import { Navigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

const schema = yup.object().shape({
  identifier: yup.string().required('Please enter an email adress').email('Please enter a valid email adress'),
  password: yup.string().required('Password is required'),
});

function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log("data", data);

    axios
      .post('http://localhost:1337/api/auth/local/register', {
        username: 'Strapi user',
        email: 'user@strapi.io',
        password: 'strapiPassword',
      })
      .then(response => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });

  }

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginError && <FormError>{loginError}</FormError>}
      <fieldset disabled={submitting}>
        <div>
          <input name="identifier" placeholder="Email" {...register("identifier")} />
          {errors.identifier && <FormError>{errors.identifier.message}</FormError>}
          {loggedIn && (<Navigate to="/" replace={true} />)}
        </div>

        <div>
          <input name="password" placeholder="Password" {...register("password")} />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </div>

        <button>{submitting ? "Loggin in..." : "Login"}</button>
      </fieldset>
    </form>
  );
}

export default RegisterForm;