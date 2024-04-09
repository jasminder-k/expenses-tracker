import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import styled from "styled-components";
import Table from "../../Table";

const Budget = () => {
const { name } = useParams();
const {_id} = useParams();
const [userDetails, setUserDetails] = useState(null);
  const context = useContext(LoggedInUserContext);
  const loggedInUser = context.loggedInUser;

  //console.log(faceDetails)
  return (
    <>
      { // show the past budgets if there are any??#yes
      // in case if there is not any budget show the create budget form# show no budgets to show and a button add budget
      loggedInUser ? (
        <main>
          {loggedInUser.budgets.count>0 ? 
            <Table/> : <div><button>Create budget</button></div>}
        </main>
      ) : (
        <Centered>Loading ...</Centered>
      )}
    </>
  );
      }
export default Budget;

const Centered = styled.main`
  margin-top: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: var(--min-details-content-height);
  background-color: white;
`;

const Banner = styled.img`
  position: absolute;
  top: -20vw;
  left: 0;
  width: 100vw;
  z-index: -1;
  overflow: hidden;
  @media only screen and (max-width: 800px) {
    top: -100px;
  }
  @media only screen and (max-width: 500px) {
    top: 0px;
  }
`;