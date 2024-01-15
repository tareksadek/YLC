import { alpha, makeStyles } from '@material-ui/core/styles'

export const loStyles = makeStyles(() => ({
  appContainer: {
    minHeight: 'calc(100vh - 240px)',
    paddingBottom: '160px',
    maxWidth: '800px',
  },
  fullWidthAppContainer: {
    minHeight: 'calc(100vh - 240px)',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
}))

export const headerStyles = makeStyles(theme => ({
  headerAccordionContainer: {
    background: 'transparent',
    border: 'none',
    boxShadow: '0 0 0 transparent',
    paddingBottom: theme.spacing(0),
    '& .MuiAccordionSummary-root': {
      minHeight: 'initial',
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: theme.spacing(1),
      justifyContent: 'flex-start',
      ['@media (min-width:1200px)']: { // eslint-disable-line no-useless-computed-key
        justifyContent: 'center',
      },
      '& .MuiAccordionSummary-content': {
        margin: 0,
        flexGrow: 'initial',
      },
      '& .MuiButtonBase-root': {
        padding: 0,
        margin: '12px 0 0 12px',
        color: theme.palette.background.default,
        opacity: 0.75,
        '&.Mui-expanded': {
          transform: 'none',
        },
        '& .MuiSvgIcon-root': {
          fontSize: '1.2rem',
        },
      },
      '& + .MuiCollapse-root': {
        '& .MuiCollapse-entered': {
          marginBottom: theme.spacing(2),
        },
      },
    },
    '& .MuiAccordionDetails-root': {
      padding: 0,
    },
  },
  headerContainer: {
    minHeight: theme.spacing(4),
    maxHeight: 85,
    borderRadius: '0 0 20px 20px',
    margin: '64px auto 0 auto',
    maxWidth: 1200,
    boxShadow: '0px 8px 10px rgb(0 0 0 / 15%)',
    position: 'relative',
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      minHeight: theme.spacing(2),
      maxHeight: 70,
    },
  },
  headerTitle: {
    fontFamily: theme.fonts.titles,
    color: theme.palette.background.default,
    paddingTop: theme.spacing(1.5),
    fontWeight: 400,
    paddingBottom: 0,
    fontSize: '1rem',
    ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '0.9rem',
      textAlign: 'left',
    },
  },
  headerContainerClear: {
    maxWidth: 'auto',
    margin: 0,
    paddingTop: theme.spacing(1.5),
    paddingBottom: 0,
    paddingLeft: theme.spacing(0),
    position: 'fixed',
    zIndex: 1100,
    top: 0,
    left: 100,
    right: 0,
    bottom: 'auto',
    backgroundColor: 'transparent !important',
    width: 'calc(100% - 200px)',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(0),
    },
    ['@media (min-width:799px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: 4,
    },
    ['@media (min-width:1200px)']: { // eslint-disable-line no-useless-computed-key
      width: 400,
      margin: '0 auto',
    },
  },
  headerContainerBasic: {
    maxHeight: 170,
    minHeight: theme.spacing(4),
    borderRadius: '0 0 32px 32px',
    margin: '64px auto 0 auto',
    maxWidth: 1200,
    position: 'relative',
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      minHeight: theme.spacing(2),
      maxHeight: 135,
    },
    ['@media (max-width:400px)']: { // eslint-disable-line no-useless-computed-key
      maxHeight: 100,
    },
  },
}))

