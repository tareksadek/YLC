import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import LabelIcon from '@material-ui/icons/Label'
import CheckIcon from '@material-ui/icons/Check'

import FormElement from '../Ui/FormElement'
import NotificationDialog from '../../layout/NotificationDialog'
import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { useLanguage } from '../../hooks/useLang'

import { labelColors } from '../../utilities/appVars'

import { addTagDialogStyles } from './styles'

const AddConnectionTagDialog = ({
  open, onClose, formElements, onChange, onAddTag, formTouched, formValid, onChangeColor, selectedTagColor,
  loading, loadingDone, loadingMessage,
}) => {
  const classes = addTagDialogStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections
  const tagColor = selectedTagColor || '#999999'

  const loadTagForm = () => {
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
            blured={() => true}
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
      title={pageStatics.data.titles.addTagDialog}
      icon={<LabelIcon style={{ color: '#272727' }} />}
      open={open}
      onClose={() => onClose()}
      actionOne={{
        clicked: e => onAddTag(e),
        text: pageStatics.buttons.addTag,
        borderedButton: true,
        disabled: !formValid || !formTouched,
        background: formValid && formTouched ? '#272727' : '#888',
      }}
    >
      <Box className={`${classes.dialogContent}`}>
        {loading && <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />}
        {loadTagForm()}
        <Typography component="p" variant="body1">
          {pageStatics.data.titles.tagColor}
        </Typography>
        <Box className={classes.labelColorsContainer}>
          {labelColors.map(color => (
            <Button
              key={color.name}
              color="secondary"
              onClick={() => onChangeColor(color)}
              className={classes.labelColorButton}
              style={{
                backgroundColor: color.code,
              }}
            >
              {color.code === tagColor && (
                <CheckIcon />
              )}
            </Button>
          ))}
        </Box>
      </Box>
    </NotificationDialog>
  )
}

AddConnectionTagDialog.defaultProps = {
  open: false,
  formElements: null,
  formTouched: false,
  formValid: false,
  selectedTagColor: null,
  loading: false,
  loadingDone: false,
  loadingMessage: null,
}

AddConnectionTagDialog.propTypes = {
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
  onAddTag: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  selectedTagColor: PropTypes.string,
  loading: PropTypes.bool,
  loadingDone: PropTypes.bool,
  loadingMessage: PropTypes.string,
}

export default AddConnectionTagDialog
