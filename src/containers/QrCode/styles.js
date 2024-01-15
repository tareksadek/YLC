import { makeStyles } from '@material-ui/core/styles'

export const qrStyles = makeStyles(theme => ({
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
  qrCodeButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& button': {
      minWidth: 150,
      margin: theme.spacing(0.5),
      ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
        minWidth: '100%',
      },
    },
  },
}))
