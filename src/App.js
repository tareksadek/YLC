import React, { useEffect, useState, useCallback } from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import parse from 'html-react-parser'

import { useSnackbar, SnackbarProvider } from 'notistack'
// import AddToHomeScreen from '@ideasio/add-to-homescreen-react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import { lightTheme, darkTheme } from './theme/main'
import { useDarkMode, ProvideColor } from './hooks/useDarkMode'
import ProvideLanguage from './hooks/useLang'
import { useLayoutMode } from './hooks/useLayoutMode'
import ProvideMode from './hooks/useDisplayMode'

import AppLayout from './layout/AppLayout'
import Landing from './containers/Landing/Landing'
import ErrorNotification from './components/Error/ErrorNotification'
import Notification from './components/Notification/Notification'
// import Auth from './containers/Auth/Auth'
import AuthVerified from './containers/Auth/AuthVerified'
import CreateAccount from './containers/Auth/CreateAccount'
import CreateMaster from './containers/Auth/CreateMaster'
import ConnectAuth from './containers/Auth/ConnectAuth'
import Login from './containers/Auth/Login'
import Logout from './containers/Auth/Logout'
import Users from './containers/Users/Users'
import Patches from './containers/Patches/Patches'
import InvitationsAdmin from './containers/InvitationsAdmin/InvitationsAdmin'
import ViewCard from './containers/Cards/ViewCard'
import Info from './containers/EditProfile/Info'
import Contact from './containers/EditProfile/Contact'
import Picture from './containers/EditProfile/Picture'
import Logo from './containers/EditProfile/Logo'
import Links from './containers/EditProfile/Links'
import Bio from './containers/EditProfile/Bio'
import Theme from './containers/Settings/Theme'
import Privacy from './containers/Settings/Privacy'
import Account from './containers/Settings/Account'
import InvitationCode from './containers/InvitationCode/InvitationCode'
import ActivationLink from './containers/InvitationCode/ActivationLink'
import ProcessInvitation from './containers/Auth/ProcessInvitation'
import ChangePassword from './containers/Auth/ChangePassword'
import Connections from './containers/Connections/Connections'
import ConnectionTags from './containers/Connections/ConnectionTags'
import Forms from './containers/Connections/Forms'
import QrCode from './containers/QrCode/QrCode'
import ShareProfile from './containers/ShareProfile/ShareProfile'
import Analytics from './containers/Analytics/Analytics'
import MyTeam from './containers/MyTeam/MyTeam'
import Onboarding from './containers/Onboarding/Onboarding'
import OnboardingMember from './containers/Onboarding/OnboardingMember'
import PrivacyPolicy from './containers/Privacy/PrivacyPolicy'
import ShortLink from './containers/ShortLink/ShortLink'
import Subscrption from './containers/Subscription/Subscription'
import GetYLC from './containers/GetYLC/GetYLC'
import SubscribeThanks from './containers/Subscription/SubscribeThanks'
import SubscribeSuccess from './containers/Subscription/SubscribeSuccess'
import SubscribeError from './containers/Subscription/SubscribeError'
import Rewards from './containers/Rewards/Rewards'
// import ProfileSwitch from './containers/ProfileSwitch/ProfileSwitch'

import PrivateRoute from './hoc/privateRoute'

import ProvideAuth from './hooks/use-auth'

import * as serviceWorker from './serviceWorkerRegistration'

import './App.css'

import * as vars from './utilities/appVars'
import * as language from './languages/en'

// import { addToHomeScreenStyles } from './theme/layout'