export const navStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  socialNavigation: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 2,
    backgroundColor: `${theme.palette.background.reverse}30`,
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appBar: {
    margin: '0 auto',
    maxWidth: 1200,
    left: '0 !important',
    backgroundColor: `${theme.palette.background.reverse}`,
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px !important`,
  },
  socialAppbar: {
    maxWidth: 550,
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    backgroundColor: `${theme.palette.background.reverse}55`,
  },
  businessAppbar: {
    // boxShadow: '0 0 0 transparent !important',
    borderRadius: '0 !important',
    backgroundColor: `${theme.palette.background.reverse}`,
  },
  businessAppbarUnauth: {
    minHeight: 65,
  },
  basicAppbar: {
    backgroundColor: `${theme.palette.background.reverse}`,
    borderRadius: '0 !important',
    // boxShadow: '0 0 0 transparent !important',
  },
  scrolledHeader: {
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px !important`,
    boxShadow: '0px 8px 10px rgb(0 0 0 / 15%)',
    '&$socialAppbar': {
      backgroundColor: `${theme.palette.background.reverse}`,
    },
  },
  toolbar: {
    minHeight: 'auto',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1),
    },
  },
  socialToolbar: {
    paddingTop: 0,
    minHeight: 50,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0,
    },
  },
  appName: {
    color: theme.palette.background.reverse,
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexShrink: 0,
    '& button': {
      color: theme.palette.background.default,
    },
  },
  linkText: {
    textDecoration: 'none',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: theme.palette.background.default,
    flex: '0 0 auto',
  },
  linkTextData: {
    fontWeight: 'bold',
  },
  profileButton: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: theme.palette.background.default,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    borderRadius: '8px',
  },
  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: 0,
    paddingRight: 0,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
  },
  logo: {
    fontSize: 40,
    maxHeight: 30,
    // [theme.breakpoints.down('xs')]: {
    //   fontSize: 75,
    //   maxHeight: 30,
    // },
  },
  storeLogoContainer: {
    '& svg': {
      fill: theme.palette.background.default,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  hideDesktopNav: {
    display: 'none',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  showMobileNav: {
    display: 'flex',
  },
  arabicFont: {
    fontFamily: `${theme.fonts.arabic} !important`,
  },
  navigationHidden: {
    display: 'none',
  },
  headerHidden: {
    display: 'none',
  },
  rightNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeNavIcon: {
    position: 'absolute',
    right: 0,
    top: theme.spacing(2),
    zIndex: '99999',
    padding: 0,
    margin: 0,
    '& svg': {
      fontSize: 42,
      color: '#fff',
    },
  },
  toggleDisplayModeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
    width: 130,
    '& button': {
      backgroundColor: theme.palette.background.headerToggleInactiveBackground,
      color: theme.palette.background.headerToggleInactiveColor,
      fontWeight: 600,
      fontSize: '0.8rem',
      padding: '4px 8px',
      '&:first-child': {
        borderRadius: '40px 0 0 40px',
      },
      '&:last-child': {
        borderRadius: '0 40px 40px 0',
      },
      '&$selectedDisplay': {
        backgroundColor: theme.palette.background.headerToggleActiveBackground,
        color: theme.palette.background.headerToggleActiveColor,
      },
    },
  },
  selectedDisplay: {
    backgroundColor: theme.palette.background.headerToggleActiveBackground,
    color: theme.palette.background.headerToggleActiveColor,
  },
}))

export const floatingButtonsStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  floatingContainer: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 100,
    bottom: 0,
    right: 0,
    width: 'auto',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      bottom: '65px',
      flexDirection: 'column',
      height: '90px',
      justifyContent: 'space-between',
      padding: 0,
    },
  },
  arabicFont: {
    fontFamily: `${theme.fonts.arabic} !important`,
  },
}))

export const sideDrawerStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: 0,
  },
  backProfileButton: {
    paddingLeft: theme.spacing(2),
    '& svg': {
      fontSize: '1.6rem',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: 0,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    height: 30,
  },
  logo: {
    maxWidth: '65px',
    display: 'block',
    padding: '16px 8px',
  },
  appName: {
    color: '#ffffff',
    textDecoration: 'none',
  },
  profileLinkDrak: {},
  primarySelectedLinkItemText: {},
  profileLink: {
    backgroundColor: 'transparent',
    border: '2px solid #fff !important',
    width: '90% !important',
    marginLeft: '5%',
    borderRadius: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& $primaryLinkItemText': {
      color: '#fff !important',
      textAlign: 'center',
      '&$primarySelectedLinkItemText': {
        color: '#dcb868',
      },
    },
    '& $sideMenuItemIcon': {
      display: 'none',
    },
    '&$profileLinkDrak': {
      backgroundColor: '#fff !important',
      color: '#272727',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  logoutLink: {
    backgroundColor: '#202020',
    width: '90% !important',
    marginLeft: '5%',
    borderRadius: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& $primaryLinkItemText': {
      color: '#fff',
      textAlign: 'center',
      '&$primarySelectedLinkItemText': {
        color: '#dcb868',
      },
    },
    '& $sideMenuItemIcon': {
      display: 'none',
    },
    '&:hover': {
      backgroundColor: '#202020',
      opacity: 0.9,
    },
  },
  selectedLinkIndicator: {
    position: 'absolute',
    right: 4,
    left: 'auto',
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: 10,
    height: 10,
    borderRadius: 30,
  },
  accordionContainer: {
    background: 'transparent',
    margin: '8px 0 !important',
    boxShadow: '0 0 0 transparent',
    position: 'relative',
    paddingBottom: theme.spacing(1),
    '&:first-child': {
      marginTop: '0 !important',
    },
    '&:before': {
      display: 'none',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '90%',
      left: '5%',
      height: 1,
      backgroundColor: '#fff',
      bottom: 0,
      top: 'auto',
      right: 'auto',
      opacity: 0.1,
      display: 'none',
    },
  },
  editGroup: {
    backgroundColor: '#222',
    margin: '0 0 16px 5% !important',
    borderRadius: theme.spacing(1),
    width: '90%',
    '& $linksGroupTitleContainer': {
      padding: '12px 16px 4px 16px',
    },
    '& .MuiAccordionSummary-expandIcon': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  accordionDetails: {
    flexDirection: 'column',
    padding: 0,
  },
  linksGroupTitleContainer: {
    position: 'relative',
    minHeight: 'auto !important',
    '& .MuiAccordionSummary-expandIcon': {
      '& svg': {
        color: '#fff',
        opacity: 0.5,
      },
    },
    '& .MuiAccordionSummary-content': {
      marginTop: 0,
      marginBottom: 0,
    },
  },
  linksGroupContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '80%',
      left: '10%',
      height: 1,
      backgroundColor: '#fff',
      bottom: 0,
      top: 'auto',
      right: 'auto',
      opacity: 0.2,
    },
  },
  linksGroupTitle: {
    textAlign: 'left',
    fontSize: '0.8rem',
    fontWeight: 400,
    textTransform: 'uppercase',
    opacity: 0.75,
  },
  linkText: {
    textDecoration: 'none',
    color: '#ffffff',
    display: 'block',
    minWidth: 'auto',
    textTransform: 'initial',
    padding: 0,
    width: '100%',
    borderRadius: theme.spacing(5),
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  sideMenuItemIcon: {
    display: 'flex',
    borderRadius: '50%',
    flexShrink: 0,
    backgroundColor: 'transparent',
    width: 'auto',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    minWidth: 'auto',
  },
  primaryLinkItemText: {
    fontSize: '0.8rem',
    fontWeight: 400,
    '&$primarySelectedLinkItemText': {
      color: '#dcb868',
    },
  },
  footerLinks: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    marginBottom: theme.spacing(1.5),
    '& $linkText': {
      borderBottom: 'none',
      textAlign: 'center',
      '& .MuiTypography-body1': {
        fontSize: '0.8rem',
        opacity: 0.5,
      },
      '& .MuiTypography-root': {
        textAlign: 'center',
      },
    },
  },
  selectedNavLink: {},
  sideMenuItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: theme.spacing(5),
    '& svg': {
      fontSize: '1rem',
      fill: '#ffffff',
      color: '#ffffff',
    },
    '&$selectedNavLink': {
      color: '#000',
      '& svg': {
        fill: '#dcb868',
        color: '#dcb868',
      },
    },
  },
  linkTextRight: {
    textAlign: 'right',
  },
  mobileFooter: {
    bottom: theme.spacing(2),
    left: 0,
    width: '100%',
  },
  mobileFooterLinkText: {
    textTransform: 'none',
    color: theme.links.color,
    fontSize: '0.8rem !important',
    opacity: 0.8,
  },
  link: {
    textDecoration: 'none',
  },
  linkList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  linkButton: {
    paddingBottom: '0 important',
  },
  sideDivider: {
    backgroundColor: `${theme.palette.background.reverse} !important`,
    opacity: 0.5,
    marginTop: `${theme.spacing(2)}px !important`,
  },
  arabicFont: {
    fontFamily: `${theme.fonts.arabic} !important`,
  },
  title: {
    '& a': {
      color: '#ffffff',
      textDecoration: 'none',
    },
  },
  openAddToHomeScreenDialogButton: {
    width: '90%',
    marginLeft: '5%',
    borderRadius: theme.spacing(2),
    border: '2px dashed #555',
    color: '#fff',
    fontSize: '0.8rem',
    backgroundColor: 'transparent',
    '& > span': {
      '& > span': {
        display: 'block',
        textTransform: 'initial',
        '&:first-child': {
          textTransform: 'uppercase',
          fontWeight: 300,
        },
        '&:last-child': {
          fontWeight: 300,
        },
      },
    },
    '&:hover': {
      backgroundColor: '#202020',
      color: '#fff',
    },
  },
  navQrContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      margin: '0 auto',
    },
  },
}))

