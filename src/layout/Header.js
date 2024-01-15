import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import HideOnScroll from './HideOnSroll'

import { useColor } from '../hooks/useDarkMode'
import { useAuth } from '../hooks/use-auth'

import { headerStyles } from './styles'

const Header = ({
  children, title, settings, isBusinessProfile, isBasicProfile, isSocialProfile, userColor,
}) => {
  const classes = headerStyles()
  const color = useColor()
  const auth = useAuth()

  const fallBackColor = settings && settings.theme === 'light' ? '#272727' : '#ffffff'

  let colorCode
  if (settings && !auth.user) {
    colorCode = settings.selectedColor.code && settings.selectedColor.code !== 'null' ? settings.selectedColor.code : fallBackColor
  } else {
    colorCode = color.color.code && color.color.code !== 'null' ? color.color.code : fallBackColor
  }

  if (userColor) {
    colorCode = userColor
  }

  let headerClass
  if (isBusinessProfile) {
    headerClass = classes.headerContainer
  } else if (isBasicProfile) {
    headerClass = classes.headerContainerBasic
  } else {
    headerClass = classes.headerContainerClear
  }

  return (
    <HideOnScroll>
      <Box className={headerClass} style={{ backgroundColor: `${isSocialProfile ? 'transparent' : colorCode}` }}>
        <Accordion className={classes.headerAccordionContainer}>
          <AccordionSummary
            expandIcon={children && <HelpOutlineIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {title && (
              <Typography variant="h4" component="h4" align="center" className={classes.headerTitle}>{title}</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            {children}
          </AccordionDetails>
        </Accordion>
        {/* {title && (
          <Typography variant="h4" component="h4" align="center" className={classes.headerTitle}>{title}</Typography>
        )}
        {children} */}
      </Box>
    </HideOnScroll>
  )
}

Header.defaultProps = {
  children: null,
  title: null,
  settings: null,
  isBusinessProfile: false,
  isBasicProfile: false,
  isSocialProfile: false,
  userColor: null,
}

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  settings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  isBusinessProfile: PropTypes.bool,
  isBasicProfile: PropTypes.bool,
  isSocialProfile: PropTypes.bool,
  userColor: PropTypes.string,
}

const mapStateToProps = state => ({
  settings: state.cards.settings,
})

export default connect(mapStateToProps, null)(Header)
