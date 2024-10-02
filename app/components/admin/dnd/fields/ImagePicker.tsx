import {
  Button,
  Modal,
  Image,
  Group,
  Box,
  Container,
  rem,
  Text,
  TextInput,
  Grid,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {FieldLabel} from '@measured/puck';
import {useFetcher} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {IconUpload, IconPhoto, IconX} from '@tabler/icons-react';
import {Dropzone, DropzoneProps, IMAGE_MIME_TYPE} from '@mantine/dropzone';
import {useFormContext} from '../forms/ContextForm';
import Label from './Label';
//import { Thumbnail } from "@shopify/polaris";

export default function ImagePicker({label = 'Text Box', field}: any) {
  const form: any = useFormContext();

  const [queryValue, setQueryValue] = useState<string>('');
  const [opened, {open, close}] = useDisclosure(false);
  // const [listFiles, setListFiles] = useState<String[] | any>([]);
  const [tempFiles, setTempFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [filesToUpload, setFilesToUpload] = useState<String[] | any>([]);
  const fetcher = useFetcher();
  const stagedUploadsCreate: any = useFetcher();
  const fileCreate = useFetcher();

  const createStagedUploads = (files) => {
    let sendFiles: String[] | any = [];
    files.map((file: any) => {
      sendFiles.push({
        resource: 'IMAGE',
        filename: file.name,
        mimeType: file.type,
        fileSize: file.size.toString(),
        httpMethod: 'POST',
      });
    });
    const addAlt = files.map((file, index) => {
      file['alt'] = '';
      return file;
    });
    setTempFiles(addAlt);
    stagedUploadsCreate.submit(
      {files: JSON.stringify(sendFiles)},
      {
        method: 'POST',
        action: '/api/create-staged-uploads',
      },
    );
  };

  useEffect(() => {
    if (stagedUploadsCreate.data) {
      const addResourceUrl: any = tempFiles.map((file: any, index) => {
        const stagedTarget =
          stagedUploadsCreate?.data?.data?.stagedUploadsCreate?.stagedTargets[
            index
          ];
        file['resourceUrl'] = stagedTarget.resourceUrl;
        file['url'] = stagedTarget.url;
        file['parameters'] = stagedTarget.parameters;
        fileUploadStaged(stagedTarget.url, stagedTarget.parameters, file);
        return file;
      });
      setFilesToUpload(addResourceUrl);
      setTempFiles([]);
    }
  }, [stagedUploadsCreate.data]);

  const fileUploadStaged = async (url, parameters, file) => {
    const formData = new FormData();
    parameters.forEach(({name, value}) => {
      formData.append(name, value);
    });
    formData.append('file', file);
    formData.append('url', url);
    const request = await fetch(url, {
      method: 'POST',
      body: formData,
    });
  };

  const UploadedFiles = () => {
    return (
      <fileCreate.Form method="post" action="/api/create-files">
        {filesToUpload.map((file, index) => {
          const imageUrl = URL.createObjectURL(file);
          return (
            <Group key={index} justify="center" align="center" gap="xl">
              <Image
                src={imageUrl}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
                h="120"
                fit="cover"
              />
              <div>{file.name}</div>

              <input
                type="hidden"
                name="resourceUrl"
                value={file.resourceUrl}
              />
              <TextInput
                //label="Add Alt Text"
                //description="Input description"
                placeholder="Alt Text"
                name="alt"
              />

              <Button type="submit">Upload Image</Button>
            </Group>
          );
        })}
      </fileCreate.Form>
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(e.target.value);
    getImages(e.target.value);
  };
  const getImages = (search: String | any) => {
    fetcher.load(`/api/getFiles?search=${search}`);
  };

  useEffect(() => {
    if (fileCreate.data) {
      console.log('fileCreate', fileCreate);
      const splitId = fileCreate?.data?.data?.fileCreate.files[0].id.split('/');
      setFilesToUpload([]);
      //setQueryValue(`id:${splitId[4]}`);
      setTimeout(() => getImages(''), 2000);
    }
  }, [fileCreate.data]);

  const setLogo = (logo: any) => {
    form.setFieldValue(field, logo);
  };

  return (
    <>
      {/*value && <Image src={value?.url} alt={value?.alt} h={50} />*/}
      <Button
        onClick={() => {
          open();
          getImages('');
        }}
      >
        {label}
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen
        radius={0}
        transitionProps={{transition: 'fade', duration: 200}}
        trapFocus={true}
      >
        <Container size="xl">
          <Group pb="md">
            <Dropzone
              onDrop={(files) => createStagedUploads(files)}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              //{...props}
            >
              <Group
                justify="center"
                gap="md"
                mih={60}
                style={{pointerEvents: 'none'}}
              >
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: 'var(--mantine-color-blue-6)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: 'var(--mantine-color-red-6)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: 'var(--mantine-color-dimmed)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>
                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <div>{filesToUpload.length > 0 && <UploadedFiles />}</div>
          </Group>
          <TextInput
            data-autofocus
            onChange={(e) => {
              handleSearch(e);
            }}
            value={queryValue}
            inputSize="sm"
            label="Search Images"
            placeholder="search"
            py={10}
          />
          <Grid gutter="lg">
            {fetcher.data?.data?.files?.nodes?.map((file) => {
              if (!file?.image?.url) {
                return;
              }

              return (
                <Grid.Col span={1} key={file.id}>
                  <Box
                    component="button"
                    onClick={() => {
                      setLogo(file?.image);
                      close();
                    }}
                  >
                    <Image
                      src={file?.image?.url}
                      alt={file?.image?.alt}
                      h={50}
                    />
                  </Box>
                </Grid.Col>
              );
            })}
          </Grid>
        </Container>
      </Modal>
    </>
  );
}
