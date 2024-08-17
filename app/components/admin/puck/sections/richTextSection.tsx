import {richTextEditor} from '../fields/richTextEditor';
import {generateHTML} from '@tiptap/html';
import {useMemo} from 'react';
import {Color} from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import {StarterKit} from '@tiptap/starter-kit';
import {Box, TypographyStylesProvider} from '@mantine/core';
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";


export function richTextSection() {
  const config = {
    fields: {
      richText: richTextEditor('Rich Text Editor'),
    },
    render: ({richText}: {richText: object}) => {
      const output = useMemo(() => {
        return (
          richText &&
          generateHTML(richText, [
            Color,
            TextStyle,
            StarterKit.configure({paragraph:false,heading:false}),
            Heading,
            Paragraph.configure({
              HTMLAttributes: {
                class: 'mantine-font-family',
              },
            }),
            // other extensions …
          ])
        );
      }, [richText]);
      return (
        <TypographyStylesProvider>
          <div
            dangerouslySetInnerHTML={{__html: output}}
          />
        </TypographyStylesProvider>
      );
    },
  };
  return config;
}
