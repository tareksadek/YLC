import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup,
} from 'pure-react-carousel'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import Step from '../../components/Welcome/Step'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import 'pure-react-carousel/dist/react-carousel.es.css'
import { welcomeStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'

const Welcome = () => {
  const classes = welcomeStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const auth = useAuth()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.welcome

  const totalSlides = 6
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlideHandler = () => {
    setCurrentSlide(prevSlide => prevSlide + 1)
  }

  const prevSlideHandler = () => {
    setCurrentSlide(prevSlide => prevSlide - 1)
  }

  const goToProfileHandler = () => {
    history.push(`/profile/${auth.userUrlSuffix}`)
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Box className={layoutClasses.contentContainer} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Box className={classes.carouselContainer}>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={70}
            totalSlides={totalSlides}
            dragEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Step
                  image="/assets/images/onboarding/1.png"
                  title={pageStatics.data.steps.first.title}
                  description={pageStatics.data.steps.first.description}
                  stepCount={5}
                  stepOrder={0}
                />
              </Slide>
              <Slide index={1}>
                <Step
                  image="/assets/images/onboarding/2.png"
                  title={pageStatics.data.steps.second.title}
                  description={pageStatics.data.steps.second.description}
                  stepCount={5}
                  stepOrder={0}
                />
              </Slide>
              <Slide index={2}>
                <Step
                  image="/assets/images/onboarding/3.png"
                  title={pageStatics.data.steps.third.title}
                  description={pageStatics.data.steps.third.description}
                  stepCount={5}
                  stepOrder={0}
                />
              </Slide>
              <Slide index={3}>
                <Step
                  image="/assets/images/onboarding/4.png"
                  title={pageStatics.data.steps.fourth.title}
                  description={pageStatics.data.steps.fourth.description}
                  stepCount={5}
                  stepOrder={0}
                />
              </Slide>
              <Slide index={4}>
                <Step
                  image="/assets/images/onboarding/5.png"
                  title={pageStatics.data.steps.fifth.title}
                  description={pageStatics.data.steps.fifth.description}
                  stepCount={5}
                  stepOrder={0}
                />
              </Slide>
              <Slide index={5}>
                <Step
                  image="/assets/images/onboarding/6.png"
                  title={pageStatics.data.steps.sixth.title}
                  description={pageStatics.data.steps.sixth.description}
                  stepCount={5}
                  stepOrder={0}
                />
              </Slide>
            </Slider>
            <DotGroup />
            <Box className={`${classes.carouselButtonsContainer} ${currentSlide === totalSlides - 1 && classes.carouselButtonsContainerMobile}`}>
              <ButtonBack className={`${buttonClasses.defaultButton} ${classes.carouselButton}`} onClick={() => prevSlideHandler()}>{pageStatics.buttons.prevStep}</ButtonBack>
              {currentSlide === totalSlides - 1 ? (
                <Button
                  color="secondary"
                  onClick={() => goToProfileHandler()}
                  className={buttonClasses.defaultButton}
                  style={{
                    backgroundColor: '#30a214',
                  }}
                >
                  {pageStatics.buttons.start}
                </Button>
              ) : (
                <ButtonNext className={`${buttonClasses.defaultButton} ${classes.carouselButton}`} onClick={() => nextSlideHandler()}>{pageStatics.buttons.nextStep}</ButtonNext>
              )}
            </Box>
          </CarouselProvider>
        </Box>
      </Box>
    </Box>
  )
}

export default Welcome
