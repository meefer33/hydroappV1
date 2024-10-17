import {Box} from '@mantine/core';
import {Image} from '@shopify/hydrogen';

export default function BlockImage({content}: any) {
  //console.log('image',content?.fields?.image)
  return (
    <Box>
      {content?.fields?.image?.url ? (
        <Image
          sizes="(min-width: 45em) 50vw, 100vw"
          data={content?.fields?.image}
        />
      ) : (
        <Box>No Image</Box>
      )}
    </Box>
  );
}
