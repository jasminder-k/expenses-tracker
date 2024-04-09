import DatePicker from "react-datepicker";
import React, { useState, useContext } from "react";
import { LoggedInUserContext } from "./contexts/LoggedInUserContext";
import moment from 'moment';
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";

const BudgetForm = () => {
    const [totalValue, setTotalValue] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);

    const context = useContext(LoggedInUserContext);
    const loggedInUser = context.loggedInUser;

    const sendData = async () => {
      try {
        const formattedDate = moment(expiryDate, 'YYYY-mm-dd')
        const expiryYear = moment(expiryDate).year();
        const expiryMonth = moment(expiryDate).month();
        const response = await fetch("/createBudget", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalBudget: totalValue,
            expiryDate: expiryDate,
            userId: loggedInUser._id,
            _id: `budget_${expiryMonth}_${expiryYear}`
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
      console.log(expiryDate, totalValue);
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
        toast.success("Budget added successfully", {
          type: "success",
          position: "top-center",
          autoClose: 4000, //4 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId,
          transition: Slide,
        });
        setTimeout(() => {
          navigate("/budget");
        }, 4500);
      }
    };

    return(
        <form onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-1">
          <h1>Create Budget</h1>
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Total amount</label>
          <input
            type="number"
            className="form-control"
            id="total"
            aria-describedby="totalValueHelp"
            placeholder="Enter total amount of budget"
            onChange={(event) => {
              setTotalValue(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="date"
            className="form-control"
            id="expiryDate"
            aria-describedby="expiryDateHelp"
            onChange={(event) => {
                setExpiryDate(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <ToastContainer/>
        </form>
    )
}

export default BudgetForm;