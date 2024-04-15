import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import styled from "styled-components";
import ExpensesForm from "../ExpensesForm";
import Expense from "../Expense";
import "font-awesome/css/font-awesome.min.css";
import Modal from "../Modal";
import Homepage from "../Homepage";

const Expenses = () => {
  const { name } = useParams();
  const budgetId = useParams();
  const [expenses, setExpenses] = useState(null);
  const [showExpensesForm, setShowExpensesForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const context = useContext(LoggedInUserContext);
  const loggedInUser = context.loggedInUser;
  const navigate = useNavigate();

  const fetchExpense = async () => {
    const res = await fetch(`/budgets/${budgetId._id}/expenses`);
    const result = await res.json();
    return result;
  };
  useEffect(() => {
    const getExpense = async () => {
      try {
        const result = await fetchExpense();
        setExpenses(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    getExpense();
  }, [budgetId]);

  const headings = ["Item", "Date", "Price", "Category"];
  return (
    <>
      {
        // show the expenses if there are any??#yes
        // in case if there is not any expense show the create expense form# show no expenses to show and a button add expense
        loggedInUser ? (
          <main>
            <h1 style={{ textAlign: "center" }}>Expenses </h1>
            <button
              style={{
                marginLeft: "75vw",
                marginTop: "4vh",
                marginBottom: "4vh",
              }}
              type="button"
              className="btn btn-dark"
              onClick={() => setShowExpensesForm(!showExpensesForm)}
            >
              Add a new expense
            </button>
            <Modal expense={showModal} userId={loggedInUser._id} />
            {expenses!=null && expenses.length > 0 ? (
              <>
                <table
                  className="table table-secondary"
                  style={{
                    maxWidth: "80vw",
                    marginRight: "20vw",
                    marginLeft: "10vw",
                  }}
                >
                  <thead>
                    <tr className="table-dark">
                      {headings.map((head, index) => (
                        <th key={index} scope="col">
                          {head}
                        </th>
                      ))}
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense, index) => {
                      return (
                        <Expense
                          key={expense._id}
                          budgetId={budgetId}
                          expenseId={expense}
                          showModal={showModal}
                          setShowModal={setShowModal}
                        />
                      );
                    })}
                  </tbody>
                </table>
                <button
                  style={{ marginLeft: "10vw" }}
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {
                    navigate("/budgets");
                  }}
                >
                  Go back to Budgets list
                </button>
              </>
            ) : (
              <div>
                <table
                  hidden={showExpensesForm}
                  style={{
                    maxWidth: "80vw",
                    marginRight: "20vw",
                    marginLeft: "10vw",
                    marginTop: "10vh",
                  }}
                  className="table"
                >
                  <thead>
                    <tr>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> No expenses to show</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  style={{ marginTop: "8vh", marginLeft: "24vh" }}
                  type="button"
                  className="btn btn-dark"
                  hidden={showExpensesForm}
                  onClick={() => {
                    navigate("/budgets");
                  }}
                >
                  Go back to Budgets list
                </button>
              </div>
            )}
              {showExpensesForm && <ExpensesForm budgetId={budgetId} />}
          </main>
        ) : (
          <Homepage />
        )
      }
    </>
  );
};

export default Expenses;

const Centered = styled.main`
  margin-top: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: var(--min-details-content-height);
  background-color: white;
`;
