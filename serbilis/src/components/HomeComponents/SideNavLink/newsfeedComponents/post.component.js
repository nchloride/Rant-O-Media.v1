import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import LoadingScreen from "../../../LoadingScreen";
const formStyleError = {
  transition: ".5s",
  boxShadow: "0 0 3pt 2pt #EA2027",
};
function PostCommponent(props) {
  const { register, errors, handleSubmit, reset } = useForm();
  const [postMessage, setMessage] = useState("");
  const [charLimit, setLimit] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const { refresh, enableRefresh } = props;
  useEffect(() => {
    userAccount();
  }, []);

  const formSubmit = async (data) => {
    await fetch(`/postFeed/addPost`, {
      method: "POST",
      body: JSON.stringify({
        message: data.message,
        type: data.type,
        date: dateNow(),
        username: userInfo?.username,
        token: sessionStorage.getItem("token"),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        enableRefresh(!refresh);
        reset();
        setMessage("");
      })
      .catch((err) => {
        enableRefresh(!refresh);
        reset();
        props.history.push("/");
        setMessage("");
      });
  };

  const userAccount = async () => {
    const resp = await fetch("/islogin");
    const data = await resp.json();
    setUserInfo(data.data[0]);
  };

  const dateNow = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();

    dd = dd < 10 ? "0" + dd : dd;
    mm = mm < 10 ? "0" + (mm + 1) : mm + 1;
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const buttonErrorStyle = {
    backgroundColor: "gray",
    color: "black",
    transition: ".5s",
  };

  const charChecker = (charCount) => {
    let count = charCount.target.value.length;
    setMessage(charCount.target.value);
    console.log(postMessage.length);
    if (count >= 200) {
      setMessage(postMessage.slice(0, -1));
      setLimit(true);
    } else {
      setLimit(false);
    }
  };
  return !userInfo ? (
    <LoadingScreen />
  ) : (
    <div className="post-fill">
      <form onSubmit={handleSubmit(formSubmit)} className="post-fill-form">
        <textarea
          placeholder={`What's up ${userInfo?.fullname}`}
          name="message"
          type="textarea"
          ref={register({ required: true, maxLength: 200 })}
          value={postMessage}
          onChange={charChecker}
          style={errors.message && formStyleError}
        ></textarea>
        <div className="post-fill-buttons">
          <select
            name="type"
            ref={register({
              validate: {
                notEmpty: (value) => value != "",
              },
            })}
          >
            <option value="">Select</option>
            <option value="looking">Looking for</option>
            <option value="offering">Work</option>
          </select>
          {charLimit && "200 WORD LIMIT REACH"}
          <input
            type="submit"
            style={(errors.message || errors.type) && buttonErrorStyle}
          />
        </div>
      </form>
    </div>
  );
}

export default PostCommponent;
