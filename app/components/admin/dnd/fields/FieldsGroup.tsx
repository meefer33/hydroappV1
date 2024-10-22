import {
  Box,
  Button,
  Collapse,
  Container,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import Label from './Label';
import {useDisclosure} from '@mantine/hooks';
import { RiArrowDownLine, RiArrowDownWideLine, RiArrowDropDownFill } from '@remixicon/react';

export default function FieldsGroup({
  label = 'Fields',
  isOpen = false,
  children,
}: any) {
  const [opened, {toggle}] = useDisclosure(isOpen);
  const icon = <RiArrowDownWideLine  />;
  return (
    <>
      <Button size="lg" justify="space-between" fullWidth onClick={toggle} color="gray" variant="white" radius={0} rightSection={icon}>
        {label}
      </Button>
      <Collapse in={opened}>
        <Stack gap="sm" p="sm" bg="gray.0">
          {children}
        </Stack>
      </Collapse>
    </>
  );
}
