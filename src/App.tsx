import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Template from "./templates/Template";
import LoginPage from "./pages/Login/LoginPage";
import AssistantsPage from "./pages/Assistants/AssistantsPage";
import ErrorPage from "./pages/Error/ErrorPage";
import AssistantDetailPage from "./pages/AssistantDetail/AssistantDetailPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContactUsPage from "./pages/ContactUs/ContactUsPage";
import JoinUsPage from "./pages/JoinUs/JoinUsPage";
import ParticlesBackground from "./templates/ParticlesBackground";
import ChangePasswordPage from "./pages/ChangePassword/ChangePasswordPage";
import ManageUsersPage from "./pages/Admin/ManageUsers/ManageUsersPage";
import HomePage from "./pages/Home/HomePage";
import ManageInboxPage from "./pages/Admin/ManageInbox/ManageInboxPage";
import ManageNewsPage from "./pages/Admin/ManageNews/ManageNewsPage";
import NewsPage from "./pages/News/NewsPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import ManageGalleryPage from "./pages/Admin/ManageGallery/ManageGalleryPage";
import MyGalleryPage from "./pages/MyGallery/MyGalleryPage";

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
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/join-us" element={<JoinUsPage />} />
          <Route path="/my-gallery" element={<MyGalleryPage />} />
          <Route path="/admin/manage-users" element={<ManageUsersPage />} />
          <Route path="/admin/manage-inbox" element={<ManageInboxPage />} />
          <Route path="/admin/manage-news" element={<ManageNewsPage />} />
          <Route path="/admin/manage-gallery" element={<ManageGalleryPage />} />
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