export const footerStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    width: '100%',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    borderTop: `1px solid ${theme.palette.background.reverse}`,
    paddingTop: theme.spacing(2),
    color: theme.palette.background.reverse,
    width: 300,
    margin: '0 auto',
    '& a': {
      color: theme.palette.background.reverse,
      textDecoration: 'none',
    },
  },
  linkList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  linkText: {
    color: theme.palette.background.gradient.dark,
    textDecoration: 'none',
  },
  blogLink: {
    color: theme.palette.background.default,
    textDecoration: 'none',
  },
  arabicFont: {
    fontFamily: `${theme.fonts.arabic} !important`,
  },
}))

export const mobileNavigationStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    zIndex: 100,
    bottom: 0,
    left: 0,
    width: '100%',
    color: theme.palette.background.default,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  },
  selected: {
    color: theme.palette.background.highlight,
    '& svg': {
      fill: theme.palette.background.highlight,
    },
  },
  arabicFont: {
    fontFamily: `${theme.fonts.arabic} !important`,
  },
}))

export const cookieBarStyles = makeStyles(theme => ({
  container: {
    '& .CookieConsent': {
      display: 'block',
      alignItems: 'center',
      borderRadius: theme.spacing(2),
      width: '92% !important',
      marginLeft: '4%',
      marginBottom: theme.spacing(2),
      backgroundColor: `${theme.palette.background.reverse} !important`,
      color: `${theme.palette.background.default} !important`,
      boxShadow: '0 0 10px rgb(0 0 0 / 15%)',
      '& div': {
        margin: '0 15px',
        ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
          width: '100% !important',
        },
        '& a': {
          display: 'block',
          color: `${theme.palette.background.default} !important`,
        },
      },
      '& button': {
        padding: '10px 20px !important',
        fontSize: '0.8rem !important',
        margin: '0 !important',
        borderRadius: '16px !important',
        ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
          width: '100% !important',
          marginBottom: '10px !important',
          padding: '10px !important',
        },
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
      },
    },
  },
  link: {
    color: '#272727',
  },
}))

export const pageTitleStyles = makeStyles(theme => ({
  info: {
    paddingTop: theme.spacing(1),
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    color: theme.palette.background.lighter,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
      textAlign: 'left',
    },
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
  titleContainer: {
    marginBottom: theme.spacing(0.5),
  },
  pageTitle: {
    fontSize: '1.5rem',
    color: theme.palette.background.reverse,
    fontWeight: 400,
    marginBottom: 0,
    lineHeight: 1.5,
    textAlign: 'center',
    ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '1rem',
      textAlign: 'left',
      fontWeight: 600,
    },
  },
  centeredTitle: {
    textAlign: 'center',
  },
  uppercaseTitle: {
    textTransform: 'uppercase',
  },
  errorTitle: {
    color: theme.palette.background.error,
  },
}))

export const skeletonStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 550,
    margin: '0 auto',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  item: {
    backgroundColor: '#ddd !important',
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: '1%',
    marginRight: '1%',
  },
}))

