export const padding = () => {
  const config = {
    type: 'object',
    label: 'Padding',
    objectFields: {
      padding_top: {
        type: 'select',
        label: 'Top',
        options: [
          {label: 'none', value: '0'},
          {label: 'small', value: 'sm'},
          {label: 'medium', value: 'md'},
          {label: 'large', value: 'lg'},
        ],
      },
      padding_bottom: {
        type: 'select',
        label: 'Bottom',
        options: [
          {label: 'none', value: '0'},
          {label: 'small', value: 'sm'},
          {label: 'medium', value: 'md'},
          {label: 'large', value: 'lg'},
        ],
      },
      padding_left: {
        type: 'select',
        label: 'Left',
        options: [
          {label: 'none', value: '0'},
          {label: 'small', value: 'sm'},
          {label: 'medium', value: 'md'},
          {label: 'large', value: 'lg'},
        ],
      },
      padding_right: {
        type: 'select',
        label: 'Right',
        options: [
          {label: 'none', value: '0'},
          {label: 'small', value: 'sm'},
          {label: 'medium', value: 'md'},
          {label: 'large', value: 'lg'},
        ],
      },
    },
  };
  return config;
};
