// theme.ts

import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#495E57',
    primaryLight: '#F4CE14',
    primaryMain: '#495E57',
    primarySec: '#F4CE14',
    secondOne: '#EE9972',
    secondTwo: '#FBDABB',
    white: '#EDEFEE',
    black: '#333333',
    buttonColor: '#F4CE14',
    buttonTextColor: '#333333',
  },
  fonts: {
    ...DefaultTheme.fonts,
    displayTitle: {
      fontFamily: 'MarkaziText',
      fontSize: 64,
      fontWeight: '500' as const,
      lineHeight: 75,
    },
    subtitle: {
      fontFamily: 'MarkaziText',
      fontSize: 40,
    },
    leadText: {
      fontFamily: 'Karla',
      fontSize: 18,
      fontWeight: '500' as const,
    },
    sectionTitle: {
      fontFamily: 'Karla',
      fontSize: 20,
      fontWeight: '800' as const,
      textTransform: 'uppercase' as const,
    },
    sectionCategories: {
      fontFamily: 'Karla',
      fontSize: 16,
      fontWeight: '800' as const,
    },
    cardTitle: {
      fontFamily: 'Karla',
      fontSize: 18,
      fontWeight: '600' as const,
    },
    paragraphText: {
      fontFamily: 'Karla',
      fontSize: 16,
    },
    highlightText: {
      fontFamily: 'Karla',
      fontSize: 16,
      fontWeight: '500' as const,
    },
  },
};

export default theme;
export const colors = theme.colors;
export const fonts = theme.fonts;
