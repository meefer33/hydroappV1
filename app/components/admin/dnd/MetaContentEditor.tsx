import {useOutletContext} from '@remix-run/react';
import {Box, Overlay} from '@mantine/core';
import SectionBlocks from './theme/sections/SectionBlocks';
import SectionCollectionDisplay from './theme/sections/SectionCollectionDisplay';
import BlockRichText from './theme/sections/BlockRichText';
import BlockImage from './theme/sections/BlockImage';
import {useHover} from '@mantine/hooks';
import HoveredItem from './HoveredItem';
import {useState} from 'react';

export default function MetaContentEditor({content}: any) {
  const {setItem}: any = useOutletContext();
  const {hovered, ref} = useHover();
  const [itemHovered, setItemHovered] = useState();

  const getType = (item: any) => {
    switch (item.type) {
      case 'section_blocks':
        return (
          <SectionBlocks content={item}>
            {item.fields?.blocks?.map((blocks: any) => {
              const settings = blocks?.fields?.settings;
              const items = blocks?.fields?.block_items;
              return (
                <HoveredItem
                  z={2}
                  key={blocks.id}
                  item={blocks}
                  setItem={setItem}
                  itemHovered={itemHovered}
                  setItemHovered={setItemHovered}
                >
                  <Box bg={settings?.bg} p="sm">
                    {items?.map((block: any) => {
                      return (
                        <HoveredItem
                          z={3}
                          key={block.id}
                          item={block}
                          setItem={setItem}
                          itemHovered={itemHovered}
                          setItemHovered={setItemHovered}
                        >
                          {getTypeBlock(block)}
                        </HoveredItem>
                      );
                    })}
                  </Box>
                </HoveredItem>
              );
            })}
          </SectionBlocks>
        );
      case 'section_collection':
        return <SectionCollectionDisplay content={item} />;
      default:
        return <></>;
    }
  };

  const getTypeBlock = (block: any) => {
    switch (block.type) {
      case 'block_rich_text':
        return <BlockRichText key={block.id} content={block} />;
      case 'block_image':
        return <BlockImage key={block.id} content={block} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      {content?.map((item: any) => {
        return (
          <HoveredItem
            z={1}
            key={item.id}
            item={item}
            setItem={setItem}
            itemHovered={itemHovered}
            setItemHovered={setItemHovered}
          >
            {getType(item)}
          </HoveredItem>
        );
      })}
    </>
  );
}
