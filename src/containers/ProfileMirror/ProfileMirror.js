import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import InfoBox from '../../components/Ui/InfoBox'
import FormElement from '../../components/Ui/FormElement'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { useAuth } from '../../hooks/use-auth'
import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import { getCardBySecretCode } from '../../API/cards'

import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'
import { mirrorStyles } from './styles'

import * as actions from '../../store/actions'

const ProfileMirror = ({
  onLoadCard, switchTheme, onSetNotification,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = mirrorStyles()

  const color = useColor()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.profileMirror

  const [loading, setLoading] = useState(false)
  const [mirrorToProfile, setMirrorToProfile] = useState(null)
  const [mirrorForm, setMirrorForm] = useState({
    accountSecret: createFormElementObj('text', pageStatics.forms.accountSecret,
      { type: 'text', name: 'message', placeholder: pageStatics.forms.accountSecret }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

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

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(mirrorForm, changeEvent, key)
    setMirrorForm(adjustedForm.adjustedForm)
  }

  const loadMirrorForm = () => {
    const form = Object.keys(mirrorForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3} className={classes.readPrefContainer}>
          <FormElement
            elementType={mirrorForm[formEl].elementType}
            label={mirrorForm[formEl].elementLabel}
            value={mirrorForm[formEl].value}
            elementOptions={mirrorForm[formEl].elementOptions}
            touched={mirrorForm[formEl].touched}
            valid={mirrorForm[formEl].isValid}
            shouldValidate={mirrorForm[formEl].validtationRules}
            elementSetup={mirrorForm[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            grid={mirrorForm[formEl].grid}
            disabled={false}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  const getMirrorProfile = async () => {
    setLoading(true)
    const mirrorFormData = createFormValuesObj(mirrorForm)
    if (mirrorFormData.accountSecret === auth.accountSecret) {
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.sameAccountCode,
        type: 'error',
      })
      return
    }
    try {
      const isSecretCodeValid = await getCardBySecretCode(mirrorFormData.accountSecret)
      setLoading(false)
      if (isSecretCodeValid) {
        setMirrorToProfile(isSecretCodeValid)
      } else {
        onSetNotification({
          message: pageStatics.messages.notifications.invalidCode,
          type: 'error',
        })
        return
      }
    } catch (err) {
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.getMirrorProfileFail,
        type: 'error',
      })
    }
  }

  if (loading) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.loadingMirror} />
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page} />
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <Box mb={3}>
            <InfoBox infoList={[pageStatics.messages.info.general.first, pageStatics.messages.info.general.second, pageStatics.messages.info.general.third]} />
          </Box>
          {mirrorToProfile ? (
            <Box className={classes.mirrorToProfileContainer}>
              <Typography variant="body1" component="p" align="center" className={classes.mirrorToProfileDescription}>
                {pageStatics.messages.notifications.mirrorDescription}
              </Typography>
              <List className={classes.mirrorToProfileContent}>
                <ListItem className={classes.mirrorToProfile}>
                  <ListItemAvatar className={classes.connectionItemAvatarContainer}>
                    <Avatar className={classes.connectionItemAvatar} src={mirrorToProfile.base64Photo ? `data:${mirrorToProfile.base64Photo.type};base64,${mirrorToProfile.base64Photo.code}` : '/assets/images/avatar.svg'} />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    className={classes.connectionItemTextContainer}
                    primary={(
                      <Box className={classes.connectionName}>
                        <Typography component="p" variant="body1" className={classes.connectionNameText}>
                          {`${mirrorToProfile.firstName} ${mirrorToProfile.lastName}`}
                        </Typography>
                      </Box>
                    )}
                    secondary={(
                      <Box className={classes.connectionDetails}>
                        <Typography component="p" variant="body1">
                          {mirrorToProfile.email}
                        </Typography>
                      </Box>
                    )}
                  />
                </ListItem>
              </List>
            </Box>
          ) : (
            <Box className={classes.shareProfileContainer}>
              <Box className={classes.shareMessageContainer}>
                {loadMirrorForm()}
                <Button
                  className={buttonClasses.defaultButton}
                  style={{
                    backgroundColor: color.color.code,
                    minWidth: 150,
                  }}
                  onClick={() => getMirrorProfile()}
                >
                  {pageStatics.buttons.mirrorProfile}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
})

ProfileMirror.propTypes = {
  onLoadCard: PropTypes.func.isRequired,
  switchTheme: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(ProfileMirror)
