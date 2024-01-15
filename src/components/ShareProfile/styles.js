import { makeStyles } from '@material-ui/core/styles'

export const profileLinkStyles = makeStyles(theme => ({
  profileLink: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.background.reverse,
    border: `1px solid ${theme.palette.background.dark}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileLinkText: {
    fontSize: '0.8rem',
    overflowWrap: 'anywhere',
  },
  copyUrlContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyUrlButton: {
    width: 220,
    cursor: 'pointer',
  },
  profileLinkButtonText: {
    color: theme.palette.background.default,
  },
}))
