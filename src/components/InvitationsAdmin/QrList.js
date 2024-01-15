import React from 'react'
import PropTypes from 'prop-types'

import QRCode from 'react-qr-code'
import { svgAsDataUri } from 'save-svg-as-png'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { useLanguage } from '../../hooks/useLang'

import { buttonStyles } from '../../theme/buttons'
import { invitationTableStyles } from './styles'

const QrList = ({
  invitations,
}) => {
  const classes = invitationTableStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/activate?tac=' : language.languageVars.appActivationURL

  const downloadQrList = async e => {
    e.preventDefault()
    for (let i = 0; i < invitations.length; i += 1) {
      const invitationCode = invitations[i].code
      try {
        /* eslint-disable no-await-in-loop */
        const dataUri = await svgAsDataUri(document.getElementById(invitationCode))
        const dl = document.createElement('a')
        document.body.appendChild(dl)
        dl.setAttribute('href', dataUri)
        dl.setAttribute('download', `${i + 1}__${invitationCode}.svg`)
        dl.click();
      } catch (err) {
        throw new Error(err)
      }
    }
  }

  return (
    <Box mt={2}>
      <Button
        color="primary"
        onClick={e => downloadQrList(e)}
        className={buttonClasses.defaultButton}
        style={{
          minWidth: 200,
        }}
      >
        Download QR list
      </Button>
      <Box className={classes.qrListContainer}>
        {invitations && invitations.map(invitation => (
          <QRCode id={invitation.code} key={invitation.code} value={`${pageUrl}${invitation.code}`} size={50} />
        ))}
      </Box>
    </Box>
  )
}

QrList.defaultProps = {
  invitations: null,
}

QrList.propTypes = {
  invitations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
}

export default QrList
