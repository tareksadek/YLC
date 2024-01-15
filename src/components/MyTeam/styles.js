import { makeStyles } from '@material-ui/core/styles'

export const listStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  connectionsList: {
    width: '100%',
    height: '100%',
    position: 'relative',
    '& .MuiListItem-container': {
      backgroundColor: '#eee',
      borderRadius: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  myTeamList: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
}))

export const connectionStyles = makeStyles(theme => ({
  connectionSkeletonContainer: {
    width: '100%',
    background: '#eee',
    borderRadius: theme.spacing(1),
  },
  connectionItemContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    minHeight: 75,
    borderBottom: `1px solid ${theme.palette.background.dark}`,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  connectionItemAvatarContainer: {
    width: 35,
    minWidth: 35,
    marginRight: theme.spacing(1),
  },
  connectionItemAvatar: {
    backgroundColor: '#ccc',
    border: '1px solid #bbb',
    width: 35,
    height: 35,
  },
  connectionItemTextContainer: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: theme.palette.background.default,
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
    right: 0,
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
    color: theme.palette.background.reverse,
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
  connectionNameText: {
    fontSize: '0.8rem',
  },
  inactiveIcon: {
    position: 'relative',
    top: 5,
    fontSize: 18,
    color: '#ff2222',
  },
  menuAnchor: {
    '& svg': {
      color: theme.palette.background.reverse,
    },
  },
  FollowerSkeleton: {
    display: 'flex',
    alignItems: 'center',
    '& span': {
      '&:first-child': {
        flexShrink: 0,
      },
      '&:last-child': {
        minWidth: 175,
      },
    },
  },
  teamCardContainer: {
    width: 180,
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1),
    ['@media (max-width:640px)']: { // eslint-disable-line no-useless-computed-key
      width: '46%',
      margin: '2%',
    },
    ['@media (max-width:400px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      margin: theme.spacing(1),
    },
  },
  teamCardMedia: {
    height: 180,
  },
  teamCardName: {
    color: theme.palette.background.default,
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: 0,
    textAlign: 'center',
  },
  teamCardEmail: {
    opacity: 0.75,
    textAlign: 'center',
    fontSize: '0.8rem',
  },
  teamCardActionsContainer: {
    flexDirection: 'column',
  },
  teamCardAction: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.reverse,
    width: '100%',
    borderRadius: theme.spacing(0.5),
    margin: '0 0 4px 0 !important',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.background.reverse,
      opacity: 0.75,
    },
  },
  redirectChip: {
    backgroundColor: '#ffc248',
    marginRight: theme.spacing(1),
    '& span': {
      fontWeight: 400,
      fontSize: '0.7rem',
      backgroundColor: 'transparent',
      paddingRight: theme.spacing(1),
      opacity: 0.8,
    },
  },
  lockChip: {
    backgroundColor: '#ff7c7c',
    '& span': {
      fontWeight: 400,
      fontSize: '0.7rem',
      backgroundColor: 'transparent',
      paddingRight: theme.spacing(1),
      opacity: 0.8,
    },
  },
}))

export const connectionNoteDialogStyles = makeStyles(theme => ({
  connectionsActionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderRadius: theme.spacing(2),
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
    textTransform: 'capitalize',
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
    marginTop: 0,
    padding: 0,
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
  shareButtonText: {
    marginLeft: theme.spacing(1),
    color: '#212121',
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
  noteText: {
    color: '#272727',
  },
  downloadCSV: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(0),
    width: 100,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: '1rem',
    },
  },
  downloadMenu: {
    backgroundColor: theme.palette.background.reverse,
    '& a': {
      color: `${theme.palette.background.default} !important`,
      textAlign: 'left',
      paddingLeft: '0 !important',
      margin: '0 !important',
      fontWeight: 'normal !important',
    },
    '& button': {
      color: `${theme.palette.background.default} !important`,
      textAlign: 'left',
      paddingLeft: '0 !important',
      margin: '0 !important',
      fontWeight: 'normal !important',
    },
  },
  downloadMenuPopover: {
    zIndex: '99999 !important',
  },
}))

export const searchStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
    border: `1px solid ${theme.palette.background.darker}`,
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  searchContainer: {
    marginRight: 0,
    marginBottom: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    '& input::placeholder': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
      },
    },
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
    background: theme.palette.background.reverse,
    opacity: '0.26',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))

