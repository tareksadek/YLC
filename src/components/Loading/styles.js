import { makeStyles } from '@material-ui/core/styles'

export const backdropStyles = makeStyles(theme => ({
  boxedBackdrop: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.reverse,
    position: 'fixed',
    top: 0,
    bottom: 'auto',
    '&$boxedBackdrop': {
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  loadingBox: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    width: 300,
    height: 85,
    padding: theme.spacing(2),
    backgroundColor: '#f2f2f2',
    borderRadius: theme.spacing(1),
    boxShadow: '0 0 5px #222',
    '& $progressContainer': {
      marginTop: theme.spacing(2),
      '& .MuiLinearProgress-root': {
        height: 5,
        borderRadius: theme.spacing(2),
        backgroundColor: '#272727',
      },
    },
    '& $progressMessage': {
      position: 'initial',
      padding: 0,
      textAlign: 'center',
      color: '#272727',
      fontSize: '0.8rem',
    },
    '& $progressPercentageContainer': {
      display: 'none',
    },
  },
  insetBackdrop: {
    position: 'absolute',
  },
  progressContainer: {
    '& .MuiLinearProgress-root': {
      height: 55,
      backgroundColor: '#272727',
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#00c1af',
    },
    '& .MuiLinearProgress-bar1Buffer': {
      backgroundColor: '#272727',
    },
  },
  progressMessage: {
    position: 'absolute',
    left: 0,
    bottom: 15,
    zIndex: 2,
    fontSize: 14,
    paddingLeft: theme.spacing(2),
  },
  progressPercentageContainer: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: 15,
  },
  progressPercentage: {
    color: '#fff',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
