import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import FullScreenDialog from '../../layout/FullScreenDialog'

import FormElement from '../Ui/FormElement'

import { createUserDialog } from './styles'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { getFirebaseFunctions } from '../../API/firebase'
import { createUserCard } from '../../API/cards'
import { createUser } from '../../API/users'

import { useLanguage } from '../../hooks/useLang'

import { createUrlSuffix, generateRandomString } from '../../utilities/utils'

import * as actions from '../../store/actions'

const CreateUser = ({
  closeDialog, dialogOpen, onSetNotification, userCount, reloadUsers,
}) => {
  const classes = createUserDialog()
  const language = useLanguage()
  const [loading, setLoading] = useState(false)
  const [userFormValid, setUserFormValid] = useState(false)
  const [userForm, setUserForm] = useState({
    accountsNumber: createFormElementObj('input', 'Number of accounts',
      { type: 'number', name: 'accountsNumber', placeholder: 'Number of accounts' }, 1, null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    firstName: createFormElementObj('input', 'First name',
      { type: 'text', name: 'first_name', placeholder: 'First name' }, '', null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    lastName: createFormElementObj('input', 'Last name',
      { type: 'text', name: 'last_name', placeholder: 'Last name' }, '', null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    email: createFormElementObj('input', 'E-mail',
      { type: 'text', name: 'email', placeholder: 'E-mail' }, '', null, { required: false }, true,
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

  const createUserHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const userDetails = createFormValuesObj(userForm)
    let firstName
    let lastName
    let email
    for (let i = 1; i <= userDetails.accountsNumber; i += 1) {
      if (userDetails.accountsNumber > 1) {
        firstName = language.languageVars.appNameSM
        lastName = `000${userCount + i}`
        email = `${firstName}_${lastName}@${language.languageVars.appNameSM}.app`
      } else {
        firstName = userDetails.firstName
        lastName = userDetails.lastName
        email = userDetails.email
      }
      const userPassword = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`
      const newUser = {
        email,
        emailVerified: true,
        password: userPassword,
        displayName: `${firstName} ${lastName}`,
        disabled: false,
      }
      try {
        /* eslint-disable no-await-in-loop */
        const dbFunctions = await getFirebaseFunctions()
        const createUserCall = dbFunctions.httpsCallable('createUser')
        const createdAuthUser = await createUserCall(newUser)
        const userUrlSuffix = await createUrlSuffix(createdAuthUser.data.displayName)
        const anonymouseSuffix = `${userUrlSuffix.urlSuffix}`
        const generatedAccountSecret = generateRandomString(4)
        await createUser(
          createdAuthUser.data.uid,
          createdAuthUser.data.email,
          createdAuthUser.data.displayName,
          anonymouseSuffix,
          'admin',
          'single',
          null,
          null,
          null,
          new Date(),
          new Date(),
          new Date(),
          generatedAccountSecret,
        )
        const profileData = {
          firstName: userUrlSuffix.firstName,
          lastName: userUrlSuffix.lastName,
          userId: createdAuthUser.data.uid,
          email: createdAuthUser.data.email,
          urlSuffix: anonymouseSuffix,
          accountSecret: generatedAccountSecret,
          createdBy: 'admin',
        }
        const invitationData = {
          method: 'admin',
          code: null,
          parentInvitation: null,
          childInvitations: null,
          masterId: null,
        }
        await createUserCard(profileData, invitationData, generatedAccountSecret, null)
      } catch (err) {
        closeDialog()
        onSetNotification({
          message: `There was a problem creating new user. ${err.message}`,
          type: 'error',
        })
      }
    }

    await reloadUsers()
    closeDialog()
    onSetNotification({
      message: 'User created successfully.',
      type: 'success',
    })

    setLoading(false)
  }

  return (
    <FullScreenDialog
      open={dialogOpen}
      onClose={closeDialog}
      title="Create new user"
      loading={false}
    >
      <Box>
        <Typography
          align="left"
          variant="body1"
          component="p"
        >
          {`When creating multiple users first name will always be ${language.languageVars.appNameCAPS} and last name will be an accumelated numbers`}
          <br />
          login email will be &nbsp;
          <b>
            {`firstName_lastName@${language.languageVars.appNameSM}.app`}
          </b>
          <br />
          passowrd is always
          <b> firstName_lastName</b>
        </Typography>
        <br />
        <br />
        {loadUserForm()}
        <Button
          color="primary"
          onClick={e => createUserHandler(e)}
          disabled={!userFormValid || loading}
        >
          Create user
        </Button>
      </Box>
    </FullScreenDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

CreateUser.defaultProps = {
  dialogOpen: false,
  userCount: 0,
}

CreateUser.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  userCount: PropTypes.number,
  reloadUsers: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(CreateUser)
