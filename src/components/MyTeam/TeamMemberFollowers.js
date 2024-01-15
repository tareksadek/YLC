import React, {
  useState, lazy, Suspense,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { CSVLink } from 'react-csv'

import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'

import SkeletonContainer from '../../layout/SkeletonContainer'
import FullScreenDialog from '../../layout/FullScreenDialog'
import Alert from '../../layout/Alert'
import PageTitle from '../../layout/PageTitle'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { getFirebaseStorage } from '../../API/firebase'

import { mapToArray } from '../../utilities/utils'

import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'
import { connectionNoteDialogStyles } from './styles'

import { CONNECTIONS_PER_PAGE, CONNECTIONS_CSV_HEADER } from '../../utilities/appVars'

import * as actions from '../../store/actions'

const SearchConnections = lazy(() => import('../Connections/SearchConnections'))
const SortConnections = lazy(() => import('../Connections/SortConnections'))
const ConnectionsList = lazy(() => import('../Connections/ConnectionsList'))

const TeamMemberFollower = ({
  followers, onSetNotification, open, onClose, memberName, onSortFollowers,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = connectionNoteDialogStyles()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchedFollowers, setSearchedFollowers] = useState(null)

  const language = useLanguage()
  const pageStatics = language.languageVars.pages.myTeam
  const color = useColor()
  const history = useHistory()

  const addToContact = async vCardFile => {
    try {
      const vCardFileBlob = await getFirebaseStorage().ref(`connections/${vCardFile}`).getDownloadURL()
      const a = document.createElement('a')
      a.href = vCardFileBlob
      a.click()
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.downloadVcardError,
        type: 'error',
      })
    }
  }

  const pageFollowers = pageNumber => {
    let followersInPage

    if (searchedFollowers) {
      return searchedFollowers
    }

    if (followers) {
      followersInPage = followers.slice(((pageNumber - 1) * (CONNECTIONS_PER_PAGE)), ((pageNumber) * (CONNECTIONS_PER_PAGE)))
    }

    return followersInPage
  }

  const searchFollowersHandler = searchKeyword => {
    const searchFor = searchKeyword.toLowerCase()

    if (searchFor.length >= 3) {
      setSearchedFollowers(followers.filter(followerCard => {
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

  return (
    <FullScreenDialog
      open={open}
      onClose={onClose}
      title={`${memberName} ${pageStatics.data.titles.memberFollowersDialog}`}
      loading={false}
    >
      <Box mb={2}>
        {(followers && followers.length > 0) ? (
          <Box className={`${layoutClasses.panel}`}>
            <PageTitle
              title={pageStatics.data.titles.memberConnectionsPanel}
            />
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
                onRemove={() => false}
                onOpenEditDialog={() => false}
                disableRemove
                onAdd={addToContact}
                isFollowList
              />
            </Suspense>
            {(followers && followers.length > 0 && !searchedFollowers) && (
              <Box mt={1} mb={2}><Pagination count={Math.ceil(followers.length / CONNECTIONS_PER_PAGE)} variant="outlined" onChange={paginationChangeHandler} /></Box>
            )}
            <Box className={classes.connectionsActionsContainer}>
              <CSVLink
                data={mapToArray(followers, CONNECTIONS_CSV_HEADER) || []}
                filename={`${memberName.replace(/\s/g, '_')}${language.languageVars.files.teamMemberFollowers}.csv`}
                className={buttonClasses.defaultButton}
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
            title={pageStatics.messages.info.noMemberConnections.title}
            description={`${memberName} ${pageStatics.messages.info.noMemberConnections.first}`}
            type="info"
          />
        )}
      </Box>
    </FullScreenDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

TeamMemberFollower.defaultProps = {
  followers: null,
  open: false,
  memberName: null,
}

TeamMemberFollower.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onSortFollowers: PropTypes.func.isRequired,
  followers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  memberName: PropTypes.string,
}

export default connect(null, mapDispatchToProps)(TeamMemberFollower)
