import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import { useLanguage } from '../../../hooks/useLang'

import { buttonStyles } from '../../../theme/buttons'
import { infoDataStyles } from '../styles'

const InfoButton = ({
  showInfoDialogHandler, colorCode, bioVideo,
}) => {
  const buttonClasses = buttonStyles()
  const classes = infoDataStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.viewProfile

  return (
    <Button
      className={`${buttonClasses.defaultButton} ${classes.infoButton}`}
      onClick={() => showInfoDialogHandler()}
      style={{ backgroundColor: colorCode }}
    >
      <ExpandLessIcon className={classes.infoButtonIcon} />
      <span>{bioVideo ? pageStatics.buttons.drawerText : pageStatics.buttons.drawerTextNoVideo}</span>
    </Button>
  )
}

InfoButton.defaultProps = {
  colorCode: null,
  bioVideo: null,
}

InfoButton.propTypes = {
  showInfoDialogHandler: PropTypes.func.isRequired,
  colorCode: PropTypes.string,
  bioVideo: PropTypes.string,
}

export default InfoButton
