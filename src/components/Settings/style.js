import { makeStyles } from '@material-ui/core/styles'

export const verifyEmailDialogStyles = makeStyles(theme => ({
  dialogContentContainer: {
    color: '#272727',
    backgroundColor: '#fff',
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
      justifyContent: 'flex-start',
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