export const alertStyles = makeStyles(theme => ({
  alertContainerNoMargin: {},
  alertContainerNoIcon: {},
  alertContainer: {
    padding: '12px 24px 12px 12px !important',
    borderRadius: `${theme.spacing(1.5)}px !important`,
    boxShadow: '0 0 10px rgb(0 0 0 / 15%)',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(3),
    flexWrap: 'wrap',
    '&$alertContainerNoMargin': {
      marginBottom: 0,
    },
    '& .MuiAlert-icon': {
      color: '#ffffff !important',
      width: 30,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      borderRadius: '50%',
      flexBasis: 30,
      ['@media (max-width:440px)']: { // eslint-disable-line no-useless-computed-key
        flexBasis: 30,
      },
      '& svg': {
        fontSize: '1rem',
      },
    },
    '&$alertContainerNoIcon': {
      marginBottom: 0,
      '& .MuiAlert-icon': {
        display: 'none',
      },
    },
    '& .MuiAlert-action': {
      marginRight: 0,
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
      '& button': {
        borderRadius: 20,
        textTransform: 'initial',
        fontSize: 12,
        fontWeight: 600,
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        marginLeft: theme.spacing(1),
      },
      ['@media (max-width:360px)']: { // eslint-disable-line no-useless-computed-key
        marginLeft: 0,
        paddingLeft: 0,
        marginBottom: theme.spacing(1),
      },
    },
    '& .MuiAlert-message': {
      minWidth: 180,
      flexBasis: 'calc(100% - 60px)',
      padding: 0,
      ['@media (max-width:420px)']: { // eslint-disable-line no-useless-computed-key
        flexBasis: 'calc(100% - 60px)',
      },
      ['@media (max-width:340px)']: { // eslint-disable-line no-useless-computed-key
        minWidth: 'auto',
      },
    },
    ['@media (max-width:420px)']: { // eslint-disable-line no-useless-computed-key
      flexWrap: 'wrap',
    },
  },
  alertWarining: {
    '&.MuiAlert-standardWarning': {
      backgroundColor: '#fff4e5',
    },
    '& .MuiAlert-icon': {
      backgroundColor: '#ffc248',
      color: '#fff',
    },
    '& .MuiAlert-action': {
      '& button': {
        background: '#ffc248',
      },
    },
  },
  alertInfo: {
    '&.MuiAlert-standardInfo': {
      backgroundColor: '#e8f4fd',
    },
    '& .MuiAlert-icon': {
      backgroundColor: '#83c9fd',
      color: '#fff',
    },
    '& .MuiAlert-action': {
      '& button': {
        background: '#83c9fd',
      },
    },
  },
  alertError: {
    '&.MuiAlert-standardError': {
      backgroundColor: '#ffe3e3',
    },
    '& .MuiAlert-icon': {
      backgroundColor: '#ff7c7c',
      color: '#fff',
    },
    '& .MuiAlert-action': {
      '& button': {
        background: '#ff7c7c',
      },
    },
  },
  alertSuccess: {
    '&.MuiAlert-standardSuccess': {
      backgroundColor: '#e3ffe5',
    },
    '& .MuiAlert-icon': {
      backgroundColor: '#52a84f',
      color: '#fff',
    },
    '& .MuiAlert-action': {
      '& button': {
        background: '#52a84f',
      },
    },
  },
  alertTitle: {
    fontSize: '14px !important',
    fontWeight: 600,
    color: '#272727 !important',
    whiteSpace: 'nowrap',
  },
  alertDescription: {
    fontSize: 12,
    color: '#888888',
    lineHeight: '1.2rem',
  },
  infoTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2a4441',
    marginBottom: theme.spacing(1),
  },
  infoItem: {
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'flex-start',
    color: theme.palette.background.default,
    marginBottom: theme.spacing(1),
    opacity: 0.7,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  infoItemIcon: {
    fontSize: '0.5rem',
    marginRight: 5,
    marginTop: 8,
  },
  danger: {
    backgroundColor: '#e0b4b4',
    '& $infoItem': {
      color: '#730a0a',
    },
    '& $infoTitle': {
      color: '#730a0a',
    },
  },
  info: {
    backgroundColor: '#f1d5b9',
    '& $infoItem': {
      color: '#773200',
    },
    '& $infoTitle': {
      color: '#773200',
    },
  },
  alertItem: {
    fontSize: '0.8rem !important',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: '#272727 !important',
    marginBottom: theme.spacing(1),
    opacity: 0.75,
    lineHeight: '1.2rem',
    textAlign: 'left',
    ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key
      textAlign: 'left',
      justifyContent: 'flex-start',
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  alertItemIcon: {
    fontSize: '0.5rem',
    marginRight: 5,
    marginTop: 8,
  },
}))

export const notificationDialogStyles = makeStyles(theme => ({
  dialogRoot: {
    bottom: '0 !important',
    top: 'auto !important',
    zIndex: '99999 !important',
  },
  dialogContainer: {
    height: 'auto',
    '& .MuiDialog-paperFullScreen': {
      paddingTop: 25,
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      overflow: 'visible',
      borderRadius: `${theme.spacing(3)}px ${theme.spacing(3)}px 0 0`,
    },
  },
  warningDialogContainer: {
    backgroundColor: '#fff4e5',
  },
  warningDialogIconContainer: {
    backgroundColor: '#ffc248',
  },
  dialogTypeIconContainer: {
    borderRadius: '50%',
    width: 50,
    height: 50,
    position: 'absolute',
    left: 0,
    right: 0,
    top: -25,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      color: '#ffffff',
      fontSize: 30,
    },
  },
  titleContainer: {
    paddingBottom: theme.spacing(1),
    color: '#272727',
    '& h2': {
      fontSize: 14,
      fontWeight: 600,
      color: 'inherit',
      textTransform: 'capitalize',
    },
  },
  dialogContentContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    '& p': {
      fontSize: 12,
      color: '#888888',
    },
  },
  dialogActionsContainer: {
    '& button': {
      fontSize: '0.8rem',
      fontWeight: 600,
      maxWidth: 'initial',
      margin: '0 auto',
      width: 'auto',
      minWidth: 'initial',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      '&.Mui-disabled': {
        opacity: 0.25,
        background: 'transparent',
      },
    },
  },
  warningDialogButton: {
    backgroundColor: '#ffc248 !important',
    color: '#272727',
  },
  closeDialogButton: {
    right: 4,
    top: 0,
    position: 'absolute',
    '& svg': {
      color: '#272727',
      fontSize: 18,
      opacity: 0.25,
    },
  },
  item: {
    backgroundColor: '#ddd !important',
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: '1%',
    marginRight: '1%',
  },
  dialogCustomIconContainer: {
    borderRadius: '50%',
    width: 50,
    height: 50,
    position: 'absolute',
    left: 0,
    right: 0,
    top: -25,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255,255,255,0.5)',
  },
}))

