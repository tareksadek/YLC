import { makeStyles } from '@material-ui/core/styles'

export const themeStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  settingsButtonsContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    bottom: theme.spacing(1),
  },
  buttonInfo: {
    fontSize: '0.8rem',
    color: theme.palette.background.reverse,
    opacity: 0.5,
    marginTop: theme.spacing(1),
  },
  layoutSwitchContainer: {
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.background.darker}`,
    width: '100%',
  },
  themeContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  themeSwitchContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.background.darker}`,
    width: '100%',
  },
  colorSwitchContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.background.darker}`,
  },
  iconsColorContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    width: '100%',
  },
  settingsTitle: {
    textAlign: 'left',
  },
  toggleThemeButtonGroup: {
    borderRadius: theme.spacing(5),
    '& button': {
      textTransform: 'capitalize',
      '&:first-child': {
        borderRadius: `${theme.spacing(5)}px 0 0 ${theme.spacing(5)}px`,
      },
      '&:last-child': {
        borderRadius: `0 ${theme.spacing(5)}px ${theme.spacing(5)}px 0`,
      },
    },
  },
  colorButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  colorButton: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(5),
    width: 50,
    height: 50,
    minWidth: 'auto',
  },
  colorPickerContainer: {
    position: 'relative',
    maxWidth: '208px',
    borderRadius: theme.spacing(5),
    border: `2px inset ${theme.palette.background.reverse}60`,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiInput-underline': {
      '& input': {
        color: theme.palette.background.reverse,
        cursor: 'pointer',
        paddingLeft: theme.spacing(1),
        textAlign: 'center',
      },
      '&:after': {
        display: 'none',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& > div': {
      '&:last-child': {
        '&:not(.MuiFormControl-root)': {
          position: 'absolute !important',
          width: 245,
          bottom: 40,
          left: '-12px',
          background: '#fff',
          padding: theme.spacing(1),
          height: 254,
          borderRadius: theme.spacing(2),
          overflow: 'hidden',
          '& .chrome-picker': {
            width: '230px !important',
            boxShadow: '0 0 0 transparent !important',
            '& > div': {
              '&:first-child': {
                borderRadius: '12px 12px 0px 0px !important',
              },
            },
          },
        },
      },
    },
  },
  pickerIcon: {
    position: 'absolute',
    left: '8px',
    right: 'auto',
    top: '2px',
  },
  selectedLayout: {},
  layoutButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
    '& button': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 130,
      minWidth: 150,
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      '&$selectedLayout': {
        '& $buttonText': {
          opacity: 1,
          fontWeight: 600,
        },
      },
      '& span': {
        display: 'block',
        width: 'auto',
      },
      '& svg': {
        fontSize: 150,
        [theme.breakpoints.down('sm')]: {
          fontSize: 150,
          width: 145,
        },
        ['@media (max-width:350px)']: { // eslint-disable-line no-useless-computed-key
          fontSize: 140,
          width: 100,
        },
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      ['@media (max-width:390px)']: { // eslint-disable-line no-useless-computed-key
        minWidth: 130,
      },
      ['@media (max-width:350px)']: { // eslint-disable-line no-useless-computed-key
        minWidth: 100,
      },
    },
    // [theme.breakpoints.down('sm')]: {
    //   justifyContent: 'flex-start',
    // },
    // ['@media (max-width:360px)']: { // eslint-disable-line no-useless-computed-key
    //   maxWidth: 110,
    // },
  },
  selectedLayoutIcon: {
    fontSize: '16px !important',
    color: '#b4e0dc',
    marginRight: 4,
  },
  buttonText: {
    fontSize: '0.8rem',
    textAlign: 'center',
    opacity: 0.5,
    textTransform: 'initial',
    display: 'flex !important',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  themeButton: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    minWidth: 'auto',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    '& svg': {
      display: 'none',
    },
  },
  lightThemeButton: {
    backgroundColor: '#fff',
    border: '1px solid #272727',
    '& svg': {
      color: '#272727',
    },
  },
  darkThemeButton: {
    backgroundColor: '#272727',
    border: '1px solid #fff',
    '& svg': {
      color: '#fff',
    },
    '&:hover': {
      backgroundColor: '#272727',
    },
  },
  selectedTheme: {
    '& svg': {
      display: 'inline',
    },
  },
  defaultLinksColorContainer: {
    color: theme.palette.background.reverse,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& .MuiCheckbox-root': {
      color: theme.palette.background.reverse,
    },
  },
  defaultLinksCheckboxText: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
    },
  },
  colorPickerDisabled: {},
  colorPicker: {
    width: '100%',
    '& .sketch-picker': {
      boxShadow: '0 0 0 transparent !important',
      backgroundColor: `${theme.palette.background.reverse} !important`,
      borderRadius: `${theme.spacing(2)}px !important`,
      width: 'auto !important',
      position: 'relative',
      '& > div': {
        '&:first-child': {
          borderRadius: `${theme.spacing(2)}px !important`,
        },
        '&:nth-child(2)': {
          '& > div': {
            '& > div': {
              height: '20px !important',
              '& > div': {
                '& > div': {
                  '& > div': {
                    '& > div': {
                      height: '18px !important',
                    },
                  },
                },
              },
            },
          },
        },
        '&:last-child': {
          display: 'none !important',
        },
      },
      '& .hue-horizontal': {
        borderRadius: `${theme.spacing(2)}px !important`,
      },
      '& input': {
        borderRadius: theme.spacing(0.5),
      },
      '& label': {
        color: `${theme.palette.background.default} !important`,
      },
    },
    '&$colorPickerDisabled': {
      '& .sketch-picker': {
        '&:after': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          background: '#fff',
          opacity: 0.5,
          zIndex: 0,
          borderRadius: `${theme.spacing(2)}px !important`,
        },
      },
    },
  },
  socialIconsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  socialIconItem: {
    width: 50,
    height: 50,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}))

export const privacyStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  settingsButtonsContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    bottom: theme.spacing(1),
  },
  buttonInfo: {
    fontSize: '0.8rem',
    color: theme.palette.background.reverse,
    opacity: 0.5,
    marginTop: theme.spacing(1),
  },
  accountContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  resetPasswordContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderTop: `1px solid ${theme.palette.background.darker}`,
  },
  settingsTitle: {
    textAlign: 'left',
  },
  formButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    '& button': {
      minWidth: 'initial',
      marginRight: theme.spacing(1),
    },
  },
  profilePasswordSwitch: {
    top: theme.spacing(1.5),
    transform: 'initial',
    '& .MuiSwitch-thumb': {
      backgroundColor: '#888888',
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#888888',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#b4e0dc',
      '& + .MuiSwitch-track': {
        backgroundColor: '#b4e0dc',
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#53a9a1',
      },
    },
  },
  privacyContainer: {
    width: '100%',
  },
  KeyFormContainer: {
    width: '100%',
    '& .MuiFormLabel-root': {
      color: theme.palette.background.lighter,
      '&.Mui-disabled': {
        opacity: 0.5,
      },
    },
    '& .MuiFormHelperText-root': {
      color: theme.palette.background.reverse,
      '&.Mui-disabled': {
        opacity: 0.5,
      },
    },
  },
}))

export const accountStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  settingsButtonsContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    bottom: theme.spacing(1),
  },
  buttonInfo: {
    fontSize: '0.8rem',
    color: theme.palette.background.reverse,
    opacity: 0.5,
    marginTop: theme.spacing(1),
  },
  accountContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  resetPasswordContainer: {
    paddingBottom: theme.spacing(4),
    '& button': {
      minWidth: 200,
      width: '100%',
      marginRight: theme.spacing(1),
    },
  },
  settingsTitle: {
    textAlign: 'center',
  },
  settingsTitleError: {
    color: '#f44336',
  },
  formButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    '& button': {
      minWidth: 'initial',
      marginRight: theme.spacing(1),
    },
  },
  buttonLabel: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  loginEmailContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  verifiedIcon: {
    color: '#52a84f',
    fontSize: 22,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  unverifiedIcon: {
    color: '#ffc248',
    fontSize: 22,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}))
