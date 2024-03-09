'use client';

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  linkPlugin,
  codeBlockPlugin,
  ConditionalContents,
  InsertCodeBlock,
  toolbarPlugin,
  codeMirrorPlugin,
  ChangeCodeMirrorLanguage,
  markdownShortcutPlugin,
} from '@mdxeditor/editor';
import { FC } from 'react';

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */

const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      ref={editorRef}
      markdown={markdown}
      plugins={[
        headingsPlugin(),
        quotePlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        markdownShortcutPlugin(),

        // the default code block language to insert when the user clicks the "insert code block" button
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: 'JavaScript', css: 'CSS' },
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === 'codeblock',
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
    />
  );
};

export default Editor;
