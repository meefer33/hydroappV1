import { AutoField, FieldLabel } from "@measured/puck";
import { useState } from "react";

export const logoText = () => {
  const config = {
    type: "custom",
    render: ({ onChange, value }) => {
       

      return (
        <>
        Logo Image will override text.
        <FieldLabel label="Logo Text">
          <AutoField
            field={{ type: "text" }} onChange={(v)=>onChange(v)} value={value}
          />
        </FieldLabel>
        </>
      );
    },
  };
  return config;
};
