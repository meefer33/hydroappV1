/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type CollectionUpdateMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.CollectionInput;
}>;


export type CollectionUpdateMutation = { collectionUpdate?: AdminTypes.Maybe<{ collection?: AdminTypes.Maybe<Pick<AdminTypes.Collection, 'id'>> }> };

export type CreateMetafieldDefinitionMutationVariables = AdminTypes.Exact<{
  definition: AdminTypes.MetafieldDefinitionInput;
}>;


export type CreateMetafieldDefinitionMutation = { metafieldDefinitionCreate?: AdminTypes.Maybe<{ createdDefinition?: AdminTypes.Maybe<Pick<AdminTypes.MetafieldDefinition, 'id' | 'name' | 'namespace' | 'key' | 'useAsCollectionCondition'>>, userErrors: Array<Pick<AdminTypes.MetafieldDefinitionCreateUserError, 'field' | 'message' | 'code'>> }> };

export type CreateMetaobjectMutationVariables = AdminTypes.Exact<{
  metaobject: AdminTypes.MetaobjectCreateInput;
}>;


export type CreateMetaobjectMutation = { metaobjectCreate?: AdminTypes.Maybe<{ metaobject?: AdminTypes.Maybe<(
      Pick<AdminTypes.Metaobject, 'handle' | 'id' | 'type' | 'updatedAt'>
      & { fields: Array<(
        Pick<AdminTypes.MetaobjectField, 'key' | 'type' | 'value'>
        & { reference?: AdminTypes.Maybe<(
          Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
          & { fields: Array<(
            Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
            & { reference?: AdminTypes.Maybe<(
              Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
              & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                  Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                  & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                )> } }
            ) | (
              Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
              & { fields: Array<(
                Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                    Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                    & { fields: Array<(
                      Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                      & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                          Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                          & { fields: Array<(
                            Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                            & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                                Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                                & { fields: Array<Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>> }
                              )>> }> }
                          )> }
                        )>> }> }
                    )> }
                  )>> }> }
              )> }
            )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                & { fields: Array<(
                  Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                  & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                      Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
                      & { fields: Array<(
                        Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                        & { reference?: AdminTypes.Maybe<(
                          Pick<AdminTypes.MediaImage, 'id'>
                          & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                        )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                            Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                            & { fields: Array<(
                              Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                              & { reference?: AdminTypes.Maybe<(
                                Pick<AdminTypes.MediaImage, 'id'>
                                & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                              )> }
                            )> }
                          )>> }> }
                      )> }
                    )>> }> }
                )> }
              )>> }> }
          )> }
        )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
            Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
            & { fields: Array<(
              Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
              & { reference?: AdminTypes.Maybe<(
                Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                    Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                    & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                  )> } }
              )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                  Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                  & { fields: Array<(
                    Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                    & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                        Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
                        & { fields: Array<(
                          Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                          & { reference?: AdminTypes.Maybe<(
                            Pick<AdminTypes.MediaImage, 'id'>
                            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                          )> }
                        )> }
                      )>> }> }
                  )> }
                )>> }> }
            )> }
          )>> }> }
      )> }
    )>, userErrors: Array<Pick<AdminTypes.MetaobjectUserError, 'field' | 'message' | 'code'>> }> };

export type CreateMetaobjectDefinitionMutationVariables = AdminTypes.Exact<{
  definition: AdminTypes.MetaobjectDefinitionCreateInput;
}>;


export type CreateMetaobjectDefinitionMutation = { metaobjectDefinitionCreate?: AdminTypes.Maybe<{ metaobjectDefinition?: AdminTypes.Maybe<(
      Pick<AdminTypes.MetaobjectDefinition, 'id' | 'name' | 'type'>
      & { fieldDefinitions: Array<Pick<AdminTypes.MetaobjectFieldDefinition, 'name' | 'key' | 'required'>> }
    )>, userErrors: Array<Pick<AdminTypes.MetaobjectUserError, 'field' | 'message' | 'code'>> }> };

export type DeleteMetaobjectMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type DeleteMetaobjectMutation = { metaobjectDelete?: AdminTypes.Maybe<(
    Pick<AdminTypes.MetaobjectDeletePayload, 'deletedId'>
    & { userErrors: Array<Pick<AdminTypes.MetaobjectUserError, 'code' | 'elementIndex' | 'elementKey' | 'field' | 'message'>> }
  )> };

export type GetImagesQueryVariables = AdminTypes.Exact<{
  search?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type GetImagesQuery = { files: { nodes: Array<(
      Pick<AdminTypes.MediaImage, 'id' | 'updatedAt'>
      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'altText' | 'id' | 'url' | 'height' | 'width'>> }
    )>, pageInfo: Pick<AdminTypes.PageInfo, 'endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor'> } };

export type GetMenusQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type GetMenusQuery = { menus: { nodes: Array<(
      Pick<AdminTypes.Menu, 'title' | 'handle' | 'id'>
      & { items: Array<(
        Pick<AdminTypes.MenuItem, 'id' | 'title' | 'resourceId' | 'type' | 'url'>
        & { items: Array<(
          Pick<AdminTypes.MenuItem, 'id' | 'resourceId' | 'title' | 'type' | 'url'>
          & { items: Array<Pick<AdminTypes.MenuItem, 'id' | 'resourceId' | 'title' | 'type' | 'url'>> }
        )> }
      )> }
    )> } };

