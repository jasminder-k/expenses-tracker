import { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";

const SignIn = () => {
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();
  const context = useContext(LoggedInUserContext);
  const logIn = context.logIn;

  const fetchData = async () => {
    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      return { error: error.message };
    }
  };
  const handleSubmit = async (event) => {
    const toastId = 'test';
    setStatus("fetching");
    event.preventDefault();
    const result = await fetchData();
    if (result.status !== 200) {
      setStatus("idle");
      toast.error(result.message || result.error, {
        type: "error",
        position: "top-right",
        autoClose: false,
        closeOnClick: true,
        transition: Bounce,
        toastId
      });
      //setErrorText(result.message || result.error);
    } else {
      console.log(result);
      logIn(result.data);
      setTimeout(() => {
        navigate("/loggedInHomepage");
      }, 1500);
    }
  };
  return (
    <MainDiv>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-1">
          <h1>Sign In</h1>
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={(event) => {
              setEmailValue(event.target.value);
              setErrorText(null);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(event) => {
              setPasswordValue(event.target.value);
              setErrorText(null);
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark"
          disabled={status !== "idle"}
        >
          {status === "fetching" ? "Signing in" : "Sign in"}
        </button>
        {errorText !== null && (
          <div className="mb-3" style={{ color: "red" }}>
            {errorText}
          </div>
        )}
        <ToastContainer/>
      </form>
    </MainDiv>
  );
};

export default SignIn;

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25vh;
`;
