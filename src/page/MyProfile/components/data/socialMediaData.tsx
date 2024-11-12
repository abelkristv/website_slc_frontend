import { SocialMedia } from "../../../../types/SocialMedia";
import {
  FaGithub,
  FaGlobeAsia,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

export const socialMediaData: Array<{
  name: string;
  logo: JSX.Element;
  type: string;
  field: keyof SocialMedia;
  placeholder: string;
}> = [
  {
    name: "Instagram",
    logo: <FaInstagram color="#E1306C" />,
    type: "Username",
    field: "InstagramLink",
    placeholder: "Instagram Username",
  },
  {
    name: "LinkedIn",
    logo: <FaLinkedin color="#0077B5" />,
    type: "Link",
    field: "LinkedInLink",
    placeholder: "LinkedIn Profile Link",
  },
  {
    name: "GitHub",
    logo: <FaGithub color="#333" />,
    type: "Username",
    field: "GithubLink",
    placeholder: "GitHub Username",
  },
  {
    name: "WhatsApp",
    logo: <FaWhatsapp color="#25D366" />,
    type: "Number",
    field: "WhatsappLink",
    placeholder: "WhatsApp Number",
  },
  {
    name: "Personal Website",
    logo: <FaGlobeAsia />,
    type: "Link",
    field: "PersonalWebsiteLink",
    placeholder: "Personal Website URL",
  },
];
