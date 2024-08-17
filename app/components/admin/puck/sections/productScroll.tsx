import {
  Box,
  Card,
  Text,
  Group,
  TypographyStylesProvider,
  useMantineTheme,
  Badge,
  Button,
  Image,
  SimpleGrid,
  Title,
} from '@mantine/core';
import {imagePicker} from '../fields/imagePicker';
import {padding} from '../fields/padding';
import ThemeHeader from '../theme/ThemeHeader';
import {Money, Pagination} from '@shopify/hydrogen';
import {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {Link} from '@remix-run/react';
//import {Image} from '@shopify/hydrogen';
import {Carousel} from '@mantine/carousel';
import {useMediaQuery} from '@mantine/hooks';
import { colorPickerThemeColors } from '../fields/colorPickerThemeColors';

export const productScroll = (viewport,theme) => {
  const config = {
    fields: {
      products: {
        type: 'array',
        arrayFields: {
          product: {
            type: 'external',
            label: 'Select Product',
            fetchList: async ({query}) => {
              const items: any = await fetch(
                `/api/get-products?query=${query || ''}`,
              ).then((res) => res.json());
              console.log('product items', items);
              const i = items?.products?.nodes.map((v) => {
                return v;
              });
              return i;
            },
            showSearch: true,
            placeholder: 'Select A Product',
            getItemSummary: (item) => item.title || 'Pick A Product',
            mapRow: (item) => ({title: item?.title, handle: item?.handle}),
          },
          title: {
            label: "Title Override",
            type: "text",
          },
        },
        getItemSummary: (item) => item.product?.title || 'Pick A Product',
      },
      carouselSlides: {
        label: "Carousel Slides To Show",
        type: "object",
        objectFields: {
          slidesTablet: {
            label: "Slides Tablet",
            type: "select",
            options: [
              { label: "1", value: "100%" },
              { label: "2", value: "50%" },
              { label: "3", value: "33.333333%" },
              { label: "4", value: "25%" },
            ],
          },
          slidesDesktop: {
            label: "Slides Desktop",
            type: "select",
            options: [
              { label: "1", value: "100%" },
              { label: "2", value: "50%" },
              { label: "3", value: "33.333333%" },
              { label: "4", value: "25%" },
              { label: "5", value: "20%" },
              { label: "6", value: "16.66666666666667%" },
            ],
          },
        }
      },
      slidesTitleColor: colorPickerThemeColors("Slides Title Color",theme)
    },
    defaultProps: {
      carouselSlides: {
        slidesTablet: "50%",
        slidesDesktop: "33.333333%",
      },
      slidesTitleColor: "primary"
    },
    render: ({products,carouselSlides,slidesTitleColor}) => {
      const theme = useMantineTheme();
      const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
      //const slidesToShowDesktop = carouselSlides.slidesDesktop
      const renderSlideSizeSM = viewport === '24.375rem' ? '100%' : carouselSlides.slidesTablet;
      const renderSlideSizeMD =
        viewport === '24.375rem' ? '100%' : carouselSlides.slidesDesktop;

      return (
        <>
          <Carousel
            //withIndicators
            //height={400}
            slideSize={{
              base: '100%',
              sm: renderSlideSizeSM,
              xs: '100%',
              md: renderSlideSizeMD,
            }}
            slideGap={{base: 'lg', sm: 'md'}}
            loop
            align="start"
            slidesToScroll={1}
          >
            {products &&
              products.map((product) => {
                return (
                  <Carousel.Slide key={product?.product?.id}>
                    <Card shadow="sm" padding="sm" radius="xs" withBorder>
                      <Card.Section>
                        <Image
                          //aspectRatio="16/9"
                          src={product?.product?.featuredImage.url}
                          h={200}
                          //w="auto"
                          // fit="cover"
                        />
                      </Card.Section>

                      <Card.Section inheritPadding h={70} py="sm">
                        <Title order={4} lts={1} c={slidesTitleColor}>
                          {product?.title ? product?.title : product?.product?.title}
                        </Title>
                      </Card.Section>

                      <Card.Section inheritPadding withBorder h={120} py="sm">
                        <Text size="sm" c="dimmed">
                          {product?.product?.description}
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
        </>
      );
    },
  };
  return config;
};
