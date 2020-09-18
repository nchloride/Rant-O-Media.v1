import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import { useHistory } from "react-router-dom";
import Loader from "./LoadingPage";
import WorkIcon from "@material-ui/icons/Work";
import RegisterComponent from "./register.component";
import Modal from "react-modal";
// import { isLogin } from "./postActions/postsActions";
// import { useDispatch, useSelector } from "react-redux";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "600px",
    width: "500px",
    backgroundColor: "grey",
    boxShadow: "10px 10px 20px black",
  },
};

export const LoginForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [login, setLogin] = useState();
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  // const login1 = useSelector((state) => state.isLogin);
  // const { userInformation, isLoading } = login1;
  const history = useHistory();
  useEffect(() => {
    Modal.setAppElement("body");
    const credentials = async () => {
      setLoading(!loading);
      const userData = await fetch("/islogin");
      const data = await userData.json();
      // dispatch(isLogin());

      if (data.data !== "No User Found") {
        setLoading(!loading);
        localStorage.setItem("secretkey", data.data[0].password);
        history.push("/home");
      } else {
        setLoading(false);
        history.push("/");
      }
    };
    credentials();
  }, []);

  const userLogin = async ({ username, password }) => {
    setLoading(!loading);
    const response = await fetch("/userlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data.loggedIn);
    if (data.loggedIn === true) {
      setLogin(data);
      setLoading(!loading);
      // sessionStorage.setItem("token", `Bearer ${data.token}`);
      sessionStorage.setItem("token", data.token);

      props.history.push("/home");
    } else if (data.loggedIn === false) {
      console.log("wew");
      setLoading(false);
      setLogin(data);
    }
  };
  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="login--form">
          <link
            href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
            rel="stylesheet"
          ></link>
          <form onSubmit={handleSubmit(userLogin)} className="login-form">
            <div className="login-form--header">
              <div className="appLogo">
                <h1>SERBILIS</h1>
              </div>
            </div>
            <div className="login-form-inputs">
              <input
                name="username"
                placeholder="Username"
                type="text"
                ref={register({ required: true })}
              ></input>
              {errors.username && "this is required"}
              <input
                name="password"
                type="password"
                placeholder="Password"
                ref={register({ required: true })}
              ></input>
              {errors.password && "this is required"}
            </div>
            <input type="submit"></input>
            {login?.loggedIn === false && "Username and Password is incorrect"}
            <a onClick={() => setModalOpen(true)}>Doesn't have an account? </a>
          </form>
          <Modal isOpen={modalOpen} style={customStyles}>
            <RegisterComponent
              modal={{ modalOpen, setModalOpen }}
            ></RegisterComponent>
          </Modal>
        </div>
      )}
    </div>
  );
};
export default LoginForm;
