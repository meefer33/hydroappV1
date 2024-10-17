import {SegmentedControl, Slider, Text} from '@mantine/core';
import {useFormContext} from '../forms/ContextForm';
import { useState } from 'react';

export default function NumberSlider({label, field, min=1, max=50, step=1}: any) {
    const form:any = useFormContext();

  return (
    <>
      <Text size="sm" fw={500} mb={50}>
        {label}
      </Text>
      <Slider color="gray.9" labelAlwaysOn thumbSize={26} min={min} max={max} step={step} {...form.getInputProps(field)} />
    </>
  );
}
