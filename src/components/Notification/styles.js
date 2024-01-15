import { makeStyles } from '@material-ui/core/styles'

export const notificationStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
  notificationSnakbarContainer: {
    width: 'auto',
    borderRadius: 0,
    top: theme.spacing(1),
    right: theme.spacing(1),
    left: 'auto',
    alignItems: 'flex-start',
    zIndex: 999999,
  },
  notificationContainer: {
    width: 'auto',
    borderRadius: theme.spacing(1),
    boxShadow: '0 0 0 transparent',
    minHeight: 'initial',
    alignItems: 'center',
  },
}))
