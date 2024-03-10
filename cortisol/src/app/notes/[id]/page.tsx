import { Box, TextField } from '@mui/material';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const EditorComp = dynamic(() => import('../../components/Editor'), {
  ssr: false,
});

export default function NoteDetail() {
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
        <Box className={'rounded-md border border-gray-300'}>
          <Suspense fallback={null}>
            <EditorComp markdown={''} />
          </Suspense>
        </Box>
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
  );
}
