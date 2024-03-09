import { Box, Button, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NoteIcon from "@mui/icons-material/Note";
import BookIcon from "@mui/icons-material/Book";
import React from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function Navigation() {
  return (
    <ButtonGroup size="large" variant="outlined" aria-label="Basic button group">
      <Button startIcon={<NoteIcon />}>
        Add Note{" "}
      </Button>
      <DeleteButton />
      <EditButton />
      <Button startIcon={<BookIcon />}>
        Flash Cards
      </Button>
    </ButtonGroup>
  );
}
