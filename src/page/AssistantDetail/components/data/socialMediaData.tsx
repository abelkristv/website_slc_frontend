import {
  FaGithub,
  FaGlobeAsia,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { SocialMedia } from "../../../../types/SocialMedia";

export const socialMediaData: Array<{
  name: string;
  logo: JSX.Element;
  type: string;
  field: keyof SocialMedia;
}> = [
  {
    name: "Instagram",
    logo: <FaInstagram color="#E1306C" />,
    type: "Username",
    field: "InstagramLink",
  },
  {
    name: "LinkedIn",
    logo: <FaLinkedin color="#0077B5" />,
    type: "Link",
    field: "LinkedInLink",
  },
  {
    name: "GitHub",
    logo: <FaGithub color="#333" />,
    type: "Username",
    field: "GithubLink",
  },
  {
    name: "WhatsApp",
    logo: <FaWhatsapp color="#25D366" />,
    type: "Number",
    field: "WhatsappLink",
  },
  {
    name: "Personal Website",
    logo: <FaGlobeAsia />,
    type: "Link",
    field: "PersonalWebsiteLink",
  },
];
