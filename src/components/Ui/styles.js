import { makeStyles } from '@material-ui/core/styles'

export const formStyles = makeStyles(theme => ({
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing(1),
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '8px',
    display: 'block',
  },
  inputEl: {
    outline: 'none',
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    color: theme.palette.background.lighter,
    '& textarea': {
      color: theme.palette.background.reverse,
    },
    '&.Mui-focused': {
      color: theme.palette.background.highlight,
    },
    '&.Invalid': {
      borderColor: '#dd0000',
    },
    '&:focus': {
      outline: 'none',
      backgroundColor: '#ccc',
    },
    '& label': {
      color: theme.palette.background.lighter,
      '&.Mui-focused': {
        color: theme.palette.background.highlight,
      },
    },
    '& .MuiInput-underline': {
      '&.Mui-error': {
        '&:after': {
          borderBottomColor: '#f44336',
        },
      },
      '&:after': {
        borderBottom: `1px solid ${theme.palette.background.highlight}`,
      },
      '&:hover': {
        '&:not(.Mui-disabled)': {
          '&:before': {
            borderBottom: `1px solid ${theme.palette.background.highlight}`,
          },
        },
      },
    },
    '& input': {
      color: theme.palette.background.reverse,
    },
  },
  hiddenInput: {
    display: 'block',
  },
  select: {
    color: theme.palette.background.reverse,
    '&.MuiInput-underline': {
      '&.Mui-error': {
        '&:after': {
          borderBottomColor: '#f44336',
        },
      },
      '&:after': {
        borderBottom: `1px solid ${theme.palette.background.highlight}`,
      },
      '&:hover': {
        '&:not(.Mui-disabled)': {
          '&:before': {
            borderBottom: `1px solid ${theme.palette.background.highlight}`,
          },
        },
      },
      '&.Mui-focused': {
        '& .MuiSelect-icon': {
          color: theme.palette.background.highlight,
        },
      },
    },
    '& option': {
      color: '#272727',
      textTransform: 'capitalize',
    },
    '& ul': {
      backgroundColor: '#dd0000',
    },
    '& li': {
      fontSize: 12,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.background.lighter,
    },
  },
  date: {
    color: theme.palette.background.reverse,
    '& input': {
      color: theme.palette.background.reverse,
    },
    '& label': {
      color: theme.palette.background.lighter,
      '&.Mui-focused': {
        color: theme.palette.background.highlight,
      },
    },
    '& .MuiInput-underline': {
      '&.Mui-error': {
        '&:after': {
          borderBottomColor: '#f44336',
        },
      },
      '&:after': {
        borderBottom: `1px solid ${theme.palette.background.highlight}`,
      },
      '&:hover': {
        '&:not(.Mui-disabled)': {
          '&:before': {
            borderBottom: `1px solid ${theme.palette.background.highlight}`,
          },
        },
      },
    },
  },
  datePickerDialog: {
    color: theme.palette.background.reverse,
    '& .MuiPickersYear-root': {
      '&:focus': {
        color: '#272727',
      },
    },
    '& .MuiPickersYear-yearSelected': {
      color: theme.palette.background.highlight,
    },
    '& .MuiPickersMonth-monthSelected': {
      color: theme.palette.background.highlight,
    },
    '& .MuiPickersDay-day': {
      color: '#272727',
    },
    '& .MuiPickersDay-daySelected': {
      color: theme.palette.background.highlight,
    },
  },
  imageUploadLabel: {
    fontSize: '0.8rem',
    color: theme.palette.background.lighter,
  },
  imageUploadContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  imageUploadBox: {
    flex: 1,
    minWidth: 200,
    '& .fileContainer': {
      backgroundColor: theme.palette.background.default,
      boxShadow: '0 0 0 transparent',
      alignItems: 'flex-start',
      padding: 0,
      '& .chooseFileButton': {
        backgroundColor: 'transparent',
        color: theme.palette.background.highlight,
        textDecoration: 'underline',
        paddingLeft: 0,
      },
      '& .uploadPicturesWrapper': {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 100,
      },
      '& .uploadPictureContainer': {
        width: 100,
        borderRadius: '50%',
        margin: 0,
        border: 'none',
        boxShadow: '0 0 0 transparent',
        background: 'transparent',
        height: 100,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        fontSize: '1.25rem',
        alignItems: 'center',
        flexShrink: 0,
        lineHeight: 1,
        userSelect: 'none',
        justifyContent: 'center',
        '& img': {
          '&.uploadPicture': {
            width: 100,
            objectFit: 'cover',
          },
        },
      },
      '& .deleteImage': {
        top: 'auto',
        bottom: 5,
        left: 0,
        right: 0,
        margin: 'auto',
        width: 25,
        height: 25,
        fontSize: '15px',
        lineHeight: '25px',
      },
    },
  },
  imageUploadAvatar: {
    width: 100,
    height: 100,
  },
  rtlInput: {
    textAlign: 'right',
    paddingRight: 0,
    '& .MuiInputLabel-shrink': {
      transformOrigin: 'top right',
      fontFamily: theme.fonts.arabic,
    },
    '&.MuiInputLabel-shrink': {
      transformOrigin: 'top right',
      fontFamily: 'Cairo',
    },
    '& .MuiInputLabel-formControl': {
      left: 'auto',
      right: 0,
      fontFamily: 'Cairo',
    },
    '& .MuiFormHelperText-root': {
      textAlign: 'right',
      fontFamily: theme.fonts.arabic,
    },
    '& .MuiSelect-select': {
      paddingRight: 0,
    },
    '& .MuiSelect-icon': {
      right: 'auto',
      left: 0,
    },
  },
  rtlLabel: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  formLabel: {
    marginRight: 0,
    '& .MuiTypography-body1': {
      fontSize: '0.8rem',
    },
    '& svg': {
      stroke: theme.palette.background.reverse,
    },
  },
  sliderRoot: {
    backgroundColor: theme.palette.background.reverse,
  },
  sliderTrack: {
    backgroundColor: theme.palette.background.highlight,
  },
  sliderRail: {
    backgroundColor: theme.palette.background.default,
  },
  sliderThumb: {
    backgroundColor: theme.palette.background.highlight,
  },
  sliderMark: {
    backgroundColor: theme.palette.background.highlight,
  },
  valueLabel: {
    '& .PrivateValueLabel-circle-179': {
      backgroundColor: theme.palette.background.highlight,
      '& .PrivateValueLabel-label-180': {
        color: theme.palette.background.reverse,
      },
    },
  },
  markLabel: {
    backgroundColor: theme.palette.background.highlight,
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))

export const infoBoxStyles = makeStyles(theme => ({
  infoBoxContainer: {
    position: 'relative',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    color: '#272727',
    maxWidth: 'auto',
    margin: 0,
    width: '95%',
    backgroundColor: '#fff',
    boxShadow: '0 3px 3px #ddd',
    minWidth: 200,
    // ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key
    //   paddingRight: theme.spacing(2),
    //   paddingTop: 0,
    //   maxWidth: 'auto',
    //   margin: 0,
    // },
  },
  infoTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2a4441',
    marginBottom: theme.spacing(1),
  },
  infoItem: {
    fontSize: '0.7rem',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: '#272727',
    marginBottom: theme.spacing(1),
    opacity: 0.75,
    textAlign: 'left',
    lineHeight: '1.2rem',
    ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key
      textAlign: 'left',
      justifyContent: 'flex-start',
    },
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
}))

