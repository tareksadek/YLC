import { makeStyles } from '@material-ui/core/styles'

export const profileStyles = makeStyles(theme => ({
  profileImportSwitchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    marginBottom: theme.spacing(1),
    '& p': {
      fontSize: '0.8rem',
      minWidth: 100,
    },
  },
  switchTitle: {
    fontWeight: 600,
    color: theme.palette.background.reverse,
  },
  switchDescription: {
    fontSize: '0.8rem',
    color: theme.palette.background.reverse,
    opacity: 0.7,
  },
  activeProfileBox: {},
  addProfileButtonContainer: {},
  profileButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1),
      border: `1px solid ${theme.palette.background.lighter}`,
      borderRadius: theme.spacing(1),
      minHeight: 100,
      marginBottom: theme.spacing(1),
      '& .MuiButton-label': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          color: theme.palette.background.lighter,
        },
        '& span': {
          textTransform: 'capitalize',
          color: theme.palette.background.lighter,
          fontSize: '0.8rem',
        },
      },
    },
    '& p': {
      color: theme.palette.background.reverse,
      fontWeight: 600,
      fontSize: '0.9rem',
      textTransform: 'capitalize',
    },
    '& $activeProfileBox': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1),
      border: `1px solid ${theme.palette.background.reverse}`,
      borderRadius: theme.spacing(1),
      minHeight: 100,
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.background.reverse,
      '& svg': {
        fontSize: '3rem',
        color: '#00c1af',
      },
    },
    '&$addProfileButtonContainer': {
      '& button': {
        border: `1px dashed ${theme.palette.background.lighter}`,
      },
    },
  },
}))
