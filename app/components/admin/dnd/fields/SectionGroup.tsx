import {Box, Group, SimpleGrid, Title} from '@mantine/core';
import {useFormContext} from '../forms/ContextForm';
import FieldsGroup from './FieldsGroup';
import SelectBox from './SelectBox';
import ColorPicker from './ColorPicker';
import {useEffect} from 'react';

export default function SectionGroup({
  label = 'Section',
  isOpen = false,
  item,
  section,
}: any) {
  const form: any = useFormContext();

  useEffect(() => {
    form.setValues({
      padding: {
        top: item?.padding?.top ? item?.padding?.top : '0',
        bottom: item?.padding?.bottom ? item?.padding?.bottom : '0',
        left: item?.padding?.left ? item?.padding?.left : '0',
        right: item?.padding?.right ? item?.padding?.right : '0',
      },
      bgColor: item?.bgColor,
    });
  }, [item]);

  return (
    <FieldsGroup label={label} isOpen={isOpen}>
      <Title order={5}>Padding</Title>
      <Box m="sm">
      <SimpleGrid cols={2}>
        <SelectBox label="Top" field="padding.top" />
        <SelectBox label="Bottom" field="padding.bottom" />
        <SelectBox label="Left" field="padding.left" />
        <SelectBox label="Right" field="padding.right" />
      </SimpleGrid>
      </Box>
      <ColorPicker
        label="Section Background"
        field="bgColor"
        itemValue={item?.bgColor}
        section={section}
      />
    </FieldsGroup>
  );
}
