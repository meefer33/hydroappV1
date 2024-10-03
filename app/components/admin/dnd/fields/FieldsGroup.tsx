import {Box, Button, Collapse, Stack, UnstyledButton} from '@mantine/core';
import Label from './Label';
import {useDisclosure} from '@mantine/hooks';

export default function FieldsGroup({label = 'Fields', children}: any) {
  const [opened, {toggle}] = useDisclosure(false);
  return (
    <>
      <UnstyledButton w={'100%'} onClick={toggle} >
        <Label label={label} />
      </UnstyledButton>
      <Collapse in={opened}>
        <Stack gap="sm" p="sm">
          {children}
        </Stack>
      </Collapse>
    </>
  );
}