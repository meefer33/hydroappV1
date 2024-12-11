import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';
import {GetMetaobjectTypeHandle} from '~/graphql/GetMetaobjectTypeHandle';
import {parser} from './parseContent';
import {UpdateMetaobject} from '~/graphql/admin/UpdateMetaobject';
import {defaultTheme} from '~/components/admin/dnd/theme/lib/metaTypes';
import {GetMetaobjectById} from '~/graphql/GetMetaobjectById';
import {UpsertMetaobject} from '~/graphql/admin/UpsertMetaobject';
import {CollectionUpdate} from '~/graphql/admin/CollectionUpdate';
import {PageUpdate} from '~/graphql/admin/PageUpdate';

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
    cache: storefront.CacheCustom({
      mode: 'must-revalidate, no-store',
      maxAge: 1,
    })
  });
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

export const createTheme = async ({admin, name}) => {
  const theme = await admin.request(CreateMetaobject, {
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
  return parser(theme?.data?.metaobjectCreate?.metaobject)
};

export const createTemplate = async ({
  admin,
  name,
  themeId = '0',
  themeName = ''
}) => {

  let theme:any = themeId
  if(theme === '0'){
    theme = await createTheme({admin,name:themeName})
    theme = theme?.data?.metaobjectCreate?.metaobject?.id
  }

  const metaContent1 = await createMetaobject({admin});
  const metaContent2 = await createMetaobject({admin});
  const template = await admin.request(CreateMetaobject, {
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
            value: theme,
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
  return parser(template?.data?.metaobjectCreate?.metaobject)
};

export const updatePageTemplateContent = async ({
  admin,
  storefront,
  pageId,
}) => {
  //get default template
  const templateId = await getMetaobjectTypeHandle({
    storefront,
    handle: 'default-template',
    type: 'templates',
  });
  //create content for top
  const metaContent1 = await createMetaobject({admin});
  const metaContent2 = await createMetaobject({admin});

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
};

export const loadPageContent = async ({
  admin,
  type,
  typeId,
  slug,
  name,
  metafieldValue,
}) => {
  let getPage: any = {};

  if (metafieldValue) {
    getPage = await admin.request(GetMetaobjectById, {
      variables: {id: metafieldValue},
    });
    return parser(getPage?.data?.metaobject);
  } else {
    const upsertPage = await admin.request(UpsertMetaobject, {
      variables: {
        handle: {
          type: 'pages',
          handle: slug,
        },
        metaobject: {
          fields: [{key: 'name', value: name}],
          capabilities: {publishable: {status: 'ACTIVE'}},
        },
      },
    });
    const pageId = upsertPage?.data?.metaobjectUpsert?.metaobject?.id;

    if (type === 'collection') {
      await admin.request(CollectionUpdate, {
        variables: {
          input: {
            id: typeId,
            metafields: {
              key: 'page_content',
              namespace: 'custom',
              value: pageId,
            },
          },
        },
      });
    }

    if (type === 'page') {
      await admin.request(PageUpdate, {
        variables: {
          id: typeId,
          page: {
            metafields: {
              key: 'page_content',
              namespace: 'custom',
              value: pageId,
            },
          },
        },
      });
    }

    return parser(upsertPage?.data?.metaobjectUpsert?.metaobject);
  }
};
