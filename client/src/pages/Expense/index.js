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
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/budgets/${budgetId._id}/expenses/${expenseId._id}`)}>
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
        <button onClick={()=> setShowModal(expense)} type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <svg style={{height:"20px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
        </button>
        </td>
      </tr>
    </>
  );
};

export default Expense;
