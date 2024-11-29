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
import ManageUsersPage from "./page/Admin/ManageUsers/ManageUsersPage";
import HomePage from "./page/Home/HomePage";
import ManageInboxPage from "./page/Admin/ManageInbox/ManageInboxPage";
import ManageNewsPage from "./page/Admin/ManageNews/ManageNewsPage";
import AddNewsPage from "./page/Admin/ManageNews/AddNewsPage";
import NewsPage from "./page/News/NewsPage";

function App() {
  return (
    <Router>
      <ParticlesBackground />
      <Template>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/assistants" element={<AssistantsPage />} />
          <Route path="/assistants/:id" element={<AssistantDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/join-us" element={<JoinUsPage />} />
          <Route path="/admin/manage-users" element={<ManageUsersPage />} />
          <Route path="/admin/manage-inbox" element={<ManageInboxPage />} />
          <Route path="/admin/manage-news" element={<ManageNewsPage />} />
          <Route path="/admin/add-news" element={<AddNewsPage />} />
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
