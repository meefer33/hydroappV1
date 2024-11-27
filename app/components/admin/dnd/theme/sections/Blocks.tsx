import {Container, SimpleGrid} from '@mantine/core';

export default function Blocks({settings,children}: any) {

  return (

        <SimpleGrid
          type="container"
          cols={{
            base: settings?.cols?.mobile,
            '36em': settings?.cols?.tablet,
            '48em': settings?.cols?.desktop,
          }}
          spacing={settings?.spacing}
          //verticalSpacing={settings?.spacing}
        >
          {children}
        </SimpleGrid>

  );
}
