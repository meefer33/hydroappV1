import {Box} from '@mantine/core';
import {defaultBlocks, DefaultBlocks} from '../lib/metaTypes';

export default function Blocks({
  settings,
  children,
}: {
  settings: DefaultBlocks;
  children: any;
}) {
  const display = settings || defaultBlocks;
  return (
    <Box bg={display?.bg} p={display?.padding}>
      {children}
    </Box>
  );
}
