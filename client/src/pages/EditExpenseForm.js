import DatePicker from "react-datepicker";
import React, { useState, useContext, useEffect } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";

const EditExpenseForm = () => {
  const { budgetId, expenseId } = useParams();
  const [item, setItem] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState("");
  const [expenses, setExpenses] = useState(null);
  //const headings = ["ID","Item", "Price", "Date", "Category" ];
  const context = useContext(LoggedInUserContext);
  const loggedInUser = context.loggedInUser;
  const navigate = useNavigate();

  const fetchExpense = async () => {
    const res = await fetch(`/budgets/${budgetId}/expenses/${expenseId}`);
    const result = await res.json();
    return result;
  };
  useEffect(() => {
    const getExpense = async () => {
      try {
        const result = await fetchExpense();
        setExpenses(result.data);
        setItem(result.data.itemName);
        setDate(result.data.expenseDate);
        setPrice(result.data.itemPrice);
        setCategory(result.data.category);
      } catch (err) {
        console.error(err);
      }
    };

    getExpense();
  }, [expenseId]);

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
      const response = await fetch(
        `/budgets/${budgetId}/updateExpense/${expenseId}`,
        {
          method: "PATCH",
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
        }
      );
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
        navigate(`/budgets/${budgetId}/expenses`);
      }, 1500);
    }
  };

  return (
    <main>
      <form onSubmit={(event) => handleSubmit(event)} style={{maxWidth:"80vw", marginRight: "20vw", marginLeft: "10vw"}}>
        <div className="mb-1">
          <h1>Edit Expense</h1>
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Item</label>
          <input
            type="text"
            className="form-control"
            id="item"
            aria-describedby="itemNameHelp"
            value={item}
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
            value={price}
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
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option value={""}>Select a category</option>
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
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              //setErrorText(null);
            }}
          />
        </div>
        <div style={{ marginTop: "8vh"}}>
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
              navigate(`/budgets/${budgetId}/expenses`);
            }}
          >
            Go back to Expenses list
          </button>
        </div>
        <ToastContainer />
      </form>
    </main>
  );
};

export default EditExpenseForm;