export const fullScreenDialogStyles = makeStyles(theme => ({
  dialogRoot: {
    bottom: '0 !important',
    top: 'auto !important',
  },
  dialogContainer: {
    height: 'auto',
    '& .MuiDialog-paperFullScreen': {
      paddingTop: 25,
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      overflow: 'visible',
      borderRadius: `${theme.spacing(3)}px ${theme.spacing(3)}px 0 0`,
    },
  },
  warningDialogContainer: {
    backgroundColor: '#fff4e5',
  },
  warningDialogIconContainer: {
    backgroundColor: '#ffc248',
  },
  dialogTypeIconContainer: {
    borderRadius: '50%',
    width: 50,
    height: 50,
    position: 'absolute',
    left: 0,
    right: 0,
    top: -25,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      color: '#ffffff',
      fontSize: 30,
    },
  },
  titleContainer: {
    paddingBottom: theme.spacing(1),
    color: '#272727',
    '& h2': {
      fontSize: 14,
      fontWeight: 600,
      color: 'inherit',
      textTransform: 'capitalize',
    },
  },
  dialogContentContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    '& p': {
      fontSize: 12,
      color: '#888888',
    },
  },
  dialogActionsContainer: {
    '& button': {
      fontSize: 14,
      fontWeight: 600,
      maxWidth: 200,
      margin: '0 auto',
      width: '100%',
    },
  },
  warningDialogButton: {
    backgroundColor: '#ffc248 !important',
    color: '#272727',
  },
  closeDialogButton: {
    right: 4,
    top: 0,
    position: 'absolute',
    '& svg': {
      color: '#272727',
      fontSize: 18,
      opacity: 0.25,
    },
  },
  item: {
    backgroundColor: '#ddd !important',
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: '1%',
    marginRight: '1%',
  },
  dialogCustomIconContainer: {
    borderRadius: '50%',
    width: 50,
    height: 50,
    position: 'absolute',
    left: 0,
    right: 0,
    top: -25,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255,255,255,0.5)',
  },
  dialogActionDisabled: {
    background: '#888',
    color: '#717171 !important',
  },
  fullScreenDialogRoot: {
    zIndex: '99999 !important',
  },
  fullScreenDialogContainer: {
    display: 'block',
  },
  fullScreenDialogPaper: {
    backgroundColor: theme.palette.background.light,
  },
  fullScreenDialogPaperLight: {
    backgroundColor: '#f7f7f7',
  },
  fullScreenDialogPaperDark: {
    backgroundColor: '#272727',
  },
  fullScreenDialogNoHeader: {},
  fullScreenDialogTitleContainer: {
    padding: `${theme.spacing(2)}px 0 0 ${theme.spacing(2)}px`,
    paddingTop: 0,
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.background.reverse,
    '& h2': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-Start',
      flexDirection: 'row',
      color: theme.palette.background.default,
      fontSize: '1.2rem',
      fontWeight: 600,
      textTransform: 'capitalize',
      '& svg': {
        fontSize: '1.8rem',
      },
    },
    '&$fullScreenDialogNoHeader': {
      display: 'none',
    },
  },
  fullScreenDialogContent: {
    padding: theme.spacing(2),
  },
  noSidePadding: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  fullScreenDialogClose: {},
  fullScreenDialogActions: {
    '& button': {
      margin: '0 auto',
      minWidth: 400,
      ['@media (max-width:440px)']: { // eslint-disable-line no-useless-computed-key
        minWidth: '100%',
      },
    },
  },
}))
