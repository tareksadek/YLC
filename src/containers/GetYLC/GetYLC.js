import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Switch from '@material-ui/core/Switch'
import CircularProgress from '@material-ui/core/CircularProgress'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import WhatsIncludedDialog from '../../components/GetYLC/WhatsIncludedDialog'

import { buttonStyles } from '../../theme/buttons'
import { subscriptionStyles } from './styles'
import { formStyles } from '../../theme/layout'

import { getProductPricesById } from '../../API/subscriptions'
import { getInvitationByCode } from '../../API/invitations'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { CREATE_MASTER_ACCOUNT_PAGE, productIDs } from '../../utilities/appVars'

import * as actions from '../../store/actions'

const GetYLC = ({ productId, onGetPackagePrice }) => {
  const defaultProductId = productIDs.withoutCards.id
  const withCardsProductId = productIDs.withCards.id

  const auth = useAuth()
  const language = useLanguage()
  const history = useHistory()
  const classes = subscriptionStyles()
  const formClasses = formStyles()
  const buttonClasses = buttonStyles()
  const pageStatics = language.languageVars.pages.subscription

  const [packagePrices, setPackagePrices] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(defaultProductId)
  const [whatsIncludedDialogOpen, setWhatsIncludedDialogOpen] = useState(window.location.hash === '#whatsincluded')

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
          } else if (selectedProductId) {
            invitationProductId = selectedProductId
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
  }, [productId, auth.invitationNumber, selectedProductId])

  // useEffect(() => {
  //   if (packages && packagePrices) {
  //     const assignPackagePrices = packages.map(pack => {
  //       const x = packagePrices.filter(packagePrice => pack.id === packagePrice.product)
  //       return { ...pack, prices: x }
  //     })
  //     setFullPackages(assignPackagePrices)
  //   }
  // }, [packages, packagePrices])

  useEffect(() => {
    const onHashChange = () => {
      setWhatsIncludedDialogOpen(window.location.hash === '#whatsincluded')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const goToLanding = () => {
    // if (settings.onlyInvitations) {
    //   history.push(`/${auth.userUrlSuffix}`)
    // } else {
    auth.logout()
    history.push('/')
    // }
  }

  const closeProDialogHandler = () => {
    window.history.back()
  }

  const openProDialogHandler = () => {
    window.location.hash = '#whatsincluded'
  }

  // console.log(packages);
  // console.log(packagePrices);
  // console.log(fullPackages);

  // const subscribeUser = async (userId, priceId, isSubscription) => {
  //   setSubscribtionProcessing(true)
  //   try {
  //     await checkoutUser(userId, priceId, subscribtionSuccessUrl, subscribtionFailUrl, isSubscription)
  //   } catch (err) {
  //     // console.log(err);
  //     throw new Error()
  //   }
  // }

  const startCreateProcess = (priceId, prodId, quantity, withCards) => {
    onGetPackagePrice(priceId, prodId, quantity, withCards)
    history.push(CREATE_MASTER_ACCOUNT_PAGE)
  }

  const changeProductHandler = () => {
    if (selectedProductId === defaultProductId) {
      setSelectedProductId(withCardsProductId)
    } else {
      setSelectedProductId(defaultProductId)
    }
  }

  return (
    <Box className={classes.pricingContainer}>
      {/* {subscriptionProcessing && (
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
      )} */}
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
          <Button
            className={`${buttonClasses.textButton}`}
            onClick={() => openProDialogHandler()}
            style={{
              width: '100%',
            }}
          >
            {pageStatics.data.titles.viewFeatures}
          </Button>
        </Box>
      </Box>
      <Box className={classes.addPhysicalCardsSwitchContainer}>
        <Box className={formClasses.switchContainer}>
          <Box>
            <Typography variant="body1" component="p" className={formClasses.switchLabel}>
              {pageStatics.data.titles.addPhysicalCards}
            </Typography>
            <Typography variant="body1" component="p" className={formClasses.switchLabelDescription}>
              {pageStatics.data.description.addPhysicalCards}
            </Typography>
          </Box>
          <Box className={formClasses.formSwitch}>
            <Switch
              checked={selectedProductId === withCardsProductId}
              onChange={() => changeProductHandler()}
              name="defaultColor"
              disabled={loading}
            />
          </Box>
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
                    onClick={() => startCreateProcess(packPrice.id, packPrice.product, packPrice.transform_quantity.divide_by, selectedProductId === productIDs.withCards.id)}
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
                          <span className={`${classes.pricingButtonSave} ${classes.pricingButtonSaveSm}`}>
                            {`${pageStatics.data.packages.lifeTime.prices.master} 
                            + ${packPrice.transform_quantity.divide_by} ${pageStatics.data.packages.lifeTime.prices.members}
                            ${selectedProductId === withCardsProductId ? ` + ${packPrice.transform_quantity.divide_by} ${pageStatics.data.packages.lifeTime.prices.cards}` : ''}
                            `}
                            {/* {pageStatics.data.packages.lifeTime.offer} */}
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
      <WhatsIncludedDialog
        open={whatsIncludedDialogOpen}
        onClose={closeProDialogHandler}
      />
    </Box>
  )
}

GetYLC.defaultProps = {
  productId: null,
}

GetYLC.propTypes = {
  productId: PropTypes.string,
  onGetPackagePrice: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  productId: state.invitations.productId,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onGetPackagePrice: (priceId, productId, quantity, withCards) => dispatch(actions.getPackagePrice(priceId, productId, quantity, withCards)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GetYLC)
