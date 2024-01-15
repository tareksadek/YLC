import { makeStyles } from '@material-ui/core/styles'

export const detailsDialog = makeStyles(theme => ({
  qrContainerTop: {},
  qrContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    '&$qrContainerTop': {
      alignItems: 'flex-start',
    },
  },
  qrContent: {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    maxWidth: 550,
    margin: '0 auto',
    '& svg': {
      width: '100%',
    },
  },
  paperFullScreen: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      top: 0,
    },
  },
  dialogHeader: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      top: 0,
    },
  },
  dialogClose: {
    position: 'absolute',
    left: theme.spacing(3),
    top: 0,
    bottom: 0,
    margin: 'auto',
  },
  arabicClose: {
    right: theme.spacing(3),
    left: 'auto',
  },
  dialogHeaderSlotName: {
    border: `1px dashed ${theme.palette.background.default}`,
    padding: '2px 5px',
  },
  dialogTitle: {
    width: '100%',
    fontSize: '1.5rem',
    textTransform: 'capitalize',
  },
  cardContentContainer: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  dialogContent: {
    paddingBottom: theme.dialogSpacing + 20,
    backgroundColor: theme.palette.background.default,
    maxWidth: '800px',
    margin: '0 auto',
    padding: theme.spacing(2),
    paddingTop: '100px',
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
    },
  },
  dialogImage: {
    maxWidth: '250px',
    width: '100%',
    borderRadius: '6px',
  },
  keywordsContainer: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    borderRadius: '6px',
  },
  keywordsBox: {
    padding: theme.spacing(2),
  },
  keywordsTitle: {
    borderBottom: `1px solid ${theme.palette.background.default}`,
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  multiLine: {
    whiteSpace: 'pre-line',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
  qrCodeButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      margin: theme.spacing(1),
    },
  },
  videoContainer: {
    width: '100%',
    height: 300,
    backgroundColor: theme.palette.background.lighter,
    borderRadius: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
    maxWidth: 550,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
    '& p': {
      color: theme.palette.background.default,
      opacity: 0.6,
      position: 'absolute',
      width: 210,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      textAlign: 'center',
      height: 50,
      '& b': {
        display: 'block',
      },
    },
    '& div': {
      position: 'relative',
      zIndex: 2,
    },
  },
  poweredByContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    bottom: theme.spacing(2),
    left: 0,
    right: 0,
    top: 'auto',
    margin: 0,
  },
  poweredByLink: {
    textAlign: 'center',
    fontSize: '0.8rem',
    textDecoration: 'none',
  },
  qrCardName: {
    color: '#272727',
    textTransform: 'capitalize',
    fontWeight: 600,
    fontSize: '1.2rem',
    marginTop: theme.spacing(2),
  },
  qrCardEmail: {
    color: '#272727',
  },
  qrCardPhone: {
    color: '#272727',
  },
  dbcClose: {
    position: 'absolute',
    left: theme.spacing(2),
    top: theme.spacing(0.5),
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    zIndex: 2,
    boxShadow: '0px 0px 10px #999',
    width: 40,
    height: 40,
    '& svg': {
      width: '1.2rem',
      height: '1.2rem',
    },
  },
  qrBannerContent: {
    marginBottom: '0 !important',
  },
  qrImagesContainer: {
    position: 'relative',
    marginBottom: theme.spacing(8),
    minWidth: 280,
    width: '100%',
  },
  qrNoBannerImage: {
    minHeight: 100,
    borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
  },
  qrLogoContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    left: 0,
    top: 'auto',
    bottom: -50,
    right: 0,
    margin: 'auto',
  },
  qrLogo: {
    width: 100,
    height: 100,
    borderRadius: theme.spacing(2),
    border: '2px solid #fff',
  },
  shareContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    maxWidth: 550,
    margin: 'auto',
    right: 0,
    padding: theme.spacing(1),
    backgroundColor: '#000',
    borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
  },
  shareTitle: {
    textAlign: 'center',
    color: '#f7f7f7',
    fontSize: '0.8rem',
    marginBottom: theme.spacing(1),
  },
  shareButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    '& button': {
      '& svg': {
        color: '#fff',
      },
    },
  },
  copyToclipboardContainer: {
    borderRight: '1px solid #525252',
    paddingRight: theme.spacing(2),
    cursor: 'pointer',
    '& svg': {
      color: '#fff',
    },
  },
}))

export const shareDialogStyles = makeStyles(theme => ({
  shareMessageContainer: {
    '& .MuiInputBase-input': {
      color: '#272727',
    },
  },
  dialogHeader: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      top: 0,
    },
  },
  dialogClose: {
    position: 'absolute',
    right: theme.spacing(3),
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: 30,
    height: 30,
  },
  titleContainer: {
    position: 'relative',
    color: '#212121',
    '& h2': {
      fontWeight: 'bold',
    },
  },
  title: {
    textAlign: 'center',
    color: '#212121',
    '& h2': {
      fontSize: '0.9rem',
    },
  },
  dialogContent: {
    paddingBottom: theme.dialogSpacing + 20,
    backgroundColor: '#ffffff',
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
    },
    '& textarea': {
      '&.MuiInputBase-input': {
        color: '#212121',
      },
    },
  },
  shareButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginBottom: theme.spacing(2),
    '& button': {
      display: 'flex',
      flex: '48%',
      textAlign: 'left',
      backgroundColor: '#eee !important',
      marginRight: '1%',
      borderRadius: theme.spacing(1),
      alignItems: 'center',
      padding: '8px !important',
      marginBottom: '1%',
      [theme.breakpoints.down('xs')]: {
        flex: '100%',
        marginRight: 0,
      },
    },
  },
  connectButtonContainer: {
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    marginLeft: theme.spacing(1),
    color: '#212121',
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
}))

export const tabPanelStyles = makeStyles(theme => ({
  tabPanelContainer: {
    position: 'relative',
  },
  title: {
    color: '#212121',
    '& h2': {
      fontSize: '0.9rem',
    },
  },
  shareButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      display: 'block',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
}))

