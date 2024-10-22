import {Box} from '@mantine/core';
import {useHover} from '@mantine/hooks';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';

export default function HoveredItem({
  z,
  item,
  setItem,
  itemHovered,
  setItemHovered,
  children,
}: any) {
  const {setSelectedItem}: any = useOutletContext();
  return (
    <Box
      style={{zIndex: z}}
      pos="relative"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setItem(item);
        setSelectedItem(item.id)
      }}
      onMouseOver={(e) => {
        e.stopPropagation();
        setItemHovered(item.id);

      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setItemHovered('');

      }}
    >
      {itemHovered === item.id && (
        <Box
          pos="absolute"
          top={0}
          h="100%"
          bottom={0}
          right={0}
          left={0}
          bd="4px solid blue.3"
        ></Box>
      )}
      {children}
    </Box>
  );
}
