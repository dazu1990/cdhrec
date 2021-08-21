import darkModeHelper from "../utils/darkModeHelper";
const darkModeStore = darkModeHelper();

const palette =  (darkModeStore.isDarkMode ? {
  // This is the darkMode Palette
  type: 'dark',
  background: {
    default: 'linear-gradient(0deg, rgba(228,228,233,1) 3%, rgba(255,255,255,1) 39%, rgba(255,255,255,1) 100%)',
  },
  component: {
    background: '#424242',
    extraDarkBackground: '#252525',
  },
  text: {
    primary: '#f5f5f5',
    secondary: '#dedede',
  },
  primary: {
    light: '#2b2d2e',
    main: '#dedede',
    dark: '#2b2d2e',
    contrastText: '#fff',
  },
  secondary: {
    light: '#f5f5f5',
    main: '#2b2d2e',
    dark: '#f5f5f5',
    contrastText: '#f5f5f5',
  },
  green: {
    colorless: '#eee',
    white: '#fff',
    blue: '#0000ff',
    black: '#000',
    red: '#ff0000',
    green: '#00ff00',
  },
  mana_colorless: {
    light: '#eee',
    main: '#eee',
    dark: '#eee',
  },
  mana_red: {
    light: '#ff0000',
    main: '#ff0000',
    dark: '#ff0000',
  },
  mana_white: {
    light: '#fff',
    main: '#fff',
    dark: '#fff',
  }

} : 
// This is the regular palette
{
  background: {
    default: 'linear-gradient(0deg, rgba(228,228,233,1) 3%, rgba(255,255,255,1) 39%, rgba(255,255,255,1) 100%)',
  },
  component: {
    background: 'white',
    extraDarkBackground: 'rgb(225,225,225)',
  },
  text: {
    primary: '#17252A',
    secondary: '#dedede',
  },
  primary: {
    light: '#2b2d2e',
    main: '#2b2d2e',
    dark: '#2b2d2e',
    contrastText: '#fff',
  },
  secondary: {
    light: '#17252A',
    main: '#2b2d2e',
    dark: '#17252A',
    contrastText: '#17252A',
  },
  green: {
    colorless: '#eee',
    white: '#fff',
    blue: '#0000ff',
    black: '#000',
    red: '#ff0000',
    green: '#00ff00',
  },
  mana_colorless: {
    light: '#eee',
    main: '#eee',
    dark: '#eee',
  },
  mana_red: {
    light: '#ff0000',
    main: '#ff0000',
    dark: '#ff0000',
  },
  mana_white: {
    light: '#fff',
    main: '#fff',
    dark: '#fff',
  }
}
);

export default palette;
