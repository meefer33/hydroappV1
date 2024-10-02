import {SegmentedControl, Slider, Text} from '@mantine/core';
import {useFormContext} from '../forms/ContextForm';
import { useState } from 'react';

export default function NumberSlider({label, field}: any) {
    const form:any = useFormContext();

  return (
    <>
      <Text size="sm" fw={500} mb={50}>
        {label}
      </Text>
      <Slider color="gray.9" labelAlwaysOn thumbSize={26} {...form.getInputProps(field)} />
    </>
  );
}
