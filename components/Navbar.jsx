import { useState, useEffect } from "react";
import { Menu, Input } from "semantic-ui-react";
import { logout, useAppStore } from "../lib/useFirebase";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const { user, logout } = useAppStore();
  return (
    <Menu secondary>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />

      <Menu.Menu position="right">
        <Menu.Item>{user?.email}</Menu.Item>
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  );
}
