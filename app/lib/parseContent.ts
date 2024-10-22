export function parser(content:any){
  if(content?.nodes){
    return parseCmsContent(content.nodes)
  }
  if(content?.fields){
    return parseContent(content)
  }
  return content;
}

export function parseCmsContent(cmsContent:any) {
  const newObj:any = [];
  cmsContent.map((obj:any) => {
    newObj.push(parseContent(obj));
  });
  return newObj;
}

export function parseContent(content:any) {
  const newobject:any = {};
  content?.fields?.map((v:any, i:any) => {
    newobject[v.key] = parseReferences(v);
  });
  const {fields: _, ...newContent} = content;
  newContent.fields = newobject;
  return newContent;
}

function parseReferences(v:any) {
  switch (v.type) {
    case 'list.mixed_reference':
      const newObj:any = [];
      v.references?.nodes?.map((obj:any) => {
        newObj.push(parseContent(obj));
      });
      return newObj;
    case 'list.metaobject_reference':
        const newObjj:any = [];
        v.references?.nodes?.map((obj:any) => {
          newObjj.push(parseContent(obj));
        });
        return newObjj;
    case 'metaobject_reference':
      if(v.reference){
        return parseContent(v.reference);
      }
    case 'collection_reference':
      if(v.reference){
        return v.reference;
      }  
    case 'file_reference':
      if (v.reference?.image) {
        return v.reference?.image;
      } else {
        return v.reference;
      }
    case 'product_reference':
      return v.reference;
    case 'list.product_reference':
      return v?.references?.nodes;
    case 'json':
        return JSON.parse(v.value);
    default:
      return v.value;
  }
}
