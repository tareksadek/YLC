import { makeStyles } from '@material-ui/core/styles'

export const invitationCodeStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  root: {
    color: theme.palette.background.default,
  },
  invitationCodeTitle: {
    fontSize: '1.5rem',
    color: theme.palette.background.highlight,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.default,
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  addCodeButton: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.reverse,
      color: theme.palette.background.default,
      opacity: 0.9,
    },
  },
  addCodeButtonDisabled: {
    backgroundColor: theme.palette.background.reverse,
    color: `${theme.palette.background.lighter} !important`,
    opacity: 0.5,
  },
  codeError: {
    color: theme.palette.background.error,
    width: '100%',
    textAlign: 'left',
  },
  codeMessage: {
    color: theme.palette.background.reverse,
    marginBottom: theme.spacing(2),
  },
  codeMessageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
