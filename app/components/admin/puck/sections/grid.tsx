import {DropZone, usePuck} from '@measured/puck';
import {colorPicker} from '../fields/colorPicker';
import {Box, Container, SimpleGrid} from '@mantine/core';

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

export function grid(theme) {
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
      content: {
        type: 'object',
        label: 'Content',
        objectFields: {
          width: {
            type: 'select',
            label: 'Width',
            options: [
              {label: 'small', value: 'sm'},
              {label: 'medium', value: 'md'},
              {label: 'large', value: 'lg'},
              {label: 'extra large', value: 'xl'},
            ],
          },
          columns: {
            type: 'select',
            label: 'Columns',
            options: [
              {label: '1', value: 1},
              {label: '2', value: 2},
              {label: '3', value: 3},
              {label: '4', value: 4},
            ],
          },
          gap: {
            type: 'select',
            label: 'Column Spacing',
            options: [
              {label: 'sm', value: 'sm'},
              {label: 'md', value: 'md'},
              {label: 'lg', value: 'lg'},
              {label: 'xl', value: 'xl'},
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
      content: {
        width: 'lg',
        columns: 2,
        gap: 'sm',
      },
    },
    render: ({section_background, padding, content}: Section) => {
      return (
        <Container size={content.width} bg={section_background}>
          <SimpleGrid
            type="container"
            cols={{base: 1, '48em': content.columns}}
            spacing={content.gap}
            verticalSpacing={content.gap}
            pt={padding.padding_top}
            pb={padding.padding_bottom}
       
          >
            <Box pos="relative">
              <DropZone
                zone="col-1"
                allow={[
                  'RichTextEditor',
                  'Image',
                  'Grid',
                  'Section',
                  'ProductScroll',
                  'CollectionGrid',
                ]}
              />
            </Box>
            {content.columns > 1 && (
              <DropZone
                zone="col-2"
                allow={['RichTextEditor', 'Image', 'Grid', 'Section']}
              />
            )}
            {content.columns > 2 && (
              <DropZone
                zone="col-3"
                allow={['RichTextEditor', 'Image', 'Grid', 'Section']}
              />
            )}
            {content.columns > 3 && (
              <DropZone
                zone="col-4"
                allow={['RichTextEditor', 'Image', 'Grid', 'Section']}
              />
            )}
          </SimpleGrid>
        </Container>
      );
    },
  };
  return config;
}
