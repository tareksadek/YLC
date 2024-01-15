import React from 'react'
import PropTypes from 'prop-types'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { useLanguage } from '../hooks/useLang'

import { navStyles } from './styles'

const UserMenu = ({
  open, links, anchorEl, onClose, onLinkClicked, menuId,
}) => {
  const language = useLanguage()
  const classes = navStyles()

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
    >
      {
        links.map(({ linkfor, path }) => (
          <MenuItem
            onClick={() => onLinkClicked(path)}
            key={linkfor}
            dir={language.direction}
            className={language.direction === 'rtl' ? classes.arabicFont : ''}
          >
            {language.languageVars.userLinks[linkfor]}
          </MenuItem>
        ))
      }
    </Menu>
  )
}

UserMenu.defaultProps = {
  open: false,
  links: null,
  menuId: null,
  anchorEl: null,
}

UserMenu.propTypes = {
  open: PropTypes.bool,
  links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  anchorEl: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onClose: PropTypes.func.isRequired,
  onLinkClicked: PropTypes.func.isRequired,
  menuId: PropTypes.string,
}

export default UserMenu
