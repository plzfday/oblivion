import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NoteIcon from "@mui/icons-material/Note";
import BookIcon from "@mui/icons-material/Book";
import React from "react";
import DeleteButton from "../components/DeleteButton";
import EditButton from "./EditButton";

export default function Navigation() {
  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4}>
      <Button variant="contained" startIcon={<NoteIcon />}>
        Add Note{" "}
      </Button>
      <DeleteButton />
      <EditButton />
      <Button variant="contained" startIcon={<BookIcon />}>
        Flash Cards
      </Button>
    </Box>
  );
}
