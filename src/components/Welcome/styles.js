import { makeStyles } from '@material-ui/core/styles'

export const stepStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    position: 'relative',
  },
  header: {
    backgroundColor: '#eee',
    borderRadius: '0 0 24px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(/assets/images/onboarding/bg.png)',
    backgroundPosition: ' top right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  image: {
    display: 'block',
    width: '100%',
    maxWidth: '300px',
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  description: {
    opacity: 0.8,
  },
}))
