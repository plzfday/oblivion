import { Box, Container, Grid, Input, TextField } from "@mui/material";
import Navigation from "./Navigation";
import Divider from "@mui/material/Divider";

export default function Note() {
  const handleSubmit = () => {
    console.log("submitting note");
  };
  return (
    <Box>
      <Navigation />

      <Divider />
      <Box
        sx={{
          marginTop: 3,
          border: 1,
          borderRadius: 1,
          padding: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Content"
            name="content"
            multiline
            fullWidth
            rows={4}
            margin="normal"
            required
          />
          <TextField
            label="Summary (optional)"
            name="summary"
            multiline
            fullWidth
            rows={2}
            margin="normal"
          />
        </form>
      </Box>
    </Box>
  );
}
