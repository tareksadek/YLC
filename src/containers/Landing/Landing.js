import React from 'react'

import { useHistory, Redirect } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import LockOpenIcon from '@material-ui/icons/LockOpen'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { Logo } from '../../layout/CustomIcons'

import {
  LOGIN_PAGE, INVITATIONS_PAGE, CREATE_TEAM_PAGE,
} from '../../utilities/appVars'

import { landingStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'

// const ONECarousel = lazy(() => import('../../components/Landing/Carousel'))

const Landing = () => {
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.landing

  const classes = landingStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const history = useHistory()

  const goToCreateTeam = () => {
    history.push(CREATE_TEAM_PAGE)
  }

  const goToLogin = () => {
    history.push(LOGIN_PAGE)
  }

  const goToCheckInvitation = () => {
    history.push(INVITATIONS_PAGE)
  }

  // const goToCreateAccount = () => {
  //   history.push('/createAccount')
  // }

  if (auth.authStatus === 'processing' || auth.authStatus === 'prelogin') {
    return <LoadingBackdrop done={auth.authStatus === 'loggedin' || auth.authStatus === 'failed'} loadingText={pageStatics.messages.loading.auth} boxed />
  }

  if (auth.authStatus === 'loggedin' && auth.user && auth.userExist && auth.authStatus !== 'failed') {
    return <Redirect to={`/${auth.userUrlSuffix}`} />
  }

  return (
    <Box className={`${layoutClasses.pageContainer} ${classes.landingPageContainer}`}>
      <Box className={classes.landingHeader}>
        <Box className={classes.landingNav}>
          <Logo className={classes.logo} />
          <Button
            disableRipple
            onClick={() => goToLogin()}
          >
            <LockOpenIcon />
          </Button>
        </Box>
      </Box>
      <Box className={classes.landingTextContainer}>
        <Typography variant="body1" component="p" align="center" className={classes.landingTextOne}>
          {pageStatics.data.titles.main.first.a}
          <span>{pageStatics.data.titles.main.first.b}</span>
        </Typography>
        <Typography variant="body1" component="p" align="center" className={classes.landingTextOne}>
          {pageStatics.data.titles.main.second.a}
          <span>{pageStatics.data.titles.main.second.b}</span>
        </Typography>
        <Typography variant="body1" component="p" align="center" className={classes.landingTextThree}>
          {pageStatics.data.titles.main.third.a}
          <span>{pageStatics.data.titles.main.third.b}</span>
        </Typography>
        <Typography variant="body1" component="p" align="center" className={classes.landingTextFour}>
          {pageStatics.data.titles.subtitle}
        </Typography>
      </Box>
      <Box className={classes.landingActions}>
        <Box className={classes.landingButtonsContainer}>
          <Button
            disableRipple
            className={buttonClasses.defaultButton}
            onClick={() => goToCreateTeam()}
          >
            {pageStatics.buttons.createTeam}
          </Button>
          <Box mt={2} width="100%" display="flex" alignItems="center" justifyContent="center">
            <Button
              disableRipple
              className={buttonClasses.outlineButton}
              onClick={() => goToCheckInvitation()}
            >
              {pageStatics.buttons.joinTeam}
            </Button>
          </Box>
          <Box mt={2}>
            <Button
              className={buttonClasses.textButton}
              disableRipple
              onClick={() => goToLogin()}
            >
              {pageStatics.buttons.login}
            </Button>
          </Box>
          {/* <a
            className={buttonClasses.outlineButton}
            href={language.languageVars.appStore}
            target="_blank"
            rel="noreferrer"
          >
            {pageStatics.buttons.createJoinTeam}
          </a> */}
        </Box>
      </Box>
    </Box>
  )
}

export default Landing
