import { useContext, useState } from "react";
import { useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import EditExpenseForm from "../EditBudgetForm";
import Modal from "../Modal";

const Expense = ({ expenseId, budgetId, showModal, setShowModal }) => {
  console.log("expenseId", expenseId);
  const [expense, setExpense] = useState(null);

  const navigate = useNavigate();
  const fetchExpense = async () => {
    //console.log(`/expense/${expenseId}`);
    console.log(budgetId);
    console.log(`/budgets/${budgetId._id}/expenses/${expenseId._id}`);
    //"/budgets/:budgetId/expenses/:_id"
    const res = await fetch(`/budgets/${budgetId._id}/expenses/${expenseId._id}`);
    const result = await res.json();
    console.log(result);
    return result;
  };
  useEffect(() => {
    const getExpense = async () => {
      try {
        const result = await fetchExpense();
        setExpense(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    getExpense();
  }, [expenseId]);

  console.log(expense);

  return (
    <>
      <tr>
        {expense != null &&
         /* expenses.map((expense) => {
            return Object.values(expense).map((row, index) => {
              return <td key={index}>{row}</td>;
            });
          })}*/
          Object.values(expense).map((row, index) => (
            <td
              key={index}
            >
              {row}
            </td>
          ))}
        <td>
          <button type="button" className="btn btn-primary" onClick={() => navigate(`/budgets/${budgetId._id}/expenses/${expenseId._id}`)}>
          <svg
          style={{height:"20px"}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
          </svg>
          </button>
        </td>
        <td>
        <button onClick={()=> setShowModal(expense)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <svg 
        style={{height:"20px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
        </button>
        </td>
      </tr>
    </>
  );
};

export default Expense;