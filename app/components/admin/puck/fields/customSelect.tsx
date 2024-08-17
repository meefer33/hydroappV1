import { FieldLabel } from "@measured/puck";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const customSelect = (label: any) => {
  const config = {
    type: "custom",
    label: label,
    render: ({ onChange }: any) => (
      <FieldLabel label={label}>
        <Select onValueChange={(v) => onChange(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="#ffffff">
                <div className="bg-slate-800 p-2"></div>Apple
              </SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FieldLabel>
    ),
  };
  return config;
};
