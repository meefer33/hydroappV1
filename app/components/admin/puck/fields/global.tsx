export const globalComponent = () => {
  const config = {
    is_global: {
      type: 'radio',
      options: [
        {label: 'Yes', value: true},
        {label: 'No', value: false},
      ],
    },
    global_name: {
      type: 'text',
    },
  };
  return config;
};
