import {DropZone} from '@measured/puck';
import {colorPicker} from '../fields/colorPicker';
import {Container} from '@mantine/core';

type Section = {
  section_background: string;
  padding: {
    padding_top: string;
    padding_bottom: string;
  };
  content: {
    width: string;
    columns: number;
    gap: string;
  };
};

export function section(theme) {
  const config = {
    fields: {
      section_background: colorPicker('Section Background Color', theme),
      padding: {
        type: 'object',
        label: 'Padding',
        objectFields: {
          padding_top: {
            type: 'select',
            label: 'Top',
            options: [
              {label: 'none', value: '0'},
              {label: 'small', value: 'sm'},
              {label: 'medium', value: 'md'},
              {label: 'large', value: 'lg'},
            ],
          },
          padding_bottom: {
            type: 'select',
            label: 'Bottom',
            options: [
              {label: 'none', value: '0'},
              {label: 'small', value: 'sm'},
              {label: 'medium', value: 'md'},
              {label: 'large', value: 'lg'},
            ],
          },
        },
      },
    },
    defaultProps: {
      //section_background: "#ffffff",
      padding: {
        padding_top: 'sm',
        padding_bottom: 'sm',
      },
    },
    render: ({section_background, padding, content}: Section) => {
      return (
        <Container
          fluid
          px={0}
          pt={padding.padding_top}
          pb={padding.padding_bottom}
          bg={section_background}
        >
          <DropZone zone="section" />
        </Container>
      );
    },
  };
  return config;
}
