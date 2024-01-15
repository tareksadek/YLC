import React from 'react'
import Carousel from 'react-material-ui-carousel'

import CarouselItem from './CarouselItem'

import { carouselImages } from '../../utilities/appVars'

const YlcCarousel = () => (
  <Carousel indicators={false}>
    {carouselImages.map(image => <CarouselItem key={image.order} imageSrc={image.src} />)}
  </Carousel>
)

export default YlcCarousel