const App = () => {
  // const addToHomeScreenClasses = addToHomeScreenStyles()
  const { theme, toggleTheme, switchTheme } = useDarkMode()
  const { layout, toggleLayout, switchLayout } = useLayoutMode()
  const themeMode = theme === 'dark' ? darkTheme : lightTheme

  const { enqueueSnackbar } = useSnackbar()

  const [newVersionAvailable, setNewVersionAvailable] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState({})

  const onServiceWorkerUpdate = registration => {
    setWaitingWorker(registration && registration.waiting)
    setNewVersionAvailable(true)
  }

  const updateServiceWorker = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    }
    setNewVersionAvailable(false)
    window.location.reload()
  }, [waitingWorker])

  const refreshAction = useCallback(() => (
    <>
      <Button
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          color: '#272727',
          fontWeight: 'bold',
          borderRadius: '30px',
          fontSize: '0.7rem',
          textTransform: 'initial',
          padding: '5px 10px',
        }}
        size="small"
        onClick={updateServiceWorker}
      >
        Get Update
      </Button>
    </>
  ), [updateServiceWorker])

  useEffect(() => {
    document.title = language.en.appName
    if (process.env.NODE_ENV === 'production') {
      serviceWorker.register({ onUpdate: onServiceWorkerUpdate })
    }

    if (newVersionAvailable) {
      enqueueSnackbar(parse('<span style="font-size: 0.8rem">A new version released</span>'), {
        persist: true,
        variant: 'success',
        action: refreshAction(),
      });
    }
  }, [enqueueSnackbar, newVersionAvailable, refreshAction])

  return (
    <MuiThemeProvider theme={themeMode}>
      <SnackbarProvider>
        <CssBaseline />
        <>
          <ProvideMode>
            <ProvideLanguage>
              <ProvideColor>
                <ProvideAuth>
                  <ErrorNotification />
                  <Notification />
                  <AppLayout toggleTheme={toggleTheme} theme={theme} toggleLayout={toggleLayout} layout={layout}>
                    <Switch>
                      <Route exact path="/" component={props => <Landing {...props} />} />
                      {/* <Route path={vars.AUTH_PAGE} component={props => <Auth {...props} />} /> */}
                      <Route exact path={vars.LOGIN_PAGE} component={props => <Login {...props} />} />
                      <Route exact path={vars.CREATE_ACCOUNT_PAGE} component={props => <CreateAccount {...props} />} />
                      <Route exact path={vars.CONNECT_ACCOUNT_PAGE} component={props => <ConnectAuth {...props} />} />
                      <Route exact path="/verify" component={props => <AuthVerified {...props} />} />
                      <Route exact path="/logout" component={props => <Logout {...props} />} />
                      <Route exact path="/o/:shortLink" component={() => <ShortLink />} />
                      <Route exact path="/profile/:urlSuffix" component={() => <ViewCard switchTheme={switchTheme} switchLayout={switchLayout} />} />
                      <Route exact path="/activationCode" component={InvitationCode} />
                      <Route exact path="/activate" component={ActivationLink} />
                      <Route exact path="/checkInvitation" component={ProcessInvitation} />
                      <Route exact path="/getYLC" component={GetYLC} />
                      <Route exact path="/createMaster" component={CreateMaster} />
                      <Route exact path="/subscribeError" component={SubscribeError} />
                      <PrivateRoute exact path={vars.SUBSCRIBE_PAGE} component={() => <Subscrption toggleTheme={toggleTheme} switchLayout={switchLayout} />} />
                      <PrivateRoute exact path="/subscriberThanks" component={() => <SubscribeThanks switchTheme={switchTheme} toggleTheme={toggleTheme} switchLayout={switchLayout} />} />
                      <PrivateRoute exact path="/subscribeSuccess" component={() => <SubscribeSuccess switchTheme={switchTheme} toggleTheme={toggleTheme} switchLayout={switchLayout} />} />
                      <PrivateRoute exact path="/welcome" component={() => <Onboarding switchTheme={switchTheme} toggleTheme={toggleTheme} switchLayout={switchLayout} />} />
                      <PrivateRoute exact path="/welcomeMember" component={() => <OnboardingMember switchTheme={switchTheme} toggleTheme={toggleTheme} switchLayout={switchLayout} />} />
                      <PrivateRoute exact path="/patches" component={Patches} allow={['superAdmin']} />
                      <PrivateRoute exact path="/invitationsAdmin" component={InvitationsAdmin} allow={['superAdmin']} />
                      <PrivateRoute exact path="/users" component={() => <Users switchTheme={switchTheme} />} allow={['superAdmin']} />
                      <PrivateRoute exact path="/info" component={() => <Contact switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/contact" component={() => <Info switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/picture" component={() => <Picture switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/logo" component={() => <Logo switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/links" component={() => <Links switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/bio" component={() => <Bio switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/changePassword" component={ChangePassword} />
                      <PrivateRoute exact path="/settings/theme" component={() => <Theme toggleTheme={toggleTheme} switchTheme={switchTheme} toggleLayout={toggleLayout} switchLayout={switchLayout} />} />
                      <PrivateRoute exact path="/settings/privacy" component={() => <Privacy switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/settings/account" component={() => <Account switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/connections" component={() => <Connections switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/connectionTags" component={() => <ConnectionTags switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/connectionForm" component={() => <Forms switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/qrcode" component={() => <QrCode switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/share" component={() => <ShareProfile switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/analytics" component={() => <Analytics switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/impact" component={() => <Rewards switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/myTeam" component={() => <MyTeam switchTheme={switchTheme} />} />
                      <PrivateRoute exact path="/privacyPolicy" component={() => <PrivacyPolicy switchTheme={switchTheme} />} />
                      <Route exact path="/:urlSuffix" component={() => <ViewCard switchTheme={switchTheme} switchLayout={switchLayout} />} />
                      {/* <PrivateRoute path="/switch" component={() => <ProfileSwitch switchTheme={switchTheme} />} /> */}
                      <Redirect to="/" />
                    </Switch>
                  </AppLayout>
                </ProvideAuth>
              </ProvideColor>
            </ProvideLanguage>
          </ProvideMode>
        </>
      </SnackbarProvider>
    </MuiThemeProvider>
  )
}

export default App