export type GetMetafieldsDefinitionsQueryVariables = AdminTypes.Exact<{
  query?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type GetMetafieldsDefinitionsQuery = { metafieldDefinitions: { nodes: Array<Pick<AdminTypes.MetafieldDefinition, 'key' | 'id' | 'name'>> } };

export type GetMetaobjectDefinitionByTypeQueryVariables = AdminTypes.Exact<{
  type: AdminTypes.Scalars['String']['input'];
}>;


export type GetMetaobjectDefinitionByTypeQuery = { metaobjectDefinitionByType?: AdminTypes.Maybe<Pick<AdminTypes.MetaobjectDefinition, 'name'>> };

export type GetProductContentQueryVariables = AdminTypes.Exact<{
  handle: AdminTypes.Scalars['String']['input'];
}>;


export type GetProductContentQuery = { productByHandle?: AdminTypes.Maybe<(
    Pick<AdminTypes.Product, 'description' | 'title' | 'tags' | 'handle'>
    & { media: { nodes: Array<(
        Pick<AdminTypes.ExternalVideo, 'mediaContentType' | 'id'>
        & { preview?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'height' | 'altText' | 'url' | 'width'>> }> }
      ) | (
        Pick<AdminTypes.MediaImage, 'mediaContentType' | 'id'>
        & { preview?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'height' | 'altText' | 'url' | 'width'>> }> }
      ) | (
        Pick<AdminTypes.Model3d, 'mediaContentType' | 'id'>
        & { preview?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'height' | 'altText' | 'url' | 'width'>> }> }
      ) | (
        Pick<AdminTypes.Video, 'mediaContentType' | 'id'>
        & { preview?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'height' | 'altText' | 'url' | 'width'>> }> }
      )> }, metafield?: AdminTypes.Maybe<Pick<AdminTypes.Metafield, 'jsonValue' | 'createdAt' | 'updatedAt'>> }
  )> };

export type MetaobjectNestedQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type MetaobjectNestedQuery = { metaobject?: AdminTypes.Maybe<(
    Pick<AdminTypes.Metaobject, 'handle' | 'id'>
    & { fields: Array<(
      Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
      & { reference?: AdminTypes.Maybe<(
        Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
        & { fields: Array<(
          Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
          & { reference?: AdminTypes.Maybe<(
            Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
              )> } }
          ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
            Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
            & { fields: Array<(
              Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
              & { reference?: AdminTypes.Maybe<(
                Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                    Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                    & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                  )> } }
              ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
                Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
                & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
              ) | (
                Pick<AdminTypes.Video, 'id'>
                & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
              )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                  Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                  & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                      Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                      & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                    )> } }
                ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
                  Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
                  & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
                )>> }> }
            )> }
          ) | (
            Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
            & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
          ) | (
            Pick<AdminTypes.Video, 'id'>
            & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
          )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
              Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
              & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                  Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                  & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                )> } }
            ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
              Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
              & { fields: Array<(
                Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
                & { reference?: AdminTypes.Maybe<(
                  Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                  & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                      Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                      & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                    )> } }
                ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
                  Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
                  & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
                ) | (
                  Pick<AdminTypes.Video, 'id'>
                  & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
                )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                    Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                    & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                        Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                        & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                      )> } }
                  ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
                    Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
                    & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
                  )>> }> }
              )> }
            ) | (
              Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
              & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
            )>> }> }
        )> }
      )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
          Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
          & { fields: Array<(
            Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
            & { reference?: AdminTypes.Maybe<(
              Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
              & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                  Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                  & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                )> } }
            ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
              Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
              & { fields: Array<(
                Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
                & { reference?: AdminTypes.Maybe<(
                  Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                  & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                      Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                      & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                    )> } }
                ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
                  Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
                  & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
                ) | (
                  Pick<AdminTypes.Video, 'id'>
                  & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
                )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                    Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                    & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                        Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                        & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                      )> } }
                  ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
                    Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
                    & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
                  )>> }> }
              )> }
            ) | (
              Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
              & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
            ) | (
              Pick<AdminTypes.Video, 'id'>
              & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
            )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                    Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                    & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                  )> } }
              ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
                Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
                & { fields: Array<(
                  Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
                  & { reference?: AdminTypes.Maybe<(
                    Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                    & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                        Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                        & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                      )> } }
                  ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
                    Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
                    & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
                  ) | (
                    Pick<AdminTypes.Video, 'id'>
                    & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
                  )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                      Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                          Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                          & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                        )> } }
                    ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
                      Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
                      & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
                    )>> }> }
                )> }
              ) | (
                Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
                & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
              )>> }> }
          )> }
        )>> }> }
    )> }
  )> };

export type MetaObjectNestedFourFragmentFragment = (
  Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
  & { fields: Array<Pick<AdminTypes.MetaobjectField, 'key' | 'value'>> }
);

export type MetaObjectNestedOneFragmentFragment = (
  Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
  & { fields: Array<(
    Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
    & { reference?: AdminTypes.Maybe<(
      Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
          Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
          & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
        )> } }
    ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
      Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
      & { fields: Array<(
        Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
        & { reference?: AdminTypes.Maybe<(
          Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
          & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
              Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
              & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
            )> } }
        ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
          Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
          & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
        ) | (
          Pick<AdminTypes.Video, 'id'>
          & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
        )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
            Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
              )> } }
          ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
            Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
            & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
          )>> }> }
      )> }
    ) | (
      Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
      & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
    ) | (
      Pick<AdminTypes.Video, 'id'>
      & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
    )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
        Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
            Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
            & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
          )> } }
      ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
        Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
        & { fields: Array<(
          Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
          & { reference?: AdminTypes.Maybe<(
            Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
              )> } }
          ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
            Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
            & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
          ) | (
            Pick<AdminTypes.Video, 'id'>
            & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
          )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
              Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
              & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                  Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                  & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                )> } }
            ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
              Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
              & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
            )>> }> }
        )> }
      ) | (
        Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
        & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
      )>> }> }
  )> }
);

export type MetaObjectNestedThreeFragmentFragment = (
  Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
  & { fields: Array<(
    Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
    & { reference?: AdminTypes.Maybe<(
      Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
          Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
          & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
        )> } }
    ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
      Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
      & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
    ) | (
      Pick<AdminTypes.Video, 'id'>
      & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
    )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
        Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
            Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
            & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
          )> } }
      ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
        Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
        & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
      )>> }> }
  )> }
);

