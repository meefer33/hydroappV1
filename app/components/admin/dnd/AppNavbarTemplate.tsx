import {Box} from '@mantine/core';
import {useOutletContext} from '@remix-run/react';
import TemplateThemeForm from './forms/TemplateThemeForm';
import DndOutline from './DndOutline';
import ButtonAddSection from './ButtonAddSection';
import CreateNewTemplateForm from './forms/CreateNewTemplateForm';
import SelectTemplate from './SelectTemplate';
import CreateNewThemeForm from './forms/CreateNewThemeForm';

export default function AppNavbarTemplate({template}) {
  const {editorContent}: any = useOutletContext();

  return (
    <>
      {template ? (
        <>
          <CreateNewThemeForm />
          <SelectTemplate />
          <CreateNewTemplateForm />
          <TemplateThemeForm template={template} />
        </>
      ) : (
        <>
          {/*editorContent?.id && <FormPage />*/}
          TOP
          <Box p="sm" bg="gray.1">
            <DndOutline
              content={editorContent?.fields?.top_content?.fields?.content}
              id={editorContent?.fields?.top_content?.id}
              updateKey="content"
            />
            <ButtonAddSection data={editorContent?.fields?.top_content} />
          </Box>
          Bottom
          <Box p="sm" bg="gray.1">
            <DndOutline
              content={editorContent?.fields?.bottom_content?.fields?.content}
              id={editorContent?.fields?.bottom_content?.id}
              updateKey="content"
            />
            <ButtonAddSection data={editorContent?.fields?.bottom_content} />
          </Box>
        </>
      )}
    </>
  );
}
