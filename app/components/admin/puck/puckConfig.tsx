import { Config } from "@measured/puck";
import { richTextSection } from "./sections/richTextSection";
import { root } from "./sections/root";
import { section } from "./sections/section";

export const puckConfig = (contentType = "default") => {
  switch (contentType) {
    case "page":
      const page: Config | any = {
        components: {
          Section: section(),
          RichTextEditor: richTextSection(),
        },
        root: root(contentType),
      };
      return page;
    case "theme":
      const theme: Config | any = {
        components: {
          Section: section(),
          RichTextEditor: richTextSection(),
        },
        root: root(contentType),
      };
      return theme;
    default:
      const config: Config | any = {
        components: {
          Section: section(),
          RichTextEditor: richTextSection(),
        },
        root: root(),
      };
      return config;
  }
};
