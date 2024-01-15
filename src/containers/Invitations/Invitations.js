import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import InfoBox from '../../components/Ui/InfoBox'
import FilterInvitations from '../../components/Invitations/FilterInvitations'
import InvitationsList from '../../components/Invitations/InvitationsList'
import InvitationDetailsDialog from '../../components/Invitations/InvitationDetailsDialog'
import ShareDialog from '../../components/Invitations/ShareDialog'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { layoutStyles } from '../../theme/layout'

import { INVITATIONS_PER_PAGE } from '../../utilities/appVars'

import * as actions from '../../store/actions'

const Invitations = ({
  filteredInvitations, onLoadCard, onFilterInvitations,
}) => {
  const layoutClasses = layoutStyles()
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [invitationDetailsDialogOpen, setInvitationDetailsDialogOpen] = useState(false)
  const [invitationDetailsDialogData, setInvitationDetailsDialogData] = useState(null)
  const [invitationShareDialogOpen, setInvitationShareDialogOpen] = useState(false)
  const [invitationShareDialogData, setInvitationShareDialogData] = useState(null)

  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.userInvitations

  useEffect(() => {
    let mounted = true
    setLoading(true)

    if (mounted) {
      (async () => {
        await onLoadCard(auth.user.uid)
        setLoading(false)
      })()
    }

    return () => { mounted = false }
  }, [onLoadCard, auth.user.uid])

  const pageInvitations = pageNumber => {
    let invitationsInPage

    if (filteredInvitations) {
      invitationsInPage = filteredInvitations.slice(((pageNumber - 1) * (INVITATIONS_PER_PAGE)), ((pageNumber) * (INVITATIONS_PER_PAGE)))
    }

    return invitationsInPage
  }

  const paginationChangeHandler = (e, page) => {
    setCurrentPage(page)
    pageInvitations(page)
  }

  const openInvitationDetailsDialogHandler = invitation => {
    setInvitationDetailsDialogOpen(true)
    setInvitationDetailsDialogData(invitation)
  }

  const closeInvitationDetailsDialogHandler = () => {
    setInvitationDetailsDialogOpen(false)
    setInvitationDetailsDialogData(null)
  }

  const openInvitationShareDialogHandler = code => {
    setInvitationShareDialogOpen(true)
    setInvitationShareDialogData(code)
  }

  const closeInvitationShareDialogHandler = () => {
    setInvitationShareDialogOpen(false)
    setInvitationShareDialogData(null)
  }

  const filterInvitations = type => {
    onFilterInvitations(type)
  }

  if (loading) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.loadingInvitations} />
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page} />
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <Box mb={3}>
            <InfoBox infoList={[pageStatics.messages.info.general.first, pageStatics.messages.info.general.second]} />
          </Box>
          <FilterInvitations onFilter={filterInvitations} />
          <InvitationsList
            invitations={pageInvitations(currentPage)}
            onOpenDetailsDialog={openInvitationDetailsDialogHandler}
            onOpenShareDialog={openInvitationShareDialogHandler}
          />
          {(filteredInvitations && filteredInvitations.length > 9) && <Box mt={5}><Pagination count={Math.ceil(filteredInvitations.length / INVITATIONS_PER_PAGE)} variant="outlined" onChange={paginationChangeHandler} /></Box>}
        </Box>
        <InvitationDetailsDialog
          open={invitationDetailsDialogOpen}
          onClose={closeInvitationDetailsDialogHandler}
          invitation={invitationDetailsDialogData}
        />
        <ShareDialog
          loading={!invitationShareDialogData || invitationShareDialogData === 'null'}
          open={invitationShareDialogOpen}
          onClose={closeInvitationShareDialogHandler}
          invitationUrl={invitationShareDialogData}
          message={`${pageStatics.messages.info.share.body}`}
          title={pageStatics.messages.info.share.title}
          url={language.languageVars.appActivationURL}
        />
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  filteredInvitations: state.cards.filteredInvitations,
})

const mapDispatchToProps = dispatch => ({
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
  onFilterInvitations: type => dispatch(actions.filterInvitations(type)),
})

Invitations.defaultProps = {
  filteredInvitations: null,
}

Invitations.propTypes = {
  onLoadCard: PropTypes.func.isRequired,
  onFilterInvitations: PropTypes.func.isRequired,
  filteredInvitations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
}

export default connect(mapStateToProps, mapDispatchToProps)(Invitations)
