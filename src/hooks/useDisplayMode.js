import React, {
  useState,
  useContext,
  createContext,
} from 'react'

import PropTypes from 'prop-types'

const modeContext = createContext()

export const useDisplayMode = () => useContext(modeContext)

const useProvideMode = () => {
  const [mode, setMode] = useState('view')

  const toggleMode = displayMode => {
    window.localStorage.setItem('mode', displayMode)
    setMode(displayMode)
  }

  return {
    mode,
    toggleMode,
  }
}

const ProvideMode = ({ children }) => {
  const mode = useProvideMode()
  return (
    <modeContext.Provider value={mode}>
      {children}
    </modeContext.Provider>
  )
}

ProvideMode.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProvideMode
