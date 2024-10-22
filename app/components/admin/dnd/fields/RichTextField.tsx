import {useFormContext} from '../forms/ContextForm';
import {RichTextEditor, Link} from '@mantine/tiptap';
import {useEditor} from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {Button, Container, Modal} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useEffect} from 'react';

export default function RichTextField({label = 'Rich Text', field}: any) {
  const form: any = useFormContext();
  const [opened, {open, close}] = useDisclosure(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({types: ['heading', 'paragraph']}),
    ],
  });

  useEffect(() => {
    editor?.commands.setContent(form?.values?.rte);
  }, [form]);

  return (
    <>
      <Button
        mt="sm"
        onClick={() => {
          //console.log(editor?.getHTML());
          open();
        }}
      >
        Open Rich Text Editor
      </Button>
      <Modal
        opened={opened}
        onClose={() => {
          form.setFieldValue(field, editor?.getHTML());
          close();
        }}
        title="Rich Text Editor"
        fullScreen
        radius={0}
        transitionProps={{transition: 'fade', duration: 200}}
        trapFocus={true}
      >
        <Container size="xl">
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
        </Container>
      </Modal>
      {/** 
      <Button
        onClick={() => {
          form.setFieldValue(field, editor?.getJSON());
        }}
      >
        Save
      </Button>
      */}
    </>
  );
}
