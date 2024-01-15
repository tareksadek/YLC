import { makeStyles } from '@material-ui/core/styles'

export const shareStyles = makeStyles(theme => ({
  shareButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginBottom: theme.spacing(2),
    '& button': {
      display: 'flex',
      flex: '46%',
      textAlign: 'left',
      backgroundColor: '#eee !important',
      marginRight: '2%',
      borderRadius: theme.spacing(1),
      alignItems: 'center',
      padding: '8px !important',
      marginBottom: '2%',
      [theme.breakpoints.down('xs')]: {
        flex: '100%',
        marginRight: 0,
      },
    },
  },
  shareButtonText: {
    marginLeft: theme.spacing(1),
    color: '#212121',
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
}))