export const socialLinksStyles = makeStyles(theme => ({
  socialLinksContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: 510,
    margin: '0 auto',
    zIndex: 0,
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      width: 405,
    },
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      width: 380,
    },
    ['@media (max-width:430px)']: { // eslint-disable-line no-useless-computed-key
      width: 305,
    },
    ['@media (max-width:355px)']: { // eslint-disable-line no-useless-computed-key
      width: 230,
    },
  },
  socialLinksContainerCenter: {
    justifyContent: 'center',
  },
  linkItem: {
    position: 'relative',
    background: theme.palette.background.reverse,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    color: '#ffffff',
    width: 85,
    height: 85,
    borderRadius: '50%',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    zIndex: 1,
    cursor: 'pointer',
    '& svg': {
      fontSize: 35,
    },
    '&:hover': {
      cursor: 'pointer',
    },
    '&:after': {
      content: "''",
      width: 93,
      height: 93,
      position: 'absolute',
      top: '-4px',
      left: '-4px',
      background: 'transparent',
      border: `2px dashed ${theme.palette.background.reverse}`,
      borderRadius: '50%',
      opacity: 0.5,
      ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
        width: 68,
        height: 68,
      },
    },
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      width: 60,
      height: 60,
    },
  },
  linkItemNoBorder: {
    '&:after': {
      display: 'none',
    },
  },
  linkItemDark: {
    '& .MuiListItemText-multiline': {
      color: '#000000',
    },
    '& .MuiFormControl-root': {
      '& .MuiFormLabel-root': {
        color: '#000000',
        opacity: 0.5,
      },
      '& .MuiInput-root': {
        '& input': {
          color: '#000000',
        },
        '&.MuiInput-underline': {
          '&:after': {
            borderBottomColor: '#000000',
          },
          '&:before': {
            borderBottomColor: '#000000',
          },
          '&:hover': {
            '&:not(.Mui-disabled)': {
              '&:before': {
                borderBottomColor: '#000000',
              },
            },
          },
        },
      },
    },
  },
  linkItemBadge: {
    color: theme.palette.background.default,
    position: 'absolute !important',
    top: 10,
    right: 10,
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette.background.reverse,
      border: `2px solid ${theme.palette.background.default}`,
      position: 'initial',
    },
  },
  cutomLinkItem: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 0,
    padding: `${theme.spacing(1)}px 0`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.background.reverse,
    marginBottom: 0,
    borderBottom: `1px solid ${theme.palette.background.darker}`,
    zIndex: 1,
    minHeight: 75,
    '& .MuiListItem-secondaryAction': {
      padding: 0,
    },
    '& p': {
      color: theme.palette.background.reverse,
    },
    '& svg': {
      color: theme.palette.background.reverse,
    },
    '&:last-child': {
      marginBottom: 0,
      borderBottom: 'none',
    },
  },
  linkItemIcon: {
    marginTop: theme.spacing(0.5),
  },
  linkItemPrimaryText: {
    textTransform: 'capitalize',
    color: '#ffffff',
  },
  linkItemPrimaryTextDark: {
    textTransform: 'capitalize',
    color: '#000000',
  },
  linkItemSecondaryText: {
    color: '#ffffff',
  },
  linkItemSecondaryTextDark: {
    color: '#000000',
  },
  linkItemSwitch: {
    top: theme.spacing(1.5),
    transform: 'initial',
    '& .MuiSwitch-thumb': {
      backgroundColor: '#272727',
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#272727',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#ffffff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#ffffff',
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#ffffff',
      },
    },
  },
  linkItemSwitchDark: {
    top: theme.spacing(1.5),
    transform: 'initial',
    '& .MuiSwitch-thumb': {
      backgroundColor: '#272727',
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#272727',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#000000',
      '& + .MuiSwitch-track': {
        backgroundColor: '#000000',
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#000000',
      },
    },
  },
  deleteButtonContainer: {
    top: 0,
    transform: 'initial',
    position: 'relative',
    right: 0,
    bottom: 0,
    margin: 'auto',
    height: 30,
    width: 30,
    '& button': {
      marginRight: 0,
      height: 30,
      width: 30,
      '& svg': {
        fontSize: 24,
      },
    },
  },
  saveLinkButton: {
    width: 150,
    minWidth: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveLinkButtonDisabled: {
    backgroundColor: theme.palette.background.reverse,
    color: `${theme.palette.background.lighter} !important`,
    opacity: 0.5,
  },
  title: {
    color: '#212121',
    '& h2': {
      fontSize: '0.9rem',
    },
  },
  shareButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      display: 'block',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
  itemButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    background: theme.palette.background.reverse,
    marginBottom: theme.spacing(1),
    color: '#ffffff',
    width: 85,
    height: 85,
    borderRadius: '50%',
    padding: 0,
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    '& svg': {
      fontSize: 30,
    },
    '&:after': {
      content: "''",
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'transparent',
    },
  },
  disabledItem: {
    backgroundColor: '#bbbbbb !important',
  },
  customLinksContainer: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    backgroundColor: '#e9e9e9',
  },
  clickedNoText: {
    fontSize: '0.8rem',
    opacity: 0.5,
  },
  customLinkTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'capitalize',
    '& b': {
      marginRight: theme.spacing(1),
    },
  },
  customLinkData: {
    fontSize: '0.8rem',
    color: theme.palette.background.lighter,
  },
  customLinkUrl: {
    lineBreak: 'anywhere',
    wordBreak: 'break-word',
    fontSize: '0.8rem',
    color: theme.palette.background.lighter,
  },
  defaultLinkCheckboxContainer: {
    fontSize: '0.8rem',
  },
  redirectStatus: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    bottom: 0,
    '& svg': {
      fontSize: 20,
    },
  },
  defaultLinksColorContainer: {
    color: theme.palette.background.reverse,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '& .MuiCheckbox-root': {
      color: theme.palette.background.reverse,
    },
  },
  defaultLinksCheckboxText: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
    },
  },
  descriptionText: {
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: '0.7rem',
    opacity: 0.75,
  },
}))

export const dragHandleStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    borderRight: 'none',
    marginRight: 0,
    paddingRight: theme.spacing(1),
    alignItems: 'center',
    minHeight: 60,
    '&:hover': {
      cursor: 'move',
    },
  },
}))

export const passwordProtectedStyles = makeStyles(theme => ({
  container: {
    maxWidth: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  viewCardName: {
    textTransform: 'capitalize',
    color: theme.palette.background.default,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(5),
    },
  },
  viewCardAvatar: {
    width: 130,
    height: 130,
    margin: '0 auto',
    bottom: '-30px',
    boxShadow: '0 0 25px rgb(0 0 0 / 40%)',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('sm')]: {
      bottom: '-50px',
    },
  },
  viewCardProtectedTitle: {
    fontSize: '0.8em',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  viewCardMessage: {
    maxWidth: 400,
    margin: '0 auto',
  },
  passwordFormContainer: {
    maxWidth: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiGrid-item': {
      width: '100%',
    },
  },
}))

export const controlsStyles = makeStyles(theme => ({
  viewCardToolsContainer: {
    background: theme.palette.background.reverse,
    maxWidth: '416px',
    margin: `${theme.spacing(2)}px auto 0`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    bottom: theme.spacing(1),
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    borderRadius: theme.spacing(1),
    '& .MuiButtonGroup-contained': {
      boxShadow: '0 0 0 transparent',
    },
  },
  viewCardToolButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    '& .MuiButton-label': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  viewCardToolButtonText: {
    textTransform: 'capitalize',
    fontSize: '0.9rem',
  },
  viewCardToolsContainerMob: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    left: 'auto',
    marginLeft: 'auto !important',
    marginRight: '0 !important',
    zIndex: 1202,
  },
  viewCardToolsIconMob: {
    fontSize: 24,
    color: theme.palette.background.default,
  },
}))

