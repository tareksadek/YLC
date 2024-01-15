import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import QRCode from 'react-qr-code'
// import { saveSvgAsPng, svgAsDataUri } from 'save-svg-as-png'
import QRCodeStyling from 'qr-code-styling'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'

import { useLanguage } from '../../hooks/useLang'

import { qrDialog } from './styles'
import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'

const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,
  dotsOptions: {
    color: '#272727',
    type: 'rounded',
  },
})

const QRdrawer = ({
  onClose, dialogOpen, memberName, memberSuffix,
}) => {
  const classes = qrDialog()
  const buttonClasses = buttonStyles()
  const layoutClasses = layoutStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.qrCode
  const ref = useRef(null)

  const qrURL = process.env.NODE_ENV === 'development' ? `http://localhost:300/${memberSuffix}` : `${language.languageVars.appProfileURL}${memberSuffix}`

  useEffect(() => {
    if (dialogOpen && qrURL) {
      setTimeout(() => qrCode.append(ref.current), 500)
    }
  }, [dialogOpen, qrURL])

  useEffect(() => {
    if (dialogOpen && qrURL) {
      qrCode.update({
        data: qrURL,
      })
    }
  }, [dialogOpen, qrURL])

  const saveAsPNG = () => {
    qrCode.download({ extension: 'png', name: `${memberName.trim()}_QRcode.png` })
    // saveSvgAsPng(document.getElementById('qrcode'), `${memberName.trim()}.png`, { scale: 6 })
  }

  const saveAsSVG = async () => {
    // try {
    //   const dataUri = await svgAsDataUri(document.getElementById('qrcode'))
    //   const dl = document.createElement('a')
    //   document.body.appendChild(dl)
    //   dl.setAttribute('href', dataUri)
    //   dl.setAttribute('download', `${memberName.trim()}.svg`)
    //   dl.click();
    // } catch (err) {
    //   throw new Error(err)
    // }
    qrCode.download({ extension: 'svg', name: `${memberName.trim()}_QRcode.svg` })
  }

  return (
    <FullScreenDialog
      open={dialogOpen}
      onClose={onClose}
      title={`${memberName} ${pageStatics.data.titles.member}`}
      bodyBackground="dark"
      loading={false}
    >
      <Box className={classes.xx}>
        <Box className={classes.qrContent}>
          {!qrURL ? (
            <LoadingBackdrop loadingText="Generating QR code" />
          ) : (
            <Box className={`${classes.container}`}>
              <div ref={ref} />
            </Box>
          )}
        </Box>
        <Box className={`${layoutClasses.panelButtonsContainer} ${layoutClasses.panelButtonsContainerLg}`} mt={2}>
          <Button
            className={`${buttonClasses.defaultButton} ${buttonClasses.outlineButton}`}
            style={{ color: '#fff' }}
            onClick={() => saveAsPNG()}
          >
            {pageStatics.buttons.saveAsPng}
          </Button>
          <br />
          <Button
            className={`${buttonClasses.defaultButton} ${buttonClasses.outlineButton}`}
            style={{ color: '#fff' }}
            onClick={() => saveAsSVG()}
          >
            {pageStatics.buttons.saveAsSvg}
          </Button>
        </Box>
      </Box>
    </FullScreenDialog>
  )
}

const mapStateToProps = state => ({
  card: state.cards,
})

QRdrawer.defaultProps = {
  dialogOpen: false,
  memberName: null,
  memberSuffix: null,
}

QRdrawer.propTypes = {
  dialogOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  memberName: PropTypes.string,
  memberSuffix: PropTypes.string,
}

export default connect(mapStateToProps, null)(QRdrawer)
