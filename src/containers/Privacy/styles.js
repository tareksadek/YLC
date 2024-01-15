import { makeStyles } from '@material-ui/core/styles'

export const privacyStyles = makeStyles(theme => ({
  container: {
    color: theme.palette.background.reverse,
    '& ul': {
      '& li': {
        color: theme.palette.background.lighter,
        alignItems: 'flex-start',
        padding: 0,
        '& .MuiListItemText-root': {
          margin: 0,
        },
        '& .MuiTypography-body1': {
          fontSize: '0.9rem',
        },
        '& .MuiListItemIcon-root': {
          minWidth: 20,
        },
        '& svg': {
          color: theme.palette.background.lighter,
          fontSize: 16,
          marginTop: 6,
        },
      },
    },
    '& a': {
      color: '#4cbfec',
    },
    '& table': {
      color: '#272727',
      '& th': {
        color: '#272727',
      },
      '& td': {
        color: '#272727',
      },
    },
    '& .MuiDivider-root': {
      backgroundColor: theme.palette.background.lighter,
      margin: '1rem',
    },
  },
  textSeparator: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key
      textAlign: 'left',
    },
  },
}))
