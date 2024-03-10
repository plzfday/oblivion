"use client";

import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import BookIcon from "@mui/icons-material/Book";
import React from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import ReactCardFlip from "react-card-flip";
import { usePathname } from "next/navigation";
import SaveButton from "./SaveButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const flashcard_data = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "What is the capital of Germany?",
    answer: "Berlin",
  },
  {
    question: "What is the capital of Spain?",
    answer: "Madrid",
  },
  {
    question: "What is the capital of Italy?",
    answer: "Rome",
  },
];

type NavigationProps = {
  handleAddNote: () => void;
  handleDeleteNote: () => void;
  handleSaveNote: () => void;
};

export default function Navigation({
  handleAddNote,
  handleDeleteNote,
  handleSaveNote,
}: NavigationProps) {
  const [open, setOpen] = React.useState(false);
  const [flip, setFlip] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleFlip = () => setFlip(!flip);
  const [index, setIndex] = React.useState(0);

  const isNoteDetail = /\/notes\/\d{4}-\d{2}-\d{2}$/.test(usePathname());

  const nextIdea = () => {
    if (index < flashcard_data.length - 1) {
      setIndex(index + 1);
      setFlip(false);
    }
  };

  const prevIdea = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFlip(false);
    }
  };

  return (
    <>
      <ButtonGroup
        size="large"
        variant="outlined"
        aria-label="Basic button group"
      >
        <Button startIcon={<NoteIcon />} onClick={handleAddNote}>
          Add Note{" "}
        </Button>
        {isNoteDetail && <DeleteButton onclick />}
        {isNoteDetail && <Button onClick={handleSaveNote}> Save</Button>}
        {isNoteDetail && (
          <Button startIcon={<BookIcon />} onClick={handleOpen}>
            Flash Cards
          </Button>
        )}
      </ButtonGroup>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ReactCardFlip isFlipped={flip} flipDirection="vertical">
            <div>
              <p className="text-xl font-bold">
                {flashcard_data[index]["question"]}
              </p>
              <button onClick={handleFlip}>Click to flip</button>
            </div>

            <div>
              <p>{flashcard_data[index]["answer"]}</p>
              <button onClick={handleFlip}>Click to flip</button>
            </div>
          </ReactCardFlip>

          <Button onClick={prevIdea}>Previous</Button>
          <Button onClick={nextIdea}>Next</Button>
        </Box>
      </Modal>
    </>
  );
}
