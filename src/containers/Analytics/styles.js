import { makeStyles } from '@material-ui/core/styles'

export const analyticsStyles = makeStyles(theme => ({
  analyticsCard: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    borderRadius: theme.spacing(2),
  },
  analyticsCardHeader: {
    paddingBottom: 0,
    paddingTop: theme.spacing(1.2),
  },
  analyticsCardHeaderNoMenu: {
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(2.5),
  },
  analyticsCardTitle: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
  analyticsCardAction: {
    color: theme.palette.background.reverse,
    '& .MuiIconButton-root': {
      color: theme.palette.background.default,
    },
  },
  analyticsCardContent: {
    padding: theme.spacing(2),
    '&:last-child': {
      padding: theme.spacing(2),
    },
  },
  cardInfo: {
    color: theme.palette.background.default,
    fontSize: 38,
    fontWeight: 800,
  },
  cardInfoDescription: {
    color: theme.palette.background.default,
    fontSize: 12,
    opacity: 0.5,
  },
  cardMenu: {
    backgroundColor: theme.palette.background.default,
    '& li': {
      color: theme.palette.background.reverse,
    },
  },
  analyticsLinksList: {
    paddingTop: 0,
  },
}))
