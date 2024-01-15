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

const Followers = ({
  cardData, onSetNotification, onLoadCard, onSortFollowers, onRemoveFollower, switchTheme, adminConnectionsRequestId,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = connectionsStyles()
  const history = useHistory()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.followers
  const color = useColor()
  const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingFollowers)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchedFollowers, setSearchedFollowers] = useState(null)
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
        onSortFollowers('desc', 'date')
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
      })()
    }

    return () => { mounted = false }
  }, [onLoadCard, auth.user.uid, onSortFollowers, switchTheme, adminConnectionsRequestId, cardData.userId, isTheLoggedinUser])

  useEffect(() => {
    if (!adminConnectionsRequestId && window.localStorage.getItem('originalTheme')) {
      switchTheme(window.localStorage.getItem('originalTheme'))
    }
  }, [switchTheme, adminConnectionsRequestId])

  const removeFollowerHandler = async follower => {
    const confirmBox = window.confirm(pageStatics.messages.notifications.deleteFollowerPrompt)
    if (confirmBox === true) {
      setLoadingMessage(pageStatics.messages.loading.removingFollower)
      setLoadingDone(false)
      setLoading(true)
      try {
        onRemoveFollower(auth.user.uid)
        await removeFollowing(follower.userId, auth.user.uid)
        await removeFollower(auth.user.uid, follower.userId)
        await onLoadCard(auth.user.uid)
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
        setLoadingMessage(pageStatics.messages.loading.loadingFollowers)
        onSetNotification({
          message: `${pageStatics.messages.notifications.removeFollowerSuccess} ${follower.firstName}`,
          type: 'success',
        })
        onSortFollowers('desc', 'date')
      } catch (err) {
        onSetNotification({
          message: pageStatics.messages.notifications.removeFollowerError,
          type: 'error',
        })
        throw new Error(err)
      }
    }
  }

  const pageFollowers = pageNumber => {
    let followersInPage

    if (searchedFollowers) {
      return searchedFollowers
    }

    if (profileData.followers) {
      followersInPage = profileData.followers.slice(((pageNumber - 1) * (CONNECTIONS_PER_PAGE)), ((pageNumber) * (CONNECTIONS_PER_PAGE)))
    }

    return followersInPage
  }

  const searchFollowersHandler = searchKeyword => {
    const searchFor = searchKeyword.toLowerCase()

    if (searchFor.length >= 3) {
      setSearchedFollowers(profileData.followers.filter(followerCard => {
        const searchName = `${followerCard.firstName} ${followerCard.lastName}`
        const searchEmail = followerCard.email
        const searchPhone = followerCard.workPhone
        if (searchName.toLowerCase().includes(searchFor) || searchEmail.toLowerCase().includes(searchFor) || searchPhone.includes(searchFor)) {
          return true
        }

        return false
      }))
    } else {
      setSearchedFollowers(null)
      setCurrentPage(1)
    }

    return false
  }

  const clearSearchHandler = () => {
    setSearchedFollowers(null)
  }

  const paginationChangeHandler = (e, page) => {
    setCurrentPage(page)
    pageFollowers(page)
  }

  const sortFollowers = (value, type) => {
    onSortFollowers(value, type)
  }

  const viewProfile = profileLink => {
    history.push(`/profile/${profileLink}`)
  }

  const addToContact = async followerInfo => {
    try {
      const a = document.createElement('a')
      const vcardName = `${followerInfo.firstName || ''}_${followerInfo.lastName || ''}_${new Date().getTime()}.vcf`
      const followerLinks = followerInfo.links && followerInfo.links.length > 0 ? followerInfo.links : null
      const file = generateVcard(followerInfo, followerLinks, vcardName, null)
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
          {(profileData.followers && profileData.followers.length > 0) ? (
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
                <SearchConnections onSearch={searchFollowersHandler} onClear={clearSearchHandler} />
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
                <SortConnections onSort={sortFollowers} />
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
                  connections={pageFollowers(currentPage)}
                  onOpenNoteDialog={viewProfile}
                  onRemove={removeFollowerHandler}
                  onAdd={addToContact}
                  onOpenEditDialog={() => true}
                  isFollowList
                />
              </Suspense>
              {(profileData.followers && profileData.followers.length > 0 && !searchedFollowers) && (
                <Box mt={1} mb={2}><Pagination count={Math.ceil(profileData.followers.length / CONNECTIONS_PER_PAGE)} variant="outlined" onChange={paginationChangeHandler} /></Box>
              )}
              <Box className={classes.connectionsActionsContainer}>
                <CSVLink
                  data={mapToArray(profileData.followers, CONNECTIONS_CSV_HEADER) || []}
                  filename={`${language.languageVars.files.myFollowers}.csv`}
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
              title={pageStatics.messages.info.noFollowers.title}
              description={pageStatics.messages.info.noFollowers.first}
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
  onSortFollowers: (value, type) => dispatch(actions.sortFollowers(value, type)),
  onRemoveFollower: followerId => dispatch(actions.removeFollower(followerId)),
})

Followers.defaultProps = {
  cardData: null,
  adminConnectionsRequestId: null,
}

Followers.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onLoadCard: PropTypes.func.isRequired,
  onSortFollowers: PropTypes.func.isRequired,
  onRemoveFollower: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Followers)
