import { makeStyles } from '@material-ui/core/styles'

export const connectionsStyles = makeStyles(theme => ({
  connectionsActionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderRadius: theme.spacing(2),
  },
  addNewConnectionContainer: {
    marginLeft: 0,
    marginRight: 'auto',
    width: '100%',
  },
  editButtonContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    bottom: theme.spacing(1),
    zIndex: 2,
  },
  downloadCSV: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(0),
    width: 100,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: '1rem',
    },
  },
  downloadMenu: {
    backgroundColor: theme.palette.background.reverse,
    '& a': {
      color: `${theme.palette.background.default} !important`,
      textAlign: 'left',
      paddingLeft: '0 !important',
      margin: '0 !important',
      fontWeight: 'normal !important',
    },
    '& button': {
      color: `${theme.palette.background.default} !important`,
      textAlign: 'left',
      paddingLeft: '0 !important',
      margin: '0 !important',
      fontWeight: 'normal !important',
    },
  },
}))

export const formsStyles = makeStyles(theme => ({
  connectionsActionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderRadius: theme.spacing(2),
  },
  addNewConnectionContainer: {
    marginLeft: 0,
    marginRight: 'auto',
    width: '100%',
  },
  offersCount: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(1),
    left: 'auto',
    bottom: 'auto',
    fontWeight: 700,
    '& span': {
      fontSize: '0.7rem',
      fontWeight: 400,
    },
  },
  buttonNotification: {
    fontSize: '0.7rem',
    color: theme.palette.background.reverse,
    opacity: 0.5,
    textAlign: 'center',
    display: 'block',
    marginTop: theme.spacing(0.5),
  },
  editButtonContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    bottom: theme.spacing(1),
    zIndex: 2,
  },
}))
