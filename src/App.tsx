import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Template from "./templates/Template";
import LoginPage from "./page/Login/LoginPage";
import AssistantsPage from "./page/Assistants/AssistantsPage";
import ErrorPage from "./page/Error/ErrorPage";
import AssistantDetailPage from "./page/AssistantDetail/AssistantDetailPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContactUsPage from "./page/ContactUs/ContactUsPage";
import JoinUsPage from "./page/JoinUs/JoinUsPage";
import ParticlesBackground from "./templates/ParticlesBackground";
import ChangePasswordPage from "./page/ChangePassword/ChangePasswordPage";
import MyProfilePage from "./page/MyProfile/MyProfilePage";

function App() {
  return (
    <Router>
      <ParticlesBackground />
      <Template>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/assistants" element={<AssistantsPage />} />
          <Route path="/assistants/:id" element={<AssistantDetailPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/join-us" element={<JoinUsPage />} />
          <Route path="/user/my-profile" element={<MyProfilePage />} />
          <Route
            path="/user/change-password"
            element={<ChangePasswordPage />}
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Template>
    </Router>
  );
}

export default App;
