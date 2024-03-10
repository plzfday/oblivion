"use client";

import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function EditButton() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  return (
    <Button
      startIcon={<EditIcon />}
      onClick={isEditing ? handleSave : toggleEditMode}
    >
      {isEditing ? "Save" : "Edit"}
    </Button>
  );
}
