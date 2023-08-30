import React, { useState } from "react";
import TextField from "../../../UI/TextField/TextField";
import Button from "../../../UI/Button/Button";
import { Form, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/use-input";
import { isEmail, isNotEmpty } from "../../../Utils/Utils";
import styles from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../../stores/auth";
import { AuthAPI } from "../../../apis/authAPIs";
import { enqueueSnackbar } from "notistack";
import { CartActions } from "../../../stores/cart";

function LoginForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(false);
  const {
    valueInput: emailInput,
    valueIsValid: emailIsValid,
    hasError: isErrorEmailInput,
    handleChangeBlurInput: handleBlurEmail,
    handleChangeValueInput: handleChangeEmail,
    reset: emailReset,
  } = useInput(isEmail);

  const {
    valueInput: passwordInput,
    valueIsValid: passwordIsValid,
    hasError: isErrorPasswordInput,
    handleChangeBlurInput: handleBlurPassword,
    handleChangeValueInput: handleChangePassword,
    reset: passwordReset,
  } = useInput(isNotEmpty);

  let isFormValid = false;

  if (emailIsValid && passwordIsValid) {
    isFormValid = true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      const res = await AuthAPI.login({
        email: emailInput,
        password: passwordInput,
      });

      if (res.status !== 200) {
        setErrors(res.data.data);
        enqueueSnackbar("Login Fail!", { variant: "error" });
      } else {
        enqueueSnackbar("Login Success!", { variant: "success" });
        handleUserLogin(res.data.user);
      }
    }
  };

  const handleUserLogin = (user) => {
    dispatch(CartActions.setCurrentUserCart(user.cart.items));
    dispatch(AuthActions.onLogin(user));
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit} method="post">
      {errors && (
        <>
          {errors.map((item, index) => (
            <p className={`${styles["error-text"]}`} key={index}>
              {item.msg}
            </p>
          ))}
        </>
      )}
      <TextField
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChangeEmail}
        onBlur={handleBlurEmail}
        value={emailInput}
        error={{ isError: isErrorEmailInput, messsage: "Invalid email" }}
      />
      <TextField
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChangePassword}
        onBlur={handleBlurPassword}
        value={passwordInput}
        error={{ isError: isErrorPasswordInput, messsage: "Required field" }}
      />

      <Button
        style={{ marginBlock: "1rem" }}
        type="submit"
        disabled={!isFormValid}
      >
        Sign in
      </Button>
    </Form>
  );
}

export default LoginForm;
