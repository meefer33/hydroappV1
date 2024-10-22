import {Accordion, Box, Group, SimpleGrid, Stack, Title} from '@mantine/core';
import {useFormContext} from '../forms/ContextForm';
import FieldsGroup from './FieldsGroup';
import SelectBox from './SelectBox';
import ColorPicker from './ColorPicker';
import {useEffect, useState} from 'react';
import TextBox from './TextBox';
import {nanoid} from 'nanoid';

export default function SectionGroup({label = 'Section', isOpen = false}: any) {
  

  return (
    <FieldsGroup label={label} isOpen>
      <TextBox label="Name" field="name" />
      <SelectBox label="Content Width" field="contentWidth" />
      <SelectBox label="Padding" field="padding" />
      <SelectBox label="Spacing" field="spacing" />
      <ColorPicker label="Section Background" field="bg" />
    </FieldsGroup>
  );
}