export const profilePlaceholderStyles = makeStyles(theme => ({
  placeholderContainer: {
    backgroundColor: theme.palette.background.default,
    border: `1px dashed ${theme.palette.background.dark}`,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: theme.spacing(2),
    minWidth: 'initial',
    '& span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    '& svg': {
      color: theme.palette.background.reverse,
      fontSize: 20,
    },
  },
  placeholderTitle: {
    textTransform: 'initial',
    color: theme.palette.background.reverse,
    fontWeight: 600,
  },
  placeholderDescription: {
    textTransform: 'initial',
    color: theme.palette.background.reverse,
    fontSize: '0.9rem',
  },
  placeholderButtonText: {
    textTransform: 'initial',
    color: theme.palette.background.reverse,
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  placeholderLarge: {
    width: '100%',
    minHeight: 150,
    maxWidth: 550,
    margin: '0 auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: theme.spacing(2),
    '& $placeholderButtonText': {
      backgroundColor: theme.palette.background.dark,
      color: theme.palette.background.reverse,
      borderRadius: theme.spacing(4),
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  infoBoxContainer: {
    position: 'relative',
    padding: theme.spacing(2),
    backgroundColor: '#b4e0dc',
    borderRadius: theme.spacing(1),
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
    color: '#2a4441',
  },
  infoItemIcon: {
    fontSize: '1.2rem',
    marginRight: theme.spacing(1),
    marginTop: 2,
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
}))
