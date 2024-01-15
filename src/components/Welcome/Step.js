import React from 'react'
import PropTypes from 'prop-types'

import {
  Typography, Box,
} from '@material-ui/core'

import { stepStyles } from './styles'

const Step = ({
  image, title, description,
}) => {
  const classes = stepStyles()

  return (
    <Box className={classes.container}>
      <Box className={classes.contentContainer}>
        <Box className={classes.header}>
          <img src={image} className={classes.image} alt={title} />
        </Box>
        <Typography component="h4" variant="h4" align="center" className={classes.title}>
          {title}
        </Typography>
        <Typography component="p" variant="body1" align="center" className={classes.description}>
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

Step.defaultProps = {
  image: null,
  title: null,
  description: null,
}

Step.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

export default Step
