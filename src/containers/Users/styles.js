import { makeStyles } from '@material-ui/core/styles'

export const usersStyles = makeStyles(theme => ({
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
  tabsHeader: {
    position: 'relative',
    '& .MuiTabs-root': {
      overflow: 'visible',
      '& .MuiTabs-fixed': {
        overflow: 'visible !important',
      },
    },
  },
  searchTab: {
    textTransform: 'none',
    top: 1,
    '&.Mui-selected': {
      border: `1px solid ${theme.palette.background.reverse}`,
      backgroundColor: theme.palette.background.default,
      borderBottom: 'none',
      fontWeight: 700,
      borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
    },
  },
  seachPanel: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.background.reverse}`,
    borderRadius: `0 0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
  qrCodeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
    ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
      padding: theme.spacing(1),
    },
  },
}))

export const gridStyles = makeStyles(theme => ({
  gridContainer: {
    color: theme.palette.background.reverse,
    '& .MuiSvgIcon-root': {
      color: theme.palette.background.reverse,
    },
  },
  gridPanel: {
    color: theme.palette.background.reverse,
    '& .MuiFormLabel-root': {
      color: theme.palette.background.reverse,
    },
    '& .MuiInput-root': {
      color: theme.palette.background.reverse,
    },
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
}))
