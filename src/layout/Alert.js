import React, { useState } from 'react'
import PropTypes from 'prop-types'

import parse from 'html-react-parser'

import MuiAlert from '@material-ui/lab/Alert'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'

import { alertStyles } from './styles'

const Alert = ({
  title, description, type, onClickHandler, buttonText, onClickTwoHandler, buttonTwoText, noMargin, noIcon,
}) => {
  const classes = alertStyles()
  const [open, setOpen] = useState(true)

  return (
    <Collapse in={open} style={{ position: 'relative' }}>
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
          setOpen(false)
        }}
        style={{
          position: 'absolute',
          right: 4,
          top: 4,
          color: '#000',
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
      <MuiAlert
        severity={type}
        action={(
          <>
            {buttonText && (
              <Button onClick={onClickHandler} style={{ color: '#272727' }}>
                {buttonText}
              </Button>
            )}
            {buttonTwoText && (
              <Button
                onClick={onClickTwoHandler}
                style={{
                  color: '#272727',
                  backgroundColor: 'transparent',
                  fontWeight: 400,
                  textDecoration: 'underline',
                }}
              >
                {buttonTwoText}
              </Button>
            )}
          </>
        )}
        classes={{
          root: `${classes.alertContainer} ${noMargin ? classes.alertContainerNoMargin : ''} ${noIcon ? classes.alertContainerNoIcon : ''}`,
          standardWarning: classes.alertWarining,
          standardInfo: classes.alertInfo,
          standardError: classes.alertError,
          standardSuccess: classes.alertSuccess,
        }}
      >
        <Box className={classes.alertDataContainer}>
          {title && <Typography className={classes.alertTitle} component="p" variant="body1">{title}</Typography>}
          {description && typeof description === 'string' && (
            <Typography component="p" variant="body1" className={classes.alertDescription}>
              {parse(description)}
            </Typography>
          )}
          {description && typeof description === 'object' && description.map((item, i) => (
            <Typography key={i} className={classes.alertItem} component="p" variant="body1">
              <span>{parse(item)}</span>
            </Typography>
          ))}
        </Box>
      </MuiAlert>
    </Collapse>
  )
}

Alert.defaultProps = {
  title: null,
  description: null,
  type: null,
  onClickHandler: null,
  onClickTwoHandler: null,
  buttonText: null,
  buttonTwoText: null,
  noMargin: false,
  noIcon: false,
}

Alert.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
  type: PropTypes.string,
  onClickHandler: PropTypes.func,
  onClickTwoHandler: PropTypes.func,
  buttonText: PropTypes.string,
  buttonTwoText: PropTypes.string,
  noMargin: PropTypes.bool,
  noIcon: PropTypes.bool,
}

export default Alert
