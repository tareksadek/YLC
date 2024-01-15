import React, { useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Hidden from '@material-ui/core/Hidden'

import { navIcons } from '../utilities/utils'

import { useLanguage } from '../hooks/useLang'
import { useAuth } from '../hooks/use-auth'

import * as vars from '../utilities/appVars'

import { mobileNavigationStyles } from './styles'

const MobileNavigation = () => {
  const classes = mobileNavigationStyles()
  const language = useLanguage()
  const auth = useAuth()
  const history = useHistory()
  const location = useLocation()
  const navLinks = auth.user && vars.navLinks(auth.userUrlSuffix, auth.user.uid)
  const selectedLinkIndex = auth.user && navLinks.findIndex(link => location.pathname.includes(link.path))
  const [value, setValue] = useState(selectedLinkIndex)
  const navigationChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Hidden mdUp>
      <BottomNavigation
        value={value}
        onChange={navigationChange}
        showLabels
        className={classes.root}
        dir={language.direction}
      >
        {navLinks && navLinks.map(({ linkfor, path }) => (
          <BottomNavigationAction
            key={path}
            label={language.languageVars.navLinks[linkfor]}
            icon={navIcons(linkfor, 'inherit', 'small', classes.avatarImage)}
            onClick={() => { history.push(path) }}
            classes={{
              selected: selectedLinkIndex >= 0 && classes.selected,
            }}
            className={language.direction === 'rtl' ? classes.arabicFont : ''}
          />
        ))}
      </BottomNavigation>
    </Hidden>
  )
}

export default MobileNavigation
