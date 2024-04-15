const getCategories = require("./handlers/categories/getCategoriesHandler");
const createCategory = require("./handlers/categories/createCategoryHandler");
const updateCategory = require("./handlers/categories/updateCategoryHandler");
const deleteCategory = require("./handlers/categories/deleteCategoryHandler");
const signIn = require("./handlers/users/signInHandler");
const signUp = require("./handlers/users/signUpHandler");
const createBudget = require("./handlers/budgets/createBudgetHandler");
const getBudget = require("./handlers/budgets/getBudgetHandler");
const updateBudget = require("./handlers/budgets/updateBudgetHandler");
const createExpense = require("./handlers/expenses/createExpenseHandler");
const getExpense = require("./handlers/expenses/getExpenseHandler");
const getExpensesOfABudget = require("./handlers/expenses/getExpensesOfABudgetHandler");
const updateExpenseOfABudget = require("./handlers/expenses/updateExpenseOfABudgetHandler");
const deleteExpense = require("./handlers/expenses/deleteExpenseHandler");
const getSingleCategory = require("./handlers/categories/getSingleCategoryHandler");

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  signIn,
  signUp,
  createBudget,
  getBudget,
  updateBudget,
  createExpense,
  getExpense,
  getExpensesOfABudget,
  updateExpenseOfABudget,
  deleteExpense,
  getSingleCategory
};
