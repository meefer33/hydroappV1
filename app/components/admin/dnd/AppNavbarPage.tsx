import {Button, Stack} from '@mantine/core';
import ChooseTemplateForm from './forms/ChooseTemplateForm';
import {useOutletContext} from '@remix-run/react';
import useThemeUtils from './useEditorUtils';

export default function AppNavbarPage({pageId}) {
  const {editorContent}: any = useOutletContext();
  const {addContent} = useThemeUtils();

  return (
    <Stack align="center" justify="center" gap="md" px="sm">
      <ChooseTemplateForm pageId={pageId} />
      {!editorContent?.fields?.top_content && (
        <Button
        fullWidth
          color="gray.7"
          onClick={() => {
            addContent(pageId, 'top_content');
          }}
        >
          Add Top Content{' '}
        </Button>
      )}
      {!editorContent?.fields?.bottom_content && (
        <Button
        fullWidth
          color="gray.7"
          onClick={() => {
            addContent(pageId, 'bottom_content');
          }}
        >
          Add Bottom Content{' '}
        </Button>
      )}
    </Stack>
  );
}
