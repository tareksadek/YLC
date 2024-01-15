import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'

import FormElement from '../Ui/FormElement'

import { createUserDialog } from './styles'
import { buttonStyles } from '../../theme/buttons'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { changePatchStatus } from '../../API/invitationPatches'

import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

const ChangeStatus = ({
  closeDialog, dialogOpen, onSetNotification, patchInfo, reloadPatches,
}) => {
  const classes = createUserDialog()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.patches
  const [loading, setLoading] = useState(false)
  const [patchFormValid, setPatchFormValid] = useState(false)
  const [patchForm, setPatchForm] = useState({
    status: createFormElementObj('select', 'Status', { name: 'status', help: '' }, '', [
      { value: 'ready', display: 'Ready' },
      { value: 'inProgress', display: 'Cards in progress' },
      { value: 'done', display: 'Cards sent' },
    ], { required: true }, false, {
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

    if (mounted && patchInfo) {
      (async () => {
        setLoading(true)
        const data = { status: patchInfo.status }
        const adjustedForm = await adjustFormValues(patchForm, data, null)
        setPatchForm(prevForm => ({ ...prevForm, ...adjustedForm.adjustedForm }))
        setLoading(false)
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patchInfo])

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(patchForm, changeEvent, key)
    setPatchForm(adjustedForm.adjustedForm)
    setPatchFormValid(adjustedForm.formValid)
  }

  const loadUserForm = () => {
    const form = Object.keys(patchForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3} className={classes.readPrefContainer}>
          <FormElement
            elementType={patchForm[formEl].elementType}
            label={patchForm[formEl].elementLabel}
            value={patchForm[formEl].value}
            elementOptions={patchForm[formEl].elementOptions}
            touched={patchForm[formEl].touched}
            valid={patchForm[formEl].isValid}
            shouldValidate={patchForm[formEl].validtationRules}
            elementSetup={patchForm[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            grid={patchForm[formEl].grid}
            disabled={loading}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  const updateUserHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const patchDetails = createFormValuesObj(patchForm)

    try {
      await changePatchStatus(patchInfo.patchId, patchDetails.status)
      await reloadPatches()
      closeDialog()
      onSetNotification({
        message: 'Status changed successfully.',
        type: 'success',
      })
    } catch (err) {
      closeDialog()
      onSetNotification({
        message: `There was a problem changing status. ${err.message}`,
        type: 'error',
      })
    }
    setLoading(false)
  }

  return (
    <FullScreenDialog
      title={pageStatics.data.titles.changePatchStatus}
      open={dialogOpen}
      onClose={() => closeDialog()}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={e => updateUserHandler(e)}
          disabled={!patchFormValid || loading}
          className={buttonClasses.defaultButton}
        >
          {pageStatics.buttons.changePatchStatus}
        </Button>
      )}
    >
      {loading && <LoadingBackdrop placement="inset" loadingText="Changing package..." boxed />}
      <Box className={classes.dialogContent}>
        {loadUserForm()}
      </Box>
    </FullScreenDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

ChangeStatus.defaultProps = {
  dialogOpen: false,
  patchInfo: null,
}

ChangeStatus.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  patchInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  reloadPatches: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(ChangeStatus)
