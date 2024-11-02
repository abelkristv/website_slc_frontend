import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Template from "./templates/Template";
import LoginPage from "./page/Login/LoginPage";
import AssistantsPage from "./page/Assistants/AssistantsPage";
import ErrorPage from "./page/Error/ErrorPage";
import AssistantDetailPage from "./page/AssistantDetail/AssistantDetailPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Template>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/assistants" element={<AssistantsPage />} />
          <Route path="/assistants/:id" element={<AssistantDetailPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Template>
    </Router>
  );
}

export default App;
