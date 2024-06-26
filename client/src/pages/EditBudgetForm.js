import DatePicker from "react-datepicker";
import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";

const EditBudgetForm = () => {
    const budgetId = useParams();
    const [budget, setBudget] =  useState(null);
const [totalValue, setTotalValue] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [hideForm, setHideForm] = useState(false);
  const context = useContext(LoggedInUserContext);
  const loggedInUser = context.loggedInUser;

  const fetchBudget = async () => {
    const res = await fetch(`/budget/${budgetId._id}`);
    const result = await res.json();
    return result;
  };
  useEffect(() => {
    const getBudget = async () => {
      try {
        const result = await fetchBudget();
        setBudget(result.data);
        setExpiryDate(result.data.expiryDate);
        setTotalValue(result.data.totalBudget);
      } catch (err) {
        console.error(err);
      }
    };

    getBudget();
  }, [budgetId]);

  const navigate = useNavigate();

  const sendData = async () => {
    try {
      //const formattedDate = moment(expiryDate, "YYYY-mm-dd");
      const expiryYear = moment(expiryDate).year();
      const expiryMonth = moment(expiryDate).month()+1;
      const response = await fetch("/updateBudget", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalBudget: totalValue,
          expiryDate: expiryDate,
          userId: loggedInUser._id,
          _id: budget._id,
        }),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      return { error: error.message };
    }
  };

  const handleSubmit = async (event) => {
    // setStatus("fetching");
    event.preventDefault();
    const toastId = "test";
   const result = await sendData();
    if (result.status !== 200) {
      // setStatus("idle");
      toast.error(result.message, {
        type: "error",
        position: "top-right",
        autoClose: false,
        closeOnClick: true,
        transition: Bounce,
        toastId,
      });
      //setErrorText(result.message || result.error);
    } else {
      toast.success(result.message, {
        type: "success",
        position: "top-center",
        autoClose: 1000, //4 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId,
        transition: Slide,
      });
      setTimeout(() => {
        navigate("/budgets");
      }, 1500);
    }
  };

  return (
    <main>
     {budget!= null && <form onSubmit={(event) => handleSubmit(event)} style={{maxWidth:"80vw", marginRight: "20vw", marginLeft: "10vw"}}>
        <div className="mb-1">
          <h1>Update Budget</h1>
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Total amount</label>
          <input
          className="form-control"
            value={totalValue}
            onChange={(event) => {
              setTotalValue(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Expiry Date</label>
          <input
            className="form-control"
            type="date"
            value={expiryDate}
            onChange={(event) => {
              setExpiryDate(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <div style={{ marginTop: "8vh" }}>
          <button
            type="submit"
            className="btn btn-dark"
          >
            Save
          </button>
          <button
            style={{ marginLeft: "2vw" }}
            type="button"
            className="btn btn-dark"
            onClick={() => {
              navigate("/budgets");
            }}
          >
            Cancel
          </button>
        </div>
        <ToastContainer />
      </form>}
    </main>
  );
};

export default EditBudgetForm;