export const infoDataStyles = makeStyles(theme => ({
  notesContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  notesTitle: {
    color: theme.palette.background.lighter,
    fontWeight: 600,
    textAlign: 'center',
    border: 'none',
    display: 'block !important',
  },
  notes: {},
  viewCardData: {
    maxWidth: 415,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    '& p': {
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.background.darker,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      color: theme.palette.background.lighter,
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      '&$notes': {
        border: 'none',
        marginTop: theme.spacing(1),
        fontSize: '0.9rem',
        '& span': {
          width: '100%',
        },
      },
      '& span': {
        display: 'block',
        width: '50%',
        marginLeft: theme.spacing(1),
        color: theme.palette.background.reverse,
        lineHeight: '1.5rem',
        '&:first-letter': {
          textTransform: 'uppercase',
        },
      },
      '&:last-of-type': {
        border: 'none',
      },
    },
  },
  viewCardEmail: {
    '& span': {
      width: '100% !important',
      textAlign: 'center',
      '& a': {
        color: theme.palette.background.reverse,
      },
    },
  },
  infoButton: {
    minWidth: 100,
    width: '100px !important',
    height: '100px !important',
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: '50% !important',
    backgroundColor: theme.palette.background.reverse,
    '&:hover': {
      backgroundColor: theme.palette.background.reverse,
      opacity: 1,
    },
    '& .MuiButton-label': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& span': {
        fontSize: '0.7rem',
        whiteSpace: 'nowrap',
        fontWeight: 400,
        opacity: 0.6,
      },
    },
  },
  circleLogo: {
    borderRadius: '50%',
  },
  infoButtonWithLogo: {
    minWidth: 75,
    width: '75px !important',
    height: '75px !important',
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: '16px !important',
    top: '-14px',
    padding: 4,
    backgroundColor: theme.palette.background.reverse,
    '&:hover': {
      backgroundColor: theme.palette.background.reverse,
      opacity: 1,
    },
    '& .MuiButton-label': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& span': {
        fontSize: '0.7rem',
        whiteSpace: 'nowrap',
        fontWeight: 400,
        opacity: 0.6,
      },
    },
    '&$circleLogo': {
      borderRadius: '50% !important',
      '& $logo': {
        borderRadius: '50% !important',
      },
    },
  },
  infoButtonIcon: {
    color: theme.palette.background.default,
    fontSize: 34,
  },
  logo: {
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  logoArrow: {
    color: theme.palette.background.reverse,
    position: 'absolute',
    fontSize: 24,
    top: -20,
  },
  mapContainer: {
    width: '100%',
    height: 300,
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    marginTop: theme.spacing(2),
  },
  mapMarker: {
    color: '#272727',
    fontSize: 16,
    '& svg': {
      color: '#272727',
      fontSize: 16,
    },
  },
  marker: {
    position: 'relative',
    '& p': {
      width: 200,
      backgroundColor: '#888',
      color: '#fff',
      padding: 4,
      textAlign: 'center',
      fontSize: 12,
      borderRadius: 4,
      position: 'absolute',
      top: 0,
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      margin: 'auto',
    },
  },
  contactsContainer: {
    width: '100%',
    '& ul': {
      margin: 0,
      padding: 0,
      '& li': {
        borderBottom: `1px solid ${theme.palette.background.lightBorder}`,
        '& a': {
          color: theme.palette.background.reverse,
          fontSize: '0.9rem',
          textDecoration: 'none',
          display: 'block',
          padding: theme.spacing(1),
        },
        '& p': {
          color: theme.palette.background.reverse,
          fontSize: '0.9rem',
          padding: theme.spacing(1),
          margin: 0,
          display: 'inline-block',
        },
        '& svg': {
          color: theme.palette.background.lighter,
          fill: theme.palette.background.lighter,
        },
        '&:last-child': {
          border: 'none',
        },
      },
    },
  },
}))

export const customLinksStyles = makeStyles(theme => ({
  notes: {},
  viewCardData: {
    maxWidth: 550,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    '& p': {
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.background.darker,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      color: theme.palette.background.lighter,
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      '&$notes': {
        border: 'none',
        marginTop: theme.spacing(1),
        fontSize: '0.9rem',
        '& span': {
          width: '100%',
        },
      },
      '& span': {
        display: 'block',
        width: '50%',
        marginLeft: theme.spacing(1),
        color: theme.palette.background.reverse,
        '&:first-letter': {
          textTransform: 'uppercase',
        },
      },
      '&:last-of-type': {
        border: 'none',
      },
    },
  },
  linksContainer: {
    width: '100%',
    paddingTop: 0,
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  linksContainerBusiness: {
    marginTop: theme.spacing(2),
  },
  link: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    color: theme.palette.background.reverse,
    textDecoration: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    background: 'transparent',
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
    overflow: 'hidden',
    width: '100%',
    textTransform: 'initial',
    '& .MuiTypography-root': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.9rem',
      },
    },
    '& .MuiListItemIcon-root': {
      marginTop: 0,
      marginRight: theme.spacing(1),
      height: 35,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    '& .MuiListItemText-multiline': {
      margin: 0,
      '& span': {
        textTransform: 'capitalize',
      },
    },
    '& p': {
      border: 'none',
      display: 'block',
      textTransform: 'initial',
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  linkArrow: {
    color: theme.palette.background.reverse,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& svg': {
      fontSize: '1rem',
    },
  },
  socialLink: {
    borderRadius: theme.spacing(2),
  },
  businessLink: {
    borderWidth: 0,
    backgroundColor: theme.palette.background.customLinksBackground,
  },
  basicLink: {
    borderRadius: theme.spacing(2),
  },
  linkItem: {
    textAlign: 'left',
  },
}))

export const menuLinksStyles = makeStyles(theme => ({
  menuLinksContainer: {
    maxWidth: 550,
    marginTop: theme.spacing(4),
    margin: '0 auto',
  },
  menuTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.background.lighter,
    textAlign: 'center',
  },
  notes: {},
  viewCardData: {
    maxWidth: 550,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    '& p': {
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.background.darker,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      color: theme.palette.background.lighter,
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      '&$notes': {
        border: 'none',
        marginTop: theme.spacing(1),
        fontSize: '0.9rem',
        '& span': {
          width: '100%',
        },
      },
      '& span': {
        display: 'block',
        width: '50%',
        marginLeft: theme.spacing(1),
        color: theme.palette.background.reverse,
        '&:first-letter': {
          textTransform: 'uppercase',
        },
      },
      '&:last-of-type': {
        border: 'none',
      },
    },
  },
  linksContainer: {
    width: '100%',
    paddingTop: 0,
    marginTop: theme.spacing(1),
  },
  link: {
    display: 'block',
    color: theme.palette.background.reverse,
    textDecoration: 'none',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.background.darker,
    background: theme.palette.background.darker,
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
    overflow: 'hidden',
    width: '100%',
    textTransform: 'capitalize',
    paddingTop: 0,
    paddingBottom: 0,
    '& li': {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      '& .MuiListItemIcon-root': {
        marginTop: 0,
        marginRight: theme.spacing(1),
        height: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      '& .MuiListItemText-multiline': {
        margin: 0,
        '& span': {
          textTransform: 'capitalize',
        },
      },
    },
    '& p': {
      border: 'none',
      display: 'block',
      textTransform: 'initial',
    },
  },
  linkArrow: {
    color: theme.palette.background.reverse,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& svg': {
      fontSize: '1rem',
    },
  },
  socialLink: {
    borderRadius: theme.spacing(1),
  },
  linkItem: {
    textAlign: 'left',
  },
}))

