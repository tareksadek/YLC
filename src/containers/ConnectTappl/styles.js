import { makeStyles } from '@material-ui/core/styles'

export const connectTapplStyles = makeStyles(theme => ({
  profileUrlSection: {
    display: 'block',
  },
  profileLink: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
    '& a': {
      maxWidth: 150,
      backgroundColor: 'transparent',
      minWidth: 'auto',
      padding: 0,
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        maxWidth: 120,
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& img': {
        width: '100%',
      },
    },
  },
  profileLinkText: {
    fontSize: '0.8rem',
  },
  copyUrlContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loginSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  copyUrlButton: {
    width: 180,
    minWidth: 180,
    cursor: 'pointer',
  },
  stepsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  connectStep: {
    position: 'relative',
    border: `2px solid ${theme.palette.background.reverse}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(5),
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
  },
  connectStepTitle: {
    fontWeight: 'bold',
  },
  connectStepDescription: {
    opacity: 0.75,
    fontSize: '0.9rem',
  },
  stepNumber: {
    position: 'absolute',
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-20px',
    right: 'auto',
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: 40,
    height: 40,
    borderRadius: '50%',
  },
}))
