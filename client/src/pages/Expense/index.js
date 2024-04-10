import { useContext, useState } from "react";
import { useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import EditExpenseForm from "../EditBudgetForm";

const Expense = ({ expenseId }) => {
  const [expense, setExpense] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();
  const fetchBudget = async () => {
    console.log(`/expenses/${expenseId.toString()}`);
    const res = await fetch(`/expenses/${expenseId}`);
    const result = await res.json();
    console.log(result);
    return result;
  };
  useEffect(() => {
    const getExpense = async () => {
      try {
        const result = await fetchBudget();
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
        {expense && Object.values(expense).map((row, index) => <td key={index}>{row}</td>)}
        <td>
          <button onClick={()=> navigate(`/editExpense/${expense._id}`)}>
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
