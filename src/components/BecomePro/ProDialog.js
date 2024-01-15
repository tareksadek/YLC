import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'

import FullScreenDialog from '../../layout/FullScreenDialog'
import ProBox from './ProBox'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { buttonStyles } from '../../theme/buttons'

import * as vars from '../../utilities/appVars'

const ProDialog = ({
  open, onClose, onlyFeatures,
}) => {
  const buttonClasses = buttonStyles()

  const color = useColor()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.becomePro

  const goToSubscribe = () => {
    history.push(vars.SUBSCRIBE_PAGE)
  }

  return (
    <FullScreenDialog
      type="custom"
      titleBackground={color.color.code}
      title={pageStatics.data.titles.dialog}
      open={open}
      onClose={() => onClose()}
      buttonBackground={color.color.code}
      actionButtonOne={!onlyFeatures && (
        <Button
          color="secondary"
          onClick={goToSubscribe}
          className={`${buttonClasses.defaultButton}`}
          disabled={false}
          style={{
            backgroundColor: color.color.code,
          }}
        >
          {pageStatics.buttons.becomePro}
          <span className={buttonClasses.defaultButtonDescription}>
            {pageStatics.buttons.becomeProOffer}
            <i>{pageStatics.buttons.becomeProCancel}</i>
          </span>
        </Button>
      )}
    >
      <ProBox onlyFeatures={onlyFeatures} noButton />
    </FullScreenDialog>
  )
}

ProDialog.defaultProps = {
  open: false,
  onlyFeatures: false,
}

ProDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onlyFeatures: PropTypes.bool,
}

export default ProDialog
