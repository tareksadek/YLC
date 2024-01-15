import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

export const listStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export const cardStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    color: theme.palette.text.secondary,
    overflow: 'initial !important',
    marginBottom: theme.spacing(6),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardContent: {
    position: 'relative',
    paddingTop: '50px !important',
    textAlign: 'center',
  },
  userAvatar: {
    width: 75,
    height: 75,
    position: 'absolute',
    left: 0,
    right: 0,
    top: -38,
    bottom: 'auto',
    margin: 'auto',
    border: `4px solid ${theme.palette.background.default}`,
  },
  userName: {
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: '0.8rem',
  },
  cardActions: {
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: red[500],
  },
  deleteBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  menuAnchor: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  cardMenu: {
    background: theme.palette.background.default,
  },
  cardMenuButton: {
    color: theme.palette.background.reverse,
  },
}))

export const createUserDialog = makeStyles(theme => ({
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
    fontFamily: theme.fonts.cardTitle.en.family,
    fontSize: '1.5rem',
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
    position: 'relative',
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
}))

export const accountInfo = makeStyles(theme => ({
  infoCardContainer: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.reverse,
    border: `1px solid ${theme.palette.background.dark}`,
    minHeight: 525,
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      minHeight: 'initial',
    },
  },
  infoCardMedia: {
    height: 140,
    width: 140,
    backgroundSize: 'contain',
    backgroundPosition: 'left',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  title: {
    fontWeight: 700,
    color: theme.palette.background.reverse,
    borderBottom: '1px solid #ddd',
    margin: 0,
    paddingBottom: theme.spacing(1),
  },
  secondaryTitle: {
    color: theme.palette.background.reverse,
    fontWeight: 600,
    textTransform: 'capitalize',
    fontSize: '0.9rem',
    margin: 0,
  },
  primaryTitle: {
    fontSize: '0.7rem',
    lineHeight: '0.7rem',
    opacity: 0.6,
    color: theme.palette.background.reverse,
    textTransform: 'capitalize',
    margin: 0,
  },
  infoCardListItem: {
    paddingLeft: 0,
    '& .MuiListItemIcon-root': {
      '& svg': {
        color: theme.palette.background.reverse,
        opacity: 0.6,
      },
    },
  },
  infoListPrimaryText: {
    fontSize: '0.7rem',
    lineHeight: '0.7rem',
    opacity: 0.6,
    color: theme.palette.background.reverse,
    textTransform: 'capitalize',
  },
  infoListSecondryText: {
    color: theme.palette.background.reverse,
    fontWeight: 600,
    textTransform: 'capitalize',
    '& a': {
      color: '#00abff',
    },
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& button': {
      border: 'none',
      margin: 0,
      padding: 0,
      width: 20,
      height: 20,
      '& svg': {
        color: `${theme.palette.background.reverse} !important`,
      },
    },
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& a': {
      color: '#00abff',
    },
    '& span': {
      fontWeight: 'normal',
      fontSize: '0.8rem',
    },
  },
  inactiveLinkContainer: {
    '& button': {
      opacity: 0.5,
    },
  },
  selectedColorContainer: {
    display: 'block',
    height: 20,
    width: 100,
    marginTop: theme.spacing(1),
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
    fontFamily: theme.fonts.cardTitle.en.family,
    fontSize: '1.5rem',
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
    width: '100%',
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
  lowercase: {},
  viewCardData: {
    maxWidth: 350,
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
        '&$lowercase': {
          textTransform: 'lowercase',
          '&:first-letter': {
            textTransform: 'lowercase',
          },
        },
        '&:first-letter': {
          textTransform: 'uppercase',
        },
      },
      '&:last-of-type': {
        border: 'none',
      },
    },
  },
}))

export const searchStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
    background: 'transparent',
    border: '1px solid #888',
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  searchContainer: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
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

export const filterStyles = makeStyles(theme => ({
  filterContainer: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
  },
  root: {
    '&:focus': {
      backgroundColor: theme.palette.background.reverse,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.background.default,
      },
    },
  },
  divider: {
    height: 28,
    margin: '4px 4px 4px 8px',
    background: theme.palette.background.reverse,
    opacity: '0.26',
  },
  filterButton: {
    border: '1px solid #888888',
    minHeight: '50px',
    borderRadius: theme.spacing(1),
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
    textAlign: 'right',
  },
}))

export const gridActionsStyles = makeStyles(theme => ({
  gridContainer: {
    color: theme.palette.background.reverse,
    '& .MuiSvgIcon-root': {
      color: theme.palette.background.reverse,
    },
  },
  gridPanel: {
    color: theme.palette.background.reverse,
    '& .MuiFormLabel-root': {
      color: theme.palette.background.reverse,
    },
    '& .MuiInput-root': {
      color: theme.palette.background.reverse,
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
