import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'

import Alert from '../../layout/Alert'

import { useLanguage } from '../../hooks/useLang'

const InvitationBlock = ({ validation }) => {
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth

  const buyTapplHandler = () => {
    window.location.href = language.languageVars.appParentDomain
  }

  return (
    <Box mt={12}>
      <Alert
        title={pageStatics.data.titles.authinticationError}
        description={!validation ? pageStatics.messages.notifications.invitationCodeRequired : `${pageStatics.messages.notifications.invalidInvitationCode} ${validation}`}
        buttonText={pageStatics.buttons.buyTappl}
        type="error"
        onClickHandler={() => buyTapplHandler()}
      />
    </Box>
  )
}

InvitationBlock.defaultProps = {
  validation: null,
}

InvitationBlock.propTypes = {
  validation: PropTypes.string,
}

export default InvitationBlock
