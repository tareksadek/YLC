import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import Box from '@material-ui/core/Box'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'

import { connectInvitation } from '../../API/invitations'
import { getCardById } from '../../API/cards'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'

import { cleanInvitationCode } from '../../utilities/utils'

import {
  CREATE_ACCOUNT_PAGE,
} from '../../utilities/appVars'

import { layoutStyles } from '../../theme/layout'

import * as actions from '../../store/actions'

const ActivationLink = ({
  // status,
  validatingInvitation,
  onCheckInvitation,
  onClearInvitation,
  // onLoadCard,
  onClearCard,
  // onClearCounter,
  // urlSuffix,
  loadingCard,
  activationUsed,
  activationUsedBy,
  // redirect,
}) => {
  const history = useHistory()
  const location = useLocation()
  let { tac } = queryString.parse(location.search)
  tac = cleanInvitationCode(tac)
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.invitationCode
  const auth = useAuth()

  const layoutClasses = layoutStyles()
  const checkInvitation = useCallback(async code => {
    try {
      const currentStatus = await onCheckInvitation(code.trim())
      if (currentStatus.invitationStatus === 'invalid') {
        window.localStorage.clear()
        history.push('/')
        return
      }
      if (currentStatus.invitationStatus === 'valid' && !currentStatus.used) {
        await connectInvitation(code.trim())
        await auth.logout()
        onClearCard()
        // onClearCounter()
        // onClearInvitation()
        window.localStorage.clear()
        window.localStorage.setItem('package', currentStatus.invitationPackage)
        window.localStorage.setItem('accountType', currentStatus.accountType)
        window.localStorage.setItem('invitationCode', currentStatus.invitationCode)
        window.localStorage.setItem('patch', currentStatus.patch)
        window.localStorage.setItem('authType', 'signup')
        window.localStorage.setItem('invitationTheme', currentStatus.invitationTheme ? currentStatus.invitationTheme.theme : null)
        window.localStorage.setItem('invitationLayout', currentStatus.invitationTheme ? currentStatus.invitationTheme.layout : null)
        window.localStorage.setItem('invitationColorName', currentStatus.invitationTheme ? currentStatus.invitationTheme.selectedColor.name : null)
        window.localStorage.setItem('invitationColorCode', currentStatus.invitationTheme ? currentStatus.invitationTheme.selectedColor.code : null)
        history.push(CREATE_ACCOUNT_PAGE)
        return
      }
      if (currentStatus.invitationStatus === 'used' && currentStatus.used) {
        window.localStorage.clear()
        const currentUserCard = await getCardById(currentStatus.usedBy)
        if (currentUserCard.redirect) {
          window.location.href = currentUserCard.redirect
        } else {
          history.push(`/${currentUserCard.urlSuffix}`)
        }
        onClearInvitation()
      }
    } catch (err) {
      throw new Error(err)
    }
  }, [onCheckInvitation, auth, onClearCard, onClearInvitation, history])

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (mounted && tac) {
        try {
          await checkInvitation(tac)
        } catch (err) {
          await auth.logout()
          onClearCard()
          // onClearCounter()
          onClearInvitation()
          window.localStorage.clear()
          history.push('/')
        }
      }
    })()

    return () => { mounted = false }
  }, [tac, checkInvitation, history, auth, onClearCard, onClearInvitation, activationUsed, activationUsedBy])

  // useEffect(() => {
  //   let mounted = true;
  //   (async () => {
  //     if (mounted && startLoading) {
  //       if (activationUsed && activationUsedBy) {
  //         try {
  //           await onLoadCard(activationUsedBy)
  //           onClearInvitation()
  //         } catch (err) {
  //           auth.logout()
  //           onClearCard()
  //           onClearCounter()
  //           onClearInvitation()
  //           window.localStorage.clear()
  //           history.push('/auth')
  //         }
  //       } else {
  //         console.log('bbbbbbb');
  //         await auth.logout()
  //         onClearCard()
  //         onClearCounter()
  //         onClearInvitation()
  //         window.localStorage.clear()
  //       }
  //     }
  //   })()
  //
  //   return () => { mounted = false }
  // }, [activationUsedBy, activationUsed, onLoadCard, onClearInvitation, history, auth, onClearCard, onClearCounter, startLoading])

  if (validatingInvitation) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.validatingInvitation} boxed />
  }

  if (loadingCard) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.loadingProfile} boxed />
  }

  // if (status && status === 'valid' && !urlSuffix) {
  //   window.localStorage.setItem('authType', 'signup')
  //   return <Redirect to="/auth" />
  // }

  // if (status && status === 'used' && activationUsed && activationUsedBy && urlSuffix && !redirect) {
  //   return <Redirect to={`/profile/${urlSuffix}`} />
  // }
  //
  // if (status && status === 'used' && activationUsed && activationUsedBy && urlSuffix && redirect) {
  //   window.location.href = redirect
  // }
  //
  // if (status && status === 'invalid') {
  //   return <Redirect to="/" />
  // }

  return (
    <Box className={layoutClasses.pageContainer}>
      &nbsp;
    </Box>
  )
}

ActivationLink.defaultProps = {
  // status: null,
  validatingInvitation: false,
  // urlSuffix: null,
  loadingCard: false,
  activationUsed: false,
  activationUsedBy: null,
  // redirect: null,
}

ActivationLink.propTypes = {
  // status: PropTypes.string,
  validatingInvitation: PropTypes.bool,
  onCheckInvitation: PropTypes.func.isRequired,
  onClearInvitation: PropTypes.func.isRequired,
  // onLoadCard: PropTypes.func.isRequired,
  onClearCard: PropTypes.func.isRequired,
  // onClearCounter: PropTypes.func.isRequired,
  // urlSuffix: PropTypes.string,
  loadingCard: PropTypes.bool,
  activationUsed: PropTypes.bool,
  activationUsedBy: PropTypes.string,
  // redirect: PropTypes.string,
}

const mapStateToProps = state => ({
  code: state.invitations.code,
  status: state.invitations.status,
  activationUsed: state.invitations.used,
  activationUsedBy: state.invitations.usedBy,
  validatingInvitation: state.invitations.loading,
  error: state.invitations.error,
  urlSuffix: state.cards.urlSuffix,
  loadingCard: state.cards.loading,
  redirect: state.cards.redirect,
})

const mapDispatchToProps = dispatch => ({
  onCheckInvitation: invitationCode => dispatch(actions.checkInvitation(invitationCode)),
  onClearInvitation: () => dispatch(actions.clearInvitation()),
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
  onClearCard: () => dispatch(actions.clearCard()),
  // onClearCounter: () => dispatch(actions.clearCounter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivationLink)
