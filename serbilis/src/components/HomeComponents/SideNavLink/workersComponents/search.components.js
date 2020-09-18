import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";
import { ProfileView } from "../../../ViewProfile";
export default function SearchComponent({ setSearchedUser, setLoading }) {
  const { handleSubmit, register } = useForm();
  const [name, setName] = useState();
  const [viewProfile, setViewProfile] = useContext(ProfileView);
  const getUser = async (data) => {
    console.log(data);
    setLoading(true);
    await fetch("/selectUser", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: data.user,
        token: sessionStorage.getItem("token"),
      }),
    })
      .then((data) => data.json())
      .then((result) => {
        setSearchedUser(result);
        setViewProfile({ ...viewProfile, profileInfo: result });
        setName(data.user);
        setLoading(false);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  const removeLogo = (bool) => {
    bool
      ? document
          .getElementsByClassName("workers-search-logo")[0]
          .classList.add("workers-search-logo-remove")
      : document
          .getElementsByClassName("workers-search-logo")[0]
          .classList.remove("workers-search-logo-remove");
  };
  return (
    <>
      <form onSubmit={handleSubmit(getUser)} className="workers-search-form">
        <SearchIcon className={"workers-search-logo"} />
        <input
          type="text"
          name="user"
          ref={register({ required: true })}
          onFocus={() => removeLogo(true)}
          onBlur={() => removeLogo(false)}
          placeholder="Search people"
        ></input>

        {name && (
          <p>
            You searched for <br /> "{name}"
          </p>
        )}
      </form>
    </>
  );
}
