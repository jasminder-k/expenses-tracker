import { useState, useEffect } from "react";

const GenerateExcel = ({ budget }) => {
  const [expenses, setExpenses] = useState(null);
  console.log(budget);
  const XLSX = require("xlsx");
  const fetchExpense = async () => {
    //console.log(`/expense/${expenseId}`);
    console.log(`/budgets/${budget._id}/expenses`);
    const res = await fetch(`/budgets/${budget._id}/expenses`);
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
  }, [budget._id]);

  console.log(expenses);
  let expensesKeys = "";
  let expensesValues = [];
  let dataBudget = [];
  console.log(expenses);
  if (expenses != null && expenses.length > 0) {
    for (let index = 0; index < expenses.length; index++) {
      const element = expenses[index];
      expensesKeys = Object.keys(element);
      expensesValues.push(Object.values(element));
    }
    dataBudget.push(Object.keys(budget).concat(expensesKeys));

    expensesValues.map((expenseValue) => {
      //dataBudgetValues.concat(expenseValue);
      dataBudget.push(Object.values(budget).concat(expenseValue));
    });
     // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert data to a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(dataBudget);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Budget");

  // Write the workbook to a file
  XLSX.writeFile(workbook, "budget.xlsx");
};
  }
export default GenerateExcel;
