import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import styled from "styled-components";
import BudgetForm from "../../BudgetForm";
import Budget from "../Budget";
import 'font-awesome/css/font-awesome.min.css';
import GenerateExcel from "../GenerateExcel";

const Budgets = () => {
  const { name } = useParams();
  const [budgets, setBudgets] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [generateExcel, setGenerateExcel] = useState(null);
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
            <h1 style={{textAlign: "center"}}>Budgets</h1>
                  <button
                  style={{ marginLeft: "83vw", marginTop: "4vh", marginBottom:"4vh" }}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                  hidden = {showForm}
                >
                  Add new budget
                </button>
                {generateExcel && <GenerateExcel budget={generateExcel}/>}
            {loggedInUser.budgets.length > 0 ? (
              <>
                <table className="table" style={{maxWidth:"80vw", marginRight: "20vw", marginLeft: "10vw"}}>
                <thead>
                  <tr>
                    {headings.map((head, index) => (
                      <th key={index} scope="col">{head}</th>
                    ))}
                    <th scope ="col">Edit</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead>
                <tbody>
                    {loggedInUser.budgets.map((budget)=>{return<Budget key={budget} budgetId={budget} setGenerateExcel={setGenerateExcel}/>})}
                </tbody>
      </table>
      </>
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


