import { makeStyles } from '@material-ui/core/styles'

export const authStyles = makeStyles(theme => ({
  loadingOverlay: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  landingHeader: {
    backgroundColor: theme.palette.background.light,
    '& > .MuiBox-root': {
      marginTop: 0,
      backgroundColor: `${theme.palette.background.light} !important`,
    },
  },
  landingNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    '& button': {
      paddingRight: 0,
      '& span': {
        justifyContent: 'flex-end',
      },
      '& svg': {
        color: theme.palette.background.reverse,
        fontSize: 22,
      },
    },
  },
  logo: {
    color: theme.palette.background.reverse,
    fill: theme.palette.background.reverse,
    fontSize: 25,
  },
  landingTextContainer: {
    paddingTop: theme.spacing(2),
  },
  landingTextOne: {
    color: theme.palette.background.lighter,
    fontSize: '3rem',
    textTransform: 'uppercase',
    fontWeight: 300,
    textAlign: 'center',
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
    '& span': {
      color: theme.palette.background.reverse,
      fontSize: '3.2rem',
      fontWeight: 800,
    },
  },
  landingTextTwo: {
    color: theme.palette.background.lighter,
    display: 'block',
    textAlign: 'center',
    fontSize: '2.6rem',
    fontWeight: 700,
    lineHeight: '2.5rem',
    textTransform: 'uppercase',
    letterSpacing: 2,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      letterSpacing: 0,
    },
  },
  landingTextThree: {
    color: theme.palette.background.lighter,
    fontSize: '3rem',
    display: 'block',
    textAlign: 'center',
    lineHeight: '1rem',
    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: 4,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      letterSpacing: 0,
    },
    '& span': {
      color: theme.palette.background.reverse,
      fontSize: '3.2rem',
      fontWeight: 800,
    },
  },
  landingTextFour: {
    color: theme.palette.background.reverse,
    fontSize: '1rem',
    marginTop: theme.spacing(5),
    display: 'block',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  landingTextContainerSlim: {
    paddingTop: theme.spacing(2),
    '& p': {
      fontWeight: 300,
      fontSize: '2.75rem',
      lineHeight: 'initial',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'left',
      },
    },
  },
  descriptionText: {
    marginTop: theme.spacing(4),
    '& p': {
      fontSize: '0.8rem',
      fontWeight: 400,
    },
  },
}))

export const changePasswordStyles = makeStyles(theme => ({
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
  resetPasswordContainer: {
    maxWidth: 400,
    margin: '0 auto',
  },
  errorText: {
    color: '#d00000',
    marginBottom: theme.spacing(2),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  root: {
    color: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.reverse,
  },
}))

export const emailAuthStyles = makeStyles(theme => ({
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
  resetPasswordContainer: {
    maxWidth: 400,
    margin: '0 auto',
  },
  errorText: {
    color: '#d00000',
    marginBottom: theme.spacing(2),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  root: {
    color: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.reverse,
  },
}))

export const mirrorStyles = makeStyles(theme => ({
  shareButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginBottom: theme.spacing(2),
    '& button': {
      display: 'flex',
      flex: '46%',
      textAlign: 'left',
      backgroundColor: '#eee !important',
      marginRight: '2%',
      borderRadius: theme.spacing(1),
      alignItems: 'center',
      padding: '8px !important',
      marginBottom: '2%',
      [theme.breakpoints.down('xs')]: {
        flex: '100%',
        marginRight: 0,
      },
    },
  },
  shareButtonText: {
    marginLeft: theme.spacing(1),
    color: '#212121',
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
  mirrorToProfileContent: {
    width: '100%',
    height: '100%',
    position: 'relative',
    '& .MuiListItem-container': {
      backgroundColor: '#eee',
      borderRadius: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  connectionSkeletonContainer: {
    width: '100%',
    background: '#eee',
    borderRadius: theme.spacing(1),
  },
  mirrorToProfile: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#eee',
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  connectionItemAvatar: {
    backgroundColor: '#ccc',
    border: '1px solid #bbb',
    [theme.breakpoints.down('xs')]: {
      width: 60,
      height: 60,
      marginTop: theme.spacing(1),
    },
  },
  connectionItemTextContainer: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  connectionDetails: {
    fontWeight: 'normal',
    fontSize: '0.8rem',
    color: '#272727',
    '& .MuiTypography-body1': {
      fontWeight: 'normal',
      fontSize: '0.8rem',
      textTransform: 'initial',
      lineHeight: '1.3rem',
      opacity: 0.6,
    },
  },
  connectionItemActionContainer: {
    [theme.breakpoints.down('xs')]: {
      position: 'initial',
      transform: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: theme.spacing(2),
    },
  },
  settingsButtonsContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInfo: {
    fontSize: '0.8rem',
    color: theme.palette.background.reverse,
    opacity: 0.5,
    marginTop: theme.spacing(1),
  },
  connectionItemAction: {
    color: '#fff',
    marginRight: theme.spacing(1),
    '&:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 75,
      borderRadius: theme.spacing(1),
    },
  },
  connectionItemNote: {
    backgroundColor: '#37c396',
    '&:hover': {
      backgroundColor: '#37c396',
      opacity: 0.8,
    },
  },
  connectionItemAdd: {
    backgroundColor: '#347bd2',
    '&:hover': {
      backgroundColor: '#347bd2',
      opacity: 0.8,
    },
  },
  connectionItemremove: {
    backgroundColor: '#d00000',
    '&:hover': {
      backgroundColor: '#d00000',
      opacity: 0.8,
    },
  },
  connectionName: {
    position: 'initial',
    color: '#272727',
    '& span': {
      fontSize: '0.8rem',
      opacity: 0.5,
      backgroundColor: '#fff',
      color: '#272727',
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        display: 'block',
        top: theme.spacing(2),
        right: theme.spacing(2),
        backgroundColor: 'transparent',
        padding: 0,
      },
    },
  },
  mirrorToProfileWrapper: {
    marginTop: 0,
  },
  startConnectionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& > span': {
      textAlign: 'center',
      fontFamily: theme.fonts.titles,
      fontWeight: 600,
      fontSize: '1rem',
      color: theme.palette.background.reverse,
      marginBottom: theme.spacing(3),
    },
  },
  mirrorProfileFormContainer: {
    maxWidth: 310,
    margin: '0 auto',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.palette.background.reverse,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
  },
  mirrorToProfileContainer: {
    maxWidth: 310,
    margin: '0 auto',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.palette.background.reverse,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
  },
  switchToLoginContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    '& button': {
      color: '#009fff',
      textTransform: 'none',
    },
  },
}))
