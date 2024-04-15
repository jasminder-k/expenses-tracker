import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./Header";
import Budgets from "./pages/Budgets";
import Budget from "./pages/Budget";
import EditBudgetForm from "./pages/EditBudgetForm";
import Expenses from "./pages/Expenses";
import Expense from "./pages/Expense";
import EditExpenseForm from "./pages/EditExpenseForm";
import Homepage from "./pages/Homepage";
import Footer from "./Footer";
import LoggedInHomepage from "./pages/LoggedInHomePage";

const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" element={<Homepage/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/budgets" element={<Budgets/>}/>
        <Route path="/budget" element={<Budget/>}/>
        <Route path="/editBudget/:_id" element={<EditBudgetForm/>}/>
        <Route path="/expenses" element={<Expenses/>}/>
        <Route path="/expense/:_id" element={<Expense/>}/>
        <Route path="/budgets/:_id/expenses" element={<Expenses/>}/>
        <Route path="/budgets/:budgetId/expenses/:expenseId" element={<EditExpenseForm/>}/>
        <Route path="/loggedInHomepage" element={<LoggedInHomepage/>}/>
      </Switch>
      <Footer/>
    </Router>
  );
};

export default App;
