import { createContext } from "react";
import { useState, useEffect } from "react";

export const LoggedInUserContext = createContext();

const LoggedInUserContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const logIn = ({ name, _id, email, expenses, budgets }) => {
    const user = {
      _id: _id,
      email: email,
      name: name,
      expenses: [expenses],
      budgets: [budgets],
    };
    setLoggedInUser(user);
  };
  const logOut = () => {
    setLoggedInUser(null);
  };
  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, logIn, logOut }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserContextProvider;
