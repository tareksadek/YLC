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
}))

export const connectionStyles = makeStyles(theme => ({
  conectionDetailsChipsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
    '& .MuiChip-root': {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
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
    alignItems: 'flex-start',
    '&:last-child': {
      borderBottom: 'none',
    },
    '& .MuiListItemAvatar-root': {
      marginTop: theme.spacing(1.5),
    },
  },
  connectionItemAvatar: {
    backgroundColor: '#ccc',
    border: '1px solid #bbb',
  },
  connectionItemTextContainer: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: theme.palette.background.default,
  },
  connectionDetails: {
    fontWeight: 'normal',
    fontSize: '0.8rem',
    color: theme.palette.background.reverse,
    '& .MuiTypography-body1': {
      fontWeight: 'normal',
      fontSize: '0.8rem',
      textTransform: 'initial',
      lineHeight: '1.3rem',
      opacity: 0.6,
    },
  },
  connectionItemActionContainer: {
    right: -8,
    top: theme.spacing(3.5),
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
}))

export const connectionNoteDialogStyles = makeStyles(theme => ({
  connectDialogContainer: {
    '& .MuiDialog-paper': {
      margin: theme.spacing(1),
      width: 'calc(100% - 24px)',
    },
    '& .MuiDialogContent-root': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(1),
    },
    '& .MuiInput-underline': {
      '&.Mui-focused': {
        '&:after': {
          borderColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
      '&:hover': {
        '&:not(Mui-disabled)': {
          '&:before': {
            borderColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    '& .MuiFormLabel-root': {
      '&.Mui-focused': {
        color: '#272727',
      },
    },
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
    textTransform: 'capitalize',
    textAlign: 'center',
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
  subtitle: {
    textAlign: 'center',
    color: '#212121',
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
  notesContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    width: '100%',
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
    maxWidth: 350,
    minWidth: 300,
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
      borderBottomColor: '#ccc',
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
        color: '#272727',
        lineHeight: '1.5rem',
        wordBreak: 'break-all',
        '&:first-letter': {
          textTransform: 'uppercase',
        },
      },
      '&:last-of-type': {
        border: 'none',
      },
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
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
  infoButtonIcon: {
    color: theme.palette.background.default,
    fontSize: 34,
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
