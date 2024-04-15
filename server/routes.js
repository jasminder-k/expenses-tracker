const {
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
  } = require("./handlers");
  
  const router = require("express").Router();
  
  router.get("/categories", getCategories);
  router.post("/createCategory", createCategory);
  router.patch("/updateCategory", updateCategory);
  router.delete("/deleteCategory/:id", deleteCategory);
  router.get("/categories/:id", getSingleCategory);
  router.post("/signin", signIn);
  router.post("/signup", signUp);
  router.post("/createBudget", createBudget);
  router.get("/budget/:_id", getBudget);
  router.patch("/updateBudget", updateBudget);
  router.post("/budgets/:budgetId/createExpense", createExpense);
  router.get("/budgets/:budgetId/expenses/:_id", getExpense);
  router.get("/budgets/:budgetId/expenses", getExpensesOfABudget);
  router.patch("/budgets/:budgetId/updateExpense/:_id",updateExpenseOfABudget);
  router.delete("/expenses/:id/delete", deleteExpense);
  module.exports = router;