const getCategories = require("./handlers/categories/getCategoriesHandler");
const createCategory = require("./handlers/categories/createCategoryHandler");
const updateCategory = require("./handlers/categories/updateCategoryHandler");
const deleteCategory = require("./handlers/categories/deleteCategoryHandler");
const signIn = require("./handlers/users/signInHandler");
const signUp = require("./handlers/users/signUpHandler");

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    signIn,
    signUp
}