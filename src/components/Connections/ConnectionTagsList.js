import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'

import ConnectionTagItem from './ConnectionTagItem'

const ConnectionTagsList = ({
  tags, onTagDelete, onTagEdit,
}) => {
  const createExistingTags = () => tags.map((tag, i) => (
    <ConnectionTagItem
      index={i}
      key={tag.id}
      tag={tag}
      onTagDelete={onTagDelete}
      onTagEdit={onTagEdit}
    />
  ))

  return (
    <List disablePadding>
      {createExistingTags()}
    </List>
  )
}

ConnectionTagsList.defaultProps = {
  tags: null,
}

ConnectionTagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onTagDelete: PropTypes.func.isRequired,
  onTagEdit: PropTypes.func.isRequired,
}

export default ConnectionTagsList