export const headerStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    maxWidth: 550,
    margin: '0 auto',
    paddingBottom: theme.spacing(1),
  },
  content: {
    position: 'relative',
    width: '100%',
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    maxHeight: 550,
    minHeight: 100,
    backgroundColor: theme.palette.background.reverse,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 275,
    [theme.breakpoints.up('xs')]: {
      maxHeight: 550,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      height: 220,
    },
    '&$dbcContent': {
      borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
      maxHeight: 'initial !important',
      height: 'auto',
      marginBottom: theme.spacing(2),
    },
  },
  viewCardAvatar: {
    width: 130,
    height: 130,
    margin: '0 auto',
    bottom: '-19px',
    boxShadow: '0 0 25px rgb(0 0 0 / 40%)',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('xs')]: {
      bottom: '-14px',
      width: 110,
      height: 110,
      boxShadow: '0 0 20px rgb(0 0 0 / 25%)',
    },
  },
  basicViewCardAvatar: {
    width: 210,
    height: 210,
    margin: '0 auto',
    boxShadow: 'none',
    backgroundColor: '#ffffff',
    borderRadius: `${theme.spacing(3)}px 0  0 ${theme.spacing(3)}px`,
    [theme.breakpoints.down('xs')]: {
      width: 210,
      height: 210,
      boxShadow: 'none',
    },
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      width: 175,
      height: 175,
    },
    ['@media (max-width:360px)']: { // eslint-disable-line no-useless-computed-key
      width: 150,
      height: 150,
    },
  },
  placeholderContainer: {
    position: 'absolute',
    right: theme.spacing(1.5),
    left: 'auto',
    bottom: 0,
    top: -16,
    height: 45,
    margin: 'auto',
  },
  placeholderContainerTheme: {
    position: 'absolute',
    left: theme.spacing(1.5),
    right: 'auto',
    bottom: 0,
    top: -16,
    height: 45,
    margin: 'auto',
  },
  logoPlaceholderContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    margin: 'auto',
    width: 45,
    bottom: 5,
    top: 'auto',
  },
  placeholderButtonContainer: {
    position: 'absolute',
    display: 'inline-block',
    marginLeft: theme.spacing(1),
    top: theme.spacing(1),
    '& button': {
      width: 25,
      height: 25,
    },
  },
  logoPlaceholder: {
    '& img': {
      width: 120,
      height: 120,
      [theme.breakpoints.down('xs')]: {
        width: 90,
        height: 90,
      },
    },
  },
  cardContainer: {
    width: '94%',
    marginTop: 170,
    backgroundColor: '#fff',
    borderRadius: theme.spacing(3),
    padding: 0,
    position: 'relative',
    margin: '0 auto',
    '&:after': {
      content: "''",
      position: 'absolute',
      width: '94%',
      height: 132,
      bottom: 0,
      left: '3%',
      boxShadow: '0 0 50px rgb(0 0 0 / 20%)',
      background: 'transparent',
      borderRadius: 27,
      zIndex: 0,
      display: 'block',
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      bottom: 0,
      left: 0,
      display: 'block',
      background: '#fff',
      borderRadius: theme.spacing(3),
      zIndex: 1,
    },
    [theme.breakpoints.down('xs')]: {
      top: 0,
    },
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      maxWidth: 'none',
      marginTop: 130,
    },
  },
  cardDataContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  cardAvatar: {
    width: 300,
    position: 'relative',
    '& $placeholderContainer': {
      width: 110,
      bottom: theme.spacing(1),
      '& span': {
        flexDirection: 'row-reverse',
        '& p': {
          fontSize: '0.7rem',
        },
      },
      '& button': {
        width: 110,
      },
    },
    [theme.breakpoints.down('xs')]: {
      width: 210,
    },
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      width: 175,
    },
    ['@media (max-width:360px)']: { // eslint-disable-line no-useless-computed-key
      width: 150,
    },
  },
  cardData: {
    marginLeft: theme.spacing(2),
    width: '100%',
    position: 'relative',
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      width: '50%',
      marginLeft: theme.spacing(1),
    },
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      // width: '100%',
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      // flexWrap: 'wrap',
      // marginTop: theme.spacing(2),
      // marginBottom: theme.spacing(2),
      // marginLeft: 0,
    },
  },
  viewCardName: {
    color: '#272727',
    textTransform: 'capitalize',
    fontWeight: 700,
    fontSize: '1.8rem',
    lineHeight: '2.1rem',
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '1.5rem',
      lineHeight: '1.8rem',
    },
    ['@media (max-width:430px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '1.3rem',
      lineHeight: '1.5rem',
    },
    ['@media (max-width:375px)']: { // eslint-disable-line no-useless-computed-key
      // textAlign: 'center',
      fontSize: '1.1rem',
      lineHeight: '1.2rem',
      // marginLeft: theme.spacing(0.5),
      // marginRight: theme.spacing(0.5),
    },
  },
  viewCardNameSmall: {
    fontSize: '1.7rem',
    lineHeight: '2rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
      lineHeight: '1.5rem',
    },
    ['@media (max-width:430px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '1rem',
      lineHeight: '1.2rem',
    },
    ['@media (max-width:375px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '0.9rem',
      lineHeight: '1rem',
    },
    ['@media (max-width:360px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '0.75rem',
      lineHeight: '0.85rem',
    },
  },
  viewCardTitle: {
    color: '#272727',
    opacity: 0.6,
    fontSize: '1rem',
    textTransform: 'capitalize',
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '0.8rem',
    },
    ['@media (max-width:375px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '0.7rem',
    },
  },
  viewCardContacts: {
    position: 'relative',
    marginTop: theme.spacing(1),
  },
  viewCardEmail: {
    fontSize: '1rem',
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '0.8rem',
    },
    ['@media (max-width:375px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '0.7rem',
    },
  },
  cardContacts: {
    backgroundColor: '#eee',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(3),
    ['@media (max-width:479px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.75),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(0.5),
      borderRadius: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      textAlign: 'center',
      borderRadius: theme.spacing(2),
    },
  },
  viewCardPhone: {
    color: '#272727',
    fontSize: '0.8rem',
  },
  image: {
    width: '100%',
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    position: 'absolute',
    '&$dbcImage': {
      borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
    },
  },
  bannerLoadingProgress: {
    color: theme.palette.background.default,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
  },
  loggedoutRightMenu: {
    position: 'absolute',
    top: 0,
    right: theme.spacing(1.5),
    zIndex: 1,
  },
  loginIconButton: {
    color: theme.palette.background.default,
  },
}))

export const socialLinksViewStyles = makeStyles(theme => ({
  viewCardLinksContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    flexWrap: 'wrap',
    maxWidth: 400,
    margin: '0 auto',
  },
  socialViewCardLinksContainer: {
    maxWidth: 550,
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    gap: theme.spacing(2),
    // [theme.breakpoints.down('xs')]: {
    //   maxWidth: 405,
    // },
    // ['@media (max-width:455px)']: { // eslint-disable-line no-useless-computed-key
    //   maxWidth: 390,
    // },
    // ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
    //   maxWidth: 325,
    // },
    // ['@media (max-width:355px)']: { // eslint-disable-line no-useless-computed-key
    //   maxWidth: 270,
    // },
    '&$socialViewCardLinksContainerCentered': {
      justifyContent: 'center',
    },
  },
  socialViewCardLinksContainerCentered: {
    justifyContent: 'center',
  },
  socialViewButton: {
    margin: '0 !important',
    minWidth: '100px !important',
    width: '100% !important',
    minHeight: 100,
    maxWidth: 'calc((100% / 4) - 16px)',
    flexGrow: 1,
    boxShadow: `0 3px 8px ${theme.palette.background.shadow}`,
    ['@media (max-width:494px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '95px !important',
      minHeight: 95,
    },
    ['@media (max-width:479px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '92px !important',
      minHeight: 92,
    },
    ['@media (max-width:462px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '90px !important',
      minHeight: 90,
    },
    ['@media (max-width:454px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '87px !important',
      minHeight: 87,
    },
    ['@media (max-width:444px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '82px !important',
      minHeight: 82,
    },
    ['@media (max-width:423px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '75px !important',
      minHeight: 75,
    },
    ['@media (max-width:399px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '70px !important',
      minHeight: 70,
    },
    ['@media (max-width:379px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '65px !important',
      minHeight: 65,
    },
    ['@media (max-width:354px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '62px !important',
      minHeight: 62,
    },
    ['@media (max-width:342px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '60px !important',
      minHeight: 60,
    },
    ['@media (max-width:334px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '55px !important',
      minHeight: 55,
    },
  },
  basicViewCardLinksContainer: {
    maxWidth: 430,
    justifyContent: 'flex-start',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      maxWidth: 405,
    },
    ['@media (max-width:455px)']: { // eslint-disable-line no-useless-computed-key
      maxWidth: 325,
    },
    ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
      maxWidth: 325,
    },
    ['@media (max-width:355px)']: { // eslint-disable-line no-useless-computed-key
      maxWidth: 270,
    },
    '&$socialViewCardLinksContainerCentered': {
      justifyContent: 'center',
    },
  },
  socialLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: '50%',
    borderWidth: 1,
    borderStyle: 'solid',
    margin: theme.spacing(1),
    minWidth: 'auto',
  },
  largeSocialLink: {
    width: 62,
    height: 62,
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: 60,
      height: 60,
    },
    ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
      margin: 6,
    },
    ['@media (max-width:355px)']: { // eslint-disable-line no-useless-computed-key
      width: 55,
      height: 55,
    },
    '& svg': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '32px !important',
      },
    },
  },
  basicSocialLink: {
    width: 70,
    height: 70,
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: 65,
      height: 65,
    },
    ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
      margin: 6,
    },
    ['@media (max-width:355px)']: { // eslint-disable-line no-useless-computed-key
      width: 55,
      height: 55,
    },
    '& svg': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '32px !important',
      },
    },
  },
  businessSocialLink: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    [theme.breakpoints.down('xs')]: {
      width: 40,
      height: 40,
    },
    ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
      margin: 6,
    },
    ['@media (max-width:355px)']: { // eslint-disable-line no-useless-computed-key
      width: 40,
      height: 40,
    },
    '& svg': {
      fontSize: 24,
    },
  },
}))

