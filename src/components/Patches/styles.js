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
  patchStatus: {
    fontSize: '0.8rem',
    textAlign: 'center',
    borderRadius: theme.spacing(5),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: '#fff',
    backgroundColor: '#00adff',
  },
  patchStatusChina: {
    backgroundColor: '#ef6605',
  },
  patchStatusUsa: {
    backgroundColor: '#2f8b00',
  },
}))

export const createUserDialog = makeStyles(theme => ({
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

  layoutButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    '& button': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 130,
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      '& span': {
        display: 'block',
        width: 'auto',
      },
      '& svg': {
        fontSize: 150,
      },
    },
  },
  selectedLayout: {
    border: `1px solid ${theme.palette.background.reverse}`,
    borderRadius: theme.spacing(1),
  },
  buttonText: {
    fontSize: '0.8rem',
    textAlign: 'center',
    opacity: 0.5,
    textTransform: 'initial',
  },
  themeButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  themeButton: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    minWidth: 'auto',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    '& svg': {
      display: 'none',
    },
  },
  lightThemeButton: {
    backgroundColor: '#fff',
    border: '1px solid #272727',
    '& svg': {
      color: '#272727',
    },
  },
  darkThemeButton: {
    backgroundColor: '#272727',
    border: '1px solid #fff',
    '& svg': {
      color: '#fff',
    },
  },
  selectedTheme: {
    '& svg': {
      display: 'inline',
    },
  },
  colorButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  colorButton: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(5),
    width: 50,
    height: 50,
    minWidth: 'auto',
  },
  colorPicker: {
    width: '100%',
    '& .sketch-picker': {
      boxShadow: '0 0 0 transparent !important',
      backgroundColor: `${theme.palette.background.reverse} !important`,
      borderRadius: `${theme.spacing(2)}px !important`,
      width: 'auto !important',
      '& > div': {
        '&:first-child': {
          borderRadius: `${theme.spacing(2)}px !important`,
        },
        '&:nth-child(2)': {
          '& > div': {
            '& > div': {
              height: '20px !important',
              '& > div': {
                '& > div': {
                  '& > div': {
                    '& > div': {
                      height: '18px !important',
                    },
                  },
                },
              },
            },
          },
        },
        '&:last-child': {
          display: 'none !important',
        },
      },
      '& .hue-horizontal': {
        borderRadius: `${theme.spacing(2)}px !important`,
      },
      '& input': {
        borderRadius: theme.spacing(0.5),
      },
      '& label': {
        color: `${theme.palette.background.default} !important`,
      },
    },
  },
  defaultLinksColorContainer: {
    color: theme.palette.background.reverse,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& .MuiCheckbox-root': {
      color: theme.palette.background.reverse,
    },
  },
  patchDetailsList: {
    width: '100%',
    '& .MuiDivider-root': {
      margin: 0,
    },
    '& .MuiListItem-root': {
      paddingLeft: 0,
      '& .MuiListItemText-primary': {
        color: theme.palette.background.reverse,
        fontWeight: 400,
        fontSize: '0.8rem',
      },
      '& .MuiListItemText-secondary': {
        color: theme.palette.background.reverse,
        fontWeight: 600,
        fontSize: '1rem',
        opacity: 1,
      },
    },
  },
  productsList: {
    '& .MuiListItemText-secondary': {
      color: '#000',
    },
  },
}))

export const accountInfo = makeStyles(theme => ({
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
