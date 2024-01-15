import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import FullScreenDialog from '../../layout/FullScreenDialog'
import FormElement from '../Ui/FormElement'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { createFormElementObj, adjustFormValues } from '../../utilities/form'

import { buttonStyles } from '../../theme/buttons'
import { formStyles } from './styles'

const FormDetailsDialog = ({
  open, onClose, formDetails, connectionSettings, onUseForm,
}) => {
  const classes = formStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const color = useColor()
  const pageStatics = language.languageVars.pages.connections

  const initialFormState = formDetails && formDetails.fields ? formDetails.fields.reduce((o, key) => ({
    ...o,
    [key.name]: createFormElementObj(key.type, `${key.label}${key.validationRules.required ? '*' : ''}`,
      {
        type: key.inputOptions.type,
        name: key.name,
        placeholder: `${key.label}${key.validationRules.required ? '*' : ''}`,
      },
      key.value,
      key.selectOptions,
      key.validationRules,
      key.isValid,
      key.grid),
  }), {}) : null

  const [formElements, setFormElements] = useState(initialFormState)
  // console.log(initialFormState);
  // formDetails.fields.map(formField => ({
  //   ...formFields,
  //   [formField.name]:
  // }))

  // console.log(pageStatics);
  // console.log(connectionSettings);
  // console.log(formDetails);
  const inputChangeHandler = async (eve, key) => {
    let changeEvent
    let e = eve
    if (!e) {
      e = ''
    }
    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedForm = adjustFormValues(formElements, changeEvent, key)
    setFormElements(adjustedForm.adjustedForm)
  }

  const loadFormContent = inputElements => {
    const form = Object.keys(inputElements).map((formEl, i) => (
      <FormElement
        elementType={inputElements[formEl].elementType}
        label={inputElements[formEl].elementLabel}
        value={inputElements[formEl].value}
        elementOptions={inputElements[formEl].elementOptions}
        touched={inputElements[formEl].touched}
        valid={inputElements[formEl].isValid}
        errorMessage={inputElements[formEl].errorMessage}
        shouldValidate={inputElements[formEl].validtationRules}
        elementSetup={inputElements[formEl].elementSetup}
        changed={e => inputChangeHandler(e, formEl)}
        grid={inputElements[formEl].grid}
        disabled={false}
        key={formEl + i}
      />
    ))

    return form
  }

  const activateForm = e => {
    onUseForm(e, formDetails.id)
    onClose()
  }

  const buttonDisabled = formDetails ? formDetails.id === (connectionSettings.activeFormId || connectionSettings.defaultFormId) : false

  return (
    <FullScreenDialog
      type="custom"
      titleBackground={color.color.code}
      title={formDetails ? formDetails.dialogTitle : ''}
      open={open}
      onClose={() => onClose()}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={e => activateForm(e)}
          className={`${buttonClasses.defaultButton}`}
          disabled={buttonDisabled}
          style={{
            backgroundColor: color.color.code,
          }}
        >
          {pageStatics.buttons.useForm}
        </Button>
      )}
    >
      <Box className={classes.viewCardData}>
        <Typography component="p" variant="body1" align="center" className={classes.offerClaimNote}>
          {pageStatics.data.description.viewFormDialog}
        </Typography>
        <Grid container spacing={3}>
          {formElements && loadFormContent(formElements)}
        </Grid>
      </Box>
    </FullScreenDialog>
  )
}

FormDetailsDialog.defaultProps = {
  open: false,
  formDetails: null,
  connectionSettings: null,
}

FormDetailsDialog.propTypes = {
  open: PropTypes.bool,
  formDetails: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onClose: PropTypes.func.isRequired,
  onUseForm: PropTypes.func.isRequired,
  connectionSettings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default FormDetailsDialog
