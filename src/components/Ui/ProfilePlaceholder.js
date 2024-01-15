import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { profilePlaceholderStyles } from './styles'

const ProfilePlaceholder = ({
  isClickable, isLarge, link, title, description, buttonText, buttonIcon, children, onClickHandler,
}) => {
  const classes = profilePlaceholderStyles()
  const history = useHistory()
  const placeholderHandler = url => {
    if (url) {
      history.push(url)
    } else {
      return onClickHandler()
    }
    return true
  }

  if (isClickable) {
    return (
      <Button onClick={() => placeholderHandler(link)} className={`${classes.placeholderContainer} ${isLarge && classes.placeholderLarge}`}>
        {title && (
          <Typography component="h3" variant="body1" className={classes.placeholderTitle}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography component="p" variant="body1" className={classes.placeholderDescription}>
            {description}
          </Typography>
        )}
        {buttonText && (
          <Typography component="p" variant="body1" className={classes.placeholderButtonText}>
            {buttonText}
          </Typography>
        )}
        {buttonIcon && buttonIcon}
        { children }
      </Button>
    )
  }

  return (
    <Box className={`${classes.placeholderContainer} ${isLarge && classes.placeholderLarge}`}>
      {title && (
        <Typography component="h3" variant="body1" className={classes.placeholderTitle}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography component="p" variant="body1" className={classes.placeholderDescription}>
          {description}
        </Typography>
      )}
      {buttonText && (
        <Button onClick={() => placeholderHandler(link)} className={classes.placeholderButtonText}>
          {buttonText}
        </Button>
      )}
      {buttonIcon && (
        <Button onClick={() => placeholderHandler(link)} className={classes.placeholderButtonText}>
          {buttonIcon}
        </Button>
      )}
    </Box>
  )
}

ProfilePlaceholder.defaultProps = {
  isClickable: false,
  isLarge: false,
  link: null,
  title: null,
  description: null,
  buttonText: null,
  children: null,
  onClickHandler: null,
  buttonIcon: null,
}

ProfilePlaceholder.propTypes = {
  isClickable: PropTypes.bool,
  isLarge: PropTypes.bool,
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  children: PropTypes.node,
  onClickHandler: PropTypes.func,
  buttonIcon: PropTypes.node,
}

export default ProfilePlaceholder
