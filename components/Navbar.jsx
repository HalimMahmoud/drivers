import { useState, useEffect } from "react";
import { Menu, Input } from "semantic-ui-react";
import { logout, useAuth } from "../lib/useFirebase";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => {
    console.log(name);
    setActiveItem(name);
  };
  const { user } = useAuth();
  return (
    <Menu secondary>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />

      <Menu.Menu position="right">
        <Menu.Item>{user.email}</Menu.Item>
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  );
}
