import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

// import ProDialog from '../../components/BecomePro/ProDialog'

// import { buttonStyles } from '../../theme/buttons'
import { subscriptionStyles } from './styles'

import { getProductPricesById, checkoutUser } from '../../API/subscriptions'
import { getInvitationByCode } from '../../API/invitations'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { settings } from '../../utilities/appVars'

const GetYLC = ({ productId }) => {
  const auth = useAuth()
  const language = useLanguage()
  const history = useHistory()
  const classes = subscriptionStyles()
  // const buttonClasses = buttonStyles()
  const pageStatics = language.languageVars.pages.subscription
  // const [packages, setPackages] = useState(null)
  const [packagePrices, setPackagePrices] = useState(null)
  // const [fullPackages, setFullPackages] = useState(null)
  const [subscriptionProcessing, setSubscribtionProcessing] = useState(false)
  const [loading, setLoading] = useState(false)
  // const [proDialogOpen, setProDialogOpen] = useState(window.location.hash === '#becomepro')

  // const isPro = auth.isSubscriber && (auth.subscriberStatus === 'active' || auth.subscriberStatus === 'trialing')
  const subscribtionSuccessUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/subscriberThanks' : `${language.languageVars.appDomain}/subscriberThanks`
  const subscribtionFailUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/subscribe' : `${language.languageVars.appDomain}/subscribe`

  useEffect(() => {
    let mounted = true
    let invitationProductId
    if (mounted) {
      (async () => {
        try {
          setLoading(true)
          // const packs = await getAllPackages()
          // setPackages(packs)
          if (productId) {
            invitationProductId = productId
          } else {
            const invitationObj = await getInvitationByCode(auth.invitationNumber)
            invitationProductId = invitationObj.productId
          }
          const packPrices = await getProductPricesById(invitationProductId)
          setPackagePrices(packPrices)
        } catch (err) {
          throw new Error(err)
        }
        setLoading(false)
      })()
    }
    return () => {
      mounted = false
    }
  }, [productId, auth.invitationNumber])

  // useEffect(() => {
  //   if (packages && packagePrices) {
  //     const assignPackagePrices = packages.map(pack => {
  //       const x = packagePrices.filter(packagePrice => pack.id === packagePrice.product)
  //       return { ...pack, prices: x }
  //     })
  //     setFullPackages(assignPackagePrices)
  //   }
  // }, [packages, packagePrices])

  // useEffect(() => {
  //   const onHashChange = () => {
  //     setProDialogOpen(window.location.hash === '#becomepro')
  //   }
  //   window.addEventListener('hashchange', onHashChange)
  //   return () => window.removeEventListener('hashchange', onHashChange)
  // }, [])

  const goToLanding = () => {
    if (settings.onlyInvitations) {
      history.push(`/${auth.userUrlSuffix}`)
    } else {
      auth.logout()
      history.push('/')
    }
  }

  // const closeProDialogHandler = () => {
  //   window.history.back()
  // }

  // const openProDialogHandler = () => {
  //   window.location.hash = '#becomepro'
  // }

  // console.log(packages);
  // console.log(packagePrices);
  // console.log(fullPackages);

  const subscribeUser = async (userId, priceId, isSubscription) => {
    setSubscribtionProcessing(true)
    try {
      await checkoutUser(userId, priceId, subscribtionSuccessUrl, subscribtionFailUrl, isSubscription)
    } catch (err) {
      // console.log(err);
      throw new Error()
    }
  }

  return (
    <Box className={classes.pricingContainer}>
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
      <Box className={classes.pricingHeaderContainer}>
        <Box className={classes.pricingHeader}>
          <IconButton edge="start" color="inherit" onClick={goToLanding} aria-label="close" className={classes.pricingBackButton}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box className={classes.pricingHero}>
          <Box className={classes.pricingLogoContainer}>
            <img src="/logo512.png" alt={pageStatics.data.titles.subscribe} />
          </Box>
          <Typography
            variant="body1"
            component="p"
            align="center"
            className={`${classes.pricingTitle}`}
          >
            {pageStatics.data.titles.subscribe}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            align="center"
            className={`${classes.pricingPrice}`}
          >
            {pageStatics.data.titles.selectPaymentPlan}
          </Typography>
          {/* <Button
            className={`${buttonClasses.textButton}`}
            onClick={() => openProDialogHandler()}
            style={{
              width: '100%',
            }}
          >
            {pageStatics.data.titles.viewFeatures}
          </Button> */}
        </Box>
      </Box>
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center" p={5}>
          <CircularProgress style={{ color: '#000' }} />
        </Box>
      ) : (
        <Box className={classes.pricingButtonContainer}>
          <>
            {packagePrices && packagePrices.length > 0 && packagePrices.sort((a, b) => a.unit_amount - b.unit_amount).map(packPrice => {
              if (packPrice.active) {
                return (
                  <Button
                    key={packPrice.id}
                    className={`${classes.pricingButton}`}
                    onClick={() => subscribeUser(auth.user.uid, packPrice.id, packPrice.interval)}
                  >
                    {packPrice.interval === 'month' && (
                      <Typography className={classes.pricingButtonText} variant="body1" component="p">
                        {pageStatics.data.packages.monthly.title}
                        <br />
                        <span className={classes.pricingButtonNumber}>
                          <span className={`${classes.pricingButtonCurrency} ${classes.pricingButtonCurrencyMonthly}`}>{pageStatics.data.currency}</span>
                          {`${packPrice.unit_amount / 100}`}
                        </span>
                        <span className={classes.pricingButtonPeriod}>{pageStatics.data.packages.monthly.period}</span>
                        <span className={classes.pricingButtonSave}>{`${packPrice.transform_quantity.divide_by} ${pageStatics.data.packages.monthly.teamMembers}`}</span>
                        <span className={classes.pricingSelect}>{pageStatics.buttons.select}</span>
                        <span className={classes.pricingSafePayment}>{pageStatics.data.titles.safePayment}</span>
                      </Typography>
                    )}
                    {packPrice.interval === 'month' && (
                      <>
                        {/* <Typography className={classes.pricingBestValue} variant="body1" component="p">
                          {pageStatics.data.titles.bestValue}
                        </Typography> */}
                        <Typography className={classes.pricingButtonText} variant="body1" component="p">
                          {pageStatics.data.packages.yearly.title}
                          <br />
                          <span className={classes.pricingButtonNumber}>
                            <span className={classes.pricingButtonCurrency}>{pageStatics.data.currency}</span>
                            {`${packPrice.unit_amount / 100}`}
                          </span>
                          <span className={classes.pricingButtonPeriod}>{pageStatics.data.packages.yearly.period}</span>
                          <span className={classes.pricingButtonSave}>{`${packPrice.transform_quantity.divide_by} ${pageStatics.data.packages.yearly.teamMembers}`}</span>
                          <span className={classes.pricingSelect}>{pageStatics.buttons.select}</span>
                          <span className={classes.pricingSafePayment}>{pageStatics.data.titles.safePayment}</span>
                        </Typography>
                      </>
                    )}
                    {packPrice && !packPrice.interval && (
                      <>
                        {/* <Typography className={classes.pricingBestValue} variant="body1" component="p">
                          {pageStatics.data.titles.bestValue}
                        </Typography> */}
                        <Typography className={classes.pricingButtonText} variant="body1" component="p">
                          {pageStatics.data.packages.lifeTime.title}
                          <br />
                          <span className={classes.pricingButtonNumber}>
                            <span className={classes.pricingButtonCurrency}>{pageStatics.data.currency}</span>
                            {`${packPrice.unit_amount / 100}`}
                          </span>
                          <span className={classes.pricingButtonPeriod}>{pageStatics.data.packages.lifeTime.period}</span>
                          <span className={classes.pricingButtonSave}>
                            {pageStatics.data.packages.lifeTime.offer}
                          </span>
                          <span className={classes.pricingSelect}>{pageStatics.buttons.subscribe}</span>
                          <span className={classes.pricingSafePayment}>{pageStatics.data.titles.safePayment}</span>
                        </Typography>
                      </>
                    )}
                  </Button>
                )
              }
              return false
            })}
          </>
        </Box>
      )}
      {/* {settings.onlyInvitations && !isPro && (
        <ProDialog
          open={proDialogOpen}
          onClose={closeProDialogHandler}
          onlyFeatures
        />
      )} */}
    </Box>
  )
}

GetYLC.defaultProps = {
  productId: null,
}

GetYLC.propTypes = {
  productId: PropTypes.string,
}

const mapStateToProps = state => ({
  productId: state.invitations.productId,
})

export default connect(mapStateToProps, null)(GetYLC)
