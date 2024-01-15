import { makeStyles } from '@material-ui/core/styles'

export const whatsIncludedStyles = makeStyles(theme => ({
  wiContainer: {
    width: '100%',
    maxWidth: 550,
    margin: '0 auto',
  },
  wiHeader: {
    '& img': {
      width: '100%',
      borderRadius: theme.spacing(1),
    },
  },
  wiTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.2rem',
    fontWeight: 600,
  },
  wiFeaturesBox: {
    borderRadius: theme.spacing(1),
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    border: '1px solid #ddd',
    '& img': {
      width: '100%',
      borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`,
    },
  },
  wiFeatureTitle: {
    fontSize: '1rem',
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  wiFeatureList: {
    padding: theme.spacing(2),
  },
  wiFeatureItem: {
    fontSize: '0.8rem',
    opacity: 0.7,
    marginBottom: theme.spacing(0.5),
  },
  profileLink: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.background.reverse,
    border: `1px solid ${theme.palette.background.dark}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proBoxContainer: {
    backgroundColor: theme.palette.background.light,
  },
  proBox: {
    maxWidth: 550,
    margin: '0 auto',
    paddingTop: theme.spacing(2),
  },
  proBoxHeader: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& img': {
      width: '100%',
      borderRadius: theme.spacing(1),
    },
  },
  landingTextContainer: {
    padding: theme.spacing(2),
  },
  landingTextOne: {
    color: theme.palette.background.lighter,
    fontSize: '3rem',
    textTransform: 'uppercase',
    fontWeight: 300,
    textAlign: 'center',
    display: 'block',
    lineHeight: '3rem',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
    '& span': {
      color: theme.palette.background.reverse,
      fontSize: '3.2rem',
      fontWeight: 800,
      marginLeft: '6px',
    },
  },
  landingTextTwo: {
    color: theme.palette.background.lighter,
    display: 'block',
    textAlign: 'center',
    fontSize: '2.6rem',
    fontWeight: 700,
    lineHeight: '1rem',
    textTransform: 'uppercase',
    letterSpacing: 2,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      letterSpacing: 0,
    },
  },
  landingTextThree: {
    color: theme.palette.background.lighter,
    fontSize: '3rem',
    display: 'block',
    textAlign: 'center',
    lineHeight: '3rem',
    textTransform: 'uppercase',
    fontWeight: 300,
    letterSpacing: 4,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      letterSpacing: 0,
      marginLeft: 5,
    },
    '& span': {
      color: theme.palette.background.reverse,
      fontSize: '3.2rem',
      fontWeight: 800,
    },
  },
  landingTextFour: {
    color: theme.palette.background.landingText,
    fontSize: '1rem',
    marginTop: theme.spacing(2),
    display: 'block',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  proBoxHeaderTitle: {
    fontSize: '1.2rem',
    fontWeight: 800,
    color: '#272727',
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
  proBoxHeaderDescription: {
    fontSize: '0.8rem',
    color: '#272727',
    textAlign: 'center',
    marginTop: theme.spacing(1),
    opacity: 0.75,
  },
  proBoxHeaderButton: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  proBoxContent: {
    marginTop: theme.spacing(4),
  },
  proBoxContentSubTitle: {
    fontSize: '0.8rem',
    color: theme.palette.background.reverse,
    textAlign: 'center',
  },
  proBoxContentTitle: {
    fontSize: '1.5rem',
    textAlign: 'center',
    color: theme.palette.background.reverse,
    fontWeight: 700,
  },
  proBoxContentGridContainer: {
    padding: theme.spacing(2),
  },
  proBoxFeature: {
    marginBottom: theme.spacing(2),
    textAlign: 'left',
    padding: theme.spacing(2),
    border: `1px dashed ${theme.palette.background.lighter}`,
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      // textAlign: 'center',
    },
  },
  proBoxFeatureIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: theme.palette.background.reverse,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
    flexShrink: 0,
    '& svg': {
      color: theme.palette.background.default,
    },
    [theme.breakpoints.down('sm')]: {
      // marginLeft: 'auto',
      // marginRight: 'auto',
      // marginBottom: theme.spacing(2),
      // marginTop: 0,
    },
  },
  proBoxFeatureData: {
    margin: 0,
  },
  proBoxFeatureTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.background.reverse,
    textAlign: 'left',
  },
  proBoxFeatureDescription: {
    fontSize: '0.8rem',
    color: theme.palette.background.reverse,
    opacity: '0.75',
    textAlign: 'left',
  },
}))
