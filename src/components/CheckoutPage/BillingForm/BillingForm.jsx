import React from "react";
import styles from "./BillingForm.module.css";
import FormControl from "../../../UI/FormControl/FormControl";
import { Form, useNavigate } from "react-router-dom";
import Button from "../../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "../../../stores/cart";
import { ShopAPI } from "../../../apis/shopAPIs";
import { enqueueSnackbar } from "notistack";

function BillingForm(props) {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    const res = await ShopAPI.order(formProps);
    if (res.status === 200) {
      dispatch(CartActions.resetCart());
      enqueueSnackbar("Order success!", { variant: "success" });
      navigate("/");
    } else {
      enqueueSnackbar("Order Fail!", { variant: "error" });
    }
  };
  return (
    <Form
      onSubmit={handleSubmit}
      method="post"
      action="/checkout"
      className={styles.container}
    >
      <FormControl
        required
        name="fullName"
        label="Full name:"
        placeholder="Enter your full name here"
        defaultValue={currentUser ? currentUser.fullName : ""}
      />
      <FormControl
        type="text"
        name="email"
        label="Email:"
        placeholder="Enter your email here"
        defaultValue={currentUser ? currentUser.email : ""}
      />
      <FormControl
        required
        name="phone"
        label="Phone number:"
        placeholder="Enter your phone number here"
        defaultValue={currentUser ? currentUser.phone : ""}
      />
      <FormControl
        required
        name="address"
        label="Address:"
        placeholder="Enter your address here"
      />
      <input readOnly value={JSON.stringify(cartList)} name="cart" hidden />
      {currentUser && <Button>Place order</Button>}
    </Form>
  );
}

export default BillingForm;

// export const action = async ({ params, request }) => {
//   const data = Object.fromEntries(await request.formData());
//   console.log(data);
//   resetCurrentUserCart();
//   alert("Checkout success!");
//   return redirect("/");
// };
