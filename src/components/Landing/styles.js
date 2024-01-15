import { makeStyles, darken } from '@material-ui/core/styles'

export const heroStyles = makeStyles(theme => ({
  heroOne: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.reverse,
  },
  heroOneTitle: {
    marginBottom: theme.spacing(1),
  },
  heroParagraph: {
    fontFamily: theme.fonts.cardTitle.en.family,
    fontSize: 85,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    background: `linear-gradient(to right bottom, ${theme.palette.background.gradient.light}, ${theme.palette.background.gradient.dark})`,
    '-webkit-background-clip': 'text',
    textFillColor: 'transparent',
    color: 'transparent',
    filter: `drop-shadow(1px 1px 1px ${theme.palette.shadow})`,
  },
  heroOneButton: {
    backgroundColor: theme.palette.background.highlight,
    color: '#f3f0ea',
    minWidth: '300px',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    '&:hover': {
      backgroundColor: darken(theme.palette.background.highlight, 0.15),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: 'auto',
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
