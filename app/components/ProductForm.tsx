import {Box, Chip, Group, Title} from '@mantine/core';
import {Link} from '@remix-run/react';
import type {
  ProductFragment,
  ProductVariantFragment,
} from 'storefrontapi.generated';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/layout/Aside';
import {checkVariantExistsByOptions} from '~/lib/utils';
import {ProductPrice} from './ProductPrice';

export function ProductForm({
  product,
  selectedVariant,
  variants,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Array<ProductVariantFragment>;
}) {
  const {openDrawer} = useAside();
  const hasVariants =
    product?.variants?.nodes[0]?.selectedOptions[0]?.value === 'Default Title'
      ? false
      : true;
  return (
    <div>
      {hasVariants && (
        <Box pb="xl">
        <VariantDisplay
          product={product}
          variants={variants}
          selectedVariant={selectedVariant}
        />
        </Box>
      )}
      <Title order={3} c="accent">
        {selectedVariant?.title}
      </Title>
      <ProductPrice
        price={selectedVariant?.price}
        compareAtPrice={selectedVariant?.compareAtPrice}
      />
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          openDrawer('Cart');
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  selectedVariant,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}

function VariantDisplay({product, variants, selectedVariant}: any) {
  return product.options.map((option: any, i: string) => {
    const linkTo = `/products/${product.handle}?`;
    return (
      <ProductOptions
        variants={variants}
        selectedVariant={selectedVariant}
        option={option}
        selectedVariantOptionValue={selectedVariant.selectedOptions[i].value}
        linkTo={linkTo}
        selectedVariantIndex={i}
      />
    );
  });
}

function ProductOptions({
  variants,
  selectedVariant,
  option,
  selectedVariantOptionValue,
  linkTo,
  selectedVariantIndex,
}: any) {
  return (
    <>
      <h5>{option.name}</h5>
      <Chip.Group>
        <Group justify="start">
          {option.optionValues.map((optionValue: any) => {
            const isActive = optionValue.name === selectedVariantOptionValue;

            let variantLink = linkTo;
            const variantLinkSelectedOptions: any = [];

            selectedVariant.selectedOptions.map((selectedOption: any) => {
              variantLink = `${variantLink}${selectedOption.name}=${
                selectedOption.name === option.name
                  ? optionValue.name
                  : selectedOption.value
              }&`;
              variantLinkSelectedOptions.push({
                name: selectedOption.name,
                value:
                  selectedOption.name === option.name
                    ? optionValue.name
                    : selectedOption.value,
              });
            });

            return checkVariantExistsByOptions(
              variants,
              variantLinkSelectedOptions,
            ) ? (
              <DisplayActiveVariant
                option={option}
                optionValue={optionValue}
                variantLink={variantLink}
                isActive={isActive}
              />
            ) : (
              <NoMatchingVariant
                option={option}
                optionValue={optionValue}
                selectedVariantIndex={selectedVariantIndex}
                variants={variants}
                isActive={isActive}
                linkTo={linkTo}
              />
            );
          })}
        </Group>
      </Chip.Group>
    </>
  );
}

function DisplayActiveVariant({
  option,
  optionValue,
  variantLink,
  isActive,
}: any) {
  return (
    <Link
      to={variantLink}
      preventScrollReset
      replace
      prefetch="intent"
      key={option.name + optionValue.name}
    >
      <Chip
        checked={isActive}
        value={option.name + optionValue.name}
        color="accent"
        variant="filled"
      >
        {optionValue.name}
      </Chip>
    </Link>
  );
}

function NoMatchingVariant({
  option,
  optionValue,
  selectedVariantIndex,
  variants,
  isActive,
  linkTo,
}: any) {
  let variantLink = linkTo;
  if (selectedVariantIndex === 0) {
    const defaultVariantLink = variants.find((variant: any) =>
      variant?.selectedOptions?.find((option: any, i: string) => {
        return optionValue.name === option.value;
      }),
    );

    defaultVariantLink?.selectedOptions?.map((selectedOption: any) => {
      variantLink = `${variantLink}${selectedOption.name}=${
        selectedOption.name === option.name
          ? optionValue.name
          : selectedOption.value
      }&`;
    });
  }

  return selectedVariantIndex === 0 ? (
    <Link
      to={variantLink}
      preventScrollReset
      replace
      prefetch="intent"
      key={option.name + optionValue.name}
    >
      <Chip
        checked={isActive}
        value={option.name + optionValue.name}
        color="accent"
        variant="filled"
      >
        {optionValue.name}
      </Chip>
    </Link>
  ) : (
    <Box td="line-through">{optionValue.name}</Box>
  );
}
