import { makeStyles } from '@material-ui/core/styles'

export const verifyEmailDialogStyles = makeStyles(theme => ({
  dialogContentContainer: {
    color: '#272727',
    backgroundColor: '#fff',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  dialogContainer: {
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${theme.spacing(4)}px)`,
      margin: theme.spacing(2),
    },
  },
  dialogHeader: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      top: 0,
    },
  },
  dialogClose: {
    position: 'absolute',
    right: theme.spacing(3),
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: 30,
    height: 30,
  },
  titleContainer: {
    color: '#272727',
    backgroundColor: '#fff',
    position: 'relative',
    '& h2': {
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    '& svg': {
      fontSize: 20,
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    textAlign: 'center',
    color: '#212121',
    '& h2': {
      fontSize: '0.9rem',
    },
  },
  dialogContent: {
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: 0,
    padding: 0,
    position: 'relative',
    paddingBottom: 0,
    marginBottom: 0,
    '& textarea': {
      '&.MuiInputBase-input': {
        color: '#272727',
      },
    },
    '& .MuiListItemText-multiline': {
      margin: 0,
      textTransform: 'capitalize',
    },
    '& .MuiFormControl-root': {
      '& .MuiFormLabel-root': {
        color: '#272727',
        opacity: 0.5,
      },
      '& .MuiInput-root': {
        '& input': {
          color: '#272727',
          '&.Mui-disabled': {
            color: '#ffffff50',
          },
        },
        '&.MuiInput-underline': {
          '&:after': {
            borderBottomColor: '#272727',
          },
          '&:before': {
            borderBottomColor: '#272727',
          },
          '&:hover': {
            '&:not(.Mui-disabled)': {
              '&:before': {
                borderBottomColor: '#272727',
              },
            },
          },
        },
      },
      '& .MuiFormHelperText-root': {
        '&.Mui-error': {
          backgroundColor: '#272727',
          padding: theme.spacing(0.5),
          borderRadius: theme.spacing(0.5),
          fontWeight: 'bold',
        },
      },
    },
    '& .MuiTypography-colorTextSecondary': {
      opacity: 0.5,
    },
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
  linkFormContainer: {
    width: '100%',
  },
  dialogButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& button': {
      minWidth: 200,
    },
  },
}))

export const themeStyles = makeStyles(theme => ({
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
  },
  settingsTitle: {
    textAlign: 'left',
  },
  toggleThemeButtonGroup: {
    borderRadius: theme.spacing(1),
    '& button': {
      textTransform: 'capitalize',
      '&:first-child': {
        borderRadius: `${theme.spacing(1)}px 0 0 ${theme.spacing(1)}px`,
      },
      '&:last-child': {
        borderRadius: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px 0`,
      },
    },
  },
  colorButton: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(0.5),
  },
  colorPickerContainer: {
    position: 'relative',
    maxWidth: '208px',
    borderRadius: theme.spacing(0.5),
    border: '2px solid #888',
    marginLeft: '4px',
    '& .MuiInput-underline': {
      '& input': {
        color: theme.palette.background.reverse,
        cursor: 'pointer',
        paddingLeft: theme.spacing(1),
      },
      '&:after': {
        display: 'none',
      },
      '&:before': {
        display: 'none',
      },
    },
  },
  pickerIcon: {
    position: 'absolute',
    right: '8px',
    left: 'auto',
    top: '2px',
  },
}))

export const accountStyles = makeStyles(theme => ({
  accountContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  resetPasswordContainer: {
    paddingBottom: theme.spacing(4),
    '& button': {
      minWidth: 200,
      marginRight: theme.spacing(1),
    },
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
}))

export const privacyStyles = makeStyles(theme => ({
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
      color: theme.palette.background.reverse,
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
