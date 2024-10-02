import {
  ActionIcon,
  Button,
  Container,
  Group,
  SegmentedControl,
  Table,
  TextInput,
  Text,
  Stack,
  Box,
} from '@mantine/core';
import dayjs from 'dayjs/esm/index.js';
import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
} from '@remix-run/react';
import {RiExternalLinkLine} from '@remixicon/react';
import {ActionFunctionArgs, LoaderFunctionArgs} from '@remix-run/node';
import {GetMetaobject} from '~/graphql/admin/GetMetaobject';
import {parseCmsContent, parseContent} from '~/lib/parseContent';
import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';
import {themeSettings} from '~/components/admin/puck/themesettings';
import {GetMetaobjectByHandle} from '~/graphql/admin/GetMetaobjectByHandle';
import ImagePicker from '~/components/admin/imagePicker';
import {useForm} from '@mantine/form';
import {useState} from 'react';

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin} = context;
  const {slug} = params;

  const getMetaobjectByHandle = await admin.request(GetMetaobjectByHandle, {
    variables: {
      handle: {type: 'theme', handle: slug},
    },
  });

  const theme = parseContent(getMetaobjectByHandle?.data?.metaobjectByHandle);

  return {theme};
};

export default function Themes() {
  const {theme}: any = useLoaderData<typeof loader>();
  const settings = theme.fields.settings
  const slug = theme.fields.slug
  console.log('slug theme', theme);
  const [fileUrl, setFileUrl] = useState<Object>(settings?.logo);
  const actionUpdateSettings = useFetcher();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      mode: settings?.mode,
      fonts: {
        font_body_class: settings?.fonts?.font_body_class || '',
        font_body_url: settings?.fonts?.font_body_url || '',
        font_headings_class: settings?.fonts?.font_headings_class || '',
        font_headings_url: settings?.fonts?.font_headings_url || '',
      },
    },
  });

  const handleForm = () => {
    const updateTheme = form.getValues();
    console.log('theme', updateTheme, fileUrl);
    const saveTheme = {...updateTheme, logo: fileUrl};

    actionUpdateSettings.submit(
      {
        handle: {
          type: 'theme',
          handle: slug,
        },
        metaobject: {
          fields: [
            {
              key: 'slug',
              value: slug,
            },
            {
              key: 'settings',
              value: JSON.stringify(saveTheme),
            },
          ],
        },
      },
      {
        method: 'PUT',
        action: '/api/upsertMetaobject',
        encType: 'application/json',
      },
    );
  };

  return (
    <Container size="xl">
      <Stack
        bg="var(--mantine-color-body)"
        //align="stretch"
        //justify="center"
        gap="xl"
      >
        <Box>
          <Text size="lg" fw={500} mb={3}>
            Mode
          </Text>
          <SegmentedControl
            data={['light', 'dark']}
            key={form.key('mode')}
            {...form.getInputProps('mode')}
          />
        </Box>
        <Box>
          <ImagePicker fileUrl={fileUrl} setFileUrl={setFileUrl} />
        </Box>

        <Box>
          <Text size="lg" fw={500} mb={3}>
            Fonts
          </Text>
          <Text size="sm" fw={500} mb={3}>
            Body Class
          </Text>
          <TextInput
            key={form.key('fonts.font_body_class')}
            {...form.getInputProps('fonts.font_body_class')}
            mb="sm"
          />
          <Text size="sm" fw={500} mb={3}>
            Body Url
          </Text>
          <TextInput
            key={form.key('fonts.font_body_url')}
            {...form.getInputProps('fonts.font_body_url')}
            mb="sm"
          />
          <Text size="sm" fw={500} mb={3}>
            Heading Class
          </Text>
          <TextInput
            key={form.key('fonts.font_headings_class')}
            {...form.getInputProps('fonts.font_headings_class')}
            mb="sm"
          />
          <Text size="sm" fw={500} mb={3}>
            Heading Url
          </Text>
          <TextInput
            key={form.key('fonts.font_headings_url')}
            {...form.getInputProps('fonts.font_headings_url')}
            mb="sm"
          />
        </Box>
        <Box w="full" p="xl">
          <Button onClick={() => handleForm()}>Save </Button>
        </Box>
      </Stack>
    </Container>
  );
}
