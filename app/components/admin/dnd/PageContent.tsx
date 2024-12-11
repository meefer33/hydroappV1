import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import {buildTheme} from './theme/lib/theme';
import MetaContent from './theme/MetaContent';
import DndContent from './DndContent';
import ButtonAddSection from './ButtonAddSection';
import {defaultTheme} from './theme/lib/metaTypes';
import EditorLayout from './EditorLayout';

export default function PageContent({type, loadPage, children}: any) {
  const {
    page,
    setPage,
    setTheme,
    theme,
    setEditorContent,
    editorContent,
    setUpdateMetaVersionId,
  }: any = useOutletContext();
  const pageTemplateTheme =
    page?.fields?.template?.fields?.theme?.fields?.theme;
  const pageFieldsTemplate = page?.fields?.template?.fields;

  useEffect(() => {
    setPage(loadPage);
  }, []);

  useEffect(() => {
    !pageTemplateTheme
      ? setTheme(buildTheme(defaultTheme))
      : setTheme(buildTheme(pageTemplateTheme));
    setEditorContent(page);
    setUpdateMetaVersionId(page?.id);
  }, [page]);

  return (
    <>
      {theme && (
        <EditorLayout type={type} pageId={page.id}>
          {pageFieldsTemplate?.top && (
            <>
              <MetaContent
                content={pageFieldsTemplate?.top?.fields?.content}
                theme={theme}
              />
            </>
          )}
          {page?.fields?.top_content && (
            <>
              <DndContent
                content={editorContent?.fields?.top_content?.fields?.content}
                id={editorContent?.fields?.top_content?.id}
                updateKey="content"
              />
              <ButtonAddSection data={editorContent?.fields?.top_content} />
            </>
          )}
          {children}
          {page?.fields?.bottom_content && (
            <>
              <DndContent
                content={editorContent?.fields?.bottom_content?.fields?.content}
                id={editorContent?.fields?.bottom_content?.id}
                updateKey="content"
              />
              <ButtonAddSection data={editorContent?.fields?.bottom_content} />
            </>
          )}
          {pageFieldsTemplate?.bottom && (
            <>
              <MetaContent
                content={pageFieldsTemplate?.bottom?.fields?.content}
                theme={theme}
              />
            </>
          )}
        </EditorLayout>
      )}
    </>
  );
}
