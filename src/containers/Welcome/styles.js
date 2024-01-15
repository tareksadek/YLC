import { makeStyles } from '@material-ui/core/styles'

export const welcomeStyles = makeStyles(theme => ({
  carouselContainer: {
    '& .slide___3-Nqo': {
      paddingBottom: '0 !important',
      height: '560px',
    },
    '& .carousel__dot-group': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
      '& .dot___3c3SI': {
        border: 'none',
        height: 5,
        borderRadius: 4,
        margin: 1,
        width: 12,
        backgroundColor: '#dddddd',
        '&:disabled': {
          backgroundColor: '#7e3cc0',
          width: 24,
        },
      },
    },
  },
  carouselButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselButtonsContainerMobile: {
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      flexDirection: 'column-reverse',
    },
  },
  carouselButton: {
    backgroundColor: '#7e3cc0',
    border: 'none',
    minWidth: 100,
    margin: theme.spacing(0.5),
    '&:disabled': {
      cursor: 'default',
      opacity: 0.6,
    },
  },
}))
