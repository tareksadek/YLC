import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'

import FormElement from '../Ui/FormElement'

import { useLanguage } from '../../hooks/useLang'

import { createUserDialog } from '../Patches/styles'
import { buttonStyles } from '../../theme/buttons'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import {
  generateInvitaionCode,
  // getInvitationByCode,
} from '../../API/invitations'
import { updatePatchInvitations } from '../../API/invitationPatches'

import * as actions from '../../store/actions'

const CreatInvitation = ({
  closeDialog, dialogOpen, onSetNotification, patch, updateInvitationList,
}) => {
  const classes = createUserDialog()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.invitations
  const [loading, setLoading] = useState(false)
  const [invitationFormValid, setInvitationFormValid] = useState(false)
  const [invitationForm, setInvitationForm] = useState({
    invitationsNumber: createFormElementObj('input', 'Number of invitations',
      { type: 'number', name: 'invitationsNumber', placeholder: 'Number of invitations' }, 0, null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
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
    setInvitationForm(adjustedForm.adjustedForm)
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

  const createInvitationsHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const invitationDetails = createFormValuesObj(invitationForm)
    // const patchMasterInvitation = await getInvitationByCode(patch.masterId)
    // const patchMasterId = patchMasterInvitation.usedBy || null
    for (let i = 1; i <= invitationDetails.invitationsNumber; i += 1) {
      try {
        /* eslint-disable no-await-in-loop */
        await generateInvitaionCode(patch.package, patch.patchId, 'single', null, patch.masterId, patch.theme, patch.store, null, patch.alwaysPro || false)
        updateInvitationList()
        onSetNotification({
          message: pageStatics.messages.notifications.createInvitationSuccess,
          type: 'success',
        })
      } catch (err) {
        closeDialog()
        onSetNotification({
          message: `There was a problem creating new invitations. ${err.message}`,
          type: 'error',
        })
      }
    }

    await updatePatchInvitations('add', invitationDetails.invitationsNumber, patch.patchId)

    closeDialog()
    onSetNotification({
      message: 'Invitations added successfully.',
      type: 'success',
    })

    setLoading(false)
  }

  return (
    <FullScreenDialog
      title={`${pageStatics.data.titles.addInvitations} ${patch && patch.patchTitle}`}
      open={dialogOpen}
      onClose={() => closeDialog()}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={e => createInvitationsHandler(e)}
          disabled={!invitationFormValid || loading}
          className={buttonClasses.defaultButton}
        >
          {pageStatics.buttons.addInvitations}
        </Button>
      )}
    >
      {loading && <LoadingBackdrop placement="inset" loadingText="Creating invitation..." />}
      <Box className={classes.dialogContent}>
        {loadInvitationForm()}
      </Box>
    </FullScreenDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

CreatInvitation.defaultProps = {
  dialogOpen: false,
  patch: null,
}

CreatInvitation.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  updateInvitationList: PropTypes.func.isRequired,
  patch: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default connect(null, mapDispatchToProps)(CreatInvitation)
