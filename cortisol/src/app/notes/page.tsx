'use client';

import { Box, TextField } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';
import Divider from '@mui/material/Divider';
import dynamic from 'next/dynamic';
import { Suspense, useRef } from 'react';
import { MDXEditorMethods } from '@mdxeditor/editor';

const EditorComp = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

export default function Note() {
  const ref = useRef<MDXEditorMethods>(null);

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
          <Suspense fallback={null}>
            <EditorComp markdown={''} editorRef={ref} />
          </Suspense>
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
