import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined'

import FormElement from '../../Ui/FormElement'
import NotificationDialog from '../../../layout/NotificationDialog'

import { useLanguage } from '../../../hooks/useLang'

import { addCustomLinkDialogStyles } from '../styles'

const AddCustomLinkDialog = ({
  open, onClose, formElements, onChange, onBlur, onAddCustomLink, formTouched, formValid, disableActions,
}) => {
  const classes = addCustomLinkDialogStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile

  const loadCustomLinkForm = () => {
    const form = Object.keys(formElements).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3}>
          <FormElement
            elementType={formElements[formEl].elementType}
            label={formElements[formEl].elementLabel}
            value={formElements[formEl].value}
            elementOptions={formElements[formEl].elementOptions}
            touched={formElements[formEl].touched}
            valid={formElements[formEl].isValid}
            errorMessage={formElements[formEl].errorMessage}
            shouldValidate={formElements[formEl].validtationRules}
            elementSetup={formElements[formEl].elementSetup}
            changed={e => onChange(e, formEl)}
            blured={e => { onBlur(e, formEl) }}
            grid={formElements[formEl].grid}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  return (
    <NotificationDialog
      type="custom"
      background="#fff"
      title={pageStatics.data.titles.addCustomLink}
      icon={<LinkOutlinedIcon style={{ color: '#272727' }} />}
      open={open}
      onClose={() => onClose()}
      actionOne={{
        clicked: e => onAddCustomLink(e),
        text: pageStatics.buttons.saveCustomLink,
        borderedButton: true,
        disabled: !formValid || !formTouched || disableActions,
        background: formValid && formTouched ? '#272727' : '#888',
      }}
    >
      <Box className={`${classes.dialogContent}`}>
        {loadCustomLinkForm()}
      </Box>
    </NotificationDialog>
  )
}

AddCustomLinkDialog.defaultProps = {
  open: false,
  formElements: null,
  formTouched: false,
  formValid: false,
  disableActions: false,
}

AddCustomLinkDialog.propTypes = {
  open: PropTypes.bool,
  formTouched: PropTypes.bool,
  formValid: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  formElements: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onAddCustomLink: PropTypes.func.isRequired,
  disableActions: PropTypes.bool,
}

export default AddCustomLinkDialog
