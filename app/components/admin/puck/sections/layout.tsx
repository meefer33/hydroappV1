import {colorPickerPrimary} from '../fields/colorPickerPrimary';
import {colorscheme} from '../fields/colorScheme';
import {colorPickerThemes} from '../fields/colorPickerThemes';
import {useFetcher} from '@remix-run/react';
import ThemeSettings from '../theme/ThemeSettings';
import { DropZone } from '@measured/puck';

export const layout = (theme, handle = 'main') => {
  const actionUpdateSettings = useFetcher();

  const updateTheme = (theme) => {
    actionUpdateSettings.submit(
      {
        handle: {
          type: 'ha_theme_settings',
          handle: handle,
        },
        metaobject: {
          fields: [
            {
              key: 'name',
              value: handle,
            },
            {
              key: 'settings',
              value: JSON.stringify(theme),
            },
          ],
        },
      },
      {
        method: 'PUT',
        action: '/api/upsertMetaobject',
        encType: 'application/json',
      },
    );
  };

  const config = {
    fields: {
      colorScheme: colorscheme(theme, updateTheme),
      colors: {
        type: 'object',
        label: 'Theme Colors',
        objectFields: {
          primary_color: colorPickerPrimary(
            'Primary Color',
            'primary',
            theme,
            updateTheme,
          ),
          accent_color: colorPickerPrimary(
            'Accent Color',
            'accent',
            theme,
            updateTheme,
          ),
          negative_color: colorPickerPrimary(
            'Negative Color',
            'negative',
            theme,
            updateTheme,
          ),
          positive_color: colorPickerPrimary(
            'Positive Color',
            'positive',
            theme,
            updateTheme,
          ),
          notice_color: colorPickerPrimary(
            'Notice Color',
            'notice',
            theme,
            updateTheme,
          ),
          info_color: colorPickerPrimary(
            'Info Color',
            'info',
            theme,
            updateTheme,
          ),
        },
      },
      light_theme: {
        type: 'object',
        label: 'Light Theme',
        objectFields: {
          bg_color: colorPickerThemes(
            'Background Color',
            'light',
            'bg_color',
            theme,
            updateTheme,
          ),
          text_color: colorPickerThemes(
            'Text Color',
            'light',
            'text_color',
            theme,
            updateTheme,
          ),
        },
      },
      dark_theme: {
        type: 'object',
        label: 'Dark Theme',
        objectFields: {
          bg_color: colorPickerThemes(
            'Background Color',
            'dark',
            'bg_color',
            theme,
            updateTheme,
          ),
          text_color: colorPickerThemes(
            'Text Color',
            'dark',
            'text_color',
            theme,
            updateTheme,
          ),
        },
      },
      fonts: {
        type: 'object',
        label: 'Fonts',
        objectFields: {
          font_body_class: {
            type: 'text',
            label: 'Body class',
          },
          font_body_url: {
            type: 'text',
            label: 'Body url',
          },
          font_headings_class: {
            type: 'text',
            label: 'Body class',
          },
          font_headings_url: {
            type: 'text',
            label: 'Body url',
          },
        },
      },
    },
    defaultProps: {
      colorScheme: theme.other.colorScheme,
      colors: {
        primary_color: theme.other.themeColors.primary,
        accent_color: theme.other.themeColors.accent,
        negative_color: theme.other.themeColors.negative,
        positive_color: theme.other.themeColors.positive,
        notice_color: theme.other.themeColors.notice,
        info_color: theme.other.themeColors.info,
      },
      light_theme: {
        bg_color: theme.other.themes.light.bg_color,
        text_color: theme.other.themes.light.text_color,
      },
      dark_theme: {
        bg_color: theme.other.themes.dark.bg_color,
        text_color: theme.other.themes.dark.text_color,
      },
      fonts: {
        font_body_class:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
        font_body_url: '',
        font_headings_class:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
        font_headings_url: '',
      },
      //primary_color: defaultTheme.colors[defaultTheme.primaryColor],
    },
    render: ({...props}) => {
      return (
        <>
        <DropZone zone="header" />
        <ThemeSettings theme={theme} />
        <DropZone zone="footer" />
        </>
      );
    },
  };
  return config;
};
