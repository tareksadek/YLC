import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  withRouter, useHistory, Link, useLocation,
} from 'react-router-dom'
import { connect } from 'react-redux'
import parse from 'html-react-parser'

import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'

import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import { useTheme } from '@material-ui/core/styles'
import { Logo, QrIcon } from './CustomIcons'

import SideDrawer from './SideDrawer'
import UserMenu from './UserMenu'
import HideOnScroll from './HideOnSroll'
import QRdrawer from '../components/Cards/ViewCard/QRdrawer'

// import { buttonStyles } from '../theme/buttons'
import { navStyles } from './styles'
import { useAuth } from '../hooks/use-auth'
import { useLanguage } from '../hooks/useLang'
import { useColor } from '../hooks/useDarkMode'
import { useDisplayMode } from '../hooks/useDisplayMode'
import useScrollPosition from '../hooks/useScrollPosition'

import * as vars from '../utilities/appVars'

const AppNav = ({
  hideNavigation, hideHeader, settings, profileType, isBusinessProfile, userColor, isBasicProfile, card,
}) => {
  const defaultTheme = useTheme()
  const auth = useAuth()
  const language = useLanguage()
  const classes = navStyles()
  // const buttonClasses = buttonStyles()
  const color = useColor()
  const history = useHistory()
  const mode = useDisplayMode()
  const location = useLocation()
  // const match = matchPath(location.pathname, {
  //   path: '/:urlSuffix',
  //   exact: true,
  //   strict: false,
  // })
  // console.log(location.pathname);
  // console.log(match);
  // const isProfilePage = match ? match.params.urlSuffix : null;
  const isProfilePage = card && location.pathname.includes(card.urlSuffix)
  const showLogo = !!isProfilePage
  const showQR = !!isProfilePage
  const showUserMenu = !!(auth.user && auth.superAdminStatus)
  const [anchorEl, setAnchorEl] = useState(null)
  const [qrDrawerOpen, setQrDrawerOpen] = useState(window.location.hash === '#qr')
  const [drawerState, setDrawerState] = React.useState({
    left: false,
    right: false,
  })
  const isMenuOpen = Boolean(anchorEl)
  const homeLink = auth.user && auth.authStatus === 'loggedin' ? `/${auth.userUrlSuffix}` : '/'
  const homeLinkTarget = auth.user && auth.authStatus === 'loggedin' ? '_self' : '_self'
  const isMaster = auth.isMaster || card.isMaster
  const navLinks = auth.user && vars.navLinks(auth.userUrlSuffix, auth.user.uid)
  const masterLinkGroups = auth.user && !isMaster ? navLinks.filter(link => link.permission !== 'master') : navLinks
  const permissionLinks = masterLinkGroups && !isMaster ? masterLinkGroups.map(linkGroup => ({
    ...linkGroup,
    links: linkGroup.links.filter(link => link.teamMember === true),
  })) : masterLinkGroups
  const userMenu = auth.user && auth.superAdminStatus ? vars.adminMenu : vars.adminMenu.filter(link => link.auth !== 'superAdmin')

  const withoutNavigation = hideNavigation && !auth.user ? classes.navigationHidden : ''
  const withoutHeader = hideHeader ? classes.headerHidden : ''

  const emailUser = auth.user && auth.user.providerData[0].providerId === 'password'
  const hasSecretCode = !!auth.accountSecret

  const isTheLoggedinUser = auth && auth.user && auth.user.uid === card.defaultId

  const scrollPosition = useScrollPosition()

  const fallBackColor = settings && settings.theme === 'light' ? '#272727' : '#ffffff'

  let colorCode
  if (settings && !auth.user) {
    colorCode = settings.selectedColor.code
  } else {
    colorCode = color.color.code
  }

  if (userColor) {
    colorCode = userColor
  }

  let logoLink = homeLink
  if (card.store && card.store.logoLink && auth.user && auth.authStatus === 'loggedin') {
    logoLink = `/${auth.userUrlSuffix}`
  }
  if (card.store && card.store.logoLink && (!auth.user || auth.authStatus !== 'loggedin')) {
    logoLink = { pathname: card.store.logoLink }
  }

  let logoLinkTarget = homeLinkTarget
  if (card.store && card.store.logoLink && auth.user && auth.authStatus === 'loggedin') {
    logoLinkTarget = '_self'
  }
  if (card.store && card.store.logoLink && (!auth.user || auth.authStatus !== 'loggedin')) {
    logoLinkTarget = '_blank'
  }

  useEffect(() => {
    const onHashChange = () => {
      setQrDrawerOpen(window.location.hash === '#qr')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const toggleDrawerHandler = (anchor, open, path) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawerState({ ...drawerState, [anchor]: open })
    if (path) {
      history.push(path)
    }
  }

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // const handleLogin = () => {
  //   window.localStorage.setItem('authFrom', history.location.pathname)
  //   history.push(vars.AUTH_PAGE)
  // }

  const handleUserMenu = path => {
    setAnchorEl(null)
    history.push(path)
  }

  const openQrDrawerHandler = () => {
    window.location.hash = '#qr'
  }

  const closeQrDrawerHandler = () => {
    window.history.back()
  }

  const toggleDisplayMode = displayMode => {
    if (mode.mode === displayMode) {
      return
    }
    mode.toggleMode(displayMode)
  }

  const goToLogin = () => {
    history.push(vars.LOGIN_PAGE)
  }

  const menuId = 'primary-search-account-menu'

  return (
    <>
      {drawerState.left && <Button className={classes.closeNavIcon} onClick={toggleDrawerHandler('left', false)}><KeyboardReturnIcon /></Button>}
      <Box className={`${classes.grow} ${withoutHeader} ${profileType === 'social' && classes.socialNavigation}`}>
        <HideOnScroll>
          <AppBar
            color="primary"
            style={{
              backgroundColor: profileType !== 'social' && colorCode,
            }}
            classes={{
              root: `
                ${classes.appBar} ${profileType === 'social' ? classes.socialAppbar : ''}
                ${isBusinessProfile ? classes.businessAppbar : ''}
                ${isBasicProfile ? classes.basicAppbar : ''}
                ${isBusinessProfile && !auth.user ? classes.businessAppbarUnauth : ''}
                ${scrollPosition >= 30 ? classes.scrolledHeader : ''}
              `,
            }}
          >
            <Toolbar classes={{
              regular: profileType === 'social' ? classes.socialToolbar : classes.toolbar,
            }}
            >
              {auth.user && auth.authStatus === 'loggedin' && !auth.isMasterLocked && (
                <div className={`${classes.showMobileNav} ${withoutNavigation}`}>
                  <SideDrawer
                    toggleDrawer={toggleDrawerHandler}
                    drawerState={drawerState.left}
                    iconColor={defaultTheme.palette.background.default}
                    selectedColor={colorCode}
                    navLinks={permissionLinks}
                    anchor="left"
                    emailUser={emailUser}
                    isMaster={isMaster}
                    hasSecretCode={hasSecretCode}
                    openQr={openQrDrawerHandler}
                    showBackButton={!isProfilePage}
                  />
                </div>
              )}
              {showLogo && (
                <Container className={classes.navbarDisplayFlex}>
                  <Box className={classes.logoContainer}>
                    <Link
                      to={logoLink}
                      target={logoLinkTarget}
                      rel="noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <Box className={classes.logoContainer}>
                        {card.store && card.store.logo ? (
                          <Box className={classes.storeLogoContainer}>
                            {parse(card.store.logo)}
                          </Box>
                        ) : (
                          <>
                            {auth.user && (
                              <Logo fill={defaultTheme.palette.background.default} className={classes.logo} />
                            )}
                          </>
                        )}
                        <Typography component="h5" variant="h5" className={classes.appName}>
                          {language.languageVars.appName}
                        </Typography>
                      </Box>
                    </Link>
                  </Box>
                </Container>
              )}
              <div className={classes.grow} />
              {auth.user && isProfilePage && isTheLoggedinUser && auth.isMaster && (
                <Box className={classes.toggleDisplayModeContainer}>
                  <Button className={mode.mode === 'view' ? classes.selectedDisplay : ''} color="inherit" onClick={() => toggleDisplayMode('view')}>View</Button>
                  <Button className={mode.mode === 'edit' ? classes.selectedDisplay : ''} color="inherit" onClick={() => toggleDisplayMode('edit')}>Edit</Button>
                </Box>
              )}
              <Box className={`${classes.navDisplayFlex}`}>
                {/* {auth.user && auth.authStatus === 'loggedin' ? ( */}
                <>
                  {
                    // className={`${profileType === 'social' ? classes.showMobileNav : classes.sectionMobile}
                  }
                  {
                    // className={`${classes.navDisplayFlex} ${profileType === 'social' ? classes.hideDesktopNav : classes.sectionDesktop}
                  }
                  {
                    // <List component="nav" aria-labelledby="main navigation" className={`${classes.navDisplayFlex} ${classes.hideDesktopNav} ${withoutNavigation}`}>
                    //   {navLinks && navLinks.map(({ linkfor, path }) => (
                    //     <Link to={path} key={linkfor} className={classes.linkText}>
                    //       <ListItem button className={linkfor === 'profile' ? classes.profileButton : ''}>
                    //         <ListItemText
                    //           primaryTypographyProps={{
                    //             classes: {
                    //               body1: classes.linkTextData,
                    //             },
                    //           }}
                    //           className={language.direction === 'rtl' ? classes.arabicFont : ''}
                    //           primary={language.languageVars.navLinks[linkfor]}
                    //         />
                    //       </ListItem>
                    //     </Link>
                    //   ))}
                    // </List>
                  }
                  <Box className={classes.rightNav}>
                    {showQR && (
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
                    )}
                    {auth.user && showUserMenu && (
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                      >
                        <Avatar alt={auth.user.displayName} src={auth.user.photoURL} className={classes.small} />
                      </IconButton>
                    )}
                    {/* {!auth.user && (
                      <Button className={language.direction === 'rtl' ? classes.arabicFont : ''} color="inherit" onClick={handleLogin}>Login</Button>
                    )} */}
                  </Box>
                </>
                {/* ) : ( */}
                <>
                  {/* <a
                    className={`${buttonClasses.getCardButton}`}
                    href={card.store && card.store.storeButtonLink ? card.store.storeButtonLink : language.languageVars.appStore}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    {card.store && card.store.storeButtonLink && card.store.storeButtonText ? card.store.storeButtonText : language.languageVars.getTheCard}
                  </a> */}
                  {!auth.user && (
                    <IconButton
                      edge="end"
                      aria-label="Login"
                      onClick={goToLogin}
                    >
                      <AccountCircleIcon />
                    </IconButton>
                  )}
                </>
                {/* )} */}
              </Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        {showUserMenu && (
          <UserMenu open={isMenuOpen} links={userMenu} anchorEl={anchorEl} onClose={handleMenuClose} onLinkClicked={handleUserMenu} menuId={menuId} />
        )}
        {/* {qrDrawerOpen && showQR && ( */}
        {showQR && (
          <QRdrawer
            hideButtons
            closeDialog={closeQrDrawerHandler}
            dialogOpen={qrDrawerOpen}
            qrURL={`${language.languageVars.appDomain}/${card.urlSuffix}`}
            userColor={settings.selectedColor.code || fallBackColor}
          />
        )}
      </Box>
    </>
  )
}

AppNav.defaultProps = {
  hideNavigation: false,
  hideHeader: false,
  settings: null,
  profileType: null,
  isBusinessProfile: false,
  userColor: null,
  isBasicProfile: false,
  card: null,
}

AppNav.propTypes = {
  hideNavigation: PropTypes.bool,
  hideHeader: PropTypes.bool,
  settings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  profileType: PropTypes.string,
  isBusinessProfile: PropTypes.bool,
  userColor: PropTypes.string,
  isBasicProfile: PropTypes.bool,
  card: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

const mapStateToProps = state => ({
  settings: state.cards.settings,
  card: state.cards,
})

export default connect(mapStateToProps, null)(withRouter(AppNav))
