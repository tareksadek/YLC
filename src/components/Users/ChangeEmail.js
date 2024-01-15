import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Dialog from '@material-ui/core/Dialog'

import CloseIcon from '@material-ui/icons/Close'

import LoadingBackdrop from '../Loading/LoadingBackdrop'

import FormElement from '../Ui/FormElement'

import { createUserDialog } from './styles'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { getFirebaseFunctions } from '../../API/firebase'
import { updateEmail } from '../../API/users'

import * as actions from '../../store/actions'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

const ChangeEmail = ({
  closeDialog, dialogOpen, onSetNotification, userInfo, reloadUsers,
}) => {
  const classes = createUserDialog()
  const [loading, setLoading] = useState(false)
  const [userFormValid, setUserFormValid] = useState(false)
  const [userForm, setUserForm] = useState({
    email: createFormElementObj('input', 'E-mail',
      { type: 'text', name: 'email', placeholder: 'E-mail' }, '', null, { required: true }, false,
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
    const adjustedForm = adjustFormValues(userForm, changeEvent, key)
    setUserForm(adjustedForm.adjustedForm)
    setUserFormValid(adjustedForm.formValid)
  }

  const loadUserForm = () => {
    const form = Object.keys(userForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3} className={classes.readPrefContainer}>
          <FormElement
            elementType={userForm[formEl].elementType}
            label={userForm[formEl].elementLabel}
            value={userForm[formEl].value}
            elementOptions={userForm[formEl].elementOptions}
            touched={userForm[formEl].touched}
            valid={userForm[formEl].isValid}
            shouldValidate={userForm[formEl].validtationRules}
            elementSetup={userForm[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            grid={userForm[formEl].grid}
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
    const userDetails = createFormValuesObj(userForm)
    const newEmail = userDetails.email
    const updatedUser = {
      email: newEmail,
      userId: userInfo.userId,
    }
    try {
      const dbFunctions = await getFirebaseFunctions()
      const updateUserCall = dbFunctions.httpsCallable('updateUserData')
      const updatedAuthUser = await updateUserCall(updatedUser)
      await updateEmail(updatedAuthUser.data.uid, updatedAuthUser.data.email)
      await reloadUsers()
      closeDialog()
      onSetNotification({
        message: 'Email changed successfully.',
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: `There was a problem changing email. ${err.message}`,
        type: 'error',
      })
    }
    setLoading(false)
  }

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
      {loading && <LoadingBackdrop placement="inset" loadingText="Changing email..." />}
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
            Change email
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.dialogContent}>
        {userInfo && (
          <Typography
            align="left"
            variant="body1"
            component="p"
          >
            {`Current Email: ${userInfo.email}`}
          </Typography>
        )}
        {loadUserForm()}
        <Button
          color="primary"
          onClick={e => updateUserHandler(e)}
          disabled={!userFormValid || loading}
        >
          Change
        </Button>
      </Box>
    </Dialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

ChangeEmail.defaultProps = {
  dialogOpen: false,
  userInfo: null,
}

ChangeEmail.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  reloadUsers: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(ChangeEmail)
