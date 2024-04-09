import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./Header";
import Budget from "./pages/Budget";

const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" element={<SignUp/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/budget" element={<Budget/>}/>
      </Switch>
    </Router>
  );
};

export default App;
