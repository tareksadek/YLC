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
    margin: 0,
    padding: 0,
    '& .MuiListItem-container': {
      backgroundColor: '#eee',
      borderRadius: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
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
  connectionMenuPopover: {
    zIndex: '99999 !important',
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
        marginTop: 0,
        fontSize: '0.8rem',
        textAlign: 'center',
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
  connectionTagsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  connectionTagChip: {
    '& span': {
      textTransform: 'capitalize',
    },
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
    background: theme.palette.background.default,
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

export const advancedSearchStyles = makeStyles(theme => ({
  advancedSearchContainer: {
    boxShadow: '0 0 0 transparent',
  },
  advancedSearchTitleContainer: {
    backgroundColor: theme.palette.background.default,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '& .MuiAccordionSummary-content': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      '& p': {
        fontSize: '0.9rem',
      },
    },
    '& .MuiAccordionSummary-expandIcon': {
      '& svg': {
        color: theme.palette.background.reverse,
      },
      '& .Mui-expanded': {
        minHeight: 'initial',
      },
    },
  },
  advancedSearchFormContainer: {
    padding: theme.spacing(1),
    flexDirection: 'column',
    paddingTop: 0,
    backgroundColor: theme.palette.background.default,
    '& .MuiFormGroup-root': {
      '& .MuiFormControlLabel-root': {
        height: 25,
        marginLeft: 0,
        marginRight: theme.spacing(1),
        paddingRight: theme.spacing(1),
        borderRadius: theme.spacing(3),
        marginTop: theme.spacing(1),
        '& > span': {
          fontSize: '0.8rem',
          color: theme.palette.background.reverse,
          textTransform: 'capitalize',
          '&:first-child': {
            paddingRight: theme.spacing(0.5),
            paddingLeft: theme.spacing(0.5),
          },
          '& svg': {
            color: '#ffffff',
            fontSize: '1.2rem',
          },
        },
      },
    },
  },
  advancedSearchButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    '& button': {
      marginRight: theme.spacing(1),
    },
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

export const formStyles = makeStyles(theme => ({
  connectionNameText: {
    fontSize: '0.9rem',
  },
  conectionDetailsChipsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 0,
    '& .MuiChip-root': {
      marginTop: theme.spacing(0.5),
      marginRight: theme.spacing(1),
      fontSize: '0.7rem',
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
    borderBottom: `1px solid ${theme.palette.background.dark}`,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(3),
    alignItems: 'flex-start',
    zIndex: 2,
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
    top: theme.spacing(2.75),
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& p': {
      lineHeight: '1.5rem',
    },
    '& > span': {
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
    '& .MuiChip-root': {
      marginLeft: theme.spacing(0.5),
      backgroundColor: '#00c1af',
      '& svg': {
        color: '#ffffff',
      },
      '& span': {
        fontSize: '0.75rem',
        fontWeight: 400,
        color: '#fff',
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
  formTagsContainer: {
    '& .MuiFormGroup-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& label': {
        background: '#ddd',
        borderRadius: theme.spacing(1),
        padding: theme.spacing(0.5),
        paddingRight: theme.spacing(1.5),
        marginBottom: theme.spacing(0.5),
        marginRight: 0,
        marginLeft: theme.spacing(0.5),
        '& .MuiIconButton-root': {
          padding: 2,
          color: '#ffffff',
          opacity: 0.5,
          '&.Mui-checked': {
            color: '#ffffff',
            opacity: 1,
          },
        },
        '& .MuiTypography-root': {
          color: '#272727',
          fontSize: '0.8rem',
          textTransform: 'capitalize',
        },
      },
    },
  },
  addTagPrograssContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(255,255,255,0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
  },
  addNewTagBoxContainer: {
    position: 'fixed',
    width: '100%',
    left: 0,
    right: 0,
    margin: 'auto',
    bottom: 80,
    maxWidth: 550,
    backgroundColor: theme.palette.background.light,
    boxShadow: '0 0 0 transparent',
    border: `1px dashed ${theme.palette.background.lighter}`,
    '& p': {
      fontWeight: 600,
      textAlign: 'left !important',
      paddingTop: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.5),
    },
    '& h3': {
      fontWeight: 400,
    },
    '& button': {
      padding: theme.spacing(0.5),
      fontSize: '0.8rem',
      fontWeight: 400,
    },
    '& .MuiInputBase-input': {
      color: '#fff !important',
    },
  },
  labelColorsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  labelColorButton: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    flexShrink: 0,
    flexGrow: 0,
    minWidth: 'auto',
  },
  embedItemContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderBottom: `1px solid ${theme.palette.background.dark}`,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    borderRadius: theme.spacing(1),
    alignItems: 'flex-start',
    '&:last-child': {
      borderBottom: 'none',
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: 36,
    },
  },
  embedAccordion: {
    backgroundColor: theme.palette.background.light,
    borderRadius: `${theme.spacing(1)}px !important`,
    width: '100%',
    marginBottom: '0 !important',
    boxShadow: '0 0 0 transparent',
    '& .MuiAccordionSummary-root': {
      '& .MuiChip-root': {
        marginLeft: theme.spacing(0.5),
        backgroundColor: '#00c1af',
        '& svg': {
          color: '#ffffff',
        },
        '& span': {
          fontSize: '0.75rem',
          fontWeight: 400,
          color: '#fff',
        },
      },
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
    '& .MuiAccordionSummary-expandIcon': {
      color: theme.palette.background.reverse,
      padding: theme.spacing(0.75),
    },
  },
  embedAccordionDetails: {
    flexDirection: 'column',
    '& p': {
      color: theme.palette.background.lighter,
      fontSize: '0.8rem',
    },
  },
  embedTitle: {
    color: theme.palette.background.reverse,
    fontSize: '0.9rem',
  },
  embedMenuAnchor: {
    paddingRight: theme.spacing(0.5),
    '& svg': {
      color: theme.palette.background.reverse,
    },
  },
  embedFormButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  embedFormButtonsLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  embedFormButtonsRight: {
    display: 'flex',
    alignItems: 'center',
    '& button': {
      marginLeft: theme.spacing(0.5),
    },
  },
}))

export const addTagDialogStyles = makeStyles(theme => ({
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
  labelColorsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  labelColorButton: {
    width: 45,
    height: 45,
    borderRadius: '50%',
    flexShrink: 0,
    flexGrow: 0,
    minWidth: 'auto',
  },
}))

export const tagsStyles = makeStyles(theme => ({
  cutomLinkItem: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.background.reverse,
    marginBottom: 0,
    borderBottom: `1px solid ${theme.palette.background.darker}`,
    zIndex: 1,
    padding: theme.spacing(1),
    '& .MuiListItem-secondaryAction': {
      padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,
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
  deleteButtonContainer: {
    top: 0,
    transform: 'initial',
    right: theme.spacing(1),
    bottom: 0,
    margin: 'auto',
    height: 50,
    width: 100,
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    '& button': {
      marginRight: 0,
      height: 40,
      width: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      '& svg': {
        fontSize: 24,
      },
    },
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
}))
