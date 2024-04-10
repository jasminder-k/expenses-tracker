const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    signIn,
    signUp,
    createBudget,
    getBudget,
    updateBudget
  } = require("./handlers");
  
  const router = require("express").Router();
  
  router.get("/categories", getCategories);
  router.post("/createCategory", createCategory);
  router.patch("/updateCategory", updateCategory);
  router.delete("/deleteCategory/:id", deleteCategory);
  router.post("/signin", signIn);
  router.post("/signup", signUp);
  router.post("/createBudget", createBudget);
  router.get("/budget/:_id", getBudget);
  router.patch("/updateBudget", updateBudget);
  
  module.exports = router;