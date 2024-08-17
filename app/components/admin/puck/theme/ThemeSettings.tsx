import {
  Box,
  Group,
  Container,
  Button,
  Card,
  Badge,
  Text,
  Image,
  Alert,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { RiErrorWarningLine, RiInformation2Line, RiQuestionAnswerLine, RiShieldCheckLine } from '@remixicon/react';

export default function ThemeSettings({theme}) {
  return (
    <Box mb="sm">
      {/* main body */}
      <Container size="lg">
        <Group gap="sm" py="md">
          <Button color={theme.other.themeColors.primary}>Primary</Button>
          <Button color={theme.other.themeColors.accent}>Accent</Button>
          <Button color={theme.other.themeColors.positive}>Positive</Button>
          <Button color={theme.other.themeColors.negative}>Negative</Button>
          <Button color={theme.other.themeColors.notice}>Notice</Button>
          <Button color={theme.other.themeColors.info}>Info</Button>
        </Group>
        <SimpleGrid type="container" cols={{base: 1, '500px': 2, '800px': 3}}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                height={160}
                alt="Norway"
                sizes="(min-width: 45em) 50vw, 100vw"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Norway Fjord Adventures</Text>
              <Badge color="accent">On Sale</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
            </Text>

            <Button color="primary" fullWidth mt="md" radius="md">
              Book classic tour now
            </Button>
          </Card>
        </SimpleGrid>

        <Alert
          variant="light"
          color="notice"
          title="Notice"
          icon={<RiQuestionAnswerLine />}
          my="md"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis,
          quae tempore necessitatibus placeat saepe.
        </Alert>
        <Alert
          variant="light"
          color="info"
          title="Info"
          icon={<RiInformation2Line />}
          my="md"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis,
          quae tempore necessitatibus placeat saepe.
        </Alert>
        <Alert
          variant="light"
          color="positive"
          title="Positive"
          icon={<RiShieldCheckLine />}
          my="md"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis,
          quae tempore necessitatibus placeat saepe.
        </Alert>
        <Alert
          variant="light"
          color="negative"
          title="Negative"
          icon={<RiErrorWarningLine />}
          my="md"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis,
          quae tempore necessitatibus placeat saepe.
        </Alert>
        <Title order={1}>This is h1 title</Title>
        <Title order={2}>This is h2 title</Title>
        <Title order={3}>This is h3 title</Title>
        <Title order={4}>This is h4 title</Title>
        <Title order={5}>This is h5 title</Title>
        <Title order={6}>This is h6 title</Title>
      </Container>
    </Box>
  );
}
