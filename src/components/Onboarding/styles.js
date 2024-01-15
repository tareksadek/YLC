import { makeStyles } from '@material-ui/core/styles'

export const onboardingStyles = makeStyles(theme => ({
  onboardingHeaderContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: theme.palette.background.reverse,
  },
  onboardingLogoContainer: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 40,
  },
  onboardingHeaderTitle: {
    fontSize: '0.8rem',
    fontWeight: 400,
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 'initial',
    '& span': {
      display: 'block',
      fontWeight: 300,
      fontSize: '2.75rem',
      '& span': {
        display: 'inline-block',
      },
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  onboardingHeaderSubtitle: {
    textAlign: 'center',
    opacity: 0.9,
    fontSize: '0.9rem',
    fontWeight: 300,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  stepsBar: {
    width: '100%',
    background: 'transparent',
    padding: 0,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    '& .MuiStepLabel-iconContainer': {
      padding: 0,
    },
    '& .MuiStepLabel-labelContainer': {
      display: 'none',
    },
    '& .MuiStepIcon-root': {
      color: theme.palette.background.lighter,
      '&.MuiStepIcon-active': {
        color: '#00c1af',
      },
      '&.MuiStepIcon-completed': {
        color: '#00c1af',
      },
    },
  },
  stepContainer: {
    border: `1px dashed ${theme.palette.background.reverse}50`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  stepTitle: {
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  stepSubtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    fontSize: '0.8rem',
  },
  selected: {},
  onboardingIndicator: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    '& span': {
      display: 'block',
      width: '15%',
      height: 2,
      backgroundColor: theme.palette.background.reverseLight,
      marginRight: '2.5%',
      borderRadius: theme.spacing(4),
      '&$selected': {
        backgroundColor: theme.palette.background.lighter,
        width: '30%',
        height: 4,
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  stepbuttonsContainerFull: {},
  stepbuttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // backgroundColor: 'transparent',
    padding: theme.spacing(2),
    // borderRadius: `${theme.spacing(3)}px ${theme.spacing(3)}px 0 0`,
    borderRadius: 0,
    position: 'fixed',
    bottom: 0,
    left: 0,
    flexWrap: 'wrap',
    zIndex: 2,
    boxShadow: `0 0 15px ${theme.palette.background.shadow}`,
    backgroundColor: theme.palette.background.light,
    '& button': {
      width: 150,
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
    '&$stepbuttonsContainerFull': {
      padding: theme.spacing(2),
      background: 'transparent',
      boxShadow: '0 0 0 transparent',
      '& button': {
        backgroundColor: '#C92948 !important',
        color: '#fff !important',
        width: '100%',
        // borderRadius: 0,
        margin: 0,
        paddingBottom: theme.spacing(1.5),
        paddingTop: theme.spacing(1.5),
      },
    },
  },
  nextButton: {
    backgroundColor: '#C92948 !important',
    color: '#fff !important',
  },
  prevButton: {
    background: 'transparent !important',
    border: `1px solid ${theme.palette.background.reverse}`,
    color: `${theme.palette.background.reverse} !important`,
  },
  cropper: {
    position: 'relative',
  },
  cropContainer: {
    position: 'relative',
    height: 550,
    width: 550,
    background: '#333',
    margin: '0 auto',
    borderRadius: theme.spacing(2),
    ['@media (max-width:650px)']: { // eslint-disable-line no-useless-computed-key
      height: 350,
      width: 350,
    },
    ['@media (max-width:430px)']: { // eslint-disable-line no-useless-computed-key
      width: 300,
      height: 300,
    },
    ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
      width: 250,
      height: 250,
    },
    '& .reactEasyCrop_Container': {
      borderRadius: theme.spacing(2),
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    width: '45%',
    marginRight: '5%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginRight: 0,
    },
  },
  sliderLabel: {
    color: theme.palette.background.reverse,
    marginRight: theme.spacing(1),
    minWidth: 40,
  },
  sliderRoot: {
    padding: '22px 0px',
    marginLeft: 16,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px',
    },
  },
  sliderThumb: {
    height: 28,
    width: 28,
    backgroundColor: theme.palette.background.reverse,
    boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
      },
    },
  },
  sliderTrack: {
    height: 4,
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.reverse,
  },
  sliderRail: {
    height: 4,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
    borderRadius: theme.spacing(2),
  },
  sliderMark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  sliderMarkActive: {
    opacity: 1,
    backgroundColor: '#ff0000',
  },
  layoutContainer: {
    width: '100%',
  },
  selectedLayout: {},
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
      '&$selectedLayout': {
        '& $buttonText': {
          opacity: 1,
          fontWeight: 600,
        },
      },
      '& span': {
        display: 'block',
        width: 'auto',
      },
      '& svg': {
        fontSize: 150,
        [theme.breakpoints.down('sm')]: {
          fontSize: 110,
        },
        ['@media (max-width:360px)']: { // eslint-disable-line no-useless-computed-key
          fontSize: 90,
        },
      },
    },
  },
  selectedLayoutIcon: {
    fontSize: '16px !important',
    color: '#b4e0dc',
    marginRight: 4,
  },
  buttonText: {
    fontSize: '0.8rem',
    textAlign: 'center',
    opacity: 0.5,
    textTransform: 'initial',
    display: 'flex !important',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeContainer: {
    marginTop: 0,
    paddingTop: 0,
    width: '100%',
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
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    '& svg': {
      color: '#272727',
    },
  },
  darkThemeButton: {
    backgroundColor: '#272727',
    border: '1px solid #fff',
    '&:hover': {
      backgroundColor: '#272727',
    },
    '& svg': {
      color: '#fff',
    },
  },
  selectedTheme: {
    '& svg': {
      display: 'inline',
    },
  },
  colorsContainer: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.background.reverse}30`,
    width: '100%',
  },
  colorsButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 350,
    margin: '0 auto',
  },
  blackColorButton: {
    border: '1px solid #ffffff',
  },
  colorSwitchContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  installContainer: {
    '& .ath-container': {
      backgroundColor: '#fff',
      color: '#272727',
      borderRadius: theme.spacing(2),
      boxShadow: '0px 0 10px rgb(0 0 0 / 15%)',
      maxWidth: 550,
      left: 0,
      right: 0,
      margin: 'auto',
      '& .ath-banner': {
        display: 'block',
        width: '100%',
        padding: theme.spacing(2),
        paddingBottom: 80,
        '& .ath-logo-cell': {
          position: 'absolute',
          width: 100,
          height: 100,
          top: '-50px',
          left: 0,
          right: 0,
          bottom: 'auto',
          margin: 'auto',
          background: '#fff',
          padding: theme.spacing(1),
          borderRadius: '50%',
          boxShadow: '0px -4px 6px rgb(0 0 0 / 10%)',
          '& .ath-prompt-logo': {
            width: '100%',
            borderRadius: '50%',
          },
        },
        '& .ath-title-cell': {
          paddingTop: 40,
          '& .ath-banner-title': {
            textAlign: 'center',
            fontSize: 16,
          },
        },
        '& .ath-cancel-cell': {
          position: 'absolute',
          left: theme.spacing(2),
          bottom: theme.spacing(2),
          right: 'auto',
          top: 'auto',
          '& .btn-cancel': {
            backgroundColor: 'transparent',
            color: '#272727',
            borderWidth: '2px',
            borderStyle: 'solid',
            minWidth: '100px',
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'none',
            textDecoration: 'none',
            display: 'block',
            borderRadius: theme.spacing(6),
            textAlign: 'center',
            position: 'relative',
            padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
            cursor: 'pointer',
            '&:hover': {
              opacity: '0.9',
            },
          },
        },
        '& .ath-install-cell': {
          position: 'absolute',
          right: theme.spacing(2),
          bottom: theme.spacing(2),
          left: 'auto',
          top: 'auto',
          '& .btn-install': {
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
            '&:hover': {
              opacity: '0.9',
              backgroundColor: '#272727',
            },
            '&:disabled': {
              backgroundColor: '#ccc !important',
            },
          },
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
    cursor: 'pointer',
    // '&:last-child': {
    //   borderBottom: 'none',
    // },
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
    '& svg': {
      marginRight: theme.spacing(0.5),
    },
  },
  selectedFormIcon: {
    color: '#00c1af',
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
          color: '#999',
          '&.Mui-checked': {
            color: '#00c1af',
          },
        },
        '& .MuiTypography-root': {
          color: '#272727',
          fontSize: '0.8rem',
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
    backgroundColor: '#272727',
    padding: theme.spacing(0.5),
    position: 'fixed',
    width: '100%',
    left: 0,
    bottom: 60,
    '& p': {
      fontWeight: 600,
      textAlign: 'left !important',
      paddingTop: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.5),
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
}))

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
    display: 'flex',
    flexDirection: 'column-reverse',
    '& .MuiListItem-container': {
      backgroundColor: '#eee',
      borderRadius: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
}))
