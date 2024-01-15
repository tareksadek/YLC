import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import QRCode from 'react-qr-code'
import QRCodeStyling from 'qr-code-styling'
// import { saveSvgAsPng, svgAsDataUri } from 'save-svg-as-png'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
// import Chip from '@material-ui/core/Chip'

// import StarIcon from '@material-ui/icons/Star'

import Header from '../../layout/Header'
import PageTitle from '../../layout/PageTitle'
import InfoBox from '../../components/Ui/InfoBox'
import SkeletonContainer from '../../layout/SkeletonContainer'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'

import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'

import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'
import { qrStyles } from './styles'

import * as actions from '../../store/actions'

const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,
  dotsOptions: {
    color: '#272727',
    type: 'rounded',
  },
})

const QrCode = ({
  cardData,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = qrStyles()

  const color = useColor()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.qrCode
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const pageUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/profile/' : language.languageVars.appProfileURL
  const userName = auth.isMaster ? cardData.lastName || '' : `${cardData.firstName || ''} ${cardData.lastName || ''}}`
  const loading = cardData.loading || !cardData.userId || auth.loadingAuth

  const ref = useRef(null)

  useEffect(() => {
    if (!loading) {
      qrCode.append(ref.current)
    }
  }, [loading])

  useEffect(() => {
    if (!loading) {
      qrCode.update({
        data: pageUrl,
      })
    }
  }, [pageUrl, loading])

  // const [loadingDone, setLoadingDone] = useState(false)
  // const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   let mounted = true

  //   if ((mounted && !cardData.userId) || !isTheLoggedinUser) {
  //     (async () => {
  //       setLoading(true)
  //       await onLoadCard(auth.user.uid)
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //     })()
  //   }

  //   return () => { mounted = false }
  // }, [onLoadCard, auth.user.uid, cardData.userId, isTheLoggedinUser])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  const saveAsPNG = () => {
    // saveSvgAsPng(document.getElementById('qrcode'), `${userName.trim()}.png`, { scale: 6 })
    qrCode.download({ extension: 'png', name: `${userName.trim()}_QRcode` });
  }

  const saveAsSVG = async () => {
    // try {
    //   const dataUri = await svgAsDataUri(document.getElementById('qrcode'))
    //   const dl = document.createElement('a')
    //   document.body.appendChild(dl)
    //   dl.setAttribute('href', dataUri)
    //   dl.setAttribute('download', `${userName.trim()}.svg`)
    //   dl.click();
    // } catch (err) {
    //   throw new Error(err)
    // }
    qrCode.download({ extension: 'svg', name: `${userName.trim()}_QRcode` });
  }

  if (cardData.loading || !cardData.userId || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.page}>
          <Box>
            <InfoBox infoList={[pageStatics.messages.info.general.first]} />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 150 },
                { variant: 'rect', width: 100, height: 50 },
                { variant: 'rect', width: 100, height: 50 },
              ]}
              />
            </Box>
          </Box>
        </Box>
        <LoadingBackdrop done={!auth.loadingAuth} loadingText={pageStatics.messages.loading.loadingQrCode} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {/* {loading && <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingQrCode} />} */}
      <Header title={pageStatics.data.titles.page}>
        <Box>
          <InfoBox infoList={[pageStatics.messages.info.general.first]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <Box className={`${layoutClasses.panel}`}>
            <PageTitle title={pageStatics.data.titles.qrCodePanel} />
            <Box className={classes.qrCodeContainer} mt={2}>
              <div ref={ref} />
              {/* <QRCode id="qrcodes" value={`${pageUrl}${cardData.urlSuffix}`} /> */}
            </Box>
            <Box className={layoutClasses.panelButtonsContainer}>
              <Button
                className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                style={{
                  backgroundColor: color.color.code,
                }}
                onClick={() => saveAsPNG()}
              >
                {pageStatics.buttons.saveAsPng}
              </Button>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Button
                  className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                  style={{
                    backgroundColor: color.color.code,
                  }}
                  onClick={() => saveAsSVG()}
                >
                  {pageStatics.buttons.saveAsSvg}
                </Button>
                {/* {settings.onlyInvitations && !isPro && (
                  <Chip
                    size="small"
                    icon={<StarIcon />}
                    label="Pro"
                    clickable
                    color="primary"
                    onClick={openProDialogHandler}
                    className={layoutClasses.proChip}
                    style={{ marginTop: 8 }}
                  />
                )} */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
})

const mapDispatchToProps = dispatch => ({
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
})

QrCode.defaultProps = {
  cardData: null,
}

QrCode.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  // onLoadCard: PropTypes.func.isRequired,
  // switchTheme: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(QrCode)
