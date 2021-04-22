import classes from "./Checkout.module.css";
import React, { useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isDiferentFiveChart = (value) => value.trim().length !== 5;
const isDiferentEightChart = (value) => value.trim().length !== 8;

const isValidInput = (
  object,
  key,
  setFunction,
  validFunction,
  message = "field required"
) => {
  if (validFunction(object[key].value)) {
    setFunction((prevForm) => ({
      ...prevForm,
      [key]: {
        value: object[key].value,
        valid: false,
        touch: true,
        message,
      },
    }));
    return false;
  }
  setFunction((prevForm) => ({
    ...prevForm,
    [key]: { value: object[key].value, valid: true, touch: true, message: "" },
  }));
  return true;
};

const formIsValid = (form, setForm) => {
  return (
    isValidInput(form, "name", setForm, isEmpty) &&
    isValidInput(form, "email", setForm, isEmpty) &&
    isValidInput(form, "street", setForm, isEmpty) &&
    isValidInput(
      form,
      "postal",
      setForm,
      isDiferentFiveChart,
      "must have 5 charts"
    ) &&
    isValidInput(
      form,
      "password",
      setForm,
      isDiferentEightChart,
      "must have 8 charts"
    ) &&
    isValidInput(form, "city", setForm, isEmpty)
  );
};

const Checkout = (props) => {
  const [form, setForm] = useState({
    name: { value: "", valid: false, touche: false, message: "" },
    email: { value: "", valid: false, touche: false, message: "" },
    street: { value: "", valid: false, touche: false, message: "" },
    postal: { value: "", valid: false, touche: false, message: "" },
    password: { value: "", valid: false, touche: false, message: "" },
    city: { value: "", valid: false, touche: false, message: "" },
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    //validate and show error
    console.log("formIsValid");
    if (formIsValid(form, setForm)) {
        props.onConfirm(form); // send
    }
  };

  const changeHandler = (event, validFuntion) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: {
        value: event.target.value,
        valid: !validFuntion(event.target.value),
        touch: true,
        message: "",
      },
    }));
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !form.name.valid && form.name.touch && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name.value}
          onChange={(event) => changeHandler(event, isEmpty)}
        />
        {!form.name.valid && form.name.touch && <p>{form.name.message}</p>}
      </div>
      <div
        className={`${classes.control} ${
          !form.password.valid && form.password.touch && classes.invalid
        }`}
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password.value}
          onChange={(event) => changeHandler(event, isEmpty)}
        />
        {!form.password.valid && form.password.touch && <p>{form.password.message}</p>}
      </div>
      <div
        className={`${classes.control} ${
          !form.email.valid && form.email.touch && classes.invalid
        }`}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email.value}
          onChange={(event) => changeHandler(event, isEmpty)}
        />
        {!form.email.valid && form.email.touch && <p>{form.email.message}</p>}
      </div>
      <div
        className={`${classes.control} ${
          !form.street.valid && form.street.touch && classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          id="street"
          value={form.street.value}
          onChange={(event) => changeHandler(event, isEmpty)}
        />
        {!form.street.valid && form.street.touch && (
          <p>{form.street.message}</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !form.postal.valid && form.postal.touch && classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          name="postal"
          id="postal"
          value={form.postal.value}
          onChange={(event) => changeHandler(event, isDiferentFiveChart)}
        />
        {!form.postal.valid && form.postal.touch && (
          <p>{form.postal.message}</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !form.city.valid && form.city.touch && classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={form.city.value}
          onChange={(event) => changeHandler(event, isEmpty)}
        />
        {!form.city.valid && form.city.touch && <p>{form.city.message}</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
