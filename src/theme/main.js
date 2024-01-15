import { createTheme } from '@material-ui/core/styles'

const globalTheme = {
  fonts: {
    arabic: 'Cairo',
    titles: 'Roboto',
    cardTitle: {
      en: {
        family: 'Forum',
      },
      ar: {
        family: 'Reem Kufi',
      },
    },
  },
  typography: {
    fontFamily: [
      'Forum',
      'Playfair Display',
      'Reem Kufi',
      'Cairo',
      'Roboto',
    ].join(','),
    h2: {
      '@media (max-width:992px)': {
        fontSize: '3rem',
      },
    },
  },
  palette: {
    background: {
      highlight: '#ad773e',
      blueLink: '#0077f5',
      error: '#d04343',
      gradient: {
        light: '#bc956c',
        dark: '#ad773e',
      },
    },
  },
  dialogSpacing: 0,
  overrides: {
    MuiTypography: {
      body1: {
        lineHeight: '1.8',
      },
      h3: {
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        boxShadow: '0 0 0 transparent',
      },
    },
    MuiDivider: {
      root: {
        margin: '6em',
        opacity: '0.2',
      },
    },
    MuiFab: {
      root: {
        marginRight: '10px',
      },
    },
    MuiCard: {
      root: {
        borderRadius: 0,
        boxShadow: '0 0 0 transparent',
      },
    },
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: '8px',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
    MuiGrid: {
      container: {
        '&$spacing-xs-3': {
          margin: '0 auto',
          width: '100%',
          '& $item': {
            padding: 3,
          },
        },
      },
    },
    MuiMenu: {
      paper: {
        borderRadius: 0,
      },
    },
    MuiListItem: {
      root: {
        paddingTop: '6px',
        paddingBottom: '6px',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: '30px',
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        color: '#12131E',
      },
    },
    MuiPickersModal: {
      withAdditionalAction: {
        color: '#12131E',
        '& button': {
          color: '#ad773e',
        },
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      },
    },
    'MuiPickersBasePicker-pickerView': {
      color: '#ad773e',
    },
  },
}

export const lightTheme = createTheme({
  name: 'light',
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    background: {
      default: '#ffffff',
      light: '#f7f7f7',
      reverse: '#12131E',
      dark: '#ddd',
      darker: '#cccccc',
      lighter: '#888888',
      reverseLight: '#444',
      skeleton: '#ddd',
      landingText: '#444',
      reverseLighter: '#444',
      menuItem: '#444',
      helpBackground: '#cccccc',
      helpColor: '#444',
      editButton: '#888888',
      shadow: '#bbb',
      panelBox: '#f7f7f7',
      border: '#e7e7e7',
      lightBorder: '#e7e7e7',
      darkShadow: '#ccc',
      chartShadow: '#ddd',
      headerToggleActiveBackground: '#fff',
      headerToggleActiveColor: '#777',
      headerToggleInactiveBackground: '#ccc',
      headerToggleInactiveColor: '#fff',
      customLinksBackground: '#eee',
    },
    action: {
      disabledBackground: 'rgba(48, 49, 49, 0.26)',
      disabled: 'rgba(48, 49, 49, 0.26)',
    },
    text: {
      primary: '#12131E',
      secondary: '#ffffff',
    },
    shadow: '#888888',
    primary: { main: '#12131E' },
    secondary: { main: '#ffffff' },
  },
  links: {
    color: '#12131E',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#f7f7f7',
        },
      },
    },
    MuiBottomNavigationAction: {
      root: {
        '&.Mui-selected': {
          color: '#ffffff',
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#ffffff',
        color: '#12131E',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#12131E',
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: '#12131E',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#12131E',
      },
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#12131E',
      },
    },
    MuiSkeleton: {
      root: {
        backgroundColor: 'rgba(243, 240, 234, 0.11)',
      },
    },
    MuiPaginationItem: {
      root: {
        color: '#12131E',
        '&$selected': {
          color: '#ffffff',
          backgroundColor: '#12131E',
        },
      },
      page: {
        '&$selected': {
          color: '#ffffff',
          backgroundColor: '#12131E',
        },
      },
      outlined: {
        border: '1px solid rgba(48, 49, 49, 0.26)',
      },
    },
    MuiInput: {
      root: {
        color: '#ffffff',
      },
    },
    MuiButton: {
      outlined: {
        borderColor: 'rgba(48, 49, 49, 0.26)',
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: '#12131E',
        color: '#ffffff',
      },
    },
    MuiSwitch: {
      switchBase: {
        color: '#12131E',
      },
      colorSecondary: {
        '&.Mui-checked': {
          color: '#00c1af',
          '& + .MuiSwitch-track': {
            backgroundColor: '#b4e0dc',
            opacity: 0.75,
          },
        },
      },
    },
  },
}, globalTheme)

export const darkTheme = createTheme({
  name: 'dark',
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    background: {
      default: '#12131E',
      reverse: '#ffffff',
      darker: '#444',
      lighter: '#999999',
      light: '#171A32',
      dark: '#444',
      reverseLight: '#aaa',
      skeleton: '#8c8c8c',
      landingText: '#999999',
      reverseLighter: '#ddd',
      menuItem: '#12131E',
      helpBackground: '#444',
      helpColor: '#eeeeee',
      editButton: '#888888',
      shadow: '#111',
      panelBox: '#111',
      darkShadow: '#171A32',
      border: '#171A32',
      lightBorder: '#12131E',
      chartShadow: '#111',
      headerToggleActiveBackground: '#12131E',
      headerToggleActiveColor: '#aaa',
      headerToggleInactiveBackground: '#555',
      headerToggleInactiveColor: '#888',
      customLinksBackground: '#12131E',
    },
    action: {
      disabledBackground: 'rgba(243, 240, 234, 0.26)',
      disabled: 'rgba(243, 240, 234, 0.26)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#12131E',
    },
    shadow: '#111111',
    primary: { main: '#ffffff' },
    secondary: { main: '#12131E' },
  },
  links: {
    color: '#ffffff',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#171A32',
        },
      },
    },
    MuiBottomNavigationAction: {
      root: {
        '&.Mui-selected': {
          color: '#12131E',
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#12131E',
        color: '#ffffff',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#ffffff',
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: '#12131E',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#ffffff',
      },
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#ffffff',
      },
    },
    MuiSkeleton: {
      root: {
        backgroundColor: 'rgba(48, 49, 49, 0.11)',
      },
    },
    MuiPaginationItem: {
      root: {
        color: '#ffffff',
        '&$selected': {
          color: '#12131E',
          backgroundColor: '#ffffff',
        },
      },
      page: {
        '&$selected': {
          color: '#12131E',
          backgroundColor: '#ffffff',
        },
      },
      outlined: {
        border: '1px solid rgba(243, 240, 234, 0.26)',
      },
    },
    MuiInput: {
      root: {
        color: '#12131E',
      },
    },
    MuiButton: {
      outlined: {
        borderColor: 'rgba(243, 240, 234, 0.26)',
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: '#ffffff',
        color: '#12131E',
      },
    },
    MuiSwitch: {
      switchBase: {
        color: '#ffffff',
      },
      colorSecondary: {
        '&.Mui-checked': {
          color: '#00c1af',
          '& + .MuiSwitch-track': {
            backgroundColor: '#b4e0dc',
            opacity: 0.75,
          },
        },
        '& + .MuiSwitch-track': {
          backgroundColor: '#fff',
          opacity: 0.5,
        },
      },
    },
  },
}, globalTheme)
