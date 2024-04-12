import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { LoggedInUserContext } from "./contexts/LoggedInUserContext";
import { useContext, useState } from "react";

const Header = () => {
  const context = useContext(LoggedInUserContext);
  const loggedInUser = context.loggedInUser;
  console.log(loggedInUser);
  const logOut = context.logOut;

  return (
    <nav className="navbar navbar-light">
      <NavItem className="navbar-brand" to="/">
        <img
          src="./assets/headerImage.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Expenses Tracker
      </NavItem>
      <div>
        {
          /* Log in, log out  links go in here */
          loggedInUser == null ? (
            <div>
              <NavItem to="/signIn">Log in</NavItem>
            </div>
          ) : (
            <div>
              <NavItem to={"/budgets"}>Welcome {loggedInUser.name}</NavItem>
              <NavItem to="/" onClick={logOut}>
                Log out
              </NavItem>
            </div>
          )
        }
      </div>
    </nav>
  );
};

export default Header;

const NavItem = styled(NavLink)`
  margin: 0 0.5rem;
  margin: 0 0.5rem;
  text-decoration: none;
  box-sizing: border-box;
  padding: 5px;
`;
