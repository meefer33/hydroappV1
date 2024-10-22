import {Box} from '@mantine/core';
import {Image} from '@shopify/hydrogen';

export default function BlockImage({content}: any) {
  return (
    <>
      {content?.fields?.image?.url ? (
        <Image
          sizes="(min-width: 45em) 50vw, 100vw"
          data={content?.fields?.image}
          aspectRatio={`${content?.fields?.image.width}/${content?.fields?.image.height}`}
          style={{height: 'auto'}}
        />
      ) : (
        <Box>No Image</Box>
      )}
    </>
  );
}
