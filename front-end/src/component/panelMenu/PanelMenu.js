import React from "react";
import { PanelMenu } from "primereact/panelmenu";
import { Link } from "react-router-dom";
import "../panelMenu/PanelMenu.css";
const PanelMenuDemo = () => {
  const items = [
    {
      label: "Auction",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: (
            <Link
              to="/CreateAuction"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              Create Auction
            </Link>
          ),
          icon: "pi pi-fw pi-plus",
        },
        {
          label: (
            <Link
              to="/MyFavorites"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              My Favorites
            </Link>
          ),
          icon: "pi pi-shopping-cart",
        },
        {
          label: (
            <Link
              to="/AllAuctions"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              All Auction
            </Link>
          ),
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Item",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: (
            <Link
              to="/CreateItem"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              Create Item
            </Link>
          ),
          icon: "pi pi-fw pi-plus",
        },
        {
          label: (
            <Link
              to="/MyItem"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              My Item
            </Link>
          ),
          icon: "pi pi-shopping-cart",
        },
      ],
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: (
            <Link
              to="/MyProfile"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              My Profile
            </Link>
          ),
          icon: "pi pi-fw pi-user-plus",
        },
      ],
    },
  ];

  return (
    <div>
      <div>
        <PanelMenu
          model={items}
          style={{ width: "23rem" }}
          className="p-submenu-list"
        />
      </div>
    </div>
  );
};
export default PanelMenuDemo;
