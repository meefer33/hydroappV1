import { Button, Container, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FieldLabel } from "@measured/puck";
import { useFetcher } from "@remix-run/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Link,
  RichTextEditor,
  useRichTextEditorContext,
} from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";

import "@mantine/tiptap/styles.css";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";


export const richTextEditor = (label: any) => {
  const ai:any = useFetcher();
  const [opened, { open, close }] = useDisclosure(false);
  const config = {
    type: "custom",
    label: label,
    render: ({ onChange, value }: any) => {
      const editor = useEditor({
        extensions: [
          StarterKit.configure({paragraph:false,heading:false}),
          Underline,
          Link,
          Highlight,
          TextAlign.configure({ types: ["heading", "paragraph"] }),
          Paragraph.configure({
            HTMLAttributes: {
              class: 'var(--mantine-font-family)',
            },
          }),
          Heading
        ],
        content: value,
        onUpdate: () => {
          onChange(editor.getJSON());
        },
      });

      useEffect(() => {
        if (ai.state === "loading") {
          editor?.commands.clearContent();
          editor?.commands.insertContent(ai?.data?.choices[0].message.content);
        }
      }, [ai.data, editor]);

      return (
        <FieldLabel label={label}>
          <Button
            onClick={() => {
              open();
            }}
          >
            Open Modal
          </Button>
          <Modal
            opened={opened}
            onClose={close}
            title="This is a fullscreen modal"
            fullScreen
            radius={0}
            transitionProps={{ transition: "fade", duration: 200 }}
            trapFocus={true}
          >
            <Container size="xl">
              <RichTextEditor editor={editor} bg="#ffffff">
                <RichTextEditor.Toolbar sticky stickyOffset={10}>
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
                  <RichTextEditor.ControlsGroup>
                    <AIGenerator ai={ai} />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
              </RichTextEditor>
            </Container>
          </Modal>
        </FieldLabel>
      );
    },
  };
  return config;
};

const AIGenerator = ({ ai }) => {
  const { editor } = useRichTextEditorContext();
  // const aiResponse = useFetcher();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      textAI: "",
    },
  });

  const handleAI = () => {
    const aiForm:any = form.getValues();
    ai.submit(
      {
        command: aiForm.commandAI,
        message: editor.getText(),
      },
      {
        method: "POST",
        action: "/api/ai-text",
        encType: "application/json",
      },
    );
  };

  return (
    <>
      <TextInput
        label="AI"
        description="Tell AI what to do"
        //placeholder="Input placeholder"
        key={form.key("commandAI")}
        {...form.getInputProps("commandAI")}
      />
      <RichTextEditor.Control
        onClick={() => handleAI()}
        aria-label="Insert AI"
        title="Insert AI"
      >
        AI
      </RichTextEditor.Control>
    </>
  );
};
