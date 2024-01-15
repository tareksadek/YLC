import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

import StarIcon from '@material-ui/icons/Star'

import { useLanguage } from '../hooks/useLang'

import { pageTitleStyles } from './styles'
import { layoutStyles } from '../theme/layout'

const PageTitle = ({
  title, info, type, mt, mb, centered, uppercase, isPro,
}) => {
  const classes = pageTitleStyles()
  const layoutClasses = layoutStyles()
  const language = useLanguage()
  return (
    <Box mt={mt || 0} mb={mb || 3} className={classes.titleContainer}>
      <Typography
        variant="h3"
        component="h3"
        className={`${type && type === 'error' && classes.errorTitle} ${classes.pageTitle} ${centered ? classes.centeredTitle : ''} ${uppercase ? classes.uppercaseTitle : ''}`}
      >
        {title}
        {isPro && (
          <Chip
            size="small"
            icon={<StarIcon />}
            label="Pro"
            clickable={false}
            color="primary"
            className={layoutClasses.proChip}
            style={{ marginLeft: 8 }}
          />
        )}
      </Typography>
      {info && <Typography variant="body1" component="p" className={`${classes.info} ${language.direction === 'rtl' && classes.arabicFont}`}>{info}</Typography>}
    </Box>
  )
}

PageTitle.defaultProps = {
  title: null,
  info: null,
  type: null,
  mt: null,
  mb: null,
  centered: false,
  uppercase: false,
  isPro: false,
}

PageTitle.propTypes = {
  title: PropTypes.string,
  info: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  type: PropTypes.string,
  mt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  mb: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  centered: PropTypes.bool,
  uppercase: PropTypes.bool,
  isPro: PropTypes.bool,
}

export default PageTitle