export const sortStyles = makeStyles(theme => ({
  sortContainer: {
    marginBottom: theme.spacing(2),
  },
  sortButton: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.reverse,
    borderColor: '#ccc',
    '&:first-child': {
      borderRadius: `${theme.spacing(1)}px 0 0 ${theme.spacing(1)}px`,
    },
    '&:last-child': {
      borderRadius: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px 0`,
    },
    ['@media (max-width:400px)']: { // eslint-disable-line no-useless-computed-key
      paddingLeft: 10,
      paddingRight: 10,
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
}))

export const teamInvitationsStyles = makeStyles(theme => ({
  invitationItem: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.background.reverse,
    marginBottom: 0,
    borderBottom: `1px solid ${theme.palette.background.darker}`,
    zIndex: 1,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '& .MuiListItem-secondaryAction': {
      padding: `${theme.spacing(1)}px 0`,
      minHeight: 50,
      borderRadius: theme.spacing(1),
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
  invitationItemActions: {
    '& a': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& svg': {
        color: '#00c1af',
      },
    },
  },
  invitationCopyContainer: {
    fontSize: '0.8rem',
    cursor: 'pointer',
    '& .MuiBox-root': {
      display: 'flex',
      alignItems: 'center',
    },
    '& svg': {
      fontSize: '1rem',
      marginRight: theme.spacing(0.5),
    },
  },
}))

export const qrDialog = makeStyles(theme => ({
  qrContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    position: 'absolute',
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
}))

export const gridStyles = makeStyles(theme => ({
  gridWrapper: {
    position: 'relative',
  },
  gridContainer: {
    color: theme.palette.background.reverse,
    backgroundColor: theme.palette.background.light,
    borderColor: theme.palette.background.darker,
    '& .MuiSvgIcon-root': {
      color: theme.palette.background.darker,
    },
    '& .MuiDataGrid-columnsContainer': {
      borderColor: theme.palette.background.darker,
    },
    '& .MuiDataGrid-cell': {
      borderColor: theme.palette.background.darker,
    },
    '& .MuiDataGrid-columnHeaderTitleContainer': {
      paddingLeft: 0,
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
    },
    '& .MuiDataGrid-toolbarContainer': {
      borderBottom: `1px solid ${theme.palette.background.darker}`,
      backgroundColor: theme.palette.background.dark,
      '& button': {
        '& .MuiSvgIcon-root': {
          color: theme.palette.background.reverse,
          opacity: 0.65,
        },
      },
    },
    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    '& .row-ready': {
      backgroundColor: 'transparent',
    },
    '& .row-inProgress': {
      backgroundColor: '#e7ab00',
    },
    '& .row-done': {
      backgroundColor: '#59a53e',
    },
    '& .row-used': {
      backgroundColor: '#59a53e',
    },
  },
  gridNameContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: 45,
  },
  nameCell: {
    textTransform: 'capitalize',
    fontSize: '0.8rem',
    cursor: 'pointer',
    overflow: 'hidden',
    maxWidth: 100,
    textOverflow: 'ellipsis',
  },
  tagsContainer: {
    maxHeight: 30,
    overflow: 'hidden',
    '& span': {
      display: 'block',
      width: 8,
      height: 8,
      marginRight: theme.spacing(0.5),
      marginBottom: 2,
    },
  },
  emailCell: {
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
  gridPanel: {
    color: '#272727',
    zIndex: '99999 !important',
    '& .MuiFormControlLabel-root': {
      color: '#272727',
    },
    '& .MuiFormLabel-root': {
      color: '#272727',
    },
    '& .MuiInput-root': {
      color: '#272727',
    },
    '& .MuiSwitch-root': {
      '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
          '& .MuiSwitch-thumb': {
            color: '#00c1af',
          },
          '& + .MuiSwitch-track': {
            backgroundColor: '#b4e0dc',
          },
        },
      },
      '& .MuiSwitch-thumb': {
        color: '#272727',
      },
    },
    '& .MuiGridFilterForm-root': {
      flexDirection: 'column',
      '& .MuiGridFilterForm-closeIcon': {
        display: 'none',
        alignItems: 'flex-end',
        '& button': {
          width: 35,
        },
      },
      '& .MuiGridFilterForm-columnSelect': {
        width: '100%',
        marginBottom: theme.spacing(2),
        '& .MuiFormLabel-root': {
          fontSize: '0.8rem',
          opacity: 0.7,
        },
        '& .MuiInputBase-root': {
          marginTop: theme.spacing(1),
          '& select': {
            fontSize: '0.9rem',
          },
        },
      },
      '& .MuiGridFilterForm-operatorSelect': {
        width: '100%',
        marginBottom: theme.spacing(2),
        '& .MuiFormLabel-root': {
          fontSize: '0.8rem',
          opacity: 0.7,
        },
        '& .MuiInputBase-root': {
          marginTop: theme.spacing(1),
          '& select': {
            fontSize: '0.9rem',
          },
        },
      },
      '& .MuiGridFilterForm-filterValueInput': {
        width: '100%',
        marginBottom: theme.spacing(2),
        '& .MuiFormLabel-root': {
          fontSize: '0.8rem',
          opacity: 0.7,
        },
        '& .MuiInputBase-root': {
          marginTop: theme.spacing(1),
          '& input': {
            fontSize: '0.9rem',
          },
        },
      },
    },
    '& .MuiGridPanelFooter-root': {
      '& button': {
        color: '#272727',
      },
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
  menuAnchor: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    '& svg': {
      color: `${theme.palette.background.reverse} !important`,
    },
  },
  columnMenu: {
    color: '#272727',
  },
  cardMenu: {
    background: theme.palette.background.reverse,
  },
  cardMenuButton: {
    color: theme.palette.background.reverse,
  },
  gridSearchProgress: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
    opacity: 0.8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    '& svg': {
      color: theme.palette.background.reverse,
    },
  },
  connectionMenuPopover: {
    zIndex: '99999 !important',
  },
}))
