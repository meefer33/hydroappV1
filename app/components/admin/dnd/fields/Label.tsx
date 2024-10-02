import {Text} from '@mantine/core';

export default function Label({label}: any) {

  return (
    <>
      <Text size="md" fw={500} p="sm" bg="gray.0">
        {label}
      </Text>
    </>
  );
}
