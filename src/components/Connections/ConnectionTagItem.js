import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import { tagsStyles } from './styles'

const ConnectionTagItem = ({
  tag, onTagDelete, onTagEdit,
}) => {
  const classes = tagsStyles()

  return (
    <ListItem
      key={tag.id}
      classes={{
        container: `${classes.linkItemSquare} ${classes.cutomLinkItem}`,
      }}
      style={{
        ...(tag && tag.color && { backgroundColor: tag.color }),
      }}
    >
      <ListItemText
        disableTypography
        id={`switchListLabel_${tag.id}`}
        primary={(
          <Box className={classes.customLinkTitle}>
            {tag.display}
          </Box>
        )}
      />
      <ListItemSecondaryAction
        className={classes.deleteButtonContainer}
        style={{
          ...(tag && tag.color && { backgroundColor: tag.color }),
        }}
      >
        <IconButton edge="end" aria-label="edit" onClick={() => onTagEdit(tag)}>
          <EditIcon style={{ color: '#0083c1' }} />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={e => onTagDelete(e, tag.id)}>
          <DeleteIcon style={{ color: '#dd0000' }} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

ConnectionTagItem.defaultProps = {
  tag: null,
}

ConnectionTagItem.propTypes = {
  tag: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onTagDelete: PropTypes.func.isRequired,
  onTagEdit: PropTypes.func.isRequired,
}

export default ConnectionTagItem
