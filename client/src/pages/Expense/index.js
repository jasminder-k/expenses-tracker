import { useContext, useState } from "react";
import { useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import EditExpenseForm from "../EditBudgetForm";

const Expense = ({ expenseId, budgetId }) => {
  console.log("expenseId", expenseId);
  const [expenses, setExpenses] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();
  const fetchExpense = async () => {
    //console.log(`/expense/${expenseId}`);
    console.log(budgetId);
    console.log(`/budgets/${budgetId._id}/expenses`);
    const res = await fetch(`/budgets/${budgetId._id}/expenses`);
    const result = await res.json();
    console.log(result);
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
  }, [expenseId]);

  console.log(expenses);

  return (
    <>
      <tr>
        {expenses != null &&
          expenses.map((expense) => {
            return Object.values(expense).map((row, index) => {
              return <td key={index}>{row}</td>;
            });
          })}
        <td>
          <button
            onClick={() =>
              navigate(`/budgets/${budgetId._id}/expenses/${expenseId}`)
            }
          >
            <i className="fa-solid fa-pen"></i>
          </button>
        </td>
        <td>
          <button>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default Expense;
