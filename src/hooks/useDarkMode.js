import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react'

import PropTypes from 'prop-types'

import { defaultSettings } from '../utilities/appVars'

const colorContext = createContext()

export const useColor = () => useContext(colorContext)

const useProvideColor = () => {
  const [color, setColor] = useState(defaultSettings.selectedColor)

  const switchColor = selectedColor => {
    setColor(selectedColor)
  }

  return {
    color,
    switchColor,
  }
}

export const ProvideColor = ({ children }) => {
  const color = useProvideColor()
  return (
    <colorContext.Provider value={color}>
      {children}
    </colorContext.Provider>
  )
}

ProvideColor.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useDarkMode = () => {
  const [theme, setTheme] = useState(defaultSettings.theme)

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    if (localTheme && localTheme !== 'null') {
      setTheme(localTheme)
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      window.localStorage.setItem('originalTheme', 'dark')
      setTheme('dark')
    } else {
      window.localStorage.setItem('theme', 'light')
      window.localStorage.setItem('originalTheme', 'light')
      setTheme('light')
    }
  }

  const switchTheme = themeMode => {
    setTheme(themeMode)
    window.localStorage.setItem('theme', themeMode)
  }

  return {
    theme, toggleTheme, switchTheme,
  }
}
