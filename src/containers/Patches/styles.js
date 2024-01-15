import { makeStyles } from '@material-ui/core/styles'

export const patchesStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  changePasswordButton: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.reverse,
      color: theme.palette.background.default,
      opacity: 0.9,
    },
  },
  changePasswordButtonDisabled: {
    backgroundColor: theme.palette.background.reverse,
    color: `${theme.palette.background.lighter} !important`,
    opacity: 0.5,
  },
  themeSwitchContainer: {
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.background.darker}`,
  },
  resetPasswordContainer: {
    paddingTop: theme.spacing(4),
    borderTop: `1px solid ${theme.palette.background.darker}`,
  },
  colorSwitchContainer: {
    paddingTop: theme.spacing(4),
  },
  settingsTitle: {
    textAlign: 'left',
  },
  settingsButtonsContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleThemeButtonGroup: {
    borderRadius: theme.spacing(1),
    '& button': {
      textTransform: 'capitalize',
      '&:first-child': {
        borderRadius: `${theme.spacing(1)}px 0 0 ${theme.spacing(1)}px`,
      },
      '&:last-child': {
        borderRadius: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px 0`,
      },
    },
  },
  colorButton: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(0.5),
  },
  buttonInfo: {
    fontSize: '0.8rem',
    color: theme.palette.background.reverse,
    opacity: 0.5,
    marginTop: theme.spacing(1),
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  productsList: {
    '& .MuiListItemText-secondary': {
      color: '#000',
      opacity: 0.6,
    },
  },
  diabledDownloadButton: {
    opacity: 0.4,
  },
}))
