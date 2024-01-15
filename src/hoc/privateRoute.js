import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'
import * as vars from '../utilities/appVars'

import LoadingBackdrop from '../components/Loading/LoadingBackdrop'

const PrivateRoute = ({
  Component, render, allow, onlySubscriber, ...otherProps
}) => {
  const auth = useAuth()
  const [authState, setAuthState] = useState('starting')
  const [allowState, setAllowState] = useState(['loggedin'])
  const allowedUsers = allow || ['superAdmin', 'admin', 'subscriber', 'loggedin']

  useEffect(() => {
    setAuthState(auth.authStatus)
    if (auth.superAdminStatus && !allowState.includes('superAdmin')) {
      setAllowState(prevState => [...prevState, 'superAdmin'])
    }
    if (auth.adminStatus && !allowState.includes('admin')) {
      setAllowState(prevState => [...prevState, 'admin'])
    }
    if (auth.subscriberStatus && !allowState.includes('subscriber')) {
      setAllowState(prevState => [...prevState, 'subscriber'])
    }
  }, [allowState, auth, auth.adminStatus, auth.authStatus, auth.subscriberStatus, auth.superAdminStatus, authState])

  if (auth.authStatus === 'failed') {
    // window.localStorage.setItem('authRedirectPath', otherProps.path)
    return <Redirect to={vars.LOGIN_PAGE} />
  }

  if (onlySubscriber && auth.authStatus === 'loggedin' && !auth.isSubscriber) {
    return <Redirect to="/subscribe" />
  }

  if (!allowState.some(item => allowedUsers.includes(item)) && authState === 'loggedin') {
    return <Redirect to="/" />
  }
  if (allowState.some(item => allowedUsers.includes(item)) && authState === 'loggedin') {
    return <Route {...otherProps} render={render} />
  }
  return <LoadingBackdrop done={allowState.some(item => allowedUsers.includes(item)) && authState === 'prelogin'} loadingText="Authenticating..." boxed />
}

PrivateRoute.defaultProps = {
  Component: null,
  render: null,
  allow: null,
  onlySubscriber: false,
}

PrivateRoute.propTypes = {
  Component: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
    PropTypes.symbol,
  ])),
  render: PropTypes.func,
  allow: PropTypes.arrayOf(PropTypes.string),
  onlySubscriber: PropTypes.bool,
}

export default PrivateRoute
