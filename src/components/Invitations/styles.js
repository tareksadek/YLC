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
  invitationsList: {
    width: '100%',
    height: '100%',
    position: 'relative',
    '& .MuiListItem-container': {
      backgroundColor: '#eee',
      borderRadius: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
}))

export const invitationStyles = makeStyles(theme => ({
  connectionSkeletonContainer: {
    width: '100%',
    background: '#eee',
    borderRadius: theme.spacing(1),
  },
  connectionItemContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#eee',
    borderRadius: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginBottom: theme.spacing(1),
      paddingRight: theme.spacing(2),
    },
  },
  connectionItemAvatar: {
    backgroundColor: '#ccc',
    paddingTop: theme.spacing(0.5),
    border: '1px solid #bbb',
    [theme.breakpoints.down('xs')]: {
      width: 60,
      height: 60,
      marginTop: theme.spacing(1),
    },
  },
  connectionItemTextContainer: {
    fontWeight: 'bold',
    color: '#272727',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  connectionDetails: {
    fontWeight: 'normal',
    fontSize: '0.8rem',
    '& .MuiTypography-body1': {
      fontWeight: 'normal',
      fontSize: '0.8rem',
      textTransform: 'initial',
      lineHeight: '1.3rem',
      opacity: 0.6,
    },
  },
  connectionItemActionContainer: {
    position: 'initial',
    transform: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
    flexWrap: 'wrap',
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
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    textTransform: 'initial',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.spacing(1),
    '& p': {
      fontSize: '0.9rem',
    },
    '&:last-child': {
      marginRight: 0,
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
  invitationLabel: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: 100,
    },
  },
  usedInvitation: {
    backgroundColor: '#d00000',
  },
  availableInvitation: {
    backgroundColor: '#006d00',
  },
  connectionName: {
    position: 'relative',
    '& span': {
      fontSize: '0.8rem',
      opacity: 0.5,
      backgroundColor: '#fff',
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(0.5),
      marginLeft: theme.spacing(3),
      color: '#fff',
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        display: 'block',
      },
      '&$usedInvitation': {
        backgroundColor: '#d00000',
      },
      '&$availableInvitation': {
        backgroundColor: '#006d00',
      },
    },
  },
  invitationData: {
    '& p': {
      fontSize: '0.8rem',
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  usedInvitationData: {
    '& p': {
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: 20,
        background: '#eee',
        top: 0,
        left: 0,
        right: 'auto',
        margin: 'auto',
        opacity: 0.5,
        maxWidth: 270,
      },
    },
  },
  yourInvitationChip: {
    fontFamily: theme.fonts.titles,
    opacity: '1 !important',
  },
}))

export const invitationDetailsDialogStyles = makeStyles(theme => ({
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
  viewUserData: {
    maxWidth: '100%',
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
      justifyContent: 'flex-start',
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
  icon: {
    color: theme.palette.background.gradient.dark,
  },
  noteText: {
    color: '#272727',
  },
}))

export const filterStyles = makeStyles(theme => ({
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
  shareButtonText: {
    marginLeft: theme.spacing(1),
    color: '#212121',
  },
  icon: {
    color: theme.palette.background.gradient.dark,
  },
}))