export const actionButtonsStyles = makeStyles(theme => ({
  viewCardActionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 0,
    paddingBottom: 0,
    maxWidth: 550,
    margin: '0 auto',
    '& .MuiBox-root': {
      '&:first-child': {
        marginRight: theme.spacing(1.5),
        [theme.breakpoints.down('xs')]: {
          flex: 3,
          // marginRight: theme.spacing(1.5),
        },
      },
      '&:last-child': {
        [theme.breakpoints.down('xs')]: {
          flex: 1,
        },
      },
    },
  },
  contactAddedMessage: {
    opacity: 0.5,
    fontSize: '0.8rem',
  },
  basicContactAddedMessage: {
    color: '#272727',
    opacity: 0.6,
  },
  squareViewActionButton: {},
  squareViewActionButtonIcon: {},
  viewActionButton: {
    minWidth: 430,
    width: 430,
    margin: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      minWidth: 'initial',
      width: '100%',
      fontSize: '0.9rem',
      margin: 0,
    },
    '& .MuiCircularProgress-root': {
      position: 'absolute',
      right: theme.spacing(2),
      top: 0,
      bottom: 0,
      margin: 'auto',
    },
    // '&$squareViewActionButton': {
    //   width: 130,
    //   position: 'relative',
    //   '&:after': {
    //     content: "''",
    //     position: 'absolute',
    //     width: 130,
    //     height: 65,
    //     bottom: 0,
    //     boxShadow: '0 0 50px rgb(0 0 0 / 20%)',
    //     background: 'transparent',
    //     borderRadius: 100,
    //     zIndex: -1,
    //     display: 'block',
    //     left: 0,
    //   },
    //   '&:before': {
    //     content: "''",
    //     position: 'absolute',
    //     width: '100%',
    //     height: '100%',
    //     bottom: 0,
    //     left: 0,
    //     display: 'block',
    //     background: '#fff',
    //     borderRadius: 100,
    //     zIndex: -1,
    //   },
    // },
  },
  viewActionButtonIcon: {
    width: 100,
    minWidth: 100,
    gap: 12,
    [theme.breakpoints.down('xs')]: {
      minWidth: 'initial',
      width: '100%',
    },
    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // '&$squareViewActionButtonIcon': {
    //   width: 65,
    //   border: 'none',
    //   backgroundColor: '#fff',
    //   position: 'relative',
    //   '&:after': {
    //     content: "''",
    //     position: 'absolute',
    //     width: 65,
    //     height: 65,
    //     bottom: 0,
    //     boxShadow: '0 0 50px rgb(0 0 0 / 20%)',
    //     background: 'transparent',
    //     borderRadius: 100,
    //     zIndex: -1,
    //     display: 'block',
    //     left: 0,
    //   },
    //   '&:before': {
    //     content: "''",
    //     position: 'absolute',
    //     width: '100%',
    //     height: '100%',
    //     bottom: 0,
    //     left: 0,
    //     display: 'block',
    //     background: '#fff',
    //     borderRadius: 100,
    //     zIndex: -1,
    //   },
    // },
  },
  basicViewActionButton: {
    minWidth: 200,
    borderRadius: theme.spacing(2),
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '50%',
    },
  },
  basicActionButtonContainer: {
    '& button': {
      ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
        width: '100%',
      },
      ['@media (max-width:340px)']: { // eslint-disable-line no-useless-computed-key
        margin: 0,
      },
    },
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      width: '49%',
      margin: '0 0.5%',
    },
    ['@media (max-width:340px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      margin: '2%',
    },
  },
  socialActionButtonContainer: {
    flex: '1 !important',
  },
  socialActionButton: {
    boxShadow: `0 3px 8px ${theme.palette.background.shadow}`,
    fontWeight: 600,
    fontSize: '0.9rem',
    width: '100%',
    minWidth: 'initial',
  },
  // squareActionButton: {
  //   // boxShadow: `0 3px 8px ${theme.palette.background.shadow}`,
  //   fontWeight: 600,
  //   fontSize: '0.9rem',
  //   width: '100%',
  //   minWidth: 'initial',
  //   height: 65,
  //   borderRadius: '100px !important',
  // },
  // viewCardSquareActionsContainer: {
  //   position: 'absolute',
  //   top: -75,
  //   right: theme.spacing(3),
  // },
  // squareActionButtonContainer: {
  //   position: 'relative',
  // },
}))

