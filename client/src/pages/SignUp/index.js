import { useState } from "react";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const [nameValue, setNameValue] = useState(null);
  //const [status, setStatus] = useState("idle");
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          name: nameValue,
        }),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      return { error: error.message };
    }
  };

  const handleSubmit = async (event) => {
    // setStatus("fetching");
    const toastId = "test";
    event.preventDefault();
    const result = await fetchData();
    if (result.status !== 201) {
      // setStatus("idle");
      toast.error(result.message, {
        type: "error",
        position: "top-right",
        autoClose: false,
        closeOnClick: true,
        transition: Bounce,
        toastId,
      });
      //setErrorText(result.message || result.error);
    } else {
      toast.success("User created successfully", {
        type: "success",
        position: "top-center",
        autoClose: 4000, //4 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId,
        transition: Slide,
      });

      setTimeout(() => {
        navigate("/signIn");
      }, 4500);
    }
  };
  /* <Img src="/assets/headerImage.jpg" alt="image"/>*/
  return (
    <MainDiv>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-1">
          <h1>Registration Form</h1>
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Enter your name"
            onChange={(event) => {
              setNameValue(event.target.value);
              setErrorText(null);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
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
            placeholder="Enter password"
            onChange={(event) => {
              setPasswordValue(event.target.value);
              setErrorText(null);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
        {errorText !== null && (
          <div className="mb-3" style={{ color: "red" }}>
            {errorText}
          </div>
        )}
        <ToastContainer />
      </form>
    </MainDiv>
  );
};

export default SignUp;

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25vh;
`;

const Img = styled.img`
  background-position: "center";
  background-repeat: "no-repeat";
  background-size: "cover";
  height: 100vh;
  width: 100vw;
`;
