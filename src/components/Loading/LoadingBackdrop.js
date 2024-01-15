import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Backdrop from '@material-ui/core/Backdrop'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'

// import { LoadingIcon } from '../../layout/CustomIcons'

import { backdropStyles } from './styles'

const LoadingBackdrop = ({
  loadingText, placement, withoutProgress, clicked, withOpacity, done, boxed,
}) => {
  const classes = backdropStyles()
  const backdropPlacement = placement === 'inset' ? classes.insetBackdrop : '' || ''

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (done) {
        setProgress(100)
        return
      }
      setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + Math.floor(Math.random() * 3) + 1));
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [done]);

  return (
    <>
      {boxed ? (
        <Backdrop
          className={`${classes.backdrop} ${classes.boxedBackdrop} ${backdropPlacement} ${done ? classes.hideProgress : ''}`}
          // style={{
          //   opacity: withOpacity ? 0.75 : 1,
          //   backgroundColor: withOpacity ? '#000000' : '#272727',
          // }}
          onClick={() => (clicked ? clicked() : true)}
          open
        >
          {!withoutProgress && (
            <Box className={classes.loadingBox}>
              <Typography className={classes.progressMessage}>{loadingText}</Typography>
              <Box display="flex" alignItems="center" minWidth="100%">
                <Box width="100%" className={classes.progressContainer}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box minWidth={35} className={classes.progressPercentageContainer}>
                  <Typography variant="body2" color="textSecondary" className={classes.progressPercentage}>
                    {`${Math.round(progress)}%`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Backdrop>
      ) : (
        <Backdrop
          className={`${classes.backdrop} ${backdropPlacement} ${done ? classes.hideProgress : ''}`}
          style={{
            opacity: withOpacity ? 0.75 : 1,
            backgroundColor: withOpacity ? '#000000' : '#272727',
          }}
          onClick={() => (clicked ? clicked() : true)}
          open
        >
          {!withoutProgress && (
            <>
              <Typography className={classes.progressMessage}>{loadingText}</Typography>
              <Box display="flex" alignItems="center" minWidth="100%">
                <Box width="100%" className={classes.progressContainer}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box minWidth={35} className={classes.progressPercentageContainer}>
                  <Typography variant="body2" color="textSecondary" className={classes.progressPercentage}>
                    {`${Math.round(progress)}%`}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Backdrop>
      )}
    </>
  )
}

LoadingBackdrop.defaultProps = {
  loadingText: null,
  placement: null,
  withoutProgress: false,
  withOpacity: false,
  clicked: null,
  done: false,
  boxed: false,
}

LoadingBackdrop.propTypes = {
  loadingText: PropTypes.string,
  placement: PropTypes.string,
  withoutProgress: PropTypes.bool,
  withOpacity: PropTypes.bool,
  clicked: PropTypes.func,
  done: PropTypes.bool,
  boxed: PropTypes.bool,
}

export default LoadingBackdrop
