import React, {
  useEffect, useState,
} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { useLocation, useHistory } from 'react-router-dom'

import firebase from 'firebase/app'
import 'firebase/auth'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import HomeIcon from '@material-ui/icons/Home'
import { Logo } from '../../layout/CustomIcons'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import PageTitle from '../../layout/PageTitle'

import { checkoutUser } from '../../API/subscriptions'
import { getFirebaseFunctions } from '../../API/firebase'
import { setUserShopData } from '../../API/users'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'
import { productIDs } from '../../utilities/appVars'

// import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { authStyles } from './styles'
import { subscriptionStyles } from '../Subscription/styles'

const CreateMaster = ({
  productId, priceId, quantity, withCards, onSetNotification,
}) => {
  const auth = useAuth()
  const history = useHistory()
  const location = useLocation()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth

  const layoutClasses = layoutStyles()
  // const buttonClasses = buttonStyles()
  const authClasses = authStyles()
  const classes = subscriptionStyles()

  const subscribtionSuccessUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/subscribeSuccess' : `${language.languageVars.appDomain}/subscribeSuccess`
  const subscribtionFailUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/subscribeError' : `${language.languageVars.appDomain}/subscribeError`

  const {
    teamspackage,
    cardsIncluded,
  } = queryString.parse(location.search)

  let queryPriceId = null
  let queryProductId = null

  if (teamspackage) {
    queryPriceId = cardsIncluded ? productIDs.withCards.prices[teamspackage] : productIDs.withoutCards.prices[teamspackage]
    queryProductId = cardsIncluded ? productIDs.withCards.id : productIDs.withoutCards.id
  }

  const uniProductId = queryProductId || productId
  const uniPriceId = queryPriceId || priceId
  const uniQuantity = Number(teamspackage) || quantity

  const areCardsIncluded = (cardsIncluded && cardsIncluded === 'true') || withCards
  const unitPrice = areCardsIncluded ? 200 : 80

  const [loading, setLoading] = useState(false)
  const [subscriptionProcessing, setSubscribtionProcessing] = useState(false)

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        fullLabel: pageStatics.buttons.createAccountWithEmail,
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: pageStatics.buttons.createAccountWithGoogle,
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        setLoading(true)
        return false
      },
      // signInFailure: error => {
      //   // Some unrecoverable error occurred during sign-in.
      //   // Return a promise when error handling is completed and FirebaseUI
      //   // will reset, clearing any UI. This commonly occurs for error code
      //   // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
      //   // occurs. Check below for more details on this.
      //   console.log('lklklk');
      //   console.log(error);
      // },
    },
  }

  const subscribeUser = async (userId, priceID, isSubscription) => {
    setSubscribtionProcessing(true)
    try {
      await checkoutUser(userId, priceID, subscribtionSuccessUrl, subscribtionFailUrl, isSubscription)
    } catch (err) {
      // console.log(err);
      throw new Error()
    }
  }

  const makeTeamMasterHandler = async email => {
    const dbFunctions = await getFirebaseFunctions()
    const addTeamMasterRole = dbFunctions.httpsCallable('addTeamMasterRole')
    try {
      const res = await addTeamMasterRole({ email })
      return res.data.message
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      (async () => {
        try {
          // let invitationMaster = null
          let shopData = null
          if (!uniPriceId) {
            history.push('/')
          } else {
            // uniPriceId = queryPriceId || priceId
            shopData = {
              productId: uniProductId,
              priceId: uniPriceId,
              cardsIncluded: areCardsIncluded,
            }
          }

          // if (auth.authStatus === 'loggedin' && auth.user && auth.userExist) {
          //   console.log('loggedin with user');
          // }

          if (auth.authStatus === 'loggedin' && auth.user && !auth.userExist) {
            setLoading(true)
            await setUserShopData(auth.user.uid, shopData)
            await makeTeamMasterHandler(auth.user.email)
            await subscribeUser(auth.user.uid, uniPriceId, false)
            setLoading(false)
          }
        } catch (err) {
          onSetNotification({
            message: pageStatics.messages.notifications.CreateAccountFail,
            type: 'error',
          })
        }
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    auth.user, auth.authStatus,
    auth.userExist, auth.emailVerified,
    auth.userUrlSuffix,
    auth.accountSecret,
    auth.checkMemberStatus,
    history,
    language.languageVars.appAppr,
    language.languageVars.appAdmin,
    language.languageVars.appDomain,
    language.languageVars.appEditProfileURL,
    language.languageVars.learnFeatures,
    language.languageVars.appNameCAPS,
    auth.welcomeEmailSent,
  ])

  const goToLanding = () => {
    history.push('/')
  }

  // const goToLogin = () => {
  //   history.push(vars.LOGIN_PAGE)
  // }

  // const goToConnectCard = () => {
  //   history.push(vars.CONNECT_ACCOUNT_PAGE)
  // }

  if (loading) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.authenticating} boxed />
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Box className={layoutClasses.contentContainer} style={{ paddingTop: 20 }}>
        {subscriptionProcessing && (
          <Backdrop className={classes.backdrop} open={subscriptionProcessing} style={{ zIndex: 2 }}>
            <Box alignItems="center" display="flex" flexDirection="column">
              <CircularProgress color="inherit" style={{ color: '#fff' }} />
              <Typography
                variant="body1"
                component="p"
                align="center"
                className={classes.loadingText}
              >
                {pageStatics.messages.loading.redirectingToStripe}
              </Typography>
            </Box>
          </Backdrop>
        )}
        <Box className={`${layoutClasses.authContainer} ${layoutClasses.authContainerSignup}`}>
          <Box className={authClasses.landingHeader}>
            <Box className={authClasses.landingNav}>
              <Logo className={authClasses.logo} />
              <Button
                disableRipple
                onClick={() => goToLanding()}
              >
                <HomeIcon />
              </Button>
            </Box>
          </Box>
          {/* <Box className={authClasses.landingTextContainer}>
            <Typography variant="body1" component="p" align="center" className={authClasses.landingTextOne} style={{ lineHeight: '3.5rem', fontWeight: 700 }}>
              {pageStatics.data.titles.welcome.first}
            </Typography>
            <Typography variant="body1" component="p" align="center" className={authClasses.landingTextOne} style={{ lineHeight: '3.5rem' }}>
              {pageStatics.data.titles.welcome.second}
              <span>{pageStatics.data.titles.welcome.third}</span>
            </Typography>
            <Typography variant="body1" component="p" align="center" className={authClasses.landingTextFour} style={{ marginTop: 20 }}>
              {pageStatics.data.description.signupPanel}
            </Typography>
          </Box> */}
          <Box className={authClasses.landingTextContainerSlim}>
            <Typography variant="body1" component="p" align="center">
              {pageStatics.data.titles.welcomeSlim.first}
            </Typography>
            <Typography variant="body1" component="p" align="center">
              {pageStatics.data.titles.welcomeSlim.second}
            </Typography>

            <Box className={authClasses.descriptionText}>
              <Typography variant="body1" component="p" align="center">
                {pageStatics.data.description.signupPanelMaster}
              </Typography>
            </Box>

            <Box className={`${layoutClasses.panel} ${classes.orderSummaryPanel} ${layoutClasses.transPanel} ${layoutClasses.onboardingPanel}`} mt={3}>
              <PageTitle title={pageStatics.data.titles.orderSummary} />
              <Box className={classes.orderSummaryContainer}>
                <Box className={classes.orderSummaryUnit}>
                  <Typography variant="body1" component="p" align="left">
                    {pageStatics.data.description.orderSummary.master}
                  </Typography>
                  <Typography variant="body1" component="p" align="left">
                    {pageStatics.data.description.orderSummary.masterUnit}
                  </Typography>
                </Box>
                <Box className={classes.orderSummaryUnit}>
                  <Typography variant="body1" component="p" align="left">
                    {`${uniQuantity} ${pageStatics.data.description.orderSummary.members}`}
                  </Typography>
                  <Typography variant="body1" component="p" align="left">
                    { `$${uniQuantity * 80}`}
                  </Typography>
                </Box>
                {(areCardsIncluded || withCards) && (
                  <Box className={classes.orderSummaryUnit}>
                    <Typography variant="body1" component="p" align="left">
                      {`${uniQuantity} ${pageStatics.data.description.orderSummary.cards}`}
                      <span>{pageStatics.data.description.orderSummary.cardsNote}</span>
                    </Typography>
                    <Typography variant="body1" component="p" align="left">
                      { `$${uniQuantity * 120}`}
                    </Typography>
                  </Box>
                )}
                <Box className={classes.orderSummaryUnit}>
                  <Typography variant="body1" component="p" align="left">
                    {pageStatics.data.description.orderSummary.total}
                  </Typography>
                  <Typography variant="body1" component="p" align="left">
                    {`$${uniQuantity * unitPrice}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mt={4}>
            <Box mb={2}>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
              {/* <Box mt={8} mb={2}><hr className={layoutClasses.separator} /></Box>
              <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
                <Button
                  className={buttonClasses.iconButton}
                  startIcon={<FilterNoneIcon />}
                  onClick={() => goToConnectCard()}
                  style={{
                    margin: '0 auto',
                  }}
                >
                  {pageStatics.buttons.connectToProfile}
                </Button>
              </Box> */}
            </Box>
            {/* <Box mt={6}>
              <Button
                className={buttonClasses.textButton}
                onClick={() => goToLogin()}
                style={{
                  margin: '0 auto',
                }}
              >
                <b>
                  {pageStatics.buttons.login}
                </b>
              </Button>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

CreateMaster.defaultProps = {
  productId: null,
  priceId: null,
  quantity: null,
  withCards: false,
}

CreateMaster.propTypes = {
  productId: PropTypes.string,
  priceId: PropTypes.string,
  quantity: PropTypes.number,
  withCards: PropTypes.bool,
  onSetNotification: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  productId: state.createAccountProcessor.productId,
  priceId: state.createAccountProcessor.priceId,
  quantity: state.createAccountProcessor.quantity,
  withCards: state.createAccountProcessor.withCards,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateMaster)
