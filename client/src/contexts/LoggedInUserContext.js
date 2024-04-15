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
      expenses: expenses,
      budgets: budgets,
    };
    setLoggedInUser(user);
  };
  const addBudget = (newbudget) => {
    setLoggedInUser({...loggedInUser, budgets: [...loggedInUser.budgets, newbudget]},)
    console.log(loggedInUser)
  }
  const logOut = () => {
    setLoggedInUser(null);
  };
  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, logIn, logOut, addBudget }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserContextProvider;
