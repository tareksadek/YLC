import { makeStyles } from '@material-ui/core/styles'

export const profileLinkStyles = makeStyles(theme => ({
  profileLinkContainer: {
    paddingBottom: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  profileLink: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.reverse,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileLinkText: {
    fontSize: '2em',
    fontWeight: 700,
    overflowWrap: 'anywhere',
  },
  copyUrlContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyUrlButton: {
    width: 250,
    cursor: 'pointer',
  },
  profileLinkButtonText: {
    color: theme.palette.background.default,
  },
}))
