import { richTextEditor } from "../fields/richTextEditor";
import { generateHTML } from "@tiptap/core";
import { useMemo } from "react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/starter-kit";
import { TypographyStylesProvider } from "@mantine/core";

export function pageSettings() {
  const config = {
    fields: {
      richText: richTextEditor("Rich Text Editor"),
    },
    render: ({ richText }:{richText:object}) => {
      console.log(richText);
      const output = useMemo(() => {
        return (
          richText &&
          generateHTML(richText, [
            Color,
            TextStyle,
            Heading,
            // other extensions …
          ])
        );
      }, [richText]);
      return <TypographyStylesProvider><div dangerouslySetInnerHTML={{ __html: output }}  /></TypographyStylesProvider>;
    },
  };
  return config;
}
