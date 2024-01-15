import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import SecretCode from '../../components/AccountSecret/SecretCode'

import { useAuth } from '../../hooks/use-auth'
import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import { layoutStyles } from '../../theme/layout'

import * as actions from '../../store/actions'

const AccountSecret = ({
  onLoadCard, switchTheme,
}) => {
  const layoutClasses = layoutStyles()

  const color = useColor()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.accountSecret

  const { accountSecret } = auth

  useEffect(() => {
    let mounted = true

    if (mounted) {
      (async () => {
        await onLoadCard(auth.user.uid)
      })()
    }

    return () => { mounted = false }
  }, [onLoadCard, auth.user.uid])

  useEffect(() => {
    if (window.localStorage.getItem('originalTheme')) {
      switchTheme(window.localStorage.getItem('originalTheme'))
    }
  }, [switchTheme])

  if (!accountSecret) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.loadingAccountData} />
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page} />
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <SecretCode secretCode={accountSecret} color={color.color.code} />
        </Box>
      </Box>
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
})

AccountSecret.propTypes = {
  onLoadCard: PropTypes.func.isRequired,
  switchTheme: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(AccountSecret)
