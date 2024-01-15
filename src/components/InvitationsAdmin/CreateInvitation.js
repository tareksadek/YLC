import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import CloseIcon from '@material-ui/icons/Close'

import LoadingBackdrop from '../Loading/LoadingBackdrop'

import FormElement from '../Ui/FormElement'

import { createInvitationDialog } from './styles'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import {
  generateInvitaionCode,
} from '../../API/invitations'

import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

const CreateInvitation = ({
  closeDialog, dialogOpen, onSetNotification, updateInvitationList,
}) => {
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.invitations

  const classes = createInvitationDialog()
  const [loading, setLoading] = useState(false)
  const [invitationFormValid, setInvitationFormValid] = useState(false)
  const [invitationForm, setUserForm] = useState({
    invitationsNumber: createFormElementObj('input', 'Number of accounts',
      { type: 'number', name: 'accountsNumber', placeholder: 'Number of accounts' }, 1, null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    // package: createFormElementObj('select', pageStatics.forms.invitationPackages, { name: 'package' }, '', [
    //   { value: 'virtual', display: 'Virtual' },
    //   { value: 'individual', display: 'Individual' },
    //   { value: 'corporate', display: 'Corporate' },
    // ], { required: false }, false, {
    //   xs: 12,
    //   sm: null,
    //   md: null,
    //   lg: null,
    //   xl: null,
    //   fullWidth: true,
    // }),
  })

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(invitationForm, changeEvent, key)
    setUserForm(adjustedForm.adjustedForm)
    setInvitationFormValid(adjustedForm.formValid)
  }

  const loadInvitationForm = () => {
    const form = Object.keys(invitationForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3} className={classes.readPrefContainer}>
          <FormElement
            elementType={invitationForm[formEl].elementType}
            label={invitationForm[formEl].elementLabel}
            value={invitationForm[formEl].value}
            elementOptions={invitationForm[formEl].elementOptions}
            touched={invitationForm[formEl].touched}
            valid={invitationForm[formEl].isValid}
            shouldValidate={invitationForm[formEl].validtationRules}
            elementSetup={invitationForm[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            grid={invitationForm[formEl].grid}
            disabled={loading}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  const createInvitationHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const invitationDetails = createFormValuesObj(invitationForm)
    for (let i = 1; i <= invitationDetails.invitationsNumber; i += 1) {
      try {
        /* eslint-disable no-await-in-loop */
        await generateInvitaionCode(invitationDetails.package)
        closeDialog()
        updateInvitationList()
        onSetNotification({
          message: pageStatics.messages.notifications.createInvitationSuccess,
          type: 'success',
        })
      } catch (err) {
        closeDialog()
        onSetNotification({
          message: `${pageStatics.messages.notifications.createInvitationError} ${err.message}`,
          type: 'error',
        })
      }
    }
    setLoading(false)
  }

  // const createMultipleUserHandler = accounts => {
  //   for (let i = 0; i < accounts; i += 1) {
  //     console.log('function call');
  //   }
  // }

  return (
    <Dialog
      fullScreen
      open={dialogOpen}
      onClose={closeDialog}
      TransitionComponent={Transition}
      classes={{
        paperFullScreen: classes.paperFullScreen,
      }}
    >
      {loading && <LoadingBackdrop placement="inset" loadingText={pageStatics.messages.loading.creatingInvitations} />}
      <AppBar className={classes.dialogHeader}>
        <Toolbar>
          <IconButton className={`${classes.dialogClose}`} edge="start" color="inherit" onClick={closeDialog} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography
            className={`${classes.dialogTitle}`}
            align="center"
            variant="h4"
          >
            {pageStatics.data.titles.createNewInvitation}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.dialogContent}>
        {loadInvitationForm()}
        <Button
          color="primary"
          onClick={e => createInvitationHandler(e)}
          disabled={!invitationFormValid || loading}
        >
          {pageStatics.buttons.createNewInvitation}
        </Button>
      </Box>
    </Dialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

CreateInvitation.defaultProps = {
  dialogOpen: false,
}

CreateInvitation.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  updateInvitationList: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(CreateInvitation)
