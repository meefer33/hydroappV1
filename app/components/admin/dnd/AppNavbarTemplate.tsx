import {Box, Button, Stack} from '@mantine/core';
import {Link, useOutletContext} from '@remix-run/react';
import DndOutline from './DndOutline';
import ButtonAddSection from './ButtonAddSection';
import SelectTemplate from './SelectTemplate';
import ThemeFormTemplate from './forms/ThemeFormTemplate';
import EditTemplateFormEditor from './forms/EditTemplateFormEditor';

export default function AppNavbarTemplate() {
  const {editorContent, template}: any = useOutletContext();

  console.log('template', template);

  return (
    <>
      {template ? (
        <>
          <Stack gap="sm" p="sm">
            <Button component={Link} to="/admin/templates" color="gray.7">
              Manage Templates
            </Button>
            <Box bg="gray.0">
              <SelectTemplate />
            </Box>
            <EditTemplateFormEditor />
          </Stack>
          <ThemeFormTemplate />
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