export type MetaObjectNestedTwoFragmentFragment = (
  Pick<AdminTypes.Metaobject, 'type' | 'id' | 'handle'>
  & { fields: Array<(
    Pick<AdminTypes.MetaobjectField, 'key' | 'value' | 'type'>
    & { reference?: AdminTypes.Maybe<(
      Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
          Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
          & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
        )> } }
    ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
      Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
      & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
    ) | (
      Pick<AdminTypes.Video, 'id'>
      & { sources: Array<Pick<AdminTypes.VideoSource, 'url' | 'height' | 'width' | 'format' | 'mimeType'>> }
    )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
        Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
            Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
            & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
          )> } }
      ) | { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>> } | (
        Pick<AdminTypes.Product, 'id' | 'description' | 'title' | 'handle'>
        & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText' | 'height' | 'width'>>, variants: { nodes: Array<Pick<AdminTypes.ProductVariant, 'id'>> } }
      )>> }> }
  )> }
);

export type MetaDefsQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type MetaDefsQuery = { metaobjectDefinitions: { nodes: Array<(
      Pick<AdminTypes.MetaobjectDefinition, 'name' | 'type' | 'displayNameKey' | 'description' | 'hasThumbnailField' | 'id' | 'metaobjectsCount'>
      & { fieldDefinitions: Array<(
        Pick<AdminTypes.MetaobjectFieldDefinition, 'key' | 'name' | 'required' | 'description'>
        & { type: Pick<AdminTypes.MetafieldDefinitionType, 'name' | 'category'>, validations: Array<Pick<AdminTypes.MetafieldDefinitionValidation, 'name' | 'type' | 'value'>> }
      )> }
    )> } };

export type FileCreateMutationVariables = AdminTypes.Exact<{
  files: Array<AdminTypes.FileCreateInput> | AdminTypes.FileCreateInput;
}>;


export type FileCreateMutation = { fileCreate?: AdminTypes.Maybe<{ files?: AdminTypes.Maybe<Array<(
      Pick<AdminTypes.ExternalVideo, 'alt' | 'id' | 'fileStatus'>
      & { preview?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height'>> }>, fileErrors: Array<Pick<AdminTypes.FileError, 'code' | 'details' | 'message'>> }
    ) | (
      Pick<AdminTypes.GenericFile, 'alt' | 'id' | 'fileStatus'>
      & { preview?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height'>> }>, fileErrors: Array<Pick<AdminTypes.FileError, 'code' | 'details' | 'message'>> }
    ) | (
      Pick<AdminTypes.MediaImage, 'id' | 'fileStatus' | 'alt'>
      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, preview?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height'>> }>, fileErrors: Array<Pick<AdminTypes.FileError, 'code' | 'details' | 'message'>> }
    ) | (
      Pick<AdminTypes.Model3d, 'alt' | 'id' | 'fileStatus'>
      & { preview?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height'>> }>, fileErrors: Array<Pick<AdminTypes.FileError, 'code' | 'details' | 'message'>> }
    ) | (
      Pick<AdminTypes.Video, 'alt' | 'id' | 'fileStatus'>
      & { preview?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height'>> }>, fileErrors: Array<Pick<AdminTypes.FileError, 'code' | 'details' | 'message'>> }
    )>> }> };

export type StagedUploadsCreateMutationVariables = AdminTypes.Exact<{
  input: Array<AdminTypes.StagedUploadInput> | AdminTypes.StagedUploadInput;
}>;


export type StagedUploadsCreateMutation = { stagedUploadsCreate?: AdminTypes.Maybe<{ stagedTargets?: AdminTypes.Maybe<Array<(
      Pick<AdminTypes.StagedMediaUploadTarget, 'resourceUrl' | 'url'>
      & { parameters: Array<Pick<AdminTypes.StagedUploadParameter, 'name' | 'value'>> }
    )>>, userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>> }> };

export type PageUpdateMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
  page: AdminTypes.PageUpdateInput;
}>;


export type PageUpdateMutation = { pageUpdate?: AdminTypes.Maybe<{ page?: AdminTypes.Maybe<Pick<AdminTypes.Page, 'id'>> }> };

export type UpdateMetaobjectMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
  metaobject: AdminTypes.MetaobjectUpdateInput;
}>;


export type UpdateMetaobjectMutation = { metaobjectUpdate?: AdminTypes.Maybe<{ metaobject?: AdminTypes.Maybe<(
      Pick<AdminTypes.Metaobject, 'handle' | 'id' | 'type' | 'updatedAt'>
      & { fields: Array<(
        Pick<AdminTypes.MetaobjectField, 'key' | 'type' | 'value'>
        & { reference?: AdminTypes.Maybe<(
          Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
          & { fields: Array<(
            Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
            & { reference?: AdminTypes.Maybe<(
              Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
              & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                  Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                  & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                )> } }
            ) | (
              Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
              & { fields: Array<(
                Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                    Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                    & { fields: Array<(
                      Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                      & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                          Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                          & { fields: Array<(
                            Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                            & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                                Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                                & { fields: Array<Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>> }
                              )>> }> }
                          )> }
                        )>> }> }
                    )> }
                  )>> }> }
              )> }
            )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                & { fields: Array<(
                  Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                  & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                      Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
                      & { fields: Array<(
                        Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                        & { reference?: AdminTypes.Maybe<(
                          Pick<AdminTypes.MediaImage, 'id'>
                          & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                        )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                            Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                            & { fields: Array<(
                              Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                              & { reference?: AdminTypes.Maybe<(
                                Pick<AdminTypes.MediaImage, 'id'>
                                & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                              )> }
                            )> }
                          )>> }> }
                      )> }
                    )>> }> }
                )> }
              )>> }> }
          )> }
        )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
            Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
            & { fields: Array<(
              Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
              & { reference?: AdminTypes.Maybe<(
                Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                    Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                    & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                  )> } }
              )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                  Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                  & { fields: Array<(
                    Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                    & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                        Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
                        & { fields: Array<(
                          Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                          & { reference?: AdminTypes.Maybe<(
                            Pick<AdminTypes.MediaImage, 'id'>
                            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                          )> }
                        )> }
                      )>> }> }
                  )> }
                )>> }> }
            )> }
          )>> }> }
      )> }
    )>, userErrors: Array<Pick<AdminTypes.MetaobjectUserError, 'field' | 'message' | 'code'>> }> };

