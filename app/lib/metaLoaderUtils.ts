import {defaultTheme} from '~/components/admin/dnd/theme/lib/theme';
import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';
import {GetMetaobjectTypeHandle} from '~/graphql/GetMetaobjectTypeHandle';
import {parser} from './parseContent';
import { UpdateMetaobject } from '~/graphql/admin/UpdateMetaobject';

//get default template
export const getMetaobjectTypeHandle = async ({
  storefront,
  handle = 'default-theme',
  type = 'themes',
}) => {
  const meta = await storefront.query(GetMetaobjectTypeHandle, {
    variables: {
      handle: handle,
      type: type,
    },
  });
  console.log(handle,type,JSON.stringify(meta))
  if (meta?.metaobject?.id) {
    return parser(meta?.metaobject);
  } else {
    return null;
  }
};

//create content for top
export const createMetaobject = async ({admin, type = 'content'}) => {
  return await admin.request(CreateMetaobject, {
    variables: {
      metaobject: {
        type: type,
        capabilities: {publishable: {status: 'ACTIVE'}},
      },
    },
  });
};

export const createTheme = async ({admin, name = 'Default Theme'}) => {
  return await admin.request(CreateMetaobject, {
    variables: {
      metaobject: {
        type: 'themes',
        capabilities: {publishable: {status: 'ACTIVE'}},
        fields: [
          {
            key: 'name',
            value: name,
          },
          {
            key: 'theme',
            value: JSON.stringify(defaultTheme),
          },
        ],
      },
    },
  });
};

export const createTemplate = async ({
  admin,
  name = 'Default Template',
  themeId,
}) => {
  console.log(themeId)
  const metaContent1 = await createMetaobject({admin});
  const metaContent2 = await createMetaobject({admin});
  return await admin.request(CreateMetaobject, {
    variables: {
      metaobject: {
        type: 'templates',
        capabilities: {publishable: {status: 'ACTIVE'}},
        fields: [
          {
            key: 'name',
            value: name,
          },
          {
            key: 'theme',
            value: themeId,
          },
          {
            key: 'top',
            value: metaContent1.data?.metaobjectCreate?.metaobject?.id,
          },
          {
            key: 'bottom',
            value: metaContent2.data?.metaobjectCreate?.metaobject?.id,
          },
        ],
      },
    },
  });
};

export const updatePageTemplateContent = async ({admin,storefront,pageId}) => {
    //get default template
    const templateId = await getMetaobjectTypeHandle({storefront,handle:'default-template',type:'templates'})
    //create content for top
    const metaContent1 = await createMetaobject({admin})
    const metaContent2 = await createMetaobject({admin})

    const updatePage = await admin.request(UpdateMetaobject, {
      variables: {
        id: pageId,
        metaobject: {
          fields: [
            {
              key: 'template',
              value: templateId?.id,
            },
            {
              key: 'top_content',
              value: metaContent1.data?.metaobjectCreate?.metaobject?.id,
            },
            {
              key: 'bottom_content',
              value: metaContent2.data?.metaobjectCreate?.metaobject?.id,
            },
          ],
        },
      },
    });

    return parser(updatePage?.data?.metaobject);
}
