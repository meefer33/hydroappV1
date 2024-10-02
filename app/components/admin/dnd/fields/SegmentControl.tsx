import {SegmentedControl, Text} from '@mantine/core';
import {useFormContext} from '../forms/ContextForm';
import { useState } from 'react';

export default function SegmentControl({label, field, data}: any) {
    const form:any = useFormContext();

  return (
    <>
      <Text size="sm" fw={500} mb={3}>
        {label}
      </Text>

      <SegmentedControl
        fullWidth
        data={data}
        {...form.getInputProps(field)}
        styles={{
          root: {
            background: "var(--mantine-color-gray-1)",
            color: "var(--mantine-color-gray-8)",
            border: 0,
          },

        }}
      />
    </>
  );
}
