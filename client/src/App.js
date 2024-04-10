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

const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" element={<SignUp/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/budgets" element={<Budgets/>}/>
        <Route path="/budget" element={<Budget/>}/>
        <Route path="/editBudget/:_id" element={<EditBudgetForm/>}/>
        <Route path="/expenses" element={<Expenses/>}/>
      </Switch>
    </Router>
  );
};

export default App;
