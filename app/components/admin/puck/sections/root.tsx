import { useHeadroom } from "@mantine/hooks";
import { colorPickerPrimary } from "../fields/colorPickerPrimary";
import { colorscheme } from "../fields/colorScheme";
import {
  Box,
  Group,
  Stack,
  rem,
  Divider,
  Flex,
  Container,
  Button,
  MantineProvider,
  createTheme,
  useMantineColorScheme,
  CSSVariablesResolver,
  Card,
  Badge,
  Text,
  Image,
  ColorSchemeScript,
} from "@mantine/core";
import { imagePicker } from "../fields/imagePicker";
import { useOutletContext } from "@remix-run/react";
//import { Image } from "@shopify/hydrogen";
import PageLayout from "../layouts/PageLayout";
import { colorPicker } from "../fields/colorPicker";
import { colorPickerThemes } from "../fields/colorPickerThemes";
import { aiImage } from "../fields/aiImage";
import { DropZone } from "@measured/puck";

export const root = (contentType = "default", contentData = {}) => {
  const context = useOutletContext();
  const { theme, updateTheme }: any = context;
  //console.log('th',theme)
  const resolver: CSSVariablesResolver = (theme) => ({
    variables: {
      "--mantine-color-body":
        theme.other.colorScheme === "dark"
          ? theme.other.themes.dark.bg_color
          : theme.other.themes.light.bg_color,
      "--mantine-color-text":
        theme.other.colorScheme === "dark"
          ? theme.other.themes.dark.text_color
          : theme.other.themes.light.text_color,
      //"--mantine-color-dimmed":
      //  theme.other.colorScheme === "dark"
      //    ? theme.other.themes.dark.text_color
      //    : theme.other.themes.light.text_color,
      //'--button-radius': theme.defaultRadius,
      //'--button-fz': '--mantine-font-size-md',
      //
      "--divider-color":
        theme.other.colorScheme === "dark"
          ? "--mantine-color-dark-4"
          : "--mantine-color-dark-4",
    },
    light: {
      "--mantine-color-body": theme.colors.dark[6],
    },
    dark: {
      "--mantine-color-body": theme.colors.dark[6],
    },
  });

  const config = {
    fields: {
      colorScheme: colorscheme(),
      colors: {
        type: "object",
        label: "Theme Colors",
        objectFields: {
          primary_color: colorPickerPrimary("Primary Color", "primary"),
          accent_color: colorPickerPrimary("Accent Color", "accent"),
          negative_color: colorPickerPrimary("Negative Color", "negative"),
          positive_color: colorPickerPrimary("Positive Color", "positive"),
          notice_color: colorPickerPrimary("Notice Color", "notice"),
          info_color: colorPickerPrimary("Info Color", "info"),
        },
      },
      light_theme: {
        type: "object",
        label: "Light Theme",
        objectFields: {
          bg_color: colorPickerThemes("Background Color", "light", "bg_color"),
          text_color: colorPickerThemes("Text Color", "light", "text_color"),
        },
      },
      dark_theme: {
        type: "object",
        label: "Dark Theme",
        objectFields: {
          bg_color: colorPickerThemes("Background Color", "dark", "bg_color"),
          text_color: colorPickerThemes("Text Color", "dark", "text_color"),
        },
      },
      logo: imagePicker("Select Logo"),
      menu: {
        type: "array",
        arrayFields: {
          title: { type: "text" },
          url: { type: "text" },
          submenu: {
            type: "array",
            arrayFields: {
              title: { type: "text" },
              url: { type: "text" },
            },
          },
        },
       // max: 3,
      },
      ai_image: aiImage("Create Image"),
    },
    defaultProps: {
      //primary_color: defaultTheme.colors[defaultTheme.primaryColor],
    },
    render: ({ children }) => {
      const pinned = useHeadroom({ fixedAt: 80 });
      //console.log(pinned)
      //theme.other.themes[theme.other.colorScheme].bg_color
      return (
        <>
          <MantineProvider
            theme={theme}
            defaultColorScheme={theme.other.colorScheme}
            cssVariablesResolver={resolver}
          >
            <Container fluid bg="var(--mantine-color-body)">
            <DropZone zone="header" />
              <Box
                pos={pinned ? "sticky" : "relative"}
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  padding: "var(--mantine-spacing-xs)",
                  height: rem(80),
                  zIndex: 1,
                  transform: `translate3d(0, ${pinned ? 0 : rem(-80)}, 0)`,
                  transition: "transform 400ms ease",
                  backgroundColor: "var(--mantine-color-body)",
                }}
              >
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  gap={{ base: "sm", sm: "lg" }}
                  justify={{ sm: "space-between" }}
                  // wrap="wrap"
                >
                  <Box>
                    {theme?.other?.logo ? (
                      <Image
                        //aspectRatio="1/1"
                        data={theme?.other?.logo}
                        sizes="(min-width: 45em) 50vw, 100vw"
                        loading="eager"
                        width={200}
                        //height={50}
                      />
                    ) : (
                      <h1>Logo</h1>
                    )}
                  </Box>
                  <Box>
                    <Stack
                      justify="space-between"
                      align="end"
                      h="60"
                      visibleFrom="sm"
                    >
                      <Box>top group</Box>
                      <Box>bottom group</Box>
                    </Stack>
                  </Box>
                </Flex>
              </Box>
              {contentType === "page" && (
                <PageLayout contentData={contentData} />
              )}
              <Box>{children}</Box>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M12 2C9.79 2 8 3.79 8 6c0 .33.03.65.08.96C7.46 7.19 6.8 7 6 7 4.34 7 3 8.34 3 10c0 1.1.45 2.1 1.17 2.83L4 19c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2l-.17-6.17C20.55 12.1 21 11.1 21 10c0-1.66-1.34-3-3-3-.8 0-1.46.19-2.08.46.05-.31.08-.63.08-.96 0-2.21-1.79-4-4-4zm0 2c1.1 0 2 .9 2 2 0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1 0-1.1.9-2 2-2zM8 9c1.1 0 2 .9 2 2v1H6.83l.71 6h8.92l.71-6H14v-1c0-1.1.9-2 2-2s2 .9 2 2v2H8v-2c0-1.1.9-2 2-2zm0 4h8v2H8v-2z"
                  fill="black"
                />
              </svg>

              <Box>
                {theme?.other?.logo ? (
                  <Image
                    // aspectRatio="16/9"
                    src={theme?.other?.logo.url}
                    sizes="(min-width: 45em) 50vw, 100vw"
                    h={{ base: 100, sm: 400 }}
                    //loading="eager"
                    //width="100%"
                    // w="auto"
                    //crop="center"
                    //style={{objectFit:"cover",height:"300px",}}
                  />
                ) : (
                  <h1>Logo</h1>
                )}
              </Box>
              <Button color="primary.1">button</Button>
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
                  <Badge color="cyan.6">On Sale</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  With Fjord Tours you can explore more of the magical fjord
                  landscapes with tours and activities on and around the fjords
                  of Norway
                </Text>

                <Button color="blue.6" fullWidth mt="md" radius="md">
                  Book classic tour now
                </Button>
              </Card>
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
                  <Badge color="cyan.6">On Sale</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  With Fjord Tours you can explore more of the magical fjord
                  landscapes with tours and activities on and around the fjords
                  of Norway
                </Text>

                <Button color="blue.6" fullWidth mt="md" radius="md">
                  Book classic tour now
                </Button>
              </Card>
              <Divider
                my="xs"
                label="Label in the center"
                labelPosition="center"
              />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
              <Divider my="xl" />
            </Container>
          </MantineProvider>
        </>
      );
    },
  };
  return config;
};
