import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'

import { tabPanelStyles } from '../styles'

const TabPanel = ({ children, value, index }) => {
  const classes = tabPanelStyles()

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.tabPanelContainer}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </Box>
  )
}

TabPanel.defaultProps = {
  children: null,
  index: null,
  value: 0,
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number,
};

export default TabPanel
