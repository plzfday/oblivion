import { Box, TextField } from "@mui/material";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const EditorComp = dynamic(() => import("../../components/Editor"), {
  ssr: false,
});

type NoteDetailProps = {
  setContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setSummary: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setPk: (pk: string) => void;
};

export default function NoteDetail({
  setContent,
  setSummary,
  setPk,
}: NoteDetailProps) {
  return (
    <Box
      sx={{
        marginTop: 3,
        border: 1,
        borderRadius: 1,
        padding: 3,
      }}
    >
      <form>
        <Box className={"rounded-md border border-gray-300"}>
          <Suspense fallback={null}>
            <EditorComp markdown={""} />
          </Suspense>
        </Box>
        <TextField
          label="Summary (optional)"
          name="summary"
          multiline
          fullWidth
          rows={2}
          margin="normal"
          onChange={setSummary}
        />
      </form>
    </Box>
  );
}
