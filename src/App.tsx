import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Template from "./templates/Template";
import LoginPage from "./page/Login/LoginPage";
import AssistantPage from "./page/Assistants/AssistantPage";
import ErrorPage from "./page/ErrorPage";

function App() {
  return (
    <Router>
      <Template>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/assistants" element={<AssistantPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Template>
    </Router>
  );
}

export default App;
