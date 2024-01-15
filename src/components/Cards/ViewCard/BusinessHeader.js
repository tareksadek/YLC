import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import PaletteIcon from '@material-ui/icons/Palette'

import useWindowDimensions from '../../../hooks/useWindowDimensions'

import AppNav from '../../../layout/AppNav'
import QRdrawer from './QRdrawer'

import { useDisplayMode } from '../../../hooks/useDisplayMode'
import { useLanguage } from '../../../hooks/useLang'
import { useAuth } from '../../../hooks/use-auth'

import { getFirebaseStorage } from '../../../API/firebase'

import { socialHeaderStyles } from '../styles'
import { buttonStyles } from '../../../theme/buttons'
import { layoutStyles } from '../../../theme/layout'

const BusinessHeader = ({
  userName, image, userColor, logo, urlSuffix, isMaster,
}) => {
  const mode = useDisplayMode()
  const auth = useAuth()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.viewProfile
  const { width } = useWindowDimensions()
  const classes = socialHeaderStyles()
  const buttonClasses = buttonStyles()
  const layoutClasses = layoutStyles()
  const [bannerimage, setBannerImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [qrDrawerOpen, setQrDrawerOpen] = useState(window.location.hash === '#qr')
  const [storageImageError, setStorageImageError] = useState(false)

  const logoImage = logo && logo.code ? `data:${logo.type};base64,${logo.code}` : null

  useEffect(() => {
    let mounted = true
    if (mounted && image) {
      (async () => {
        setLoading(true)
        try {
          const bannerStorageImage = await getFirebaseStorage().ref(`profiles/${image}`).getDownloadURL()
          setBannerImage(bannerStorageImage)
          setStorageImageError(false)
        } catch (err) {
          setStorageImageError(true)
        }
        setTimeout(() => setLoading(false), 1000)
      })()
    }
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      setQrDrawerOpen(window.location.hash === '#qr')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const goToImage = e => {
    e.stopPropagation()
    history.push('/picture')
  }

  const goToLogo = () => {
    history.push('/logo')
  }

  const goToTheme = e => {
    e.stopPropagation()
    history.push('/settings/theme')
  }

  const closeQrDrawerHandler = () => {
    window.history.back()
  }

  const x = false

  return (
    <Box className={classes.container}>
      <AppNav profileType="social" userColor={userColor} />
      <Box
        className={`${classes.businessContent} ${image ? classes.headerWithImage : classes.headerWithOutImage}`}
        style={{ maxHeight: width / 2, backgroundColor: !loading && image ? 'transparent' : userColor }}
        onClick={e => (mode.mode === 'edit' ? goToImage(e) : true)}
      >
        {bannerimage && !storageImageError && (
          <img src={bannerimage} alt={userName} className={`${classes.image} ${!image || (image && loading) ? classes.placeholderImage : ''}`} />
        )}
        {image && loading && !storageImageError && (
          <CircularProgress size={30} className={classes.bannerLoadingProgress} />
        )}
        {image && storageImageError && auth.user && isMaster && (
          <Box pl={2} pr={2} className={layoutClasses.errorBox}>
            <Typography variant="body1" align="center" component="p" className={layoutClasses.errorText}>
              {pageStatics.messages.notifications.bannerError.description}
              <button type="button" onClick={e => goToImage(e)}>{pageStatics.messages.notifications.bannerError.button}</button>
            </Typography>
          </Box>
        )}
        {mode.mode === 'edit' && (
          <>
            <Box className={classes.placeholderContainer}>
              <Button
                color="secondary"
                onClick={e => goToImage(e)}
                className={buttonClasses.editModeButtonCircle}
              >
                <AddAPhotoIcon style={{ fontSize: '1.2rem' }} />
              </Button>
            </Box>

            <Box className={classes.placeholderContainerTheme}>
              <Button
                color="secondary"
                onClick={e => goToTheme(e)}
                className={buttonClasses.editModeButtonCircle}
              >
                <PaletteIcon style={{ fontSize: '1.4rem' }} />
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Box className={classes.cardLogo} onClick={() => (mode.mode === 'edit' ? goToLogo() : true)}>
        <Avatar
          alt={userName}
          src={logoImage || '/assets/images/avatar.svg'}
          className={`${classes.viewCardLogo} ${classes.viewCardBusinessLogo} ${!logoImage ? classes.logoPlaceholder : ''} ${logo && logo.style === 'square' ? classes.businessSquareLogo : ''}`}
        />
        {mode.mode === 'edit' && (
          <Box className={classes.logoPlaceholderContainer}>
            <Button
              color="secondary"
              onClick={() => goToLogo()}
              className={buttonClasses.editModeButtonCircle}
            >
              <AddAPhotoIcon style={{ fontSize: '1.2rem' }} />
            </Button>
          </Box>
        )}
      </Box>
      {qrDrawerOpen && !auth.user && x && (
        <QRdrawer
          hideButtons
          closeDialog={closeQrDrawerHandler}
          dialogOpen={qrDrawerOpen}
          qrURL={`${language.languageVars.appDomain}/${urlSuffix}`}
          userColor={userColor}
        />
      )}
    </Box>
  )
}

BusinessHeader.defaultProps = {
  userName: null,
  image: null,
  userColor: null,
  logo: null,
  urlSuffix: null,
  isMaster: false,
}

BusinessHeader.propTypes = {
  userName: PropTypes.string,
  image: PropTypes.string,
  logo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  userColor: PropTypes.string,
  urlSuffix: PropTypes.string,
  isMaster: PropTypes.bool,
}

export default BusinessHeader
