'use client';

import dynamic from 'next/dynamic';
import { Suspense, useRef } from 'react';
import { MDXEditorMethods } from '@mdxeditor/editor';

const EditorComp = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

export default function Home() {
  const ref = useRef<MDXEditorMethods>(null);
  return (
    <>
      <Suspense fallback={null}>
        <EditorComp markdown={""} editorRef={ref} />
      </Suspense>
    </>
  );
}
