import { useState } from "react";

const SignUp = () => {
    const [emailValue, setEmailValue] = useState(null);
    const [passwordValue, setPasswordValue] = useState(null);
    const [nameValue, setNameValue] = useState(null);
    //const [status, setStatus] = useState("idle");
    //const [errorText, setErrorText] = useState(null);
    const fetchData = async () => {
        try {
          const response = await fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: emailValue, password: passwordValue, name: nameValue }),
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
        event.preventDefault();
        const result = await fetchData();
        if (result.status !== 200) {
         // setStatus("idle");
          //setErrorText(result.message || result.error);
        } else {
          //logIn(result.userDetails);
          navigate("/");
        }
      };
    return(<div>
         <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(event) => {
              setEmailValue(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(event) => {
              setPasswordValue(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={(event) => {
              setNameValue(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <button type="submit">
          Sign up
        </button>
      </form>
    </div>)
}

export default SignUp;