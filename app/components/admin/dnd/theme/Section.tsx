import {Container} from '@mantine/core';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function Section({props}: any) {
  return (
    <Container
      fluid
      px={0}
      pt={props?.padding?.top}
      pb={props?.padding?.bottom}
      bg={props?.bgColor}
    >
      Section item
    </Container>
  );
}
