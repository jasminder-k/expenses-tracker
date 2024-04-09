// Necessary Imports
import ReactDOM from "react-dom/client";
import App from "./App";
import LoggedInUserContextProvider from "./contexts/LoggedInUserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <div>
    <LoggedInUserContextProvider>
    <App />
    </LoggedInUserContextProvider>
    </div>
);