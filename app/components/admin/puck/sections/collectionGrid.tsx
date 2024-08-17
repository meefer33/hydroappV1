import {
  Box,
  Card,
  SimpleGrid,
  Image,
  Title,
  Text,
  Button,
  Container,
} from '@mantine/core';

export const collectionGrid = (theme) => {
  const config = {
    fields: {
      productsToDisplay: {
        label: 'Number of Products',
        type: 'number',
        min: 2,
        max: 50,
      },
      collections: {
        type: 'external',
        label: 'Select Collection',
        fetchList: async () => {
          const items: any = await fetch(`/api/get-collections`).then((res) =>
            res.json(),
          );
          console.log('collection items', items);
          const i = items?.collections?.nodes.map((v) => {
            return {id: v.id, title: v?.title, handle: v?.handle};
          });
          return i;
        },
      },
      content: {
        type: 'object',
        label: 'Content',
        objectFields: {
          width: {
            type: 'select',
            label: 'Width',
            options: [
              {label: 'small', value: 'sm'},
              {label: 'medium', value: 'md'},
              {label: 'large', value: 'lg'},
              {label: 'extra large', value: 'xl'},
            ],
          },
          columns: {
            type: 'select',
            label: 'Columns',
            options: [
              {label: '1', value: 1},
              {label: '2', value: 2},
              {label: '3', value: 3},
              {label: '4', value: 4},
            ],
          },
          gap: {
            type: 'select',
            label: 'Column Spacing',
            options: [
              {label: 'sm', value: 'sm'},
              {label: 'md', value: 'md'},
              {label: 'lg', value: 'lg'},
              {label: 'xl', value: 'xl'},
            ],
          },
        },
      },
    },
    resolveData: async ({props}, {changed}) => {
      if (!props.collections?.handle) return {props};

      // Don't query unless `data` has changed since resolveData was last run
      //if (!changed.collections) return {props};

      // Re-query the API for a particular item
      const latestData = await fetch(
        `/api/get-collection/${props.collections.handle}/${props.productsToDisplay}`,
      ).then((res) => res.json());
      // { title: "Hello, world", description: "Lorem ipsum 1", id: 0 }

      return {
        props: {
          // Update the value for `data`
          nc: latestData,
        },
      };
    },
    defaultProps: {
      productsToDisplay: 20,
      content: {
        width: 'lg',
        columns: 2,
        gap: 'sm',
      },
    },
    render: ({...props}) => {
      //const pinned = useHeadroom({fixedAt: 10});
      const collections = props.nc;
      const content = props.content;
      console.log(props);
      return (
        <Container size={content.width} px={0}>
          <SimpleGrid
            type="container"
            cols={{base: 1, '48em': content.columns}}
            spacing={content.gap}
            verticalSpacing={content.gap}
            mx={0}
            px={0}
          >
            {collections?.collection?.products?.nodes.map((product) => {
              return (
                <Card
                  shadow="sm"
                  padding="sm"
                  radius="xs"
                  withBorder
                  key={product.id}
                >
                  <Card.Section>
                    <Image
                      //aspectRatio="16/9"
                      src={product?.featuredImage.url}
                      h={200}
                      //w="auto"
                      // fit="cover"
                    />
                  </Card.Section>

                  <Card.Section inheritPadding h={70} py="sm">
                    <Title order={4} lts={1}>
                      {product?.title}
                    </Title>
                  </Card.Section>

                  <Card.Section inheritPadding withBorder h={120} py="sm">
                    <Text size="sm" c="dimmed">
                      {product?.description}
                    </Text>
                  </Card.Section>
                  <Card.Section withBorder inheritPadding py="sm">
                    <Button
                      color="primary"
                      fullWidth
                      radius="0"
                      variant="outline"
                    >
                      Learn More
                    </Button>
                  </Card.Section>
                </Card>
              );
            })}
          </SimpleGrid>
        </Container>
      );
    },
  };
  return config;
};
