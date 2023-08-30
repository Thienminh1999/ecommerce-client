import React, { useState } from "react";

function useInput(validationInputFn) {
  const [valueInput, setValueInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validationInputFn(valueInput);
  const hasError = !valueIsValid && isTouched;

  const handleChangeValueInput = (event) => {
    setValueInput(event.target.value);
  };

  const handleChangeBlurInput = () => {
    setIsTouched(true);
  };

  function reset() {
    setValueInput("");
    setIsTouched(false);
  }

  return {
    valueInput,
    hasError,
    valueIsValid,
    handleChangeBlurInput,
    handleChangeValueInput,
    reset,
  };
}

export default useInput;
