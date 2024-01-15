import { makeStyles } from '@material-ui/core/styles'

export const offersStyles = makeStyles(theme => ({
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
}))
