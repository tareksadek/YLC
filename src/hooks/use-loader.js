import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react'

import Backdrop from '@material-ui/core/Backdrop'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'

import PropTypes from 'prop-types'

import { backdropStyles } from '../components/Loading/styles'

const authContext = createContext()

export const useLoader = () => useContext(authContext)

const useProvideLoader = () => {
  const [progress, setProgress] = useState(0)
  const [loadingStarted, setLoadingStarted] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(null)

  const startLoader = msg => {
    setLoadingStarted(true)
    setLoadingMessage(msg)
  }

  const resetLoader = msg => {
    setProgress(0)
    setLoadingStarted(true)
    setLoadingMessage(msg)
  }

  const endLoader = () => {
    setProgress(100)
    setLoadingStarted(false)
    setTimeout(() => {
      setLoadingMessage(null)
      setLoadingDone(true)
    },
    500)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (loadingDone) {
        setProgress(100)
        return
      }
      if (loadingStarted) {
        setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + Math.floor(Math.random() * 3) + 1));
      }
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [loadingDone, loadingStarted]);

  return {
    progress,
    loadingDone,
    loadingStarted,
    startLoader,
    resetLoader,
    endLoader,
    loadingMessage,
  }
}

const ProvideLoader = ({ children }) => {
  const loader = useProvideLoader()
  const classes = backdropStyles()

  return (
    <authContext.Provider value={loader}>
      {!loader.loadingDone && (
        <Backdrop
          className={`${classes.backdrop}`}
          onClick={() => true}
          open
        >
          <Typography>{loader.loadingMessage}</Typography>
          <Box display="flex" alignItems="center" minWidth={250}>
            <Box width="100%" className={classes.progressContainer}>
              <LinearProgress variant="determinate" value={loader.progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary" style={{ color: '#fff' }}>
                {`${Math.round(loader.progress)}%`}
              </Typography>
            </Box>
          </Box>
        </Backdrop>
      )}
      {children}
    </authContext.Provider>
  )
}

ProvideLoader.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProvideLoader
