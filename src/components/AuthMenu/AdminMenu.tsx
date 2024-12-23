import { MenuItem, MenuItemGroup } from "../ui/menu";
import {
  MdOutlineAllInbox,
  MdOutlineNewspaper,
  MdOutlinePeople,
  MdOutlinePhoto,
} from "react-icons/md";
import { AiOutlineTrophy } from "react-icons/ai";
import { useNavigate } from "react-router";
import { HiDatabase } from "react-icons/hi";

export default function AdminMenu() {
  const navigate = useNavigate();
  return (
    <MenuItemGroup title="Admin Menu">
      <MenuItem
        value="inbox"
        cursor={"pointer"}
        py={2}
        px={4}
        onClick={() => navigate("/admin/manage-inbox")}
      >
        <MdOutlineAllInbox />
        Manage Inbox
      </MenuItem>
      <MenuItem
        value="manage-users"
        cursor={"pointer"}
        py={2}
        px={4}
        onClick={() => navigate("/admin/manage-users")}
      >
        <MdOutlinePeople />
        Manage Users
      </MenuItem>
      <MenuItem
        value="manage-awards"
        cursor={"pointer"}
        py={2}
        px={4}
        onClick={() => navigate("/admin/manage-awards")}
      >
        <AiOutlineTrophy />
        Manage Awards
      </MenuItem>
      <MenuItem
        value="manage-news"
        cursor={"pointer"}
        py={2}
        px={4}
        onClick={() => navigate("/admin/manage-news")}
      >
        <MdOutlineNewspaper />
        Manage News
      </MenuItem>
      <MenuItem
        value="manage-gallery"
        cursor={"pointer"}
        py={2}
        px={4}
        onClick={() => navigate("/admin/manage-gallery")}
      >
        <MdOutlinePhoto />
        Manage Gallery
      </MenuItem>
      <MenuItem
        value="manage-database"
        cursor={"pointer"}
        py={2}
        px={4}
        onClick={() => navigate("/admin/manage-database")}
      >
        <HiDatabase />
        Manage Database
      </MenuItem>
    </MenuItemGroup>
  );
}
