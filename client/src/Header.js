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
      
        {
          /* Log in, log out  links go in here */
          loggedInUser == null ? (
            <>
            <div>
            <NavItem className="navbar-brand" to="/" style={{fontWeight:"bold"}}>
        <img
          src="./assets/headerImage1.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Expenses Tracker
      </NavItem>
      </div>
            <div> 
             <NavItem to="/signIn" style={{color: "black", fontWeight:"bold"}}>Log in</NavItem>
            </div>
            </>
          ) : (
            <>
              <div>
              <NavItem className="navbar-brand" to="/loggedInHomepage" style={{fontWeight:"bold"}}>
        <img
          src="./assets/headerImage1.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Expenses Tracker
      </NavItem>
      </div>
      <div>
              <NavItem to={"/budgets"} style={{color: "black", fontWeight:"bold"}}>Welcome {loggedInUser.name}</NavItem>
              <NavItem to="/" onClick={logOut} style={{color: "black", fontWeight:"bold"}}>
                Log out
              </NavItem>
            </div>
            </>
          )
        }

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
