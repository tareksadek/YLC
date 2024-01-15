import { makeStyles } from '@material-ui/core/styles'

export const analyticsStyles = makeStyles(theme => ({
  cardMenu: {
    backgroundColor: theme.palette.background.default,
    '& li': {
      color: theme.palette.background.reverse,
    },
  },
  analyticsLinkItem: {
    paddingLeft: 0,
    paddingTop: theme.spacing(5),
    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: 0,
    },
    '& .MuiListItemText-multiline': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& .MuiListItemAvatar-root': {
      ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
        marginTop: 10,
      },
    },
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      alignItems: 'flex-start',
    },
  },
  analyticsItemPrimaryText: {
    textTransform: 'capitalize',
    color: theme.palette.background.reverse,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    // '& span': {
    //   fontWeight: 800,
    //   fontSize: 20,
    // },
    '& p': {
      fontSize: '0.8rem',
      color: theme.palette.background.reverseLighter,
      display: 'inline',
    },
  },
  analyticsItemSecondaryText: {
    color: theme.palette.background.lighter,
    fontSize: '0.8rem',
  },
  analyticsCard: {
    color: theme.palette.background.reverse,
    border: `1px solid ${theme.palette.background.border}`,
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.default,
  },
  analyticsCardHeader: {
    padding: 0,
    alignItems: 'flex-start',
  },
  analyticsCardSubheader: {
    fontSize: '0.8rem !important',
    color: theme.palette.background.reverseLight,
    lineHeight: '1.2rem !important',
    marginTop: theme.spacing(1),
    fontWeight: 300,
  },
  analyticsCardHeaderNoMenu: {
    padding: 0,
  },
  analyticsCardTitle: {
    fontSize: '1rem',
    textTransform: 'none',
    fontWeight: 600,
  },
  analyticsCardAction: {
    color: theme.palette.background.reverse,
    '& .MuiIconButton-root': {
      color: theme.palette.background.reverse,
      padding: theme.spacing(0.5),
    },
  },
  analyticsCardContent: {
    padding: '0 !important',
    marginTop: theme.spacing(2),
    marginBottom: 0,
    '& .MuiAlert-standardWarning': {
      boxShadow: '0 0 0 transparent',
      marginBottom: 0,
    },
  },
  cardInfo: {
    color: theme.palette.background.reverse,
    fontSize: 38,
    fontWeight: 800,
  },
  cardInfoDescription: {
    color: theme.palette.background.lighter,
    fontSize: '0.9rem',
    [theme.breakpoints.up('sm')]: {
      minHeight: 40,
    },
  },
  analyticsLinksList: {
    paddingTop: 0,
  },
  cardText: {
    fontSize: '0.9rem',
    color: theme.palette.background.lighter,
  },
  linkClicksContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  linkClicksPlatform: {
    textTransform: 'capitalize',
    maxWidth: 145,
    '& span': {
      color: theme.palette.background.lighter,
      fontSize: '0.8rem',
      textTransform: 'initial',
      display: 'block',
      fontWeight: 400,
      margin: 0,
      overflowWrap: 'anywhere',
      lineHeight: '1rem',
    },
  },
  linkClicksCount: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.background.reverse,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    minWidth: 90,
    '& p': {
      margin: 0,
      lineHeight: '1rem',
    },
    ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: theme.spacing(1),
    },
  },
  ClosedCard: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandedCard: {
    transform: 'rotate(180deg)',
  },
  efficiencyChartContainer: {
    position: 'relative',
    '& .recharts-legend-wrapper': {
      bottom: `${theme.spacing(2)}px !important`,
    },
  },
  efficiencyChartPercentage: {
    position: 'absolute',
    width: 100,
    height: 50,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
  },
  efficiencyChartNumbers: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    marginTop: theme.spacing(2),
    gap: theme.spacing(2),
  },
  efficiencyChartNumberContainer: {
    color: theme.palette.background.reverse,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    // borderRight: `1px solid ${theme.palette.background.darker}`,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.panelBox,
    boxShadow: `0 2px 5px ${theme.palette.background.darkShadow}`,
    borderRadius: theme.spacing(1),
    '&:last-child': {
      borderRight: 'none',
    },
  },
  efficiencyChartNumberTitle: {
    fontWeight: 300,
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    color: theme.palette.background.reverse,
    marginBottom: theme.spacing(1),
  },
  efficiencyChartNumber: {
    fontWeight: 600,
    color: theme.palette.background.reverse,
    fontSize: '1rem',
  },
  efficiencyChartLegendContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    '& span': {
      width: 12,
      height: 12,
      borderRadius: 50,
      marginRight: theme.spacing(0.5),
    },
  },
  noChartData: {
    minHeight: 276,
    borderLeft: `1px dashed ${theme.palette.background.reverseLight}`,
    borderBottom: `1px dashed ${theme.palette.background.reverseLight}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(1),
    '& p': {
      fontSize: '0.8rem',
      textAlign: 'center',
      color: theme.palette.background.reverse,
      padding: theme.spacing(1),
    },
  },
  envImpactContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  envImpactFilledArea: {
    height: 8,
    width: 10,
    backgroundColor: '#00C49F',
    borderRadius: '20px 0 0 20px',
  },
  envImpactRoot: {
    height: 8,
    borderRadius: '0 20px  20px 0',
    marginBottom: 0,
  },
  envImpactTrack: {
    height: 8,
    borderRadius: '0 20px  20px 0',
    backgroundColor: '#00C49F',
  },
  envImpactRail: {
    height: 8,
    backgroundColor: theme.palette.background.darker,
    borderRadius: '0 20px  20px 0',
    opacity: 1,
  },
  envImpactMark: {
    height: 8,
    backgroundColor: '#00C49F',
    '&:nth-child(8)': {
      display: 'none',
    },
  },
  envImpactMarkLabel: {
    top: 32,
    fontSize: '0.7rem',
    color: theme.palette.background.reverse,
    width: 65,
    whiteSpace: 'normal',
    textAlign: 'center',
  },
  envImpactThumb: {
    backgroundColor: theme.palette.background.reverse,
  },
  envImpactValueLabel: {
    color: theme.palette.background.reverse,
    left: 'calc(-50% - 8px)',
    '& > span': {
      color: theme.palette.background.reverse,
      boxShadow: `0 2px 8px ${theme.palette.background.shadow}`,
      '& span': {
        color: theme.palette.background.default,
      },
    },
  },
  linkItemSlider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkItemAvatar: {
    position: 'relative',
    left: 2,
    boxShadow: `0 2px 8px ${theme.palette.background.shadow}`,
  },
  linkItemSliderLink: {
    fontSize: '0.8rem',
    overflowWrap: 'anywhere',
    color: theme.palette.background.reverse,
    marginLeft: theme.spacing(5.5),
    position: 'relative',
    top: -12,
    opacity: 0.5,
    textTransform: 'lowercase',
  },
  selectedVisitsTimeButton: {},
  visitsTimeButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 0 transparent',
    '& button': {
      background: 'transparent',
      color: theme.palette.background.reverse,
      borderRightColor: `${theme.palette.background.darker} !important`,
      textTransform: 'capitalize',
      '& span': {
        '&.MuiButton-label': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        '& span': {
          fontWeight: 600,
        },
      },
      '&$selectedVisitsTimeButton': {
        color: '#00C49F',
      },
      '&:hover': {
        background: 'transparent',
        boxShadow: '0 0 0 transparent',
      },
    },
  },
  totalVisitsContainer: {
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 200,
    minHeight: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.panelBox,
    boxShadow: `0 2px 5px ${theme.palette.background.darkShadow}`,
    borderRadius: theme.spacing(1),
  },
  totalVisits: {
    fontWeight: 600,
    fontSize: '1.8rem',
    color: theme.palette.background.reverse,
  },
  totalVisitsDescription: {
    fontWeight: 400,
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: theme.palette.background.reverse,
    opacity: 0.75,
  },
  lineChartContainer: {
    '& .recharts-tooltip-wrapper': {
      '& .recharts-default-tooltip': {
        '& p': {
          color: '#000000',
        },
      },
    },
  },
}))
