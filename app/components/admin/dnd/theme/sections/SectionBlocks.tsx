import {Container} from '@mantine/core';

export default function SectionBlocks({content, children}: any) {
  const settings = content.fields.settings;

  return (
    <Container fluid px={0} py={settings?.padding} bg={settings?.bg}>
      <Container size={settings?.contentWidth}>{children}</Container>
    </Container>
  );
}
