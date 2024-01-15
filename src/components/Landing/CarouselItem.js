import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'

const CarouselItem = ({ imageSrc }) => (
  <Box>
    <img src={imageSrc} alt="" style={{ width: '100%', display: 'block' }} />
  </Box>
)

CarouselItem.defaultProps = {
  imageSrc: null,
}

CarouselItem.propTypes = {
  imageSrc: PropTypes.string,
}

export default CarouselItem
