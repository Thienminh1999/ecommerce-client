import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import TextField from "../../../UI/TextField/TextField";
import Button from "../../../UI/Button/Button";
import styles from "./RegisterForm.module.css";
import useInput from "../../../hooks/use-input";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../../stores/userStorage";
import {
  isEmail,
  isEmailNotDuplication,
  isMoreThanEightChar,
  isNotEmpty,
} from "../../../Utils/Utils";
import { enqueueSnackbar } from "notistack";
import { AuthAPI } from "../../../apis/authAPIs";

const addUserToUserArr = (newUser) => {
  const arrEmail = getFromLocalStorage("userArr") || [];
  arrEmail.push(newUser);
  setToLocalStorage("userArr", arrEmail);
};

function RegisterForm(props) {
  const [errors, setErrors] = useState();

  const navigate = useNavigate();
  const {
    valueInput: fullNameInput,
    valueIsValid: fullNameIsValid,
    hasError: isErrorFullNameInput,
    handleChangeBlurInput: handleBlurFullName,
    handleChangeValueInput: handleChangeFullName,
    reset: fullNameReset,
  } = useInput(isNotEmpty);

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

  const {
    valueInput: phoneInput,
    valueIsValid: phoneIsValid,
    hasError: isErrorPhoneInput,
    handleChangeBlurInput: handleBlurPhone,
    handleChangeValueInput: handleChangePhone,
    reset: phoneReset,
  } = useInput(isMoreThanEightChar);

  let isFormValid = false;

  if (fullNameIsValid && emailIsValid && passwordIsValid && phoneIsValid) {
    isFormValid = true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      const newUser = {
        fullName: fullNameInput,
        email: emailInput,
        password: passwordInput,
        phone: phoneInput,
        role: "CUSTOMER",
      };
      const res = await AuthAPI.signup(newUser);
      if (res.status !== 201) {
        setErrors(res.data.data);
        enqueueSnackbar("Sign Up Fail!", { variant: "error" });
      } else {
        enqueueSnackbar("Sign Up Success!", { variant: "success" });
        handleRegisterUser();
      }
    }
  };

  const handleRegisterUser = () => {
    fullNameReset();
    emailReset();
    passwordReset();
    phoneReset();
    navigate("?mode=login");
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
        type="text"
        name="fullName"
        placeholder="Full Name"
        onChange={handleChangeFullName}
        onBlur={handleBlurFullName}
        value={fullNameInput}
        error={{ isError: isErrorFullNameInput, messsage: "Required field" }}
      />
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
      <TextField
        type="text"
        name="phone"
        placeholder="Phone"
        onChange={handleChangePhone}
        onBlur={handleBlurPhone}
        value={phoneInput}
        error={{ isError: isErrorPhoneInput, messsage: "Required field" }}
      />
      <Button disabled={!isFormValid} className={styles.button} type="submit">
        Sign up
      </Button>
    </Form>
  );
}

export default RegisterForm;
