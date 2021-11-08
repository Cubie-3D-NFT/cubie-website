import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: 'Gilroy',
  },
  /*
  colors: {
    brand: {
      100: '#cef6e8',
      200: '#a8efd5',
      300: '#7ae7bf',
      400: '#3fdca2',
      500: '#16cc89',
      600: '#14b67a',
      700: '#119c69',
      800: '#0d7b53',
      900: '#084931',
    },
  },
  */
});
