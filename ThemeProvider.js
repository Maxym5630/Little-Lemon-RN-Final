import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = {
    colors: {
      primaryMain: '#495E57',
      primarySec: '#F4CE14',
      secondOne: '#EE9972',
      secondTwo: '#FBDABB',
      white: '#EDEFEE',
      black: '#333333',
    },
    fonts: {
      displayTitle: {
        fontFamily: 'Markazi Text',
        fontSize: 64,
        fontWeight: '500',
      },
      subtitle: { fontFamily: 'Markazi Text', fontSize: 40 },
      leadText: { fontFamily: 'Karla', fontSize: 18, fontWeight: '500' },
      sectionTitle: {
        fontFamily: 'Karla',
        fontSize: 20,
        fontWeight: '800',
        textTransform: 'uppercase',
      },
      sectionCategories: {
        fontFamily: 'Karla',
        fontSize: 16,
        fontWeight: '800',
      },
      cardTitle: {
        fontFamily: 'Karla',
        fontSize: 18,
        fontWeight: '600',
      },
      paragraphText: {
        fontFamily: 'Karla',
        fontSize: 16,
      },
      highlightText: {
        fontFamily: 'Karla',
        fontSize: 16,
        fontWeight: 500,
      },
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
