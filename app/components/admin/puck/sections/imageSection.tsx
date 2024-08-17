import {Box, TypographyStylesProvider} from '@mantine/core';
import {imagePicker} from '../fields/imagePicker';
import {padding} from '../fields/padding';
import ThemeHeader from '../theme/ThemeHeader';
import {Image} from '@shopify/hydrogen';

export const imageSection = () => {
  const config = {
    fields: {
      padding: padding(),
      image: imagePicker('Image'),
    },
    defaultProps: {
      padding: {
        padding_top: 'none',
        padding_bottom: 'none',
        padding_left: 'none',
        padding_right: 'none',

      },
      image: '',
    },
    render: ({...props}) => {
      console.log(props);

      return (
        <>
          <Box
            pt={props?.padding?.padding_top}
            pb={props?.padding?.padding_bottom}
            pl={props?.padding?.padding_left}
            pr={props?.padding?.padding_right}
          >
            {props?.image ? (
              <Image
                src={props?.image?.url}
                // height={50}
                //width={200}
                alt={props?.image?.alt}
                sizes="(min-width: 45em) 50vw, 100vw"
                //className=" w-full max-w-80 md:max-w-80"
              />
            ) : (
              <Box p="xl">Image Here</Box>
            )}
          </Box>
        </>
      );
    },
  };
  return config;
};
