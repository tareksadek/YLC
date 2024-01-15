import React from 'react'
import PropTypes from 'prop-types'

import { SortableContainer } from 'react-sortable-hoc'

import List from '@material-ui/core/List'

import MenuLinkItem from './MenuLinkItem'

import { socialLinksStyles } from '../styles'

const MenuLinksList = ({
  links, onLinkDelete, onLinkRedirect, redirect,
}) => {
  const classes = socialLinksStyles()

  const createExistingLinks = () => links.menu.filter(link => link.platform === 'menu').map((link, i) => (
    <MenuLinkItem
      index={i}
      key={link.key}
      link={link}
      redirect={redirect}
      onLinkDelete={onLinkDelete}
      onLinkRedirect={onLinkRedirect}
    />
  ))

  return (
    <List className={classes.root}>
      {createExistingLinks()}
    </List>
  )
}

MenuLinksList.defaultProps = {
  links: null,
  redirect: null,
}

MenuLinksList.propTypes = {
  links: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])))),
  redirect: PropTypes.string,
  onLinkDelete: PropTypes.func.isRequired,
  onLinkRedirect: PropTypes.func.isRequired,
}

export default SortableContainer(MenuLinksList)
