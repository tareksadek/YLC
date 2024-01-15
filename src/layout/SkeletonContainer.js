import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton'

import { skeletonStyles } from './styles'

const SkeletonContainer = ({ list }) => {
  const classes = skeletonStyles()

  return (
    <Box className={classes.container}>
      {list.map((skeletonItem, i) => (
        <Skeleton
          className={`${classes.item} ${skeletonItem.fullWidth ? classes.fullWidthItem : ''}`}
          key={i}
          variant={skeletonItem.variant}
          width={skeletonItem.width || '100%'}
          height={skeletonItem.height || '1.2em'}
        />
      ))}
    </Box>
  )
}

SkeletonContainer.defaultProps = {
  list: false,
}

SkeletonContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
}

export default SkeletonContainer
