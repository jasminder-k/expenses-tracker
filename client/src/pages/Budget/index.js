import { useContext, useState } from "react";
import { useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import EditBudgetForm from "../EditBudgetForm";

const Budget = ({ budgetId, setGenerateExcel }) => {
  const [budget, setBudget] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [testBudgetId, setTestBudgetId] = useState(null)
  const navigate = useNavigate();
  const fetchBudget = async () => {
    console.log(`/budget/${budgetId}`);
    const res = await fetch(`/budget/${budgetId}`);
    const result = await res.json();
    console.log(result);
    return result;
  };
  useEffect(() => {
    const getBudget = async () => {
      try {
        const result = await fetchBudget();
        setBudget(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    getBudget();
  }, [budgetId]);

  console.log(budget);

  return (
    <>
      <tr>
        {budget &&
          Object.values(budget).map((row, index) => (
            <td
              key={index}
              onClick={() => navigate(`/budgets/${budget._id}/expenses`)}
            >
              {row}
            </td>
          ))}
        <td>
          <svg
          style={{height:"20px"}}
            onClick={() => navigate(`/editBudget/${budget._id}`)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
          </svg>
        </td>
        <td hidden={true}>
        <svg style={{height:"20px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
        </td>
        <td>
      <svg style={{height:"20px"}}
      onClick={()=> setGenerateExcel(budget)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
      </td>
      </tr>
    </>
  );
};

export default Budget;
