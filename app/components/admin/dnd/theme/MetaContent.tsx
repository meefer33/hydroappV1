import SectionBlocks from "./sections/SectionBlocks";

export default function MetaContent({content}: any) {
  const getType = (item: any) => {
    switch (item.type) {
      case 'section_blocks':
        return <SectionBlocks key={item.id} content={item}/>;
      default:
        return <></>;
    }
  };
  return (
    <>
      {content?.map((item: any) => {
       return  getType(item);
      })}
    </>
  );
}
