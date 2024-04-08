const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    signIn,
    signUp
  } = require("./handlers");
  
  const router = require("express").Router();
  
  router.get("/categories", getCategories);
  router.post("/createCategory", createCategory);
  router.patch("/updateCategory", updateCategory);
  router.delete("/deleteCategory/:id", deleteCategory);
  router.post("/signin", signIn);
  router.post("/signup", signUp)
  
  module.exports = router;