export const businessViewStyles = makeStyles(theme => ({
  placeholderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderButtonContainer: {
    position: 'absolute',
    display: 'inline-block',
    marginLeft: theme.spacing(1),
    top: theme.spacing(1),
    '& button': {
      width: 25,
      height: 25,
    },
  },
  viewCardName: {
    textTransform: 'capitalize',
    color: theme.palette.background.reverse,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(1),
    lineHeight: 1.4,
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
  viewCardAbout: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: theme.palette.background.reverse,
    fontSize: '0.8rem',
    '& span': {
      marginLeft: theme.spacing(0.5),
    },
  },
  viewCardPhone: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: theme.palette.background.reverse,
    fontSize: '0.8rem',
  },
  viewCardMessage: {
    maxWidth: 400,
    margin: '0 auto',
  },
  emailContainer: {
    marginTop: theme.spacing(1),
    marginBottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.background.reverse,
    },
  },
  infoButtonContainer: {
    position: 'fixed',
    bottom: 0,
    height: 50,
    left: 0,
    right: 0,
    margin: '0 auto',
    maxWidth: 550,
    background: theme.palette.background.reverse,
    borderRadius: `${theme.spacing(3)}px ${theme.spacing(3)}px 0 0`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  businessViewInfoContainer: {
    marginBottom: theme.spacing(3),
    position: 'relative',
  },
  businessInfoButtonContainer: {
    borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`,
  },
  bioContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(3.5),
    marginBottom: theme.spacing(2),
    maxWidth: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    '& p': {
      fontSize: '0.9rem',
      color: theme.palette.background.reverse,
      lineHeight: '1.5rem',
    },
  },
  bioVideoContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing(3.5),
    maxWidth: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  contactsContainer: {
    marginTop: theme.spacing(2),
    maxWidth: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    '& ul': {
      margin: 0,
      padding: 0,
      '& li': {
        borderBottom: `1px solid ${theme.palette.background.lightBorder}`,
        '& a': {
          color: theme.palette.background.reverse,
          fontSize: '0.9rem',
          textDecoration: 'none',
          display: 'block',
          padding: theme.spacing(1),
        },
        '& p': {
          color: theme.palette.background.reverse,
          fontSize: '0.9rem',
          padding: theme.spacing(1),
          margin: 0,
        },
        '& svg': {
          color: theme.palette.background.lighter,
          fill: theme.palette.background.lighter,
        },
        '&:last-child': {
          border: 'none',
        },
      },
    },
  },
  videoContainer: {
    width: '100%',
    height: 300,
    backgroundColor: theme.palette.background.lighter,
    borderRadius: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
    maxWidth: 550,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
    '& p': {
      color: theme.palette.background.default,
      opacity: 0.6,
      position: 'absolute',
      width: 210,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      textAlign: 'center',
      height: 50,
      '& b': {
        display: 'block',
      },
    },
    '& div': {
      position: 'relative',
      zIndex: 2,
    },
  },
  mapContainer: {
    width: '100%',
    height: 300,
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    marginTop: theme.spacing(2),
  },
  mapMarker: {
    color: '#272727',
    fontSize: 16,
    '& svg': {
      color: '#272727',
      fontSize: 16,
    },
  },
  marker: {
    position: 'relative',
    '& p': {
      width: 200,
      backgroundColor: '#888',
      color: '#fff',
      padding: 4,
      textAlign: 'center',
      fontSize: 12,
      borderRadius: 4,
      position: 'absolute',
      top: 0,
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      margin: 'auto',
    },
  },
}))

export const squareHeaderStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    maxWidth: 550,
    margin: '0 auto',
    paddingBottom: theme.spacing(1),
  },
  noImageContainer: {
    paddingTop: theme.spacing(8),
  },
  dbcContent: {},
  squareContent: {
    position: 'relative',
    width: '100%',
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    maxHeight: 550,
    overflow: 'hidden',
    minHeight: 100,
    backgroundColor: theme.palette.background.reverse,
    [theme.breakpoints.up('xs')]: {
      height: 550,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  content: {
    position: 'relative',
    width: '100%',
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    maxHeight: 550,
    overflow: 'hidden',
    minHeight: 100,
    backgroundColor: theme.palette.background.reverse,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 275,
    [theme.breakpoints.up('xs')]: {
      maxHeight: 550,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '&$dbcContent': {
      borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
      maxHeight: 'initial !important',
      height: 'auto',
      marginBottom: theme.spacing(2),
    },
  },
  businessContent: {
    position: 'relative',
    width: '100%',
    borderRadius: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    maxHeight: 550,
    overflow: 'hidden',
    minHeight: 100,
    backgroundColor: theme.palette.background.reverse,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 275,
    [theme.breakpoints.up('xs')]: {
      maxHeight: 550,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '&$dbcContent': {
      borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
      maxHeight: 'initial !important',
      height: 'auto',
      marginBottom: theme.spacing(2),
    },
  },
  cardLogo: {
    position: 'absolute',
    zIndex: 2,
    bottom: -50,
    [theme.breakpoints.down('xs')]: {
      bottom: -40,
    },
  },
  viewCardLogo: {
    width: 130,
    height: 130,
    margin: '0 auto',
    boxShadow: '0 0 25px rgb(0 0 0 / 40%)',
    backgroundColor: '#ffffff',
    border: `4px solid ${theme.palette.background.light}`,
    [theme.breakpoints.down('xs')]: {
      width: 110,
      height: 110,
      boxShadow: '0 0 20px rgb(0 0 0 / 25%)',
    },
  },
  viewCardBusinessLogo: {
    boxShadow: '0 0 0 transparent',
  },
  squareLogo: {
    borderRadius: theme.spacing(2),
  },
  businessSquareLogo: {
    borderRadius: theme.spacing(1),
    borderWidth: 2,
  },
  headerWithOutImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.reverse,
  },
  headerWithImage: {
    backgroundColor: theme.palette.background.reverse,
  },
  dbcImage: {},
  image: {
    width: '100%',
    borderRadius: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    '&$dbcImage': {
      borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
    },
  },
  info: {
    position: 'absolute',
    width: '100%',
    minHeight: 150,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  viewCardName: {
    textTransform: 'capitalize',
    color: '#ffffff',
    fontSize: '1.8rem',
    // fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    fontWeight: 300,
    lineHeight: '1.8rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
      marginTop: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(5),
    },
  },
  viewCardAbout: {
    fontSize: '0.8rem',
    fontWeight: 300,
  },
  email: {
    color: '#ffffff',
    textDecoration: 'none',
    opacity: 0.6,
  },
  placeholderContainer: {
    position: 'absolute',
    right: theme.spacing(1.5),
    left: 'auto',
    bottom: theme.spacing(1.5),
    top: 'auto',
  },
  placeholderContainerTheme: {
    position: 'absolute',
    left: theme.spacing(1.5),
    right: 'auto',
    bottom: theme.spacing(1.5),
    top: 'auto',
    ['@media (max-width:550px)']: { // eslint-disable-line no-useless-computed-key
      left: theme.spacing(0.5),
    },
  },
  dbcLoadingProgress: {},
  bannerLoadingProgress: {
    color: theme.palette.background.default,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
  },
  placeholderImage: {
    alignSelf: 'center',
    minWidth: 200,
    borderRadius: 0,
    width: 'auto',
    margin: '0 auto',
  },
  logoPlaceholderContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    margin: 'auto',
    width: 45,
    bottom: 5,
    top: 'auto',
  },
  logoPlaceholder: {
    '& img': {
      width: 120,
      height: 120,
      [theme.breakpoints.down('xs')]: {
        width: 90,
        height: 90,
      },
    },
  },
  loggedoutRightMenu: {
    position: 'absolute',
    top: 0,
    right: theme.spacing(1.5),
    zIndex: 1,
  },
  loginIconButton: {
    color: theme.palette.background.default,
  },
  squareHeaderData: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    background: 'linear-gradient(0deg, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 100%)',
    padding: theme.spacing(2),
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& p': {
      textAlign: 'left',
      color: '#fff',
      margin: 0,
      position: 'relative',
      '& span': {
        position: 'absolute',
      },
    },
  },
}))

export const socialHeaderStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    maxWidth: 550,
    margin: '0 auto',
    paddingBottom: theme.spacing(1),
  },
  noImageContainer: {
    paddingTop: theme.spacing(8),
  },
  dbcContent: {},
  squareContent: {
    position: 'relative',
    width: '100%',
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    maxHeight: 550,
    overflow: 'hidden',
    minHeight: 100,
    backgroundColor: theme.palette.background.reverse,
    [theme.breakpoints.up('xs')]: {
      height: 550,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  content: {
    position: 'relative',
    width: '100%',
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    maxHeight: 550,
    overflow: 'hidden',
    minHeight: 100,
    backgroundColor: theme.palette.background.reverse,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 275,
    [theme.breakpoints.up('xs')]: {
      maxHeight: 550,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '&$dbcContent': {
      borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
      maxHeight: 'initial !important',
      height: 'auto',
      marginBottom: theme.spacing(2),
    },
  },
  businessContent: {
    position: 'relative',
    width: '100%',
    borderRadius: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    maxHeight: 550,
    overflow: 'hidden',
    minHeight: 100,
    backgroundColor: theme.palette.background.reverse,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 275,
    [theme.breakpoints.up('xs')]: {
      maxHeight: 550,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '&$dbcContent': {
      borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
      maxHeight: 'initial !important',
      height: 'auto',
      marginBottom: theme.spacing(2),
    },
  },
  cardLogo: {
    position: 'absolute',
    zIndex: 2,
    bottom: -50,
    [theme.breakpoints.down('xs')]: {
      bottom: -40,
    },
  },
  viewCardLogo: {
    width: 130,
    height: 130,
    margin: '0 auto',
    boxShadow: '0 0 25px rgb(0 0 0 / 40%)',
    backgroundColor: '#ffffff',
    border: `4px solid ${theme.palette.background.light}`,
    [theme.breakpoints.down('xs')]: {
      width: 110,
      height: 110,
      boxShadow: '0 0 20px rgb(0 0 0 / 25%)',
    },
  },
  viewCardBusinessLogo: {
    boxShadow: '0 0 0 transparent',
  },
  squareLogo: {
    borderRadius: theme.spacing(2),
  },
  businessSquareLogo: {
    borderRadius: theme.spacing(1),
    borderWidth: 2,
  },
  headerWithOutImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.reverse,
  },
  headerWithImage: {
    backgroundColor: theme.palette.background.reverse,
  },
  dbcImage: {},
  image: {
    width: '100%',
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    '&$dbcImage': {
      borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
    },
  },
  info: {
    position: 'absolute',
    width: '100%',
    minHeight: 150,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  viewCardName: {
    textTransform: 'capitalize',
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(5),
    },
  },
  email: {
    color: '#ffffff',
    textDecoration: 'none',
    opacity: 0.6,
  },
  placeholderContainer: {
    position: 'absolute',
    right: theme.spacing(1.5),
    left: 'auto',
    bottom: theme.spacing(1.5),
    top: 'auto',
  },
  placeholderContainerTheme: {
    position: 'absolute',
    left: theme.spacing(1.5),
    right: 'auto',
    bottom: theme.spacing(1.5),
    top: 'auto',
    ['@media (max-width:550px)']: { // eslint-disable-line no-useless-computed-key
      left: theme.spacing(0.5),
    },
  },
  dbcLoadingProgress: {},
  bannerLoadingProgress: {
    color: theme.palette.background.default,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
  },
  placeholderImage: {
    alignSelf: 'center',
    minWidth: 200,
    borderRadius: 0,
    width: 'auto',
    margin: '0 auto',
  },
  logoPlaceholderContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    margin: 'auto',
    width: 45,
    bottom: 5,
    top: 'auto',
  },
  logoPlaceholder: {
    '& img': {
      width: 120,
      height: 120,
      [theme.breakpoints.down('xs')]: {
        width: 90,
        height: 90,
      },
    },
  },
  loggedoutRightMenu: {
    position: 'absolute',
    top: 0,
    right: theme.spacing(1.5),
    zIndex: 1,
  },
  loginIconButton: {
    color: theme.palette.background.default,
  },
}))

export const socialViewStyles = makeStyles(theme => ({
  placeholderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderButtonContainer: {
    position: 'absolute',
    display: 'inline-block',
    marginLeft: theme.spacing(1),
    top: theme.spacing(1),
    '& button': {
      width: 25,
      height: 25,
    },
  },
  viewCardName: {
    textTransform: 'capitalize',
    color: theme.palette.background.default,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(5),
    },
  },
  viewCardAbout: {
    color: theme.palette.background.reverse,
    marginTop: 0,
    maxWidth: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '0.8rem',
    textAlign: 'center',
  },
  viewCardMessage: {
    maxWidth: 400,
    margin: '0 auto',
  },
  emailContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
    },
  },
  SocialViewInfoContainer: {
    marginBottom: theme.spacing(3),
    position: 'relative',
    '& $viewCardName': {
      color: theme.palette.background.reverse,
      marginTop: 0,
    },
    '& $emailContainer': {
      marginTop: 0,
      '& a': {
        color: theme.palette.background.reverse,
        opacity: 0.75,
      },
    },
  },
  infoButtonContainer: {
    position: 'fixed',
    bottom: 0,
    height: 50,
    left: 0,
    right: 0,
    margin: '0 auto',
    maxWidth: 550,
    background: theme.palette.background.reverse,
    borderRadius: `${theme.spacing(3)}px ${theme.spacing(3)}px 0 0`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  squareBioContainer: {},
  bioContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(3.5),
    maxWidth: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    '& p': {
      fontSize: '0.9rem',
      color: theme.palette.background.reverse,
      lineHeight: '1.5rem',
    },
    '&$squareBioContainer': {
      marginTop: theme.spacing(2.5),
    },
  },
  bioVideoContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing(3.5),
    maxWidth: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  contactsContainer: {
    marginTop: theme.spacing(2),
    maxWidth: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    '& ul': {
      margin: 0,
      padding: 0,
      '& li': {
        borderBottom: `1px solid ${theme.palette.background.lightBorder}`,
        '& a': {
          color: theme.palette.background.reverse,
          fontSize: '0.9rem',
          textDecoration: 'none',
          display: 'block',
          padding: theme.spacing(1),
        },
        '& p': {
          color: theme.palette.background.reverse,
          fontSize: '0.9rem',
          padding: theme.spacing(1),
          margin: 0,
        },
        '& svg': {
          color: theme.palette.background.lighter,
          fill: theme.palette.background.lighter,
        },
        '&:last-child': {
          border: 'none',
        },
      },
    },
  },
  videoContainer: {
    width: '100%',
    height: 300,
    backgroundColor: theme.palette.background.lighter,
    borderRadius: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
    maxWidth: 550,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
    '& p': {
      color: theme.palette.background.default,
      opacity: 0.6,
      position: 'absolute',
      width: 210,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      textAlign: 'center',
      height: 50,
      '& b': {
        display: 'block',
      },
    },
    '& div': {
      position: 'relative',
      zIndex: 2,
    },
  },
  mapContainer: {
    width: '100%',
    height: 300,
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    marginTop: theme.spacing(2),
  },
  mapMarker: {
    color: '#272727',
    fontSize: 16,
    '& svg': {
      color: '#272727',
      fontSize: 16,
    },
  },
  marker: {
    position: 'relative',
    '& p': {
      width: 200,
      backgroundColor: '#888',
      color: '#fff',
      padding: 4,
      textAlign: 'center',
      fontSize: 12,
      borderRadius: 4,
      position: 'absolute',
      top: 0,
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      margin: 'auto',
    },
  },
}))

export const basicViewStyles = makeStyles(theme => ({
  placeholderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCardName: {
    textTransform: 'capitalize',
    color: theme.palette.background.default,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(5),
    },
  },
  viewCardMessage: {
    maxWidth: 400,
    margin: '0 auto',
  },
  emailContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: 600,
    '& a': {
      textDecoration: 'none',
    },
  },
  viewCardPhone: {
    fontWeight: 600,
  },
  SocialViewInfoContainer: {
    marginBottom: theme.spacing(2),
    '& $viewCardName': {
      color: theme.palette.background.reverse,
      marginTop: 0,
    },
    '& $emailContainer': {
      marginTop: 0,
      '& a': {
        color: theme.palette.background.reverse,
        opacity: 0.75,
      },
    },
  },
  infoButtonContainer: {
    position: 'fixed',
    bottom: 0,
    height: 50,
    left: 0,
    right: 0,
    margin: '0 auto',
    maxWidth: 550,
    background: theme.palette.background.reverse,
    borderRadius: `${theme.spacing(3)}px ${theme.spacing(3)}px 0 0`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
}))

export const linkDetailsDialogStyles = makeStyles(theme => ({
  dialogContentContainer: {
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  darkDialogText: {
    color: '#272727',
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: '#ffffff',
        border: '1px solid #272727',
      },
    },
    '& $titleContainer': {
      color: '#272727',
    },
    '& $dialogContentContainer': {
      color: '#272727',
    },
  },
  dialogContainer: {
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${theme.spacing(4)}px)`,
      margin: theme.spacing(2),
    },
  },
  dialogHeader: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      top: 0,
    },
  },
  dialogClose: {
    position: 'absolute',
    right: theme.spacing(3),
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: 30,
    height: 30,
  },
  titleContainer: {
    color: '#fff',
    position: 'relative',
    '& h2': {
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
      textTransform: 'capitalize',
    },
    '& svg': {
      fontSize: 20,
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    textAlign: 'center',
    color: '#212121',
    '& h2': {
      fontSize: '0.9rem',
    },
  },
  clickedNoText: {
    marginRight: 0,
    marginLeft: 'auto',
    fontSize: '0.8rem',
    opacity: 0.75,
  },
  dialogContent: {
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: 0,
    padding: 0,
    position: 'relative',
    paddingBottom: 0,
    marginBottom: 0,
    '& textarea': {
      '&.MuiInputBase-input': {
        color: '#ffffff',
      },
    },
    '& .MuiListItemText-multiline': {
      margin: 0,
      textTransform: 'capitalize',
    },
    '& .MuiFormControl-root': {
      '& .MuiFormLabel-root': {
        color: '#fff',
        opacity: 0.5,
      },
      '& .MuiInput-root': {
        '& input': {
          color: '#ffffff',
          '&.Mui-disabled': {
            color: '#ffffff50',
          },
        },
        '&.MuiInput-underline': {
          '&:after': {
            borderBottomColor: '#fff',
          },
          '&:before': {
            borderBottomColor: '#fff',
          },
          '&:hover': {
            '&:not(.Mui-disabled)': {
              '&:before': {
                borderBottomColor: '#fff',
              },
            },
          },
        },
      },
      '& .MuiFormHelperText-root': {
        '&.Mui-error': {
          backgroundColor: '#fff',
          padding: theme.spacing(0.5),
          borderRadius: theme.spacing(0.5),
          fontWeight: 'bold',
        },
      },
    },
    '& .MuiTypography-colorTextSecondary': {
      opacity: 0.5,
    },
    // '& .MuiGrid-grid-xs-12': {
    //   '& > .MuiBox-root': {
    //     marginBottom: 0,
    //   },
    // },
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
  noteText: {
    color: '#272727',
  },
  linkItemDark: {
    '& .MuiListItemText-multiline': {
      color: '#000000',
    },
    '& .MuiFormControl-root': {
      '& .MuiFormLabel-root': {
        color: '#000000',
        opacity: 0.5,
      },
      '& .MuiInput-root': {
        '& input': {
          color: '#000000',
          '&.Mui-disabled': {
            color: '#00000050',
          },
        },
        '&.MuiInput-underline': {
          '&:after': {
            borderBottomColor: '#000000',
          },
          '&:before': {
            borderBottomColor: '#000000',
          },
          '&:hover': {
            '&:not(.Mui-disabled)': {
              '&:before': {
                borderBottomColor: '#000000',
              },
            },
          },
        },
      },
    },
  },
  linkFormContainer: {
    width: '100%',
  },
  LinkFormSwitchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    '& p': {
      opacity: 1,
    },
    '& .MuiSwitch-thumb': {
      color: '#272727',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      '& .MuiSwitch-thumb': {
        color: '#ffffff',
      },
    },
  },
  linkItemSwitch: {
    top: theme.spacing(1.5),
    transform: 'initial',
    '& .MuiSwitch-thumb': {
      backgroundColor: '#272727',
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#272727',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#ffffff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#ffffff',
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#ffffff',
      },
    },
  },
  linkItemSwitchDark: {
    top: theme.spacing(1.5),
    transform: 'initial',
    '& .MuiSwitch-thumb': {
      backgroundColor: '#272727',
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#272727',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#000000',
      '& + .MuiSwitch-track': {
        backgroundColor: '#000000',
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#000000',
      },
    },
  },
  LinkFormDefaultContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: 0,
  },
  descriptionText: {
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: '0.8rem',
    opacity: 0.75,
  },
  dialogButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export const addCustomLinkDialogStyles = makeStyles(theme => ({
  dialogContentContainer: {
    color: '#272727',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  dialogContainer: {
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${theme.spacing(4)}px)`,
      margin: theme.spacing(2),
    },
  },
  dialogHeader: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      top: 0,
    },
  },
  dialogClose: {
    position: 'absolute',
    right: theme.spacing(3),
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: 30,
    height: 30,
  },
  titleContainer: {
    color: '#272727',
    backgroundColor: '#fff',
    position: 'relative',
    '& h2': {
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    '& svg': {
      fontSize: 20,
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    textAlign: 'center',
    color: '#212121',
    '& h2': {
      fontSize: '0.9rem',
    },
  },
  dialogContent: {
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: 0,
    padding: 0,
    position: 'relative',
    paddingBottom: 0,
    marginBottom: 0,
    '& textarea': {
      '&.MuiInputBase-input': {
        color: '#272727',
      },
    },
    '& .MuiListItemText-multiline': {
      margin: 0,
      textTransform: 'capitalize',
    },
    '& .MuiFormControl-root': {
      '& .MuiFormLabel-root': {
        color: '#272727',
        opacity: 0.5,
      },
      '& .MuiInput-root': {
        '& input': {
          color: '#272727',
          '&.Mui-disabled': {
            color: '#ffffff50',
          },
        },
        '&.MuiInput-underline': {
          '&:after': {
            borderBottomColor: '#272727',
          },
          '&:before': {
            borderBottomColor: '#272727',
          },
          '&:hover': {
            '&:not(.Mui-disabled)': {
              '&:before': {
                borderBottomColor: '#272727',
              },
            },
          },
        },
      },
      '& .MuiFormHelperText-root': {
        '&.Mui-error': {
          backgroundColor: '#272727',
          padding: theme.spacing(0.5),
          borderRadius: theme.spacing(0.5),
          fontWeight: 'bold',
        },
      },
    },
    '& .MuiTypography-colorTextSecondary': {
      opacity: 0.5,
    },
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
  linkFormContainer: {
    width: '100%',
  },
  dialogButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& button': {
      minWidth: 200,
    },
  },
}))

export const redirectProfileStyles = makeStyles(theme => ({
  redirectSocialLinksContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  redirectCutomLinkItem: {
    paddingLeft: theme.spacing(0.4),
    cursor: 'pointer',
  },
  selectedCustomRedirect: {
    backgroundColor: '#00c1af',
    paddingLeft: theme.spacing(1),
    borderRadius: theme.spacing(1),
    '& .MuiBox-root': {
      color: '#fff',
    },
  },
}))

export const selectRedirectLinkDialogStyles = makeStyles(theme => ({
  dialogContentContainer: {
    color: '#272727',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  dialogContainer: {
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${theme.spacing(4)}px)`,
      margin: theme.spacing(2),
    },
  },
  dialogHeader: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      top: 0,
    },
  },
  dialogClose: {
    position: 'absolute',
    right: theme.spacing(3),
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: 30,
    height: 30,
  },
  titleContainer: {
    color: '#272727',
    backgroundColor: '#fff',
    position: 'relative',
    '& h2': {
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    '& svg': {
      fontSize: 20,
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    textAlign: 'center',
    color: '#212121',
    '& h2': {
      fontSize: '0.9rem',
    },
  },
  dialogContent: {
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: 0,
    padding: 0,
    position: 'relative',
    paddingBottom: 0,
    marginBottom: 0,
    '& textarea': {
      '&.MuiInputBase-input': {
        color: '#272727',
      },
    },
    '& .MuiListItemText-multiline': {
      margin: 0,
      textTransform: 'capitalize',
    },
    '& .MuiFormControl-root': {
      '& .MuiFormLabel-root': {
        color: '#272727',
        opacity: 0.5,
      },
      '& .MuiInput-root': {
        '& input': {
          color: '#272727',
          '&.Mui-disabled': {
            color: '#ffffff50',
          },
        },
        '&.MuiInput-underline': {
          '&:after': {
            borderBottomColor: '#272727',
          },
          '&:before': {
            borderBottomColor: '#272727',
          },
          '&:hover': {
            '&:not(.Mui-disabled)': {
              '&:before': {
                borderBottomColor: '#272727',
              },
            },
          },
        },
      },
      '& .MuiFormHelperText-root': {
        '&.Mui-error': {
          backgroundColor: '#272727',
          padding: theme.spacing(0.5),
          borderRadius: theme.spacing(0.5),
          fontWeight: 'bold',
        },
      },
    },
    '& .MuiTypography-colorTextSecondary': {
      opacity: 0.5,
    },
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
  linkFormContainer: {
    width: '100%',
  },
  dialogButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& button': {
      minWidth: 200,
    },
  },
}))
