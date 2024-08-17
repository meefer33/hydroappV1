import {Box, Button, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {AutoField, FieldLabel} from '@measured/puck';
import {useState} from 'react';

export const fonts = (theme, updateTheme) => {
  const config = {
    type: 'custom',
    render: ({onChange, value}) => {
      const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          font_body_class: theme.other.fonts.body.class,
          font_body_url: theme.other.fonts.body.url,
          font_headings_class: theme.other.fonts.headings.class,
          font_headings_url: theme.other.fonts.headings.url,
        },
      });

      const handleFontsForm = () => {
        const fontsForm = form.getValues();
        theme.other.fonts.body.class = fontsForm.font_body_class;
        theme.other.fonts.body.url = fontsForm.font_body_url;
        theme.other.fonts.headings.class = fontsForm.font_headings_class;
        theme.other.fonts.headings.url = fontsForm.font_headings_url;
        updateTheme(theme);
      };
      return (
        <>
          <FieldLabel label="Fonts" />
          <Box bg="white" p="md">
            <FieldLabel label="Body Class">
              <TextInput
                key={form.key('font_body_class')}
                {...form.getInputProps('font_body_class')}
                styles={{
                  input: {
                    background: 'var(--mantine-color-gray-2)',
                    color: 'var(--mantine-color-gray-8)',
                    border: 0,
                  },
                }}
                mb="sm"
              />
            </FieldLabel>
            <FieldLabel label="Body Url">
              <TextInput
                key={form.key('font_body_url')}
                {...form.getInputProps('font_body_url')}
                styles={{
                  input: {
                    background: 'var(--mantine-color-gray-2)',
                    color: 'var(--mantine-color-gray-8)',
                    border: 0,
                  },
                }}
                mb="sm"
              />
            </FieldLabel>
            <FieldLabel label="Headings Class">
              <TextInput
                key={form.key('font_headings_class')}
                {...form.getInputProps('font_headings_class')}
                styles={{
                  input: {
                    background: 'var(--mantine-color-gray-2)',
                    color: 'var(--mantine-color-gray-8)',
                    border: 0,
                  },
                }}
                mb="sm"
              />
            </FieldLabel>
            <FieldLabel label="Headings Url">
              <TextInput
                key={form.key('font_headings_url')}
                {...form.getInputProps('font_headings_url')}
                styles={{
                  input: {
                    background: 'var(--mantine-color-gray-2)',
                    color: 'var(--mantine-color-gray-8)',
                    border: 0,
                  },
                }}
                mb="sm"
              />
            </FieldLabel>

            <Button onClick={() => handleFontsForm()}>Update Fonts</Button>
          </Box>
        </>
      );
    },
  };
  return config;
};
