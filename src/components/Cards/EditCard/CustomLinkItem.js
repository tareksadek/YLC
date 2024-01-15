import React from 'react'
import PropTypes from 'prop-types'

import { SortableElement } from 'react-sortable-hoc'

import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'

import DragHandle from './DragHandle'

import { socialLinksStyles } from '../styles'

const CustomLinkItem = ({
  link, onLinkDelete, disableActions,
}) => {
  const classes = socialLinksStyles()

  return (
    <ListItem
      key={link.key}
      classes={{
        container: `${classes.linkItemSquare} ${classes.cutomLinkItem}`,
      }}
    >
      <DragHandle />
      <ListItemText
        disableTypography
        id={`switchListLabel_${link.platform}`}
        primary={(
          <Box className={classes.customLinkTitle}>
            {link.linkTitle}
          </Box>
        )}
        secondary={(
          <Box className={classes.customLinkUrl}>
            {link.link}
          </Box>
        )}
      />
      <ListItemSecondaryAction className={classes.deleteButtonContainer}>
        <IconButton edge="end" aria-label="delete" onClick={e => onLinkDelete(e, link.key)} disabled={disableActions}>
          <DeleteIcon style={{ color: '#dd0000' }} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

CustomLinkItem.defaultProps = {
  link: null,
  disableActions: false,
  // redirect: null,
}

CustomLinkItem.propTypes = {
  link: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  // redirect: PropTypes.string,
  onLinkDelete: PropTypes.func.isRequired,
  disableActions: PropTypes.bool,
  // onLinkRedirect: PropTypes.func.isRequired,
}

export default SortableElement(CustomLinkItem)
