import {Container, SimpleGrid} from '@mantine/core';

export default function SectionBlocks({content,children}: any) {
  const settings = content.fields.settings;

  return (
    <Container fluid px={0} py={settings?.padding} bg={settings?.bg} >
      <Container size={settings?.contentWidth} >
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
      </Container>
    </Container>
  );
}
