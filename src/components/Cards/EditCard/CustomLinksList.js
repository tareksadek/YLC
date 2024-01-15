import React from 'react'
import PropTypes from 'prop-types'

import { SortableContainer } from 'react-sortable-hoc'

import List from '@material-ui/core/List'

import CustomLinkItem from './CustomLinkItem'

import { socialLinksStyles } from '../styles'

const CustomLinksList = ({
  links, onLinkDelete, onLinkRedirect, redirect, disableActions,
}) => {
  const classes = socialLinksStyles()

  const createExistingLinks = () => links.custom.filter(link => link.platform === 'custom').map((link, i) => (
    <CustomLinkItem
      index={i}
      key={link.key}
      link={link}
      redirect={redirect}
      onLinkDelete={onLinkDelete}
      onLinkRedirect={onLinkRedirect}
      disableActions={disableActions}
    />
  ))

  return (
    <List className={classes.root}>
      {createExistingLinks()}
    </List>
  )
}

CustomLinksList.defaultProps = {
  links: null,
  redirect: null,
  disableActions: false,
}

CustomLinksList.propTypes = {
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
  disableActions: PropTypes.bool,
}

export default SortableContainer(CustomLinksList)
