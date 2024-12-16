import {Link, useOutletContext} from '@remix-run/react';
import SelectTheme from './SelectTheme';
import {Box, Button, Stack} from '@mantine/core';

export default function AppNavbarTheme({editTheme}) {
  const {theme}: any = useOutletContext();
  return (
    <>
      {theme && (
          <Stack gap="sm" p="sm">
            <Button component={Link} to="/admin/themes" color="gray.7">
              Manage Themes
            </Button>
            <Box bg="gray.0">
              <SelectTheme />
            </Box>
          </Stack>
      )}
    </>
  );
}