export type UpsertMetaobjectMutationVariables = AdminTypes.Exact<{
  handle: AdminTypes.MetaobjectHandleInput;
  metaobject: AdminTypes.MetaobjectUpsertInput;
}>;


export type UpsertMetaobjectMutation = { metaobjectUpsert?: AdminTypes.Maybe<{ metaobject?: AdminTypes.Maybe<(
      Pick<AdminTypes.Metaobject, 'handle' | 'id' | 'type' | 'updatedAt'>
      & { fields: Array<(
        Pick<AdminTypes.MetaobjectField, 'key' | 'type' | 'value'>
        & { reference?: AdminTypes.Maybe<(
          Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
          & { fields: Array<(
            Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
            & { reference?: AdminTypes.Maybe<(
              Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
              & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                  Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                  & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                )> } }
            ) | (
              Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
              & { fields: Array<(
                Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                    Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                    & { fields: Array<(
                      Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                      & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                          Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                          & { fields: Array<(
                            Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                            & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                                Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                                & { fields: Array<Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>> }
                              )>> }> }
                          )> }
                        )>> }> }
                    )> }
                  )>> }> }
              )> }
            )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                & { fields: Array<(
                  Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                  & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                      Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
                      & { fields: Array<(
                        Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                        & { reference?: AdminTypes.Maybe<(
                          Pick<AdminTypes.MediaImage, 'id'>
                          & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                        )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                            Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                            & { fields: Array<(
                              Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                              & { reference?: AdminTypes.Maybe<(
                                Pick<AdminTypes.MediaImage, 'id'>
                                & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                              )> }
                            )> }
                          )>> }> }
                      )> }
                    )>> }> }
                )> }
              )>> }> }
          )> }
        )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
            Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
            & { fields: Array<(
              Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
              & { reference?: AdminTypes.Maybe<(
                Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
                & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                    Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                    & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                  )> } }
              )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                  Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                  & { fields: Array<(
                    Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                    & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                        Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
                        & { fields: Array<(
                          Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                          & { reference?: AdminTypes.Maybe<(
                            Pick<AdminTypes.MediaImage, 'id'>
                            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                          )> }
                        )> }
                      )>> }> }
                  )> }
                )>> }> }
            )> }
          )>> }> }
      )> }
    )>, userErrors: Array<Pick<AdminTypes.MetaobjectUserError, 'code' | 'field' | 'message' | 'elementIndex' | 'elementKey'>> }> };

export type MetaFragment = (
  Pick<AdminTypes.Metaobject, 'handle' | 'id' | 'type' | 'updatedAt'>
  & { fields: Array<(
    Pick<AdminTypes.MetaobjectField, 'key' | 'type' | 'value'>
    & { reference?: AdminTypes.Maybe<(
      Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
      & { fields: Array<(
        Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
        & { reference?: AdminTypes.Maybe<(
          Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
          & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
              Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
              & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
            )> } }
        ) | (
          Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
          & { fields: Array<(
            Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
            & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                & { fields: Array<(
                  Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                  & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                      Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                      & { fields: Array<(
                        Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                        & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                            Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                            & { fields: Array<Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>> }
                          )>> }> }
                      )> }
                    )>> }> }
                )> }
              )>> }> }
          )> }
        )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
            Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
            & { fields: Array<(
              Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
              & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                  Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
                  & { fields: Array<(
                    Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                    & { reference?: AdminTypes.Maybe<(
                      Pick<AdminTypes.MediaImage, 'id'>
                      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                    )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                        Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
                        & { fields: Array<(
                          Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                          & { reference?: AdminTypes.Maybe<(
                            Pick<AdminTypes.MediaImage, 'id'>
                            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                          )> }
                        )> }
                      )>> }> }
                  )> }
                )>> }> }
            )> }
          )>> }> }
      )> }
    )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
        Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
        & { fields: Array<(
          Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
          & { reference?: AdminTypes.Maybe<(
            Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
              )> } }
          )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
              Pick<AdminTypes.Metaobject, 'id' | 'handle' | 'type'>
              & { fields: Array<(
                Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                & { references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
                    Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
                    & { fields: Array<(
                      Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
                      & { reference?: AdminTypes.Maybe<(
                        Pick<AdminTypes.MediaImage, 'id'>
                        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
                      )> }
                    )> }
                  )>> }> }
              )> }
            )>> }> }
        )> }
      )>> }> }
  )> }
);

export type MetaFragLevelOneFragment = (
  Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
  & { fields: Array<(
    Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
    & { reference?: AdminTypes.Maybe<(
      Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
          Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
          & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
        )> } }
    ) | (
      Pick<AdminTypes.MediaImage, 'id'>
      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
    ) | (
      Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
      & { fields: Array<(
        Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
        & { reference?: AdminTypes.Maybe<(
          Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
          & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
              Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
              & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
            )> } }
        ) | (
          Pick<AdminTypes.MediaImage, 'id'>
          & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
        )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
            Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
              )> } }
          ) | (
            Pick<AdminTypes.MediaImage, 'id'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
          )>> }> }
      )> }
    )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
        Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
            Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
            & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
          )> } }
      ) | (
        Pick<AdminTypes.MediaImage, 'id'>
        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
      ) | (
        Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
        & { fields: Array<(
          Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
          & { reference?: AdminTypes.Maybe<(
            Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
              )> } }
          ) | (
            Pick<AdminTypes.MediaImage, 'id'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
          )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
              Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
              & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
                  Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
                  & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
                )> } }
            ) | (
              Pick<AdminTypes.MediaImage, 'id'>
              & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
            )>> }> }
        )> }
      )>> }> }
  )> }
);

