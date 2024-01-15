import React, { useState, useEffect } from 'react'
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
import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { updateConnectionTag } from '../../API/connections'

import { addTagDialogStyles } from './styles'

const EditConnectionTagDialog = ({
  open, onClose, onUpdateTag, tag, userId, onSetNotification, clearEditDialogData,
}) => {
  const classes = addTagDialogStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [formSaved, setFormSaved] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingConnectionInfo)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editTagForm, setEditTagForm] = useState({
    display: createFormElementObj('input', `${pageStatics.forms.addTagDialog.tag}*`,
      { type: 'text', name: 'tag', placeholder: `${pageStatics.forms.addTagDialog.tag}*` },
      tag && tag.display,
      null,
      { required: true },
      false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })
  const [selectedTagColor, setSelectedTagColor] = useState(tag && tag.color ? tag.color : '#999999')

  useEffect(() => {
    if (tag) {
      const adjustedInfoForm = adjustFormValues(editTagForm, tag, null)
      setEditTagForm(prevForm => ({ ...prevForm, ...adjustedInfoForm.adjustedForm }))
      setFormValid(adjustedInfoForm.formValid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag])

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedForm = adjustFormValues(editTagForm, changeEvent, key)
    setEditTagForm(adjustedForm.adjustedForm)
    setFormValid(adjustedForm.formValid)
    setFormTouched(true)
    setFormSaved(false)
  }

  const loadTagForm = () => {
    const form = Object.keys(editTagForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3}>
          <FormElement
            elementType={editTagForm[formEl].elementType}
            label={editTagForm[formEl].elementLabel}
            value={editTagForm[formEl].value}
            elementOptions={editTagForm[formEl].elementOptions}
            touched={editTagForm[formEl].touched}
            valid={editTagForm[formEl].isValid}
            errorMessage={editTagForm[formEl].errorMessage}
            shouldValidate={editTagForm[formEl].validtationRules}
            elementSetup={editTagForm[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            blured={() => true}
            grid={editTagForm[formEl].grid}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  const editTagHandler = async e => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.editingTag)
    setLoadingDone(false)
    setLoading(true)
    const tagDetails = createFormValuesObj(editTagForm)

    try {
      await updateConnectionTag(userId, tag.id, tagDetails.display, selectedTagColor)
      onUpdateTag(tag.id, tagDetails.display, selectedTagColor)
      setFormTouched(false)

      setLoadingDone(true)
      clearEditDialogData()
      setTimeout(() => setLoading(false), 1000)
      setTimeout(() => onClose(), 1100)
      setLoadingMessage(pageStatics.messages.loading.loadingTags)

      onSetNotification({
        message: pageStatics.messages.notifications.tagEditSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoadingDone(true)
      setLoading(false)
      clearEditDialogData()
      onClose()
      onSetNotification({
        message: pageStatics.messages.notifications.tagEditError,
        type: 'error',
      })
      throw new Error(err)
    }
  }

  const changeLabelColorHandler = selectedColor => {
    setFormTouched(true)
    setFormSaved(false)
    setSelectedTagColor(selectedColor.code)
  }

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading

  return (
    <NotificationDialog
      type="custom"
      background="#fff"
      title={pageStatics.data.titles.editTagDialog}
      icon={<LabelIcon style={{ color: '#272727' }} />}
      open={open}
      onClose={() => onClose()}
      actionOne={{
        clicked: e => editTagHandler(e),
        text: pageStatics.buttons.editTag,
        borderedButton: true,
        disabled: buttonDisabled,
        background: !buttonDisabled ? '#272727' : '#888',
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
              onClick={() => changeLabelColorHandler(color)}
              className={classes.labelColorButton}
              style={{
                backgroundColor: color.code,
              }}
            >
              {color.code === selectedTagColor && (
                <CheckIcon />
              )}
            </Button>
          ))}
        </Box>
      </Box>
    </NotificationDialog>
  )
}

EditConnectionTagDialog.defaultProps = {
  open: false,
  tag: null,
  userId: null,
}

EditConnectionTagDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onUpdateTag: PropTypes.func.isRequired,
  tag: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onSetNotification: PropTypes.func.isRequired,
  userId: PropTypes.string,
  clearEditDialogData: PropTypes.func.isRequired,
}

export default EditConnectionTagDialog
