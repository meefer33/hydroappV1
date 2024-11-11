import {Badge, Button, Card, Group, rem, Text, Title, Image} from '@mantine/core';
import {Link} from '@remix-run/react';
import {RiHeart3Line} from '@remixicon/react';
import {Money} from '@shopify/hydrogen';
import {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export default function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Card
      shadow="sm"
      //padding="lg"
      radius="xs"
      withBorder
      style={{minHeight: rem(500)}}
    >
      <Card.Section>
        {product.featuredImage && (
          <Image
          src={product.featuredImage.url}
            //alt={product.featuredImage.altText || product.title}
            //aspectRatio="3/5"
            //data={product.featuredImage}
            //loading={loading}
            //sizes="(min-width: 45em) 50vw, 100vw"
            //crop="center"
            //style={{objectFit:"cover"}}
          />
        )}
      </Card.Section>
      <Card.Section
        withBorder
        inheritPadding
        py="2"
        style={{minHeight: rem(190)}}
      >
        <Group justify="space-between" mt="md" mb="xs">
          <Title order={4} lts={1} c="gray.7">
            {product.title}
          </Title>
        </Group>

        <Text size="md" c="gray.6">
          {product.description}
        </Text>
      </Card.Section>
      <Card.Section withBorder inheritPadding py="1">
        <Group justify="center" mt="xs" mb="xs">
          <RiHeart3Line size="20" />
          <Badge color="accent">
            <Money data={product.priceRange.minVariantPrice} />
          </Badge>
          <Link
            className="product-item"
            key={product.id}
            prefetch="intent"
            to={variantUrl}
          >
            <Button
              color="primary"
              radius="xs"
              variant="outline"
              size="compact-sm"
            >
              View
            </Button>
          </Link>
        </Group>
      </Card.Section>
    </Card>
  );
}
