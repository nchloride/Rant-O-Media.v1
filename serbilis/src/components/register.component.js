import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/register.css";
const wrongInputStyle = {
  boxShadow: "0 0 3pt 2pt red",
};
const RegistrationForm = ({ modal }) => {
  const { handleSubmit, errors, register, reset } = useForm();
  const [message, setMessage] = useState("");
  const { modalOpen, setModalOpen } = modal;

  const formSubmit = async ({
    username,
    password,
    fullname,
    address,
    clientType,
    bio,
  }) => {
    const registerData = await fetch("/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        fullname: fullname,
        address: address,
        clientType: clientType,
        bio: bio,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await registerData.json();
    setMessage(data?.message);
    console.log(data);
    reset();
  };
  return (
    <div className="register-page">
      <form onSubmit={handleSubmit(formSubmit)} className="register-form">
        <div className="register-form-headers">
          <div>
            <h1>Sign up</h1>
            <p>QUICK AND EASY </p>
          </div>

          <button
            className="close-button"
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            X
          </button>
        </div>
        <div className="register-form-inputs">
          <div className="register-form-userpass">
            <input
              name="username"
              placeholder="Username"
              ref={register({
                minLength: 8,
                required: true,
                validate: {
                  mixChar: (value) => /^([a-zA-Z0-9@*#]{8,})$/.test(value),
                },
              })}
              style={errors.username ? wrongInputStyle : null}
            ></input>
            <input
              name="password"
              type="password"
              style={errors.password ? wrongInputStyle : null}
              placeholder="Password"
              ref={register({
                minLength: 8,
                required: true,
                validate: {
                  mixChar: (value) => /^([a-zA-Z0-9@*#]{8,})$/.test(value),
                },
              })}
            ></input>
          </div>
          <input
            name="fullname"
            type="text"
            placeholder="Full Name"
            style={errors.fullname ? wrongInputStyle : null}
            ref={register({
              required: true,
              validate: {
                mixChar: (value) => /^([^0-9]*)$/.test(value),
              },
            })}
          ></input>
          <input
            name="address"
            type="text"
            placeholder="Address"
            style={errors.address ? wrongInputStyle : null}
            ref={register({
              required: true,
            })}
          ></input>
          <input
            name="bio"
            type="text"
            placeholder="Bio"
            style={errors.bio ? wrongInputStyle : null}
            ref={register({
              required: true,
            })}
          ></input>
          <select
            name="clientType"
            style={errors.clientType ? wrongInputStyle : null}
            ref={register({
              required: true,
              validate: (value) => value !== "Select user-type",
            })}
          >
            <option>Select user-type</option>
            <option value="worker">Work</option>
            <option value="client">Client</option>
          </select>
        </div>
        {errors.username?.type === "validate" &&
          "username should consist of numbers and letters"}
        {message && message}
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default RegistrationForm;
