import {Button, Modal} from '@mantine/core';
import {usePuck} from '@measured/puck';

export default function LoadSectionModal({
  loadSectionOpened,
  loadSectionClose,
  loadSectionId
}: any) {
  const {appState, dispatch} = usePuck();
  const save = (appState: any) => {
    console.log('appdata', appState, loadSectionId);
    /*
    const nd = {
        "type": "Section",
        "props": {
          "global": {
            "is_global": true,
            "global_name": "tester"
          },
          "padding": {
            "padding_top": "sm",
            "padding_bottom": "sm"
          },
          "id": "Section-7b3b2bd6-c1c4-48be-9579-b3b5fed47d54"
        }
        }
    //appState.data.zones["root:main-content"].push(nd)
    appState.data.zones = {
        ...appState.data.zones,
        "Section-7b3b2bd6-c1c4-48be-9579-b3b5fed47d54:section": [
            {
              "type": "Grid",
              "props": {
                "padding": {
                  "padding_top": "sm",
                  "padding_bottom": "sm"
                },
                "content": {
                  "width": "lg",
                  "columns": 2,
                  "gap": "sm"
                },
                "id": "Grid-9699d0e9-9790-4d22-9477-7413cc0787f6"
              }
            },
            {
              "type": "ProductScroll",
              "props": {
                "carouselSlides": {
                  "slidesTablet": "50%",
                  "slidesDesktop": "33.333333%"
                },
                "slidesTitleColor": "primary",
                "id": "ProductScroll-471cb545-f969-4714-96f8-7d379073b048",
                "products": [
                  {
                    "product": {
                      "handle": "100ah-high-capacity-lifepo4-lithium-battery-rechargeable-1280wh-power-source-with-100a-bms-4000-8000-cycles-expandable-to-4p4s-24v-36v-48v-perfect-for-trolling-motor-rv-marine-home-energy-storage-solar-system-and-off-grid-applications",
                      "id": "gid://shopify/Product/7394136457267",
                      "featuredImage": {
                        "url": "https://cdn.shopify.com/s/files/1/0593/5048/2995/files/8ba0738f-1ac3-438b-9b6c-71d498c124f8_x400.jpg?v=1723141285"
                      },
                      "variants": {
                        "nodes": [
                          {
                            "price": {
                              "amount": "229.46",
                              "currencyCode": "USD"
                            }
                          }
                        ]
                      },
                      "title": "100Ah High-Capacity LiFePO4 Lithium Battery",
                      "onlineStoreUrl": null,
                      "description": "Automotive Grade A-grade High-quality Battery 12V 100Ah LiFePO4 Battery Adopts High-quality A-grade LiFePO4 Battery, With A Size Of 13*6.69*8.4IN A..."
                    }
                  }
                ]
              }
            },
            {
              "type": "RichTextEditor",
              "props": {
                "id": "RichTextEditor-334650a9-6d44-4810-b190-ba4c1cafc186",
                "richText": {
                  "type": "doc",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": "left"
                      },
                      "content": [
                        {
                          "type": "text",
                          "text": "hello moto"
                        }
                      ]
                    }
                  ]
                }
              }
            }
          ],
          "Grid-9699d0e9-9790-4d22-9477-7413cc0787f6:col-1": [],
          "Grid-9699d0e9-9790-4d22-9477-7413cc0787f6:col-2": []
        
    }
    dispatch({
        type: "setData",
        data: {
            ...appState.data,
        },
      });
      */
  };
  return (
    <Modal
      opened={loadSectionOpened}
      onClose={loadSectionClose}
      title="Authentication"
    >
      <Button
        onClick={(e) => {
          e.preventDefault();
          save(appState);
        }}
      >
        save
      </Button>
    </Modal>
  );
}
