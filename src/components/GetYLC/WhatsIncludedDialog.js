import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import FullScreenDialog from '../../layout/FullScreenDialog'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { buttonStyles } from '../../theme/buttons'
import { whatsIncludedStyles } from './styles'

const WhatsIncludedDialog = ({
  open, onClose,
}) => {
  const buttonClasses = buttonStyles()
  const classes = whatsIncludedStyles()

  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.whatsIncluded

  return (
    <FullScreenDialog
      type="custom"
      titleBackground={color.color.code}
      title={pageStatics.data.titles.dialog}
      open={open}
      onClose={() => onClose()}
      buttonBackground={color.color.code}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={() => onClose()}
          className={`${buttonClasses.defaultButton}`}
          disabled={false}
          style={{
            backgroundColor: '#C92948',
          }}
        >
          {pageStatics.buttons.getYLC}
          {/* <span className={buttonClasses.defaultButtonDescription}>
            {pageStatics.buttons.becomeProOffer}
            <i>{pageStatics.buttons.becomeProCancel}</i>
          </span> */}
        </Button>
      )}
    >
      <Box className={classes.wiContainer}>
        <Box className={classes.wiHeader}>
          <img src="/assets/images/whatsincluded.jpg" alt="YLC - What is included" />
        </Box>
        <Typography
          variant="body1"
          component="p"
          align="center"
          className={`${classes.wiTitle}`}
        >
          {pageStatics.data.titles.page}
        </Typography>
        <Box className={classes.wiFeaturesContainer}>
          <Box className={classes.wiFeaturesBox}>
            <img src={`/assets/images/${pageStatics.data.description.features.main.image}`} alt={pageStatics.data.description.features.main.title} />
            <Typography
              variant="body1"
              component="p"
              align="left"
              className={`${classes.wiFeatureTitle}`}
            >
              {pageStatics.data.description.features.main.title}
            </Typography>
            <Box className={classes.wiFeatureList}>
              {pageStatics.data.description.features.main.description.map(feature => (
                <Typography
                  variant="body1"
                  component="p"
                  align="left"
                  className={`${classes.wiFeatureItem}`}
                  key={feature}
                >
                  {`- ${feature}`}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box className={classes.wiFeaturesBox}>
            <img src={`/assets/images/${pageStatics.data.description.features.first.image}`} alt={pageStatics.data.description.features.first.title} />
            <Typography
              variant="body1"
              component="p"
              align="left"
              className={`${classes.wiFeatureTitle}`}
            >
              {pageStatics.data.description.features.first.title}
            </Typography>
            <Box className={classes.wiFeatureList}>
              {pageStatics.data.description.features.first.description.map(feature => (
                <Typography
                  variant="body1"
                  component="p"
                  align="left"
                  className={`${classes.wiFeatureItem}`}
                  key={feature}
                >
                  {`- ${feature}`}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box className={classes.wiFeaturesBox}>
            <img src={`/assets/images/${pageStatics.data.description.features.second.image}`} alt={pageStatics.data.description.features.second.title} />
            <Typography
              variant="body1"
              component="p"
              align="left"
              className={`${classes.wiFeatureTitle}`}
            >
              {pageStatics.data.description.features.second.title}
            </Typography>
            <Box className={classes.wiFeatureList}>
              {pageStatics.data.description.features.second.description.map(feature => (
                <Typography
                  variant="body1"
                  component="p"
                  align="left"
                  className={`${classes.wiFeatureItem}`}
                  key={feature}
                >
                  {`- ${feature}`}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </FullScreenDialog>
  )
}

WhatsIncludedDialog.defaultProps = {
  open: false,
}

WhatsIncludedDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default WhatsIncludedDialog