export type MetaFragLevelThreeFragment = (
  Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
  & { fields: Array<Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>> }
);

export type MetaFragLevelTwoFragment = (
  Pick<AdminTypes.Metaobject, 'id' | 'type' | 'handle'>
  & { fields: Array<(
    Pick<AdminTypes.MetaobjectField, 'type' | 'value' | 'key'>
    & { reference?: AdminTypes.Maybe<(
      Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
          Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
          & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
        )> } }
    ) | (
      Pick<AdminTypes.MediaImage, 'id'>
      & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
    )>, references?: AdminTypes.Maybe<{ nodes: Array<AdminTypes.Maybe<(
        Pick<AdminTypes.Collection, 'handle' | 'id' | 'title' | 'description'>
        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, products: { nodes: Array<(
            Pick<AdminTypes.Product, 'handle' | 'id' | 'description' | 'title' | 'tags'>
            & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'id' | 'altText'>> }
          )> } }
      ) | (
        Pick<AdminTypes.MediaImage, 'id'>
        & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'width' | 'height' | 'altText'>> }
      )>> }> }
  )> }
);

interface GeneratedQueryTypes {
  "#graphql\nquery GetImages($search: String) {\n    files(\n        first: 100,\n        query: $search,\n        sortKey: CREATED_AT,\n        reverse: true\n    ) {\n      nodes {\n        ... on MediaImage {\n          id\n          updatedAt\n          \n          image {\n            altText\n            id\n            url\n            height\n            width\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n}": {return: GetImagesQuery, variables: GetImagesQueryVariables},
  "#graphql\nquery GetMenus {\n  menus(first: 10) {\n    nodes {\n      items(limit: 10) {\n        id\n        title\n        resourceId\n        type\n        url\n        items {\n          id\n          resourceId\n          title\n          type\n          url\n          items {\n            id\n            resourceId\n            title\n            type\n            url\n          }\n        }\n      }\n      title\n      handle\n      id\n    }\n  }\n}": {return: GetMenusQuery, variables: GetMenusQueryVariables},
  "#graphql\nquery GetMetafieldsDefinitions($query: String) {\n  metafieldDefinitions(ownerType: PRODUCT, first: 10, query: $query) {\n    nodes {\n      key\n      id\n      name\n    }\n  }\n}": {return: GetMetafieldsDefinitionsQuery, variables: GetMetafieldsDefinitionsQueryVariables},
  "#graphql\nquery GetMetaobjectDefinitionByType($type: String!){\nmetaobjectDefinitionByType(type: $type) {\n    name\n  }\n}\n": {return: GetMetaobjectDefinitionByTypeQuery, variables: GetMetaobjectDefinitionByTypeQueryVariables},
  "#graphql\nquery GetProductContent($handle: String!) {\n  productByHandle(handle: $handle) {\n    description\n    title\n    tags\n    media(first: 50) {\n      nodes {\n        mediaContentType\n        id\n        preview {\n          image {\n            id\n            height\n            altText\n            url\n            width\n          }\n        }\n      }\n    }\n    handle\n    metafield(key: \"content_display\", namespace: \"custom\") {\n      jsonValue\n      createdAt\n      updatedAt\n    }\n  }\n}": {return: GetProductContentQuery, variables: GetProductContentQueryVariables},
  "#graphql\nquery MetaobjectNested($id: ID!) {\n    metaobject(id: $id) {\n        handle\n        id\n        fields {\n            key\n            value\n            type\n            reference {\n                ...MetaObjectNestedOneFragment\n            }\n            references(first: 100) {\n                nodes {\n                    ...MetaObjectNestedOneFragment\n                }\n            }\n        }\n    }\n}\n  #graphql\nfragment MetaObjectNestedOneFragment on Metaobject\n{ \n    type\n    id\n    handle\n    fields {\n        key\n        value\n        type\n        reference {\n            ... on MediaImage {\n                image {\n                url\n                altText\n                height\n                width\n                }\n            }\n            ... on Video {\n            id\n                sources {\n                    url\n                    height\n                    width\n                    format\n                    mimeType\n                }\n            }\n            ... on Product {\n                id\n                featuredImage {\n                    url\n                    altText\n                    height\n                    width\n                }\n                description\n                title\n                handle\n                variants(first: 1) {\n                    nodes {\n                        id\n                    }\n                }\n            }\n            ... on Collection\n                {\n                    handle\n                    id\n                    title\n                    description\n                    image {\n                    url\n                    }\n                    products(first: 10) {\n                    nodes {\n                        handle\n                        id\n                        description(truncateAt: 150)\n                        featuredImage {\n                        url\n                        id\n                        altText\n                        }\n                        title\n                        tags\n                    }\n                    }\n                }\n            ... MetaObjectNestedTwoFragment\n        }  \n        references(first: 100) {\n            nodes {\n                ... on MediaImage {\n                    image {\n                    url\n                    altText\n                    height\n                    width\n                    }\n                }\n                ... on Product {\n                    id\n                    featuredImage {\n                        url\n                        altText\n                        height\n                        width\n                    }\n                    description\n                    title\n                    handle\n                    variants(first: 1) {\n                        nodes {\n                            id\n                        }\n                    }\n                }\n               ... on Collection\n                {\n                    handle\n                    id\n                    title\n                    description\n                    image {\n                    url\n                    }\n                    products(first: 10) {\n                    nodes {\n                        handle\n                        id\n                        description(truncateAt: 150)\n                        featuredImage {\n                        url\n                        id\n                        altText\n                        }\n                        title\n                        tags\n                    }\n                    }\n                }\n                ... MetaObjectNestedTwoFragment \n                \n            }\n        }\n    }\n}\n#graphql\nfragment MetaObjectNestedTwoFragment on Metaobject\n{ \n    type\n    id\n    handle\n    fields {\n        key\n        value\n        type\n        reference {\n            ... on MediaImage {\n                image {\n                url\n                altText\n                height\n                width\n                }\n            }\n            ... on Video {\n            id\n                sources {\n                    url\n                    height\n                    width\n                    format\n                    mimeType\n                }\n            }\n            ... on Product {\n                id\n                featuredImage {\n                    url\n                    altText\n                    height\n                    width\n                }\n                description\n                title\n                handle\n                variants(first: 1) {\n                    nodes {\n                        id\n                    }\n                }\n            }\n            ... on Collection\n                {\n                    handle\n                    id\n                    title\n                    description\n                    image {\n                    url\n                    }\n                    products(first: 10) {\n                    nodes {\n                        handle\n                        id\n                        description(truncateAt: 150)\n                        featuredImage {\n                        url\n                        id\n                        altText\n                        }\n                        title\n                        tags\n                    }\n                    }\n                }\n          \n        }  \n        references(first: 100) {\n            nodes {\n                ... on MediaImage {\n                    image {\n                    url\n                    altText\n                    height\n                    width\n                    }\n                }\n                ... on Product {\n                    id\n                    featuredImage {\n                        url\n                        altText\n                        height\n                        width\n                    }\n                    description\n                    title\n                    handle\n                    variants(first: 1) {\n                        nodes {\n                            id\n                        }\n                    }\n                }\n                ... on Collection\n                {\n                    handle\n                    id\n                    title\n                    description\n                    image {\n                    url\n                    }\n                    products(first: 10) {\n                    nodes {\n                        handle\n                        id\n                        description(truncateAt: 150)\n                        featuredImage {\n                        url\n                        id\n                        altText\n                        }\n                        title\n                        tags\n                    }\n                    }\n                }\n               \n            }\n        }\n    }\n    \n}\n\n\n\n": {return: MetaobjectNestedQuery, variables: MetaobjectNestedQueryVariables},
  "#graphql\nquery MetaDefs {\n    metaobjectDefinitions(first: 100) {\n      nodes {\n        name\n        type\n        displayNameKey\n        fieldDefinitions {\n          key\n          name\n          type {\n            name\n            category\n          }\n          required\n          validations {\n            name\n            type\n            value\n          }\n          description\n        }\n        description\n        hasThumbnailField\n        id\n        metaobjectsCount\n      }\n    }\n  }\n": {return: MetaDefsQuery, variables: MetaDefsQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\nmutation CollectionUpdate($input: CollectionInput!) {\n  collectionUpdate(input: $input) {\n    collection {\n      id\n    }\n  }\n}": {return: CollectionUpdateMutation, variables: CollectionUpdateMutationVariables},
  "#graphql\nmutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {\n  metafieldDefinitionCreate(definition: $definition) {\n    createdDefinition {\n      id\n      name\n      namespace\n      key\n      useAsCollectionCondition\n    }\n    userErrors {\n      field\n      message\n      code\n    }\n  }\n}": {return: CreateMetafieldDefinitionMutation, variables: CreateMetafieldDefinitionMutationVariables},
  "#graphql\nmutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {\n    metaobjectCreate(metaobject: $metaobject) {\n        metaobject {\n          ...Meta\n        }\n        userErrors {\n        field\n        message\n        code\n        }\n  }\n}\n#graphql\nfragment Meta on Metaobject\n{\n    handle\n    id\n    type\n    updatedAt\n    fields {\n      key\n      type\n      value\n      reference {\n        ... on Metaobject {\n          id\n          type\n          handle\n          fields {      \n            type\n              value\n              key\n              reference {\n                ... on Metaobject {\n                  id\n                  type\n                  handle\n                  fields {      \n                    type\n                      value\n                      key  \n                      references(first: 10) {\n                        nodes {\n                          ... on Metaobject {\n                            id\n                            handle\n                            type\n                            fields {\n                              type\n                              value\n                              key \n                              references(first: 10) {\n                                nodes {\n                                  ... on Metaobject {\n                                    id\n                                    handle\n                                    type\n                                    fields {\n                                      type\n                                      value\n                                      key \n                                      references(first: 10) {\n                                        nodes {\n                                          ... on Metaobject {\n                                            id\n                                            handle\n                                            type\n                                            fields {\n                                              type\n                                              value\n                                              key \n                                            }}\n                                        }\n                                      }\n                                    }}\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                  }\n                }\n                ... on Collection {\n                  handle\n                  id\n                  title\n                  description\n                  image {\n                    url\n                  }\n                  products(first: 10) {\n                    nodes {\n                      handle\n                      id\n                      description(truncateAt: 150)\n                      featuredImage {\n                        url\n                        id\n                        altText\n                      }\n                      title\n                      tags\n                    }\n                  }\n                }\n              }\n              references(first: 10) {\n                nodes {\n                  ... on Metaobject {\n                    id\n                    handle\n                    type\n                    fields {\n                      type\n                      value\n                      key         \n                      references(first: 10) {\n                        nodes {\n                          ... on Metaobject {\n                            id\n                            type\n                            handle\n                            fields {\n                              type\n                              value\n                              key\n                              reference {\n                                ... on MediaImage {\n                                  id\n                                  image {\n                                    url\n                                    width\n                                    height\n                                    altText\n                                  }\n                                }\n                              }\n                              references(first: 10) {\n                                  nodes {\n                                    ... on Metaobject {\n                                      id\n                                      handle\n                                      type\n                                      fields {\n                                        type\n                                        value\n                                        key\n                                        reference {\n                                          ... on MediaImage {\n                                            id\n                                            image {\n                                              url\n                                              width\n                                              height\n                                              altText\n                                            }\n                                          }\n                                        }\n                                      }\n                                    }\n                                  }\n                                }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n        }\n      }\n      references(first: 10) {\n        nodes {\n          ... on Metaobject {\n            id\n            handle\n            type\n            fields {\n              type\n              value\n              key\n              reference {\n                ... on Collection {\n                  handle\n                  id\n                  title\n                  description\n                  image {\n                    url\n                  }\n                  products(first: 10) {\n                    nodes {\n                      handle\n                      id\n                      description(truncateAt: 150)\n                      featuredImage {\n                        url\n                        id\n                        altText\n                      }\n                      title\n                      tags\n                    }\n                  }\n                }\n              }\n              references(first: 10) {\n                nodes {\n                  ... on Metaobject {\n                    id\n                    handle\n                    type\n                    fields {\n                      type\n                      value\n                      key         \n                      references(first: 10) {\n                        nodes {\n                          ... on Metaobject {\n                            id\n                            type\n                            handle\n                            fields {\n                              type\n                              value\n                              key\n                              reference {\n                                ... on MediaImage {\n                                  id\n                                  image {\n                                    url\n                                    width\n                                    height\n                                    altText\n                                  }\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: CreateMetaobjectMutation, variables: CreateMetaobjectMutationVariables},
  "#graphql\nmutation CreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {\n    metaobjectDefinitionCreate(definition: $definition) {\n      metaobjectDefinition {\n        id\n        name\n        type\n        fieldDefinitions {\n          name\n          key\n          required\n        }\n      }\n      userErrors {\n        field\n        message\n        code\n      }\n    }\n  }": {return: CreateMetaobjectDefinitionMutation, variables: CreateMetaobjectDefinitionMutationVariables},
  "#graphql\nmutation DeleteMetaobject($id: ID!) {\n  metaobjectDelete(id: $id) \n  {\n    deletedId\n    userErrors {\n      code\n      elementIndex\n      elementKey\n      field\n      message\n    }\n  }\n}": {return: DeleteMetaobjectMutation, variables: DeleteMetaobjectMutationVariables},
  "#graphql\nmutation fileCreate($files: [FileCreateInput!]!) {\n    fileCreate(\n        files: $files\n      ) {\n        files {\n          alt\n          id\n          fileStatus\n          preview {\n            image {\n              url\n              width\n              height\n            }\n          }\n          fileErrors {\n            code\n            details\n            message\n          }\n          ... on MediaImage {\n            id\n            fileStatus\n            image {\n              url\n            }\n          }\n        }\n      }\n  }\n": {return: FileCreateMutation, variables: FileCreateMutationVariables},
  "#graphql\nmutation stagedUploadsCreate($input: [StagedUploadInput!]!) {\n    stagedUploadsCreate(input: $input) {\n      stagedTargets {\n        resourceUrl\n        url\n        parameters {\n          name\n          value\n        }\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: StagedUploadsCreateMutation, variables: StagedUploadsCreateMutationVariables},
  "#graphql\nmutation PageUpdate($id: ID!, $page: PageUpdateInput!) {\n  pageUpdate(id: $id,page: $page) {\n    page {\n      id\n    }\n  }\n}": {return: PageUpdateMutation, variables: PageUpdateMutationVariables},
  "#graphql\nmutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {\n  metaobjectUpdate(\n    id: $id,\n    metaobject: $metaobject\n  ) {\n    metaobject {\n      ...Meta\n    }\n    userErrors {\n      field\n      message\n      code\n    }\n  }\n}\n#graphql\nfragment Meta on Metaobject\n{\n    handle\n    id\n    type\n    updatedAt\n    fields {\n      key\n      type\n      value\n      reference {\n        ... on Metaobject {\n          id\n          type\n          handle\n          fields {      \n            type\n              value\n              key\n              reference {\n                ... on Metaobject {\n                  id\n                  type\n                  handle\n                  fields {      \n                    type\n                      value\n                      key  \n                      references(first: 10) {\n                        nodes {\n                          ... on Metaobject {\n                            id\n                            handle\n                            type\n                            fields {\n                              type\n                              value\n                              key \n                              references(first: 10) {\n                                nodes {\n                                  ... on Metaobject {\n                                    id\n                                    handle\n                                    type\n                                    fields {\n                                      type\n                                      value\n                                      key \n                                      references(first: 10) {\n                                        nodes {\n                                          ... on Metaobject {\n                                            id\n                                            handle\n                                            type\n                                            fields {\n                                              type\n                                              value\n                                              key \n                                            }}\n                                        }\n                                      }\n                                    }}\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                  }\n                }\n                ... on Collection {\n                  handle\n                  id\n                  title\n                  description\n                  image {\n                    url\n                  }\n                  products(first: 10) {\n                    nodes {\n                      handle\n                      id\n                      description(truncateAt: 150)\n                      featuredImage {\n                        url\n                        id\n                        altText\n                      }\n                      title\n                      tags\n                    }\n                  }\n                }\n              }\n              references(first: 10) {\n                nodes {\n                  ... on Metaobject {\n                    id\n                    handle\n                    type\n                    fields {\n                      type\n                      value\n                      key         \n                      references(first: 10) {\n                        nodes {\n                          ... on Metaobject {\n                            id\n                            type\n                            handle\n                            fields {\n                              type\n                              value\n                              key\n                              reference {\n                                ... on MediaImage {\n                                  id\n                                  image {\n                                    url\n                                    width\n                                    height\n                                    altText\n                                  }\n                                }\n                              }\n                              references(first: 10) {\n                                  nodes {\n                                    ... on Metaobject {\n                                      id\n                                      handle\n                                      type\n                                      fields {\n                                        type\n                                        value\n                                        key\n                                        reference {\n                                          ... on MediaImage {\n                                            id\n                                            image {\n                                              url\n                                              width\n                                              height\n                                              altText\n                                            }\n                                          }\n                                        }\n                                      }\n                                    }\n                                  }\n                                }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n        }\n      }\n      references(first: 10) {\n        nodes {\n          ... on Metaobject {\n            id\n            handle\n            type\n            fields {\n              type\n              value\n              key\n              reference {\n                ... on Collection {\n                  handle\n                  id\n                  title\n                  description\n                  image {\n                    url\n                  }\n                  products(first: 10) {\n                    nodes {\n                      handle\n                      id\n                      description(truncateAt: 150)\n                      featuredImage {\n                        url\n                        id\n                        altText\n                      }\n                      title\n                      tags\n                    }\n                  }\n                }\n              }\n              references(first: 10) {\n                nodes {\n                  ... on Metaobject {\n                    id\n                    handle\n                    type\n                    fields {\n                      type\n                      value\n                      key         \n                      references(first: 10) {\n                        nodes {\n                          ... on Metaobject {\n                            id\n                            type\n                            handle\n                            fields {\n                              type\n                              value\n                              key\n                              reference {\n                                ... on MediaImage {\n                                  id\n                                  image {\n                                    url\n                                    width\n                                    height\n                                    altText\n                                  }\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: UpdateMetaobjectMutation, variables: UpdateMetaobjectMutationVariables},
  "#graphql\nmutation UpsertMetaobject($handle: MetaobjectHandleInput!, $metaobject: MetaobjectUpsertInput!) {\n  metaobjectUpsert(\n    handle: $handle\n    metaobject: $metaobject\n  ) {\n    metaobject {\n      ...Meta\n    }\n    userErrors {\n      code\n      field\n      message\n      elementIndex\n      elementKey\n    }\n  }\n}\n#graphql\nfragment Meta on Metaobject\n{\n    handle\n    id\n    type\n    updatedAt\n    fields {\n      key\n      type\n      value\n      reference {\n        ... on Metaobject {\n          id\n          type\n          handle\n          fields {      \n            type\n              value\n              key\n              reference {\n                ... on Metaobject {\n                  id\n                  type\n                  handle\n                  fields {      \n                    type\n                      value\n                      key  \n                      references(first: 10) {\n                        nodes {\n                          ... on Metaobject {\n                            id\n                            handle\n                            type\n                            fields {\n                              type\n                              value\n                              key \n                              references(first: 10) {\n                                nodes {\n                                  ... on Metaobject {\n                                    id\n                                    handle\n                                    type\n                                    fields {\n                                      type\n                                      value\n                                      key \n                                      references(first: 10) {\n                                        nodes {\n                                          ... on Metaobject {\n                                            id\n                                            handle\n                                            type\n                                            fields {\n                                              type\n                                              value\n                                              key \n                                            }}\n                                        }\n                                      }\n                                    }}\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                  }\n                }\n                ... on Collection {\n                  handle\n                  id\n                  title\n                  description\n                  image {\n                    url\n                  }\n                  products(first: 10) {\n                    nodes {\n                      handle\n                      id\n                      description(truncateAt: 150)\n                      featuredImage {\n                        url\n                        id\n                        altText\n                      }\n                      title\n                      tags\n                    }\n                  }\n                }\n              }\n              references(first: 10) {\n                nodes {\n                  ... on Metaobject {\n                    id\n                    handle\n                    type\n                    fields {\n                      type\n                      value\n                      key         \n                      references(first: 10) {\n                        nodes {\n                          ... on Metaobject {\n                            id\n                            type\n                            handle\n                            fields {\n                              type\n                              value\n                              key\n                              reference {\n                                ... on MediaImage {\n                                  id\n                                  image {\n                                    url\n                                    width\n                                    height\n                                    altText\n                                  }\n                                }\n                              }\n                              references(first: 10) {\n                                  nodes {\n                                    ... on Metaobject {\n                                      id\n                                      handle\n                                      type\n                                      fields {\n                                        type\n                                        value\n                                        key\n                                        reference {\n                                          ... on MediaImage {\n                                            id\n                                            image {\n                                              url\n                                              width\n                                              height\n                                              altText\n                                            }\n                                          }\n                                        }\n                                      }\n                                    }\n                                  }\n                                }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n        }\n      }\n      references(first: 10) {\n        nodes {\n          ... on Metaobject {\n            id\n            handle\n            type\n            fields {\n              type\n              value\n              key\n              reference {\n                ... on Collection {\n                  handle\n                  id\n                  title\n                  description\n                  image {\n                    url\n                  }\n                  products(first: 10) {\n                    nodes {\n                      handle\n                      id\n                      description(truncateAt: 150)\n                      featuredImage {\n                        url\n                        id\n                        altText\n                      }\n                      title\n                      tags\n                    }\n                  }\n                }\n              }\n              references(first: 10) {\n                nodes {\n                  ... on Metaobject {\n                    id\n                    handle\n                    type\n                    fields {\n                      type\n                      value\n                      key         \n                      references(first: 10) {\n                        nodes {\n                          ... on Metaobject {\n                            id\n                            type\n                            handle\n                            fields {\n                              type\n                              value\n                              key\n                              reference {\n                                ... on MediaImage {\n                                  id\n                                  image {\n                                    url\n                                    width\n                                    height\n                                    altText\n                                  }\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: UpsertMetaobjectMutation, variables: UpsertMetaobjectMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
