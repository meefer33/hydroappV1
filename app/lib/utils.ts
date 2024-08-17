import { CSSVariablesResolver } from "@mantine/core";

export function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? '700' : '500',
    color: isActive ? '#cc3429' : 'inherit',
  };
}

export function loadFonts(fonts: {
  body?: {url: string};
  headings?: {url: string};
}) {
  const loadFonts = [];
  const ff = fonts.body?.url;
  const ffh = fonts.headings?.url;
  ff &&
    loadFonts.push({
      tagName: 'link',
      rel: 'stylesheet',
      href: ff,
    });
  ffh &&
    loadFonts.push({
      tagName: 'link',
      rel: 'stylesheet',
      href: ffh,
    });
  return loadFonts;
}

export function updateSettings(settings:any) {
  if (settings?.other?.fonts?.body?.class) {
    settings.fontFamily = settings?.other?.fonts?.body?.class;
  }
  if (settings?.other?.fonts?.headings?.class) {
    settings.headings.fontFamily = settings?.other?.fonts?.headings?.class;
  }
  return settings;
}

export function updateSettingsEditMode(settings:any) {
  if (settings?.other?.fonts?.headings?.class) {
    settings.headings.fontFamily = settings?.other?.fonts?.headings?.class;
  }
  return settings;
}

export  const cssResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-color-body":
      theme.other.colorScheme === "dark"
        ? theme.other.themes.dark.bg_color
        : theme.other.themes.light.bg_color,
    "--mantine-color-text":
      theme.other.colorScheme === "dark"
        ? theme.other.themes.dark.text_color
        : theme.other.themes.light.text_color,
    "--divider-color":
      theme.other.colorScheme === "dark"
        ? "--mantine-color-dark-4"
        : "--mantine-color-dark-4",
  },
  light: {
    "--mantine-color-body": theme.other.themes.light.bg_color,
    "--mantine-color-text": theme.other.themes.light.text_color
  },
  dark: {
    "--mantine-color-body": theme.other.themes.dark.bg_color,
  "--mantine-color-text": theme.other.themes.dark.text_color
  },
});
