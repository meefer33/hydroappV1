import {TypographyStylesProvider} from '@mantine/core';

export default function BlockRichText({content}: any) {
  /*
  const output = useMemo(() => {
    return generateHTML(content?.fields?.settings.rte, [
      StarterKit,
      Underline,
      Link,
      //Highlight,
      TextAlign.configure({types: ['heading', 'paragraph']}),
    ]);
  }, [content?.fields?.settings.rte]);
  */
  return (
    <TypographyStylesProvider>
      <div dangerouslySetInnerHTML={{__html: content?.fields?.settings.rte}} />
    </TypographyStylesProvider>
  );
}
