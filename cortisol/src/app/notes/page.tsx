import { Box, TextField } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';
import Divider from '@mui/material/Divider';

export default function Note() {
  return (
    <Sidebar header={'Today I Learned'}>
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
        <form>
          <TextField
            label='Title'
            name='title'
            fullWidth
            margin='normal'
            required
          />
          <TextField
            label='Content'
            name='content'
            multiline
            fullWidth
            rows={4}
            margin='normal'
            required
          />
          <TextField
            label='Summary (optional)'
            name='summary'
            multiline
            fullWidth
            rows={2}
            margin='normal'
          />
        </form>
      </Box>
    </Sidebar>
  );
}
