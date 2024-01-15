import { makeStyles } from '@material-ui/core/styles'

export const messageStyles = makeStyles(theme => ({
  container: {
    maxWidth: '500px',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.background.reverse}`,
    textAlign: 'center',
    margin: '0 auto',
  },
}))

export const invitationBlockStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  root: {
    color: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.reverse,
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
  errorTitle: {
    fontSize: '1.5rem',
    color: theme.palette.background.error,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  editCardButton: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.reverse,
      color: theme.palette.background.default,
      opacity: 0.9,
    },
  },
  editCardButtonDisabled: {
    backgroundColor: theme.palette.background.reverse,
    color: `${theme.palette.background.lighter} !important`,
    opacity: 0.5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  invitationBlockText: {
    '& span': {
      display: 'block',
      opacity: 0.8,
      fontSize: '0.8rem',
    },
  },
}))
