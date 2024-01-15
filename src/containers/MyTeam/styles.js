import { makeStyles } from '@material-ui/core/styles'

export const connectionsStyles = makeStyles(theme => ({
  connectionsActionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderRadius: theme.spacing(2),
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
