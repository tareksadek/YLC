import { makeStyles } from '@material-ui/core/styles'

export const shareStyles = makeStyles(theme => ({
  shareButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    '& button': {
      display: 'flex',
      flex: '46%',
      textAlign: 'left',
      marginRight: '2%',
      alignItems: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(1)}px !important`,
      borderBottom: `1px solid ${theme.palette.background.dark} !important`,
      '&:last-child': {
        borderBottom: 'none !important',
        paddingBottom: `${theme.spacing(1)}px !important`,
      },
      [theme.breakpoints.down('xs')]: {
        flex: '100%',
        marginRight: 0,
      },
    },
  },
  shareButtonText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.background.reverse,
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
  shareFormContainer: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.background.reverse,
    border: `1px solid ${theme.palette.background.dark}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
}))
