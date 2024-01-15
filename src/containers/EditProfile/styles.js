import { makeStyles } from '@material-ui/core/styles'

export const editProfileStyles = makeStyles(theme => ({
  offerStatusContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiSwitch-colorSecondary': {
      color: '#272727',
    },
    '& .MuiSwitch-colorSecondary + .MuiSwitch-track': {
      backgroundColor: '#ccc',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#00c1af',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#b4e0dc',
    },
  },
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  logoContainer: {
    marginBottom: 0,
  },
  root: {
    color: theme.palette.background.default,
    '& > .MuiBox-root': {
      '& > .MuiBox-root': {
        [theme.breakpoints.down('sm')]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.reverse,
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  editCardTitle: {
    fontSize: '1.5rem',
    color: theme.palette.background.highlight,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  editCardTab: {
    textTransform: 'capitalize',
    [theme.breakpoints.up('sm')]: {
      minWidth: '130px',
    },
  },
  editButtonContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    bottom: theme.spacing(1),
    zIndex: 2,
  },
  editCardButton: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.reverse,
      color: theme.palette.background.default,
      opacity: 0.9,
    },
  },
  editCardButtonDisabled: {
    backgroundColor: theme.palette.background.reverse,
    color: `${theme.palette.background.lighter} !important`,
    opacity: 0.5,
  },
  tabContentContainer: {
    '& .MuiBox-root': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  currenPictureContainerSm: {
    height: 175,
    width: 350,
    overflow: 'hidden',
    borderRadius: theme.spacing(2),
    margin: '0 auto',
    '& img': {
      width: '100%',
    },
    ['@media (max-width:420px)']: { // eslint-disable-line no-useless-computed-key
      width: 300,
      height: 150,
    },
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      width: 250,
      height: 125,
    },
  },
  currenLogoContainerSm: {
    height: 350,
    width: 350,
    overflow: 'hidden',
    borderRadius: theme.spacing(2),
    margin: '0 auto',
    '& img': {
      width: '100%',
    },
    ['@media (max-width:420px)']: { // eslint-disable-line no-useless-computed-key
      width: 300,
      height: 300,
    },
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      width: 250,
      height: 250,
    },
  },
  currenLogoContainerSmCircle: {
    borderRadius: '50%',
  },
  circleLogo: {
    borderRadius: '50%',
  },
  logoPanel: {
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: 75,
    },
  },
  removeLogoButton: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(3),
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      right: 0,
      left: 0,
      margin: 'auto',
      bottom: 16,
      maxWidth: 220,
    },
  },
  logoStyleContainer: {
    color: theme.palette.background.reverse,
    '& .MuiFormControl-root': {
      width: '100%',
      '& legend': {
        color: theme.palette.background.reverse,
        display: 'block',
        textAlign: 'center',
        fontWeight: 600,
        width: '100%',
        marginBottom: theme.spacing(1),
      },
      '& .MuiFormGroup-root': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        '& label': {
          '& span': {
            color: '#ccc',
            '&.Mui-checked': {
              color: theme.palette.background.reverse,
              '& span': {
                '&.MuiIconButton-label': {
                  color: theme.palette.background.reverse,
                },
              },
            },
            '&.MuiTypography-root': {
              color: theme.palette.background.lighter,
              fontSize: '0.9rem',
            },
          },
        },
      },
    },
  },
  currenPictureContainer: {
    height: 550,
    width: 550,
    overflow: 'hidden',
    borderRadius: theme.spacing(2),
    margin: '0 auto',
    '& img': {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      height: 350,
      width: 350,
    },
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      width: 300,
      height: 300,
    },
    ['@media (max-width:340px)']: { // eslint-disable-line no-useless-computed-key
      width: 250,
      height: 250,
    },
  },
  circleCropContainer: {},
  cropContainer: {
    position: 'relative',
    height: 550,
    width: 550,
    background: theme.palette.background.default,
    margin: '0 auto',
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      height: 400,
      width: 400,
    },
    [theme.breakpoints.down('xs')]: {
      height: 350,
      width: 350,
    },
    ['@media (max-width:420px)']: { // eslint-disable-line no-useless-computed-key
      width: 300,
      height: 300,
    },
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      width: 250,
      height: 250,
    },
    '& .reactEasyCrop_Container': {
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.background.reverse,
    },
    '&$circleCropContainer': {
      '& .reactEasyCrop_Container': {
        borderRadius: '50%',
      },
    },
  },
  dialogCropContainer: {
    position: 'relative',
    height: 500,
    width: 500,
    background: '#333',
    margin: '0 auto',
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      height: 350,
      width: 350,
    },
    ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
      width: 300,
      height: 300,
    },
    ['@media (max-width:440px)']: { // eslint-disable-line no-useless-computed-key
      width: 280,
      height: 280,
    },
    ['@media (max-width:400px)']: { // eslint-disable-line no-useless-computed-key
      width: 260,
      height: 260,
    },
    ['@media (max-width:375px)']: { // eslint-disable-line no-useless-computed-key
      width: 240,
      height: 240,
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
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
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
  tabsHeader: {
    zIndex: 1,
    '& .MuiTabs-root': {
      minHeight: 50,
      '& .MuiTabs-flexContainer': {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  linksTab: {
    width: '50%',
    backgroundColor: theme.palette.background.lighter,
    textTransform: 'capitalize',
    '&.Mui-selected': {
      backgroundColor: theme.palette.background.reverse,
      color: theme.palette.background.default,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
      paddingLeft: theme.spacing(0.4),
      paddingRight: theme.spacing(0.4),
    },
  },
  linksTabLeft: {
    borderRadius: '50px 0 0 50px',
  },
  linksTabRight: {
    borderRadius: '0 50px 50px 0',
  },
  headerSubtitle: {
    color: theme.palette.background.reverse,
    marginTop: theme.spacing(1),
    fontSize: '0.8rem',
  },
  headerRedirectLink: {
    color: theme.palette.background.reverse,
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  ocrButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formChip: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  ocrReadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    position: 'sticky',
    bottom: theme.spacing(1),
    zIndex: 2,
    flexWrap: 'wrap',
    '& button': {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(1),
    },
  },
  formElementTextBlack: {
    color: '#272727',
    '& textarea': {
      '&.MuiInputBase-input': {
        color: '#212121',
      },
    },
    '& input': {
      '&.MuiInputBase-input': {
        color: '#212121',
      },
    },
  },
  embedFormContainer: {
    '& iframe': {
      width: '100%',
      background: 'transparent',
      minHeight: 500,
    },
  },
  formNote: {
    color: theme.palette.background.reverse,
    fontSize: '0.7rem',
    opacity: 0.75,
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
  connectFormLoadingContainer: {
    width: '100%',
    position: 'relative',
    minHeight: 100,
    '& .MuiCircularProgress-root': {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      color: theme.palette.background.reverse,
    },
  },
}))
