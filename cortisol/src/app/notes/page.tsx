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
    <Sidebar
      header={'Today I Learned'}
      sideList={['2024-02-01', '2024-01-31', '2024-01-30', '2024-01-29']}
      links={[
        '/til/2024-02-01',
        '/til/2024-01-31',
        '/til/2024-01-30',
        '/til/2024-01-29',
      ]}
      isLoggedIn={true}
    >
      <Navigation />
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
              <EditorComp markdown={''} editorRef={ref} />
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
    </Sidebar>
  );
}
