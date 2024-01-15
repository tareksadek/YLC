import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import PaletteIcon from '@material-ui/icons/Palette'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import EditIcon from '@material-ui/icons/Edit'

import AppNav from '../../../layout/AppNav'
import QRdrawer from './QRdrawer'

import { useDisplayMode } from '../../../hooks/useDisplayMode'
import { useLanguage } from '../../../hooks/useLang'
import { useAuth } from '../../../hooks/use-auth'

import { getFirebaseStorage } from '../../../API/firebase'

import { headerStyles } from '../styles'
import { buttonStyles } from '../../../theme/buttons'
import { layoutStyles } from '../../../theme/layout'

const BasicHeader = ({
  userName, title, colorCode, firstName, lastName, image, logo, userColor, homePhone, email, organization, isMaster, urlSuffix,
}) => {
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.viewProfile
  const auth = useAuth()
  const classes = headerStyles()
  const buttonClasses = buttonStyles()
  const layoutClasses = layoutStyles()

  const mode = useDisplayMode()
  const history = useHistory()

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

  const goToLogo = e => {
    e.stopPropagation()
    history.push('/logo')
  }

  const goToTheme = e => {
    e.stopPropagation()
    history.push('/settings/theme')
  }

  const goToInfo = e => {
    e.stopPropagation()
    history.push('/info')
  }

  const goToContact = e => {
    e.stopPropagation()
    history.push('/contact')
  }

  const closeQrDrawerHandler = () => {
    window.history.back()
  }

  const x = false

  return (
    <Box className={classes.container}>

      <AppNav profileType="social" userColor={colorCode} />
      <Box
        className={`${classes.content} ${image ? classes.headerWithImage : classes.headerWithOutImage}`}
        style={{ backgroundColor: !loading && image && !storageImageError ? 'transparent' : userColor }}
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
        <Box className={classes.cardContainer}>
          <Box className={classes.cardDataContainer}>
            <Box className={classes.cardAvatar}>
              <Avatar
                alt={userName}
                src={logoImage || '/assets/images/avatar.svg'}
                className={classes.basicViewCardAvatar}
              />
              {mode.mode === 'edit' && (
                <Box className={classes.logoPlaceholderContainer}>
                  <Button
                    color="secondary"
                    onClick={e => goToLogo(e)}
                    className={buttonClasses.editModeButtonCircle}
                  >
                    <AddAPhotoIcon style={{ fontSize: '1.2rem' }} />
                  </Button>
                </Box>
              )}
            </Box>
            <Box className={classes.cardData}>
              <Typography component="p" variant="body1" className={`${classes.viewCardName} ${(firstName && firstName.length > 9) || (lastName && lastName.length > 9) ? classes.viewCardNameSmall : ''}`}>
                {/* {firstName || lastName ? userName : ''} */}
                {isMaster ? lastName || '' : userName || ''}
                {mode.mode === 'edit' && (
                  <span className={classes.placeholderButtonContainer}>
                    <Button
                      color="secondary"
                      onClick={e => goToInfo(e)}
                      className={buttonClasses.editModeButtonCircle}
                    >
                      <EditIcon style={{ fontSize: '0.9rem' }} />
                    </Button>
                  </span>
                )}
              </Typography>
              {(title || organization) && (
                <Typography component="p" variant="body1" className={classes.viewCardAbout}>
                  {title || ''}
                  {title ? ` - ${organization}` : (organization || '')}
                </Typography>
              )}
              <Box className={classes.viewCardContacts}>
                {email && (
                  <Box>
                    <a href={`mailto:${email}`} style={{ color: colorCode }} className={classes.viewCardEmail}>
                      {email}
                    </a>
                    {mode.mode === 'edit' && (
                      <span className={classes.placeholderButtonContainer} style={{ top: 0 }}>
                        <Button
                          color="secondary"
                          onClick={e => goToContact(e)}
                          className={buttonClasses.editModeButtonCircle}
                        >
                          <EditIcon style={{ fontSize: '0.9rem' }} />
                        </Button>
                      </span>
                    )}
                  </Box>
                )}
                {homePhone && (
                  <Typography component="p" variant="body1" className={classes.viewCardTitle}>
                    {homePhone}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
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

BasicHeader.defaultProps = {
  userName: null,
  title: null,
  image: null,
  userColor: null,
  logo: null,
  colorCode: null,
  firstName: null,
  lastName: null,
  homePhone: null,
  email: null,
  organization: null,
  isMaster: null,
  urlSuffix: null,
}

BasicHeader.propTypes = {
  userName: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  logo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  userColor: PropTypes.string,
  colorCode: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  homePhone: PropTypes.string,
  email: PropTypes.string,
  organization: PropTypes.string,
  isMaster: PropTypes.bool,
  urlSuffix: PropTypes.string,
}

export default BasicHeader
