import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import { auth_url } from '../constants/api';
import * as yup from 'yup';
import axios from 'axios';
import FormError from "./FormError";
import { Navigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

const schema = yup.object().shape({
  identifier: yup.string().required('Please enter an email adress').email('Please enter a valid email adress'),
  password: yup.string().required('Password is required'),
});

function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [ auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log("data", data);

    try {
      const response = await axios.post(auth_url, data);
      console.log("response", response.data);
      setAuth(response.data);
      setLoggedIn(true);
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
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

export default LoginForm;