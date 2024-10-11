import {Container} from '@mantine/core';

export default function Section({props,children}: any) {
  return (
    <Container
      fluid
      px={0}
      pt={props?.padding?.top}
      pb={props?.padding?.bottom}
      bg={props?.bgColor}
    >
      Section
      {children}
    </Container>
  );
}
