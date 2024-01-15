import { makeStyles } from '@material-ui/core/styles'

export const qrStyles = makeStyles(theme => ({
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
  qrCodeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
    ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
      padding: theme.spacing(1),
    },
  },
  qrCodeButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& button': {
      minWidth: 150,
      margin: theme.spacing(0.5),
      ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
        minWidth: '100%',
      },
    },
  },
}))
