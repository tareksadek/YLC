import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { menuLinksStyles } from '../styles'

const MenuLinks = ({ links, profileType, countClicks }) => {
  const classes = menuLinksStyles()

  const countLinkClicks = link => {
    countClicks(link)
    window.open(link, '_blank')
  }

  return (
    <Box className={classes.menuLinksContainer}>
      <Typography component="p" variant="body1" className={classes.menuTitle}>
        Our Menu
      </Typography>
      <List className={classes.linksContainer}>
        {
          links.filter(link => link.platform === 'menu').map(link => (
            <Button
              onClick={() => countLinkClicks(link.link)}
              key={link.key}
              className={`${classes.link} ${profileType === 'social' && classes.socialLink}`}
            >
              <ListItem className={classes.linkItem}>
                <ListItemText
                  id={`switchListLabel_${link.linkType}`}
                  primary={link.linkTitle !== '' ? link.linkTitle : link.linkType}
                />
                <Box className={classes.linkArrow}>
                  <ArrowForwardIosIcon />
                </Box>
              </ListItem>
            </Button>
          ))
        }
      </List>
    </Box>
  )
}

MenuLinks.defaultProps = {
  links: null,
  profileType: null,
}

MenuLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  profileType: PropTypes.string,
  countClicks: PropTypes.func.isRequired,
}

export default MenuLinks
