import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();

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
    setStatus("fetching");
    event.preventDefault();
    const result = await fetchData();
    if (result.status !== 200) {
      setStatus("idle");
      setErrorText(result.message || result.error);
    } else {
      console.log(result);
      //if there is any budget that has not yet expired show it ??#no
      // or show the past budgets if there are any??#yes
      // in case if there is not any budget show the create budget form# show no budgets to show and a button add budget
      navigate("/budget");
    }
  };
  return (
    <MainDiv>
      <form
        onSubmit={(event) => handleSubmit(event)}
        style={{ border: "2px solid blue" }}
      >
        <Div>
          <label>Email</label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(event) => {
              setEmailValue(event.target.value);
              setErrorText(null);
            }}
          />
        </Div>
        <Div>
          <label>Password</label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(event) => {
              setPasswordValue(event.target.value);
              setErrorText(null);
            }}
          />
        </Div>
        <button
          type="submit"
          disabled={status !== "idle"}
          style={{ marginLeft: "17vh", marginBottom: "5vh" }}
        >
          {status === "fetching" ? "Signing in" : "Sign in"}
        </button>
        {errorText !== null && <p style={{border:"2px solid red"}}>{errorText}</p>}
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
const Div = styled.div`
  margin: 5vh;
`;

const Input = styled.input`
  margin-left: 10px;
`;
