import DatePicker from "react-datepicker";
import React, { useState, useContext, useEffect } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const ExpensesForm = ({ budgetId }) => {
  const [item, setItem] = useState(null);
  const [date, setDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  //const headings = ["ID","Item", "Price", "Date", "Category" ];
  const [hideForm, setHideForm] = useState(false);
  const context = useContext(LoggedInUserContext);
  const loggedInUser = context.loggedInUser;
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await fetch("/categories");
      const responseData = await response.json();
      setCategories(responseData.data);
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      return { error: error.message };
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const sendData = async () => {
    try {
      const response = await fetch(`/budgets/${budgetId._id}/createExpense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: item,
          price: price,
          date: date,
          category: category,
          userId: loggedInUser._id,
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
    console.log(item, price, category, date);
    const toastId = "test";
    const result = await sendData();
    if (result.status !== 201) {
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
        autoClose: 4000, //4 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId,
        transition: Slide,
      });
      setTimeout(() => {
        setHideForm(true);
        navigate(`/budgets/${budgetId._id}/expenses`);
      }, 4500);
    }
  };

  return (
    <main hidden={hideForm}>
      <form onSubmit={(event) => handleSubmit(event)} style={{maxWidth:"80vw", marginRight: "20vw", marginLeft: "10vw"}}>
        <div className="mb-1">
          <h1>Create Expense</h1>
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Item</label>
          <input
            type="text"
            className="form-control"
            id="item"
            aria-describedby="itemNameHelp"
            placeholder="Enter name of item"
            onChange={(event) => {
              setItem(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            aria-describedby="itemPriceHelp"
            placeholder="Enter price of item"
            onChange={(event) => {
              setPrice(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            aria-label="Select Category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option selected>Select a category</option>
            {categories &&
              categories.map((cat, index) => {
                return (
                  <option key={index} value={cat._id}>
                    {cat.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            aria-describedby="dateHelp"
            onChange={(event) => {
              setDate(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <div style={{ marginTop: "8vh", marginLeft: "24vh" }}>
          <button
            style={{ marginLeft: "5vw" }}
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
              setHideForm(true);
            }}
          >
            Cancel
          </button>
        </div>
        <ToastContainer />
      </form>
    </main>
  );
};

export default ExpensesForm;
