import {Box} from '@mantine/core';
import SectionBlocks from './sections/SectionBlocks';
import SectionCollectionDisplay from './sections/SectionCollectionDisplay';
import Headers from './sections/Headers';

export default function MetaContent({content, theme}: any) {
  const getType = (item: any) => {
    switch (item?.type) {
      case 'headers':
        return <Headers settings={item?.fields?.settings} theme={theme} />;
      case 'section_blocks':
        return (
          <SectionBlocks fields={item?.fields}/>
        );
      case 'section_collection':
        return <SectionCollectionDisplay content={item} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      {content?.map((item: any) => {
        return <Box key={item.id}>{getType(item)}</Box>;
      })}
    </>
  );
}
