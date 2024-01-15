import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { useAuth } from '../../hooks/use-auth'

import * as actions from '../../store/actions'

const Logout = ({ onClearCard, onClearCounter, onClearInvitation }) => {
  const auth = useAuth()

  useEffect(() => {
    auth.logout()
    onClearCard()
    onClearCounter()
    onClearInvitation()
    // window.localStorage.removeItem('authFrom')
    window.localStorage.clear()
  }, [auth, onClearCard, onClearCounter, onClearInvitation])

  return <Redirect to={`/${auth.userUrlSuffix}`} />
}

Logout.propTypes = {
  onClearCard: PropTypes.func.isRequired,
  onClearCounter: PropTypes.func.isRequired,
  onClearInvitation: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onClearCard: () => dispatch(actions.clearCard()),
  onClearCounter: () => dispatch(actions.clearCounter()),
  onClearInvitation: () => dispatch(actions.clearInvitation()),
})

export default connect(null, mapDispatchToProps)(Logout)
