import { Button, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AutoField, FieldLabel } from "@measured/puck";
import { useFetcher, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";

export const aiImage = (label: any) => {

  const ai = useFetcher();
  //const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  const toUpdate = "colorScheme";
  const config = {
    type: "custom",
    render: () => {
      const form = useForm({
        mode: "uncontrolled",
        initialValues: {
          textAI: "",
        },
      });

      const handleAI = () => {
        const aiForm = form.getValues();
        ai.submit(
          {
            command: aiForm.commandAI,
            //message: editor.getText(),
          },
          {
            method: "POST",
            action: "/api/ai-image",
            encType: "application/json",
          },
        );
      };

      /*
      useEffect(() => {
        console.log(ai);
      }, [ai.data]);
*/
      return (
        <FieldLabel label="Color Scheme">
          <TextInput
            label="AI"
            description="Tell AI what to do"
            //placeholder="Input placeholder"
            key={form.key("commandAI")}
            {...form.getInputProps("commandAI")}
          />
          <Button
            onClick={() => handleAI()}
          >
            AI
          </Button>
        </FieldLabel>
      );
    },
  };
  return config;
};
