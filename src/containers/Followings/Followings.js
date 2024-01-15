import React, {
  useEffect, useState, lazy, Suspense,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { CSVLink } from 'react-csv'

import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'
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

import { removeFollowing, removeFollower, getCardById } from '../../API/cards'

import { mapToArray, generateVcard } from '../../utilities/utils'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { connectionsStyles } from './styles'

import { CONNECTIONS_PER_PAGE, CONNECTIONS_CSV_HEADER } from '../../utilities/appVars'

import * as actions from '../../store/actions'

const SearchConnections = lazy(() => import('../../components/Connections/SearchConnections'))
const SortConnections = lazy(() => import('../../components/Connections/SortConnections'))
const ConnectionsList = lazy(() => import('../../components/Connections/ConnectionsList'))

const Followings = ({
  cardData, onSetNotification, onLoadCard, onSortFollowings, onRemoveFollowing, switchTheme, adminConnectionsRequestId,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = connectionsStyles()
  const history = useHistory()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.followings
  const color = useColor()
  const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingFollowings)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchedFollowings, setSearchedFollowings] = useState(null)
  const [profileData, setProfileData] = useState(cardData || null)

  useEffect(() => {
    let mounted = true

    if ((mounted && !cardData.userId) || adminConnectionsRequestId || !isTheLoggedinUser) {
      (async () => {
        setLoading(true)
        const data = await getCardById(adminConnectionsRequestId || auth.user.uid)
        setProfileData(data)
        if (!adminConnectionsRequestId) {
          await onLoadCard(auth.user.uid)
        }
        onSortFollowings('desc', 'date')
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
      })()
    }

    return () => { mounted = false }
  }, [onLoadCard, auth.user.uid, onSortFollowings, switchTheme, adminConnectionsRequestId, cardData.userId, isTheLoggedinUser])

  useEffect(() => {
    if (!adminConnectionsRequestId && window.localStorage.getItem('originalTheme')) {
      switchTheme(window.localStorage.getItem('originalTheme'))
    }
  }, [switchTheme, adminConnectionsRequestId])

  const removeFollowingHandler = async followingUser => {
    const confirmBox = window.confirm(pageStatics.messages.notifications.deleteFollowingPrompt)
    if (confirmBox === true) {
      setLoadingMessage(pageStatics.messages.loading.removingFollowing)
      setLoadingDone(false)
      setLoading(true)
      try {
        onRemoveFollowing(auth.user.uid)
        await removeFollowing(auth.user.uid, followingUser.userId)
        await removeFollower(followingUser.userId, auth.user.uid)
        await onLoadCard(auth.user.uid)
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
        setLoadingMessage(pageStatics.messages.loading.loadingFollowings)
        onSetNotification({
          message: `${pageStatics.messages.notifications.removeFollowingSuccess} ${followingUser.firstName}`,
          type: 'success',
        })
        onSortFollowings('desc', 'date')
      } catch (err) {
        onSetNotification({
          message: pageStatics.messages.notifications.removeFollowingError,
          type: 'error',
        })
        throw new Error(err)
      }
    }
  }

  const pageFollowings = pageNumber => {
    let followingsInPage

    if (searchedFollowings) {
      return searchedFollowings
    }

    if (profileData.following) {
      followingsInPage = profileData.following.slice(((pageNumber - 1) * (CONNECTIONS_PER_PAGE)), ((pageNumber) * (CONNECTIONS_PER_PAGE)))
    }

    return followingsInPage
  }

  const searchFollowingsHandler = searchKeyword => {
    const searchFor = searchKeyword.toLowerCase()

    if (searchFor.length >= 3) {
      setSearchedFollowings(profileData.following.filter(followingCard => {
        const searchName = `${followingCard.firstName} ${followingCard.lastName}`
        const searchEmail = followingCard.email
        const searchPhone = followingCard.workPhone
        if (searchName.toLowerCase().includes(searchFor) || searchEmail.toLowerCase().includes(searchFor) || searchPhone.includes(searchFor)) {
          return true
        }

        return false
      }))
    } else {
      setSearchedFollowings(null)
      setCurrentPage(1)
    }

    return false
  }

  const clearSearchHandler = () => {
    setSearchedFollowings(null)
  }

  const paginationChangeHandler = (e, page) => {
    setCurrentPage(page)
    pageFollowings(page)
  }

  const sortFollowings = (value, type) => {
    onSortFollowings(value, type)
  }

  const viewProfile = profileLink => {
    history.push(`/profile/${profileLink}`)
  }

  const addToContact = async followingInfo => {
    try {
      const a = document.createElement('a')
      const vcardName = `${followingInfo.firstName || ''}_${followingInfo.lastName || ''}_${new Date().getTime()}.vcf`
      const followerLinks = followingInfo.links && followingInfo.links.length > 0 ? followingInfo.links : null
      const file = generateVcard(followingInfo, followerLinks, vcardName, null)
      const url = window.URL.createObjectURL(new Blob([file], { type: 'text/vcard' }))
      a.href = url
      a.download = vcardName
      a.click()
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.downloadVcardError,
        type: 'error',
      })
    }
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
          {(profileData.following && profileData.following.length > 0) ? (
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
                <SearchConnections onSearch={searchFollowingsHandler} onClear={clearSearchHandler} />
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
                <SortConnections onSort={sortFollowings} />
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
                <ConnectionsList
                  connections={pageFollowings(currentPage)}
                  onOpenNoteDialog={viewProfile}
                  onRemove={removeFollowingHandler}
                  onOpenEditDialog={() => true}
                  onAdd={addToContact}
                  isFollowList
                />
              </Suspense>
              {(profileData.following && profileData.following.length > 0 && !searchedFollowings) && (
                <Box mt={1} mb={2}><Pagination count={Math.ceil(profileData.following.length / CONNECTIONS_PER_PAGE)} variant="outlined" onChange={paginationChangeHandler} /></Box>
              )}
              <Box className={classes.connectionsActionsContainer}>
                <CSVLink
                  data={mapToArray(profileData.following, CONNECTIONS_CSV_HEADER) || []}
                  filename={`${language.languageVars.files.myFollowings}.csv`}
                  className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                  style={{
                    backgroundColor: color.color.code,
                    maxWidth: 220,
                  }}
                >
                  {pageStatics.buttons.downloadCSV}
                </CSVLink>
              </Box>
            </Box>
          ) : (
            <Alert
              title={pageStatics.messages.info.noFollowings.title}
              description={pageStatics.messages.info.noFollowings.first}
              type="info"
            />
          )}
        </Box>
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
  onSortFollowings: (value, type) => dispatch(actions.sortFollowings(value, type)),
  onRemoveFollowing: followingId => dispatch(actions.removeFollowing(followingId)),
})

Followings.defaultProps = {
  cardData: null,
  adminConnectionsRequestId: null,
}

Followings.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onLoadCard: PropTypes.func.isRequired,
  onSortFollowings: PropTypes.func.isRequired,
  onRemoveFollowing: PropTypes.func.isRequired,
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  switchTheme: PropTypes.func.isRequired,
  adminConnectionsRequestId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Followings)
