import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/budget" element={<p>Budget</p>}/>
      </Switch>
    </Router>
  );
};

export default App;
