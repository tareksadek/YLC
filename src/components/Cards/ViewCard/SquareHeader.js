import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import PaletteIcon from '@material-ui/icons/Palette'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EditIcon from '@material-ui/icons/Edit'

import { QrIcon } from '../../../layout/CustomIcons'

import useWindowDimensions from '../../../hooks/useWindowDimensions'
import { useAuth } from '../../../hooks/use-auth'

import AppNav from '../../../layout/AppNav'
import QRdrawer from './QRdrawer'
// import ActionButtons from './ActionButtons'

import { LOGIN_PAGE } from '../../../utilities/appVars'

import { useDisplayMode } from '../../../hooks/useDisplayMode'

import { squareHeaderStyles } from '../styles'
import { buttonStyles } from '../../../theme/buttons'

const SquareHeader = ({
  userName, userColor, logo, showLoginIcon, urlSuffix,
  lastName, organization, title, isMaster,
}) => {
  const { width } = useWindowDimensions()
  const classes = squareHeaderStyles()
  const buttonClasses = buttonStyles()
  const mode = useDisplayMode()
  const defaultTheme = useTheme()
  const auth = useAuth()
  const history = useHistory()
  const logoImage = logo && logo.code ? `data:${logo.type};base64,${logo.code}` : null

  const [qrDrawerOpen, setQrDrawerOpen] = useState(window.location.hash === '#qr')

  useEffect(() => {
    const onHashChange = () => {
      setQrDrawerOpen(window.location.hash === '#qr')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const goToLogin = () => {
    history.push(LOGIN_PAGE)
  }

  const goToLogo = e => {
    e.stopPropagation()
    history.push('/logo')
  }

  const goToTheme = e => {
    e.stopPropagation()
    history.push('/settings/theme')
  }

  const goToInfo = () => {
    history.push('/info')
  }

  const openQrDrawerHandler = () => {
    window.location.hash = '#qr'
  }

  const closeQrDrawerHandler = () => {
    window.history.back()
  }

  const menuId = 'qr-menu'
  const x = false

  return (
    <Box className={classes.container}>
      {showLoginIcon && x && (
        <Box display="flex" alignItems="center" className={classes.loggedoutRightMenu}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={openQrDrawerHandler}
            color="inherit"
          >
            <QrIcon fill={defaultTheme.palette.background.default} />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="Login"
            onClick={goToLogin}
            color="inherit"
            className={classes.loginIconButton}
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      )}
      <AppNav profileType="social" userColor={userColor} />
      <Box className={`${classes.squareContent} ${logo && logo.code && classes.headerWithImage}`} style={{ maxHeight: width }}>
        <img src={logoImage || '/assets/images/avatar.svg'} alt={userName} className={classes.image} />

        <Box className={classes.squareHeaderData}>
          <Typography component="p" variant="body1" className={classes.viewCardName}>
            {isMaster ? lastName || '' : userName || ''}
            {mode.mode === 'edit' && (
              <span className={classes.placeholderButtonContainer}>
                <Button
                  color="secondary"
                  onClick={() => goToInfo()}
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
        </Box>

        {mode.mode === 'edit' && (
          <>
            <Box className={classes.placeholderContainer}>
              <Button
                color="secondary"
                onClick={e => goToLogo(e)}
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
      {qrDrawerOpen && !auth.user && x && (
        <QRdrawer
          hideButtons
          closeDialog={closeQrDrawerHandler}
          dialogOpen={qrDrawerOpen}
          urlSuffix={urlSuffix}
          userColor={userColor}
        />
      )}
    </Box>
  )
}

SquareHeader.defaultProps = {
  userName: null,
  logo: null,
  userColor: null,
  showLoginIcon: false,
  urlSuffix: null,
  lastName: null,
  organization: null,
  title: null,
  isMaster: false,
}

SquareHeader.propTypes = {
  userName: PropTypes.string,
  logo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  userColor: PropTypes.string,
  showLoginIcon: PropTypes.bool,
  urlSuffix: PropTypes.string,
  lastName: PropTypes.string,
  organization: PropTypes.string,
  title: PropTypes.string,
  isMaster: PropTypes.bool,
}

export default SquareHeader
