"use client";

import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ReciepeListComp from "@/component/dashboard-comp/receipe-list/page";
import FavoriteListComp from "@/component/dashboard-comp/favorite-list/page";
import AddRecipeDialog from "@/component/upload-comp/page";
import styles from "./page.module.css";
import { Box } from "@mui/material";

export default function PermanentDrawer() {
  const [activeTab, setActiveTab] = useState("My-Reciepe");
  const [openDialog, setOpenDialog] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Favorite-List":
        return <FavoriteListComp />;
      default:
        return <ReciepeListComp />;
    }
  };

  return (
    <Box className={styles.container}>
      {/* Sidebar */}
      <Box className={styles.sidebar}>
        <Box
          className={`${styles.menuItem} ${activeTab === "My-Reciepe" ? styles.active : ""
            }`}
          onClick={() => setActiveTab("My-Reciepe")}
        >
          <AddCircleOutlineIcon />
          <span>My-Reciepe</span>
        </Box>

        <Box
          className={`${styles.menuItem} ${activeTab === "Favorite-List" ? styles.active : ""
            }`}
          onClick={() => setActiveTab("Favorite-List")}
        >
          <FavoriteIcon />
          <span>Favorite-List</span>
        </Box>
      </Box>

      {/* Main Content */}
      <Box className={styles.main}>
        <button
          className={styles.addButton}
          onClick={() => setOpenDialog(true)}
        >
          Add Recipe
        </button>
        {renderContent()}
      </Box>

      <AddRecipeDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Box>
  );
}
