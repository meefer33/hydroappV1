export function parseCmsContent(cmsContent) {
  const newObj = [];
  cmsContent.map((obj) => {
    newObj.push(parseContent(obj));
  });
  return newObj;
}
export function parseContent(content) {
  const newobject = {};
  content.fields.map((v, i) => {
    newobject[v.key] = parseReferences(v);
  });
  const {fields: _, ...newContent} = content;
  newContent.fields = newobject;
  return newContent;
}

function parseReferences(v) {
  switch (v.type) {
    case 'list.mixed_reference':
      const newObj = [];
      v.references.nodes.map((obj) => {
        newObj.push(parseContent(obj));
      });
      return newObj;
    case 'list.metaobject_reference':
        const newObjj = [];
        v.references.nodes.map((obj) => {
          newObjj.push(parseContent(obj));
        });
        return newObjj;
    case 'metaobject_reference':
      return parseContent(v.reference);
    case 'file_reference':
      if (v.reference?.image) {
        return v.reference?.image;
      } else {
        return v.reference;
      }
    case 'product_reference':
      return v.reference;
    case 'list.product_reference':
      return v.references.nodes;
    case 'json':
        return JSON.parse(v.value);
    default:
      return v.value;
  }
}
