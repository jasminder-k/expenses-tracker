import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import styled from "styled-components";
import BudgetForm from "../../BudgetForm";
import Budget from "../Budget";
import 'font-awesome/css/font-awesome.min.css';

const Budgets = () => {
  const { name } = useParams();
  const [budgets, setBudgets] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const context = useContext(LoggedInUserContext);
  const loggedInUser = context.loggedInUser;

  const headings = ["ID","Total Amount", "Expiry Date"];
  return (
    <>
      {
        // show the past budgets if there are any??#yes
        // in case if there is not any budget show the create budget form# show no budgets to show and a button add budget
        loggedInUser ? (
          <main>
                  <button
                  style={{ marginLeft: "75vw", marginTop: "4vh" }}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                  hidden = {showForm}
                >
                  Add new budget
                </button>
            {loggedInUser.budgets.length > 0 ? (
              
                <table className="table">
                <thead>
                  <tr>
                    {headings.map((head, index) => (
                      <th key={index} scope="col">{head}</th>
                    ))}
                    <th scope ="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                    {loggedInUser.budgets.map((budget)=>{return<Budget key={budget} budgetId={budget}/>})}
                </tbody>
      </table>
            ) : (
              <div>
                <button
                  style={{ marginLeft: "75vw", marginTop: "4vh" }}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  Create budget
                </button>

                <table
                  hidden={showForm}
                  style={{ marginTop: "10vh" }}
                  className="table"
                >
                  <thead>
                    <tr>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> No budgets available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {showForm && <BudgetForm />}
          </main>
        ) : (
          <Centered>Loading ...</Centered>
        )
      }
    </>
  );
};
export default Budgets;

const Centered = styled.main`
  margin-top: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: var(--min-details-content-height);
  background-color: white;
`;

