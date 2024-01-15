import React, {
  useEffect,
  useState,
  useContext,
  createContext,
} from 'react'

import { useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'

import queryString from 'query-string'

import * as languages from '../languages'

const languageContext = createContext()

export const useLanguage = () => useContext(languageContext)

const useProvideLanguage = () => {
  const [language, setLanguage] = useState('en')
  const [direction, setDirection] = useState('ltr')
  const [languageVars, setLanguageVars] = useState(languages[language])
  const location = useLocation()
  const { lang } = queryString.parse(location.search)

  const toggleLanguage = appLang => {
    window.localStorage.setItem('language', appLang)
    window.localStorage.setItem('direction', appLang === 'ar' ? 'rtl' : 'ltr')
    setLanguage(appLang)
    setDirection(appLang === 'ar' ? 'rtl' : 'ltr')
    setLanguageVars(languages[appLang])
  };

  useEffect(() => {
    // const browserLang = window.navigator.language.substring(0, 2)
    let localLaguage = lang || window.localStorage.getItem('language') || 'en'
    if (localLaguage.length > 2) {
      localLaguage = 'en'
    }
    if (localLaguage) {
      setLanguage(localLaguage)
      setDirection(localLaguage === 'ar' ? 'rtl' : 'ltr')
      setLanguageVars(languages[localLaguage])
      window.localStorage.setItem('language', localLaguage)
      window.localStorage.setItem('direction', localLaguage === 'ar' ? 'rtl' : 'ltr')
    }
  }, [lang]);

  return {
    language,
    direction,
    toggleLanguage,
    languageVars,
  }
}

const ProvideLanguage = ({ children }) => {
  const language = useProvideLanguage()
  return (
    <languageContext.Provider value={language}>
      {children}
    </languageContext.Provider>
  )
}

ProvideLanguage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProvideLanguage
