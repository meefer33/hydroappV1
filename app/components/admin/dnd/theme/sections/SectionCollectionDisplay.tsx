import {Button, Card, Container, Text, Title} from '@mantine/core';
import {Carousel} from '@mantine/carousel';
import {Image} from '@shopify/hydrogen';

export default function SectionCollectionDisplay({content}: any) {
  const settings = content?.fields?.settings;
  const collection = content?.fields?.collection;
  return (
    <Container fluid px={0} py={settings?.padding} bg={settings?.bg}>
      <Container size={settings?.contentWidth}>
        <Carousel
          //withIndicators
          //height={400}
          slideSize={{
            base: '100%',
            sm: settings?.slides?.tablet,
            xs: '100%',
            md: settings?.slides?.desktop,
          }}
          slideGap={{base: 'lg', sm: 'md'}}
          loop
          align="start"
          slidesToScroll={1}
        >
          {collection?.products?.nodes.map((product: any) => {
            const image = product?.featuredImage;
            return (
              <Carousel.Slide key={product?.id}>
                <Card shadow="sm" padding="sm" radius="xs" withBorder>
                  <Card.Section>
                    {image && (
                      <Image
                        sizes="(min-width: 45em) 50vw, 100vw"
                        data={image}
                        aspectRatio={`${image.width}/${image.height}`}
                        style={{height: 'auto'}}
                      />
                    )}
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
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Container>
    </Container>
  );
}
