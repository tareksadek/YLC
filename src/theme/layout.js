import { makeStyles } from '@material-ui/core/styles'

export const layoutStyles = makeStyles(theme => ({
  pageContainer: {
    width: '100%',
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.background.light,
    paddingBottom: theme.spacing(13),
    position: 'relative',
  },
  pageContainerWithLogo: {
    paddingBottom: theme.spacing(13),
  },
  contentContainer: {
    minHeight: 'calc(100vh - 200px)',
    paddingBottom: '80px',
    maxWidth: '800px',
    margin: '0 auto',
    // paddingTop: theme.spacing(6),
    backgroundColor: theme.palette.background.light,
    paddingTop: 110,
    ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: 110,
      position: 'relative',
      top: -25,
      borderRadius: `${theme.spacing(3)}px ${theme.spacing(3)}px 0 0`,
      zIndex: 1,
    },
  },
  socialContentContainer: {
    paddingTop: 60,
    paddingBottom: 0,
    minHeight: 'auto',
    top: 0,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 45,
    },
  },
  squareContentContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
    minHeight: 'auto',
    top: 0,
    position: 'relative',
    // maxWidth: 550,
    [theme.breakpoints.down('xs')]: {
      // paddingTop: 0,
    },
  },
  basicContentContainer: {
    paddingTop: 105,
    paddingBottom: 0,
    minHeight: 'auto',
    position: 'initial',
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: 85,
    },
    ['@media (max-width:400px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: 85,
    },
    ['@media (max-width:375px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: 85,
    },
    ['@media (max-width:360px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: 60,
    },
  },
  businessContentContainer: {
    position: 'initial',
    top: 0,
    paddingTop: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      paddingTop: 20,
    },
  },
  appContainer: {
    minHeight: 'calc(100vh - 240px)',
    paddingBottom: 0,
    padding: 0,
    backgroundImage: 'url(/logo.png)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  fullWidthAppContainer: {
    minHeight: 'calc(100vh - 240px)',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: '70px',
    backgroundColor: theme.palette.background.light,
    backgroundImage: 'url(/logo.png)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  formContainer: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
    },
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  authContainer: {
    '& .firebaseui-text': {
      textAlign: 'center',
      color: '#d04343',
    },
    '& .firebaseui-idp-list': {
      margin: 0,
    },
    '& .firebaseui-list-item': {
      '&:last-child': {
        marginBottom: 0,
      },
    },
    '& .firebaseui-container': {
      boxShadow: '0 0 0 transparent',
      width: '100%',
      maxWidth: 'initial',
      background: 'transparent',
      '& input': {
        color: theme.palette.background.reverse,
        borderBottom: `1px solid ${theme.palette.background.darker} !important`,
      },
      '& label': {
        color: theme.palette.background.reverse,
        opacity: 0.6,
      },
    },
    '& .firebaseui-card-content': {
      padding: 0,
      marginTop: theme.spacing(2),
    },
    '& .firebaseui-card-actions': {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(1),
    },
    '& .firebaseui-card-header': {
      display: 'none',
    },
    '& .firebaseui-form-actions': {
      '& .mdl-button--raised.mdl-button--colored': {
        backgroundColor: '#272727',
        borderRadius: theme.spacing(4),
        boxShadow: '0 0 0 transparent',
      },
      '& .mdl-button--primary.mdl-button--primary': {
        color: theme.palette.background.reverse,
      },
    },
    '& .firebaseui-idp-button': {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      maxWidth: 250,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.spacing(6),
      margin: '0 auto',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        maxWidth: 'initial',
      },
      '&.firebaseui-idp-password': {
        backgroundColor: '#272727 !important',
        boxShadow: '0 0 0 transparent',
        fontFamily: 'Roboto',
        fontWeight: 400,
      },
      '& .firebaseui-idp-text': {
        fontSize: '0.9rem',
      },
      '&.firebaseui-idp-google': {
        marginTop: theme.spacing(3),
        position: 'relative',
        overflow: 'initial',
        boxShadow: '0 0 0 transparent',
        border: '1px solid #EBEBEB',
        fontFamily: 'Roboto',
        fontWeight: 400,
        // '&:before': {
        //   content: "'- OR -'",
        //   fontFamily: theme.fonts.titles,
        //   position: 'absolute',
        //   top: `-${theme.spacing(5)}px`,
        //   right: 0,
        //   left: 0,
        //   width: '100%',
        //   textAlign: 'center',
        //   fontWeight: 600,
        //   fontSize: '1rem',
        //   color: theme.palette.background.reverse,
        // },
        // '&:after': {
        //   content: "'No confirmation required.'",
        //   fontFamily: theme.fonts.titles,
        //   position: 'absolute',
        //   top: 'auto',
        //   right: 0,
        //   left: 0,
        //   bottom: `-${theme.spacing(3)}px`,
        //   width: '100%',
        //   textAlign: 'center',
        //   fontWeight: 400,
        //   fontSize: '0.8rem',
        //   color: '#999999',
        //   textTransform: 'initial',
        // },
      },
    },
  },
  authContainerSignup: {
    '& .firebaseui-list-item': {
      '&:last-child': {
        marginBottom: theme.spacing(4),
      },
    },
    '& .firebaseui-idp-button': {
      '&.firebaseui-idp-google': {
        marginTop: theme.spacing(3),
        '&:before': {
          display: 'none',
        },
        '&:after': {
          content: "'No confirmation required.'",
          fontFamily: theme.fonts.titles,
          position: 'absolute',
          top: 'auto',
          right: 0,
          left: 0,
          bottom: `-${theme.spacing(3)}px`,
          width: '100%',
          textAlign: 'center',
          fontWeight: 400,
          fontSize: '0.8rem',
          color: '#999999',
          textTransform: 'initial',
        },
      },
    },
  },
  bubbleContainer: {
    padding: `${theme.spacing(3)}px !important`,
    borderRadius: theme.spacing(2),
    backgroundColor: '#e9e9e9',
    '& h3': {
      color: '#272727',
    },
    '& button': {
      color: '#272727',
      '&.Mui-disabled': {
        color: '#aaa',
      },
    },
    '& input': {
      color: '#272727 !important',
    },
  },
  snackbarContainer: {
    fontSize: '0.8rem',
  },
  landingLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing(3),
  },
  logo: {
    fontSize: 120,
    maxHeight: 40,
  },
  appSlogan: {
    fontSize: '14px !important',
    opacity: 0.75,
    marginTop: `${theme.spacing(1)}px !important`,
  },
  addToHomeScreenButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  openAddToHomeScreenDialogButton: {
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    border: `1px dashed ${theme.palette.background.reverse}`,
    fontSize: '0.8rem',
    color: theme.palette.background.reverse,
    minWidth: 220,
    maxWidth: 300,
    '& > span': {
      flexDirection: 'column',
      '& > span': {
        display: 'block',
        textTransform: 'initial',
        fontWeight: 600,
        '&:first-child': {
          textTransform: 'uppercase',
          fontWeight: 300,
        },
        '&:last-child': {
          fontWeight: 300,
        },
      },
    },
  },
  panel: {
    // boxShadow: '0 0 10px rgb(0 0 0 / 15%)',
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(3),
    position: 'relative',
    border: `1px solid ${theme.palette.background.border}`,
    '& .MuiAlert-standardError': {
      boxShadow: '0 0 0 transparent',
    },
    '& .MuiAlert-standardInfo': {
      boxShadow: '0 0 0 transparent',
      marginBottom: 0,
    },
  },
  panelText: {
    color: theme.palette.background.lighter,
    fontSize: '0.8rem',
    lineHeight: '1.2rem',
    textAlign: 'center',
    ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key
      textAlign: 'left',
    },
  },
  panelButtonsContainerLg: {},
  panelButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& $panelButton': {
      maxWidth: 120,
      margin: 0,
      fontSize: '0.8rem',
      color: theme.palette.background.reverse,
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.background.reverse}`,
      [theme.breakpoints.down('xs')]: {
        maxWidth: 'none',
        width: '100%',
        marginTop: theme.spacing(1),
      },
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      flexDirection: 'column',
    },
    '&$panelButtonsContainerLg': {
      maxWidth: 550,
      marginLeft: 'auto',
      marginRight: 'auto',
      gap: theme.spacing(1),
      '& button': {
        maxWidth: 200,
        width: '100%',
        [theme.breakpoints.down('xs')]: {
          maxWidth: 'none',
          width: '100%',
        },
      },
    },
  },
  skeleton: {
    backgroundColor: theme.palette.background.skeleton,
  },
  stickyPanelButton: {
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    zIndex: 2,
  },
  panelButton: {
    fontSize: '0.8rem !important',
    fontWeight: 600,
    maxWidth: 'initial',
    color: `${theme.palette.background.reverse} !important`,
    backgroundColor: 'transparent !important',
    border: `1px solid ${theme.palette.background.reverse}`,
    margin: '0 auto',
    width: 'auto !important',
    paddingTop: `${theme.spacing(1)}px !important`,
    paddingBottom: `${theme.spacing(1)}px !important`,
    paddingLeft: `${theme.spacing(4)}px !important`,
    paddingRight: `${theme.spacing(4)}px !important`,
    lineHeight: '1rem',
    '&:disabled': {
      backgroundColor: 'transparent',
      opacity: 0.25,
    },
  },
  panelIconButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(2),
  },
  tabsHeader: {
    background: 'none',
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.background.reverse,
    },
  },
  tabButton: {
    textTransform: 'capitalize',
    fontWeight: 600,
    opacity: 0.4,
    color: theme.palette.background.reverse,
    '&.Mui-selected': {
      color: theme.palette.background.reverse,
      opacity: 1,
    },
  },
  iconTabsContainer: {
    '& .MuiTabs-centered': {
      zIndex: 2,
      position: 'relative',
    },
  },
  iconTabPanelContainer: {
    paddingTop: theme.spacing(1),
  },
  tabButtonIcon: {
    minWidth: '44px !important',
    minHeight: '44px !important',
    backgroundColor: '#ddd',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    borderRadius: theme.spacing(1),
    '&.Mui-selected': {
      background: 'transparent',
      '& svg': {
        color: '#fff',
      },
    },
  },
  iconTabsIndicator: {
    zIndex: '0 !important',
    height: '44px !important',
    bottom: `${theme.spacing(0.5)}px !important`,
    borderRadius: `${theme.spacing(1)}px !important`,
  },
  tabPanelContainer: {
    paddingTop: theme.spacing(2),
  },
  menu: {
    backgroundColor: theme.palette.background.reverse,
    borderRadius: theme.spacing(1),
    '& .MuiMenu-list': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& .MuiMenuItem-root': {
      padding: theme.spacing(1.5),
      borderBottom: `1px solid ${theme.palette.background.reverseLight}`,
    },
  },
  sortContainer: {
    marginBottom: theme.spacing(2),
    '& .MuiButtonGroup-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
  },
  sortButton: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.background.reverse,
    border: 'none',
    marginRight: theme.spacing(1),
    marginLeft: 0,
    marginBottom: theme.spacing(1),
    borderRadius: '40px !important',
    fontSize: '0.8rem',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '& .MuiButton-label': {
      textTransform: 'none',
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  selectedSortButton: {
    cursor: 'default',
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.reverse,
    },
  },
  stepbuttonsContainerFull: {},
  stepbuttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.reverse,
    padding: theme.spacing(2),
    borderRadius: `${theme.spacing(3)}px ${theme.spacing(3)}px 0 0`,
    position: 'fixed',
    bottom: 0,
    left: 0,
    flexWrap: 'wrap',
    zIndex: 2,
    '&$stepbuttonsContainerFull': {
      backgroundColor: '#00c1af',
      padding: 0,
      '& button': {
        color: '#fff',
        width: '100%',
        background: 'transparent',
        padding: theme.spacing(3),
      },
    },
    '& button': {
      width: 120,
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      fontSize: '0.9rem',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.background.reverse,
      '&:hover': {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.background.reverse,
      },
    },
  },
  addToHomeScreenHeaderTitle: {
    fontSize: '1.3rem',
    fontWeight: 800,
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: '2.5rem',
    '& span': {
      display: 'block',
      fontWeight: 600,
      fontSize: '0.9rem',
      lineHeight: '1.3rem',
      marginBottom: theme.spacing(1),
    },
  },
  addToHomeScreenHeaderSubtitle: {
    textAlign: 'center',
    opacity: 0.65,
    fontSize: '0.8rem',
    marginBottom: theme.spacing(1),
  },
  stickyButtonContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    bottom: theme.spacing(1),
    zIndex: 2,
  },
  chipInputContainer: {
    width: '100%',
    '& .MuiFormControl-root': {
      width: '100%',
      '& > div': {
        '&:before': {
          borderBottom: `1px solid ${theme.palette.background.darker}`,
        },
      },
      '& .MuiInputBase-root': {
        width: '100%',
        '& input': {
          color: theme.palette.background.reverse,
        },
      },
      '& + .MuiPaper-root': {
        color: theme.palette.background.default,
        borderRadius: theme.spacing(1),
        '& ul': {
          borderRadius: theme.spacing(1),
          backgroundColor: theme.palette.background.reverse,
          '& li': {
            borderBottom: `1px solid ${theme.palette.background.darker}`,
            '& span': {
              fontSize: '0.9rem',
            },
          },
        },
      },
      '& .MuiButtonBase-root': {
        backgroundColor: theme.palette.background.reverse,
        color: theme.palette.background.default,
        '& span': {
          textTransform: 'capitalize',
        },
        '& .MuiChip-deleteIcon': {
          color: '#d04343',
        },
      },
    },
    '& p': {
      marginRight: theme.spacing(0.5),
    },
  },
  addToHomeScreenImage: {
    width: '100%',
    borderRadius: theme.spacing(1),
    maxWidth: 250,
  },
  separator: {
    backgroundColor: theme.palette.background.reverse,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: 'none',
    height: 1,
    opacity: 0.2,
  },
  proBoxContainer: {
    paddingBottom: theme.spacing(2),
    '& button': {
      width: '100%',
      maxWidth: 550,
      marginBottom: 0,
      marginTop: theme.spacing(1),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  proBoxButtonContainer: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    top: 'auto',
    left: 0,
  },
  proChip: {
    backgroundColor: '#ffb100 !important',
    height: 18,
    maxWidth: 55,
    '& .MuiChip-label': {
      fontSize: '0.7rem !important',
      lineHeight: '0.5rem',
      fontWeight: 600,
      paddingLeft: theme.spacing(0.5),
    },
    '& .MuiSvgIcon-root': {
      width: 14,
      height: 14,
    },
  },
  centeredCircularProgress: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
  },
  poweredByLink: {
    textDecoration: 'none',
    color: theme.palette.background.reverse,
    display: 'block',
    marginBottom: theme.spacing(2),
    fontSize: '0.8rem',
    textAlign: 'center',
  },
  errorBox: {
    position: 'absolute',
    top: 55,
  },
  errorText: {
    color: '#d04343',
    fontSize: '0.8rem',
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    '& button': {
      marginLeft: theme.spacing(1),
      cursor: 'pointer',
    },
  },
}))

export const formStyles = makeStyles(theme => ({
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formSwitch: {
    top: theme.spacing(1.5),
    transform: 'initial',
    '& .MuiSwitch-thumb': {
      backgroundColor: '#888888',
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#888888',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#b4e0dc',
      '& + .MuiSwitch-track': {
        backgroundColor: '#b4e0dc',
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#53a9a1',
      },
    },
  },
  switchLabel: {
    color: theme.palette.background.reverse,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  switchLabelDescription: {
    fontSize: '0.8rem',
    opacity: 0.7,
  },
}))

export const snackbarStyles = makeStyles(theme => ({
  variantSuccess: {
    fontSize: '0.8rem !important',
    padding: theme.spacing(1),
  },
}))

export const addToHomeScreenStyles = makeStyles(theme => ({
  addToHomeScreenContainer: {
    backgroundColor: '#fff',
    color: '#272727',
    boxShadow: '0px 0 10px rgb(0 0 0 / 15%)',
    left: 0,
    right: 0,
    margin: 'auto',
    '& .ath-banner': {
      display: 'flex',
      width: '100%',
      padding: theme.spacing(2),
      alignItems: 'flex-start',
      '& .ath-logo-cell': {
        width: 85,
        height: 85,
        background: '#fff',
        padding: theme.spacing(1),
        borderRadius: '50%',
        boxShadow: '0px -4px 6px rgb(0 0 0 / 10%)',
        flexShrink: 0,
        '& .ath-prompt-logo': {
          width: '100%',
          borderRadius: '50%',
        },
      },
      '& .ath-title-cell': {
        paddingTop: theme.spacing(1.5),
        alignSelf: 'flex-start',
        '& .ath-banner-title': {
          textAlign: 'left',
          fontSize: 14,
          fontWeight: 600,
          ['@media (max-width:330px)']: { // eslint-disable-line no-useless-computed-key
            fontSize: 12,
          },
        },
      },
      '& .ath-cancel-cell': {
        position: 'absolute',
        left: 115,
        bottom: 20,
        right: 'auto',
        top: 'auto',
        '& .btn-cancel': {
          backgroundColor: 'transparent',
          color: '#272727',
          borderWidth: '2px',
          borderStyle: 'solid',
          minWidth: 90,
          fontWeight: 'bold',
          fontSize: '0.8rem',
          textTransform: 'none',
          textDecoration: 'none',
          display: 'block',
          borderRadius: theme.spacing(6),
          textAlign: 'center',
          position: 'relative',
          padding: theme.spacing(1),
          cursor: 'pointer',
          '&:hover': {
            opacity: '0.9',
          },
          ['@media (max-width:330px)']: { // eslint-disable-line no-useless-computed-key
            minWidth: 80,
          },
        },
        ['@media (max-width:460px)']: { // eslint-disable-line no-useless-computed-key
          bottom: 0,
          left: 105,
        },
      },
      '& .ath-install-cell': {
        position: 'absolute',
        right: 'auto',
        bottom: 20,
        left: 210,
        top: 'auto',
        '& .btn-install': {
          backgroundColor: '#272727',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '0.8rem',
          textTransform: 'none',
          textDecoration: 'none',
          display: 'block',
          textAlign: 'center',
          position: 'relative',
          padding: '10px 8px',
          borderRadius: theme.spacing(6),
          minWidth: 90,
          border: 'none',
          cursor: 'pointer',
          '&:hover': {
            opacity: '0.9',
            backgroundColor: '#272727',
          },
          '&:disabled': {
            backgroundColor: '#ccc !important',
          },
          ['@media (max-width:330px)']: { // eslint-disable-line no-useless-computed-key
            minWidth: 80,
          },
        },
        ['@media (max-width:460px)']: { // eslint-disable-line no-useless-computed-key
          bottom: 0,
        },
        ['@media (max-width:330px)']: { // eslint-disable-line no-useless-computed-key
          left: 195,
        },
      },
      ['@media (max-width:460px)']: { // eslint-disable-line no-useless-computed-key
        padding: theme.spacing(1),
      },
    },
    '& .ath-guidance': {
      '& .ath-guidance-image-cell': {
        padding: theme.spacing(1),
        '& img': {
          width: '100%',
          maxWidth: 300,
          borderRadius: theme.spacing(2),
        },
      },
      '& .ath-cancel-cell': {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        '& .btn-guidance-cancel': {
          backgroundColor: '#272727',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1rem',
          textTransform: 'none',
          textDecoration: 'none',
          display: 'block',
          textAlign: 'center',
          position: 'relative',
          padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
          borderRadius: theme.spacing(6),
          minWidth: '100px',
          border: 'none',
          cursor: 'pointer',
        },
      },
    },
    ['@media (max-width:460px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: theme.spacing(2),
    },
  },
}))
