import {Box, Button, Overlay} from '@mantine/core';
import {useHover} from '@mantine/hooks';

export default function SelectOverlay({children}: any) {
  const {hovered, ref} = useHover();
  return (
    <Box ref={ref} pos="relative">
      {hovered ? (
        <>
        <Overlay
          onClick={()=>console.log('clicked')}
          color="#000"
          backgroundOpacity={0.2}
          style={{
            border: '2px solid black',
            cursor: 'pointer'
          }}
        />
          {children}
          </>
  
      ) : (
        children
      )}
    </Box>
  );
}
