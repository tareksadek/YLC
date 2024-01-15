import React, {
  useEffect, useState, lazy, Suspense,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import SkeletonContainer from '../../layout/SkeletonContainer'
import PageTitle from '../../layout/PageTitle'
import Alert from '../../layout/Alert'
import InfoBox from '../../components/Ui/InfoBox'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { removeOffer, getCardById } from '../../API/cards'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { offersStyles } from './styles'

import { OFFERS_PER_PAGE } from '../../utilities/appVars'

import * as actions from '../../store/actions'

const SearchOffers = lazy(() => import('../../components/Offers/SearchOffers'))
const SortOffers = lazy(() => import('../../components/Offers/SortOffers'))
const OffersList = lazy(() => import('../../components/Offers/OffersList'))
const OfferDetailsDialog = lazy(() => import('../../components/Offers/OfferDetailsDialog'))
const AddOfferDialog = lazy(() => import('../../components/Offers/AddOfferDialog'))
const EditOfferDialog = lazy(() => import('../../components/Offers/EditOfferDialog'))

const Offers = ({
  cardData, onSetNotification, onLoadCard, switchTheme, adminConnectionsRequestId, onSortOffers, onRemoveOffer,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = offersStyles()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.offers
  const color = useColor()
  const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingOffers)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchedOffers, setSearchedOffers] = useState(null)
  const [offerDialogOpen, setOfferDialogOpen] = useState(window.location.hash === '#offer')
  const [offerDialogData, setOfferDialogData] = useState(null)
  const [addOfferDialogOpen, setAddOfferDialogOpen] = useState(window.location.hash === '#addoffer')
  const [editOfferDialogOpen, setEditOfferDialogOpen] = useState(window.location.hash === '#editoffer')
  const [editOfferDialogData, setEditOfferDialogData] = useState(null)
  const [profileData, setProfileData] = useState(cardData || null)

  useEffect(() => {
    let mounted = true

    if ((mounted && !cardData.userId) || adminConnectionsRequestId || !isTheLoggedinUser) {
      (async () => {
        setLoading(true)
        const data = await getCardById(auth.user.uid)
        setProfileData(data)
        if (!adminConnectionsRequestId) {
          await onLoadCard(auth.user.uid)
        }
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
      })()
    }

    return () => { mounted = false }
  }, [onLoadCard, auth.user.uid, onSortOffers, switchTheme, adminConnectionsRequestId, cardData.userId, isTheLoggedinUser])

  useEffect(() => {
    if (cardData.offers && cardData.offers.length > 0) {
      onSortOffers('desc', 'date')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSortOffers])

  useEffect(() => {
    const onHashChange = () => {
      setAddOfferDialogOpen(window.location.hash === '#addoffer')
      setOfferDialogOpen(window.location.hash === '#offer')
      setEditOfferDialogOpen(window.location.hash === '#editoffer')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!adminConnectionsRequestId && window.localStorage.getItem('originalTheme')) {
      switchTheme(window.localStorage.getItem('originalTheme'))
    }
  }, [switchTheme, adminConnectionsRequestId])

  const removeOfferHandler = async connection => {
    const confirmBox = window.confirm(`
      ${pageStatics.messages.notifications.deleteConnectionPrompt.first}
      ${connection.firstName || ''} ${connection.lastName || ''}
      ${pageStatics.messages.notifications.deleteConnectionPrompt.second}
    `)
    if (confirmBox === true) {
      setLoadingMessage(pageStatics.messages.loading.removingOffer)
      setLoadingDone(false)
      setLoading(true)
      try {
        await removeOffer(auth.user.uid, connection.vCardFile)
        onRemoveOffer(connection.addedOn.seconds)
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
        setLoadingMessage(pageStatics.messages.loading.loadingOffers)
        onSetNotification({
          message: pageStatics.messages.notifications.deleteOfferSuccess,
          type: 'success',
        })
        onSortOffers('desc', 'date')
      } catch (err) {
        onSetNotification({
          message: pageStatics.messages.notifications.deleteOfferError,
          type: 'error',
        })
        throw new Error(err)
      }
    }
  }

  const pageOffers = pageNumber => {
    let offersInPage

    if (searchedOffers) {
      return searchedOffers
    }

    if (cardData.offers) {
      offersInPage = cardData.offers.slice(((pageNumber - 1) * (OFFERS_PER_PAGE)), ((pageNumber) * (OFFERS_PER_PAGE)))
    }

    return offersInPage
  }

  const searchOffersHandler = searchKeyword => {
    const searchFor = searchKeyword.toLowerCase()

    if (searchFor.length >= 3) {
      setSearchedOffers(cardData.offers.filter(offerCard => {
        const searchTitle = `${offerCard.title}`
        if (searchTitle.toLowerCase().includes(searchFor)) {
          return true
        }

        return false
      }))
    } else {
      setSearchedOffers(null)
      setCurrentPage(1)
    }

    return false
  }

  const clearSearchHandler = () => {
    setSearchedOffers(null)
  }

  const paginationChangeHandler = (e, page) => {
    setCurrentPage(page)
    pageOffers(page)
  }

  const openOfferDialogHandler = connection => {
    setOfferDialogData(connection)
    window.location.hash = '#offer'
  }

  const closeOfferDialogHandler = () => {
    setOfferDialogData(null)
    window.history.back()
  }

  const openEditOfferDialogHandler = connection => {
    setEditOfferDialogData(connection)
    window.location.hash = '#editoffer'
  }

  const closeEditOfferDialogHandler = () => {
    setEditOfferDialogData(null)
    window.history.back()
  }

  const sortOffers = (value, type) => {
    onSortOffers(value, type)
  }

  const openAddOfferDialog = () => {
    window.location.hash = '#addoffer'
  }

  const closeAddOfferDialog = () => {
    window.history.back()
  }

  if (loading) {
    return <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} />
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page}>
        <Box mb={3}>
          <InfoBox infoList={[pageStatics.messages.info.general.title]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          {(profileData.offers && profileData.offers.length > 0) ? (
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title={pageStatics.data.titles.panel}
              />
              <Box mb={2}>
                <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                  {pageStatics.messages.info.general.first}
                </Typography>
              </Box>
              <Suspense fallback={(
                <SkeletonContainer list={[
                  { variant: 'rect', fullWidth: true },
                ]}
                />
              )}
              >
                <SearchOffers onSearch={searchOffersHandler} onClear={clearSearchHandler} />
              </Suspense>
              <Suspense fallback={(
                <SkeletonContainer list={[
                  { variant: 'rect', width: '20%' },
                  { variant: 'rect', width: '20%' },
                  { variant: 'rect', width: '20%' },
                  { variant: 'rect', width: '20%' },
                ]}
                />
              )}
              >
                <SortOffers onSort={sortOffers} />
              </Suspense>
              <Suspense fallback={(
                <SkeletonContainer list={[
                  { variant: 'circle', width: 50, height: 50 },
                  { variant: 'rect', fullWidth: true, height: 150 },
                  { variant: 'circle', width: 50, height: 50 },
                  { variant: 'rect', fullWidth: true, height: 150 },
                  { variant: 'circle', width: 50, height: 50 },
                  { variant: 'rect', fullWidth: true, height: 150 },
                ]}
                />
              )}
              >
                <OffersList
                  offers={pageOffers(currentPage)}
                  onRemove={removeOfferHandler}
                  onOpenOfferDialog={openOfferDialogHandler}
                  onOpenEditDialog={openEditOfferDialogHandler}
                />
              </Suspense>
              {(profileData.offers && profileData.offers.length > 0 && !searchedOffers) && (
                <Box mt={1} mb={2}><Pagination count={Math.ceil(profileData.offers.length / OFFERS_PER_PAGE)} variant="outlined" onChange={paginationChangeHandler} /></Box>
              )}
            </Box>
          ) : (
            <Alert
              title={pageStatics.messages.info.noOffers.title}
              description={pageStatics.messages.info.noOffers.first}
              type="info"
            />
          )}
          {auth.user && (
            <Box mb={1} mt={2} className={classes.addNewConnectionContainer}>
              <Button
                color="secondary"
                onClick={() => openAddOfferDialog()}
                className={buttonClasses.defaultButton}
                style={{
                  backgroundColor: color.color.code,
                  minWidth: '250px',
                  width: '100%',
                }}
              >
                {pageStatics.buttons.addOffer}
              </Button>
            </Box>
          )}
        </Box>
        <Suspense fallback={(
          <SkeletonContainer list={[
            { variant: 'rect', fullWidth: true, height: 150 },
          ]}
          />
        )}
        >
          <OfferDetailsDialog
            open={offerDialogOpen}
            onClose={closeOfferDialogHandler}
            offer={offerDialogData}
          />
        </Suspense>
        <Suspense fallback={(
          <SkeletonContainer list={[
            { variant: 'rect', fullWidth: true, height: 150 },
          ]}
          />
        )}
        >
          <AddOfferDialog
            open={addOfferDialogOpen}
            onClose={closeAddOfferDialog}
            color={color.color.code}
            userId={auth.user.uid}
          />
        </Suspense>
        <Suspense fallback={(
          <SkeletonContainer list={[
            { variant: 'rect', fullWidth: true, height: 150 },
          ]}
          />
        )}
        >
          <EditOfferDialog
            open={editOfferDialogOpen}
            onClose={closeEditOfferDialogHandler}
            connection={editOfferDialogData}
            color={color.color.code}
          />
        </Suspense>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
  onSortOffers: (value, type) => dispatch(actions.sortOffers(value, type)),
  onRemoveOffer: addedSeconds => dispatch(actions.removeOffer(addedSeconds)),
})

Offers.defaultProps = {
  cardData: null,
  adminConnectionsRequestId: null,
}

Offers.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onLoadCard: PropTypes.func.isRequired,
  onSortOffers: PropTypes.func.isRequired,
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  switchTheme: PropTypes.func.isRequired,
  onRemoveOffer: PropTypes.func.isRequired,
  adminConnectionsRequestId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers)
