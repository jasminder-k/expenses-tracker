import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BudgetForm from "../BudgetForm";

const LoggedInHomepage = () => {
    const navigate = useNavigate();
    const [showBudgetForm,setShowBudgetForm] = useState(false);

    return(<div className="px-4 py-5 my-5 text-center">
    <h1 className="display-5 fw-bold text-body-emphasis">What can you do as a registered user? </h1>
    <div className="col-lg-6 mx-auto">
      <div className="lead mb-4"><ul>
        <li> Create a new budget and add expenses to it.</li>
        <li> Update a budget and updatethe expenses.</li>
        <li> Delete expenses</li>
        <li> Download budget with expenses in excel format.</li>
            </ul></div>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" className="btn btn-dark btn-lg px-4 gap-3" onClick={()=> navigate(`/budgets`)}>My budgets</button>
      </div>
    </div>
    </div>)
}

export default LoggedInHomepage;