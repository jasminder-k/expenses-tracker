import { useContext, useState } from "react";
import { useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";

const Budget = ({ budgetId }) => {
  const [budget, setBudget] = useState(null);
  const fetchBudget = async () => {
    console.log(`/budget/${budgetId.toString()}`);
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
        {budget && Object.values(budget).map((row, index) => <td>{row}</td>)}
        <td>
          <button>
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

export default Budget;
