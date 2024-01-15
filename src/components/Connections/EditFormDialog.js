import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
// import CircularProgress from '@material-ui/core/CircularProgress'

import FullScreenDialog from '../../layout/FullScreenDialog'
import FormElement from '../Ui/FormElement'
import LoadingBackdrop from '../Loading/LoadingBackdrop'
import Alert from '../../layout/Alert'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'
// import { generateRandomString } from '../../utilities/utils'

import {
  // createConnectionTag,
  // getConnectionTagByValue,
  assignTags,
} from '../../API/connections'

import * as actions from '../../store/actions'

import { buttonStyles } from '../../theme/buttons'
import { formStyles } from './styles'

const EditFormDialog = ({
  open, onClose, formDetails, tags, onSetNotification,
  // onAddTag,
  userId, onAssignTags,
}) => {
  const classes = formStyles()
  const buttonClasses = buttonStyles()
  const color = useColor()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections

  const initialFormTagsFormState = {
    tags: createFormElementObj('checkboxGroup', '',
      {
        type: 'checkbox', name: 'tags', placeholder: `${pageStatics.forms.assignTags.tags}`, tag: 'text',
      },
      '',
      tags ? tags.map(tag => ({ ...tag, value: tag.id })) : [],
      { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  }

  // const initialAddTagForm = {
  //   display: createFormElementObj('input', `${pageStatics.forms.addNewTagDialog.tag}`,
  //     { type: 'text', name: 'tag', placeholder: `${pageStatics.forms.addNewTagDialog.tag}` }, '', null, { notEmpty: true, minLength: 2 }, false,
  //     {
  //       xs: 8,
  //       sm: null,
  //       md: null,
  //       lg: null,
  //       xl: null,
  //       fullWidth: true,
  //     }),
  // }

  const [formTouched, setFormTouched] = useState(false)
  const [formSaved, setFormSaved] = useState(false)
  const [tagsForm, setTagsForm] = useState({ ...initialFormTagsFormState })
  // const [addTagFormValid, setAddTagFormValid] = useState(false)
  // const [addTagFormTouched, setAddTagFormTouched] = useState(false)
  // const [addTagForm, setAddTagForm] = useState({ ...initialAddTagForm })
  // const [addingTagLoading, setAddingTagLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingTags)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // setTagsForm(prevForm => ({
    //   ...prevForm,
    //   tags: {
    //     ...prevForm.tags,
    //     elementOptions: tags ? tags.map(tag => ({ ...tag, value: tag.id })) : [],
    //   },
    // }))
    if (formDetails && formDetails.tags) {
      const adjustedTagsForm = adjustFormValues(tagsForm, formDetails.tags, null)
      setTagsForm(prevForm => ({ ...prevForm, ...adjustedTagsForm.adjustedForm }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDetails])

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

    const adjustedTagsForm = adjustFormValues(tagsForm, changeEvent, key)

    setTagsForm(adjustedTagsForm.adjustedForm)
    setFormTouched(true)
    setFormSaved(false)
  }

  const loadTabForm = formElements => {
    const form = Object.keys(formElements).map((formEl, i) => (
      <FormElement
        elementType={formElements[formEl].elementType}
        label={formElements[formEl].elementLabel}
        value={formElements[formEl].value}
        elementOptions={formElements[formEl].elementOptions}
        touched={formElements[formEl].touched}
        valid={formElements[formEl].isValid}
        shouldValidate={formElements[formEl].validtationRules}
        elementSetup={formElements[formEl].elementSetup}
        errorMessage={formElements[formEl].errorMessage}
        changed={e => inputChangeHandler(e, formEl)}
        grid={formElements[formEl].grid}
        disabled={false}
        key={formEl + i}
      />
    ))

    return form
  }

  // const tagInputChangeHandler = (e, key) => {
  //   let changeEvent

  //   if (Array.isArray(e)) {
  //     changeEvent = e.join()
  //   } else if (Number.isInteger(e)) {
  //     changeEvent = String(e)
  //   } else {
  //     changeEvent = e
  //   }

  //   const adjustedForm = adjustFormValues(addTagForm, changeEvent, key)
  //   setAddTagForm(adjustedForm.adjustedForm)
  //   setAddTagFormValid(adjustedForm.formValid)
  //   setAddTagFormTouched(true)
  // }

  // const addTagHandler = async e => {
  //   e.preventDefault()
  //   setAddingTagLoading(true)
  //   const details = createFormValuesObj(addTagForm)
  //   const tagValue = details.display.trim().toLowerCase().replaceAll(' ', '_')
  //   details.display = details.display.trim()
  //   details.value = tagValue
  //   details.id = generateRandomString()
  //   details.count = 0
  //   try {
  //     const existingTag = await getConnectionTagByValue(userId, tagValue)
  //     if (existingTag) {
  //       onSetNotification({
  //         message: `${pageStatics.messages.notifications.tagExists.first} ${existingTag.display} ${pageStatics.messages.notifications.tagExists.second}`,
  //         type: 'warning',
  //       })
  //       setAddingTagLoading(false)
  //       return
  //     }
  //     const createdTag = await createConnectionTag(userId, details)
  //     details.id = createdTag
  //     onAddTag(details)
  //     details.value = createdTag
  //     setTagsForm(prevForm => ({
  //       ...prevForm,
  //       tags: {
  //         ...prevForm.tags,
  //         elementOptions: [
  //           ...prevForm.tags.elementOptions,
  //           details,
  //         ],
  //       },
  //     }))
  //     setAddTagForm(initialAddTagForm)
  //     setAddTagFormValid(false)
  //     setAddTagFormTouched(false)
  //     setAddingTagLoading(false)
  //     setFormTouched(false)
  //     onSetNotification({
  //       message: pageStatics.messages.notifications.tagAddedSuccess,
  //       type: 'success',
  //     })
  //   } catch (err) {
  //     onSetNotification({
  //       message: pageStatics.messages.notifications.tagAddedError,
  //       type: 'error',
  //     })
  //   }
  // }

  // const loadTagsForm = formElements => {
  //   const form = Object.keys(formElements).map((formEl, i) => (
  //     <FormElement
  //       elementType={formElements[formEl].elementType}
  //       label={formElements[formEl].elementLabel}
  //       value={formElements[formEl].value}
  //       elementOptions={formElements[formEl].elementOptions}
  //       touched={formElements[formEl].touched}
  //       valid={formElements[formEl].isValid}
  //       shouldValidate={formElements[formEl].validtationRules}
  //       elementSetup={formElements[formEl].elementSetup}
  //       errorMessage={formElements[formEl].errorMessage}
  //       changed={e => tagInputChangeHandler(e, formEl)}
  //       grid={formElements[formEl].grid}
  //       disabled={false}
  //       key={formEl + i}
  //     />
  //   ))

  //   return form
  // }

  const assignTagsHandler = async e => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.asigningTags)
    setLoading(true)
    setLoadingDone(false)
    const tagsDetails = createFormValuesObj(tagsForm)
    const tagsDisplay = {
      tagsDisplay: tags.filter(opt => tagsDetails.tags.includes(opt.id)).map(opt => opt.display),
    }

    const tagsData = {
      ...tagsDetails,
      ...tagsDisplay,
    }

    try {
      tagsData.formId = formDetails.id
      const addedOffer = await assignTags(userId, formDetails.id, tagsData)
      tagsData.id = addedOffer
      onAssignTags(formDetails.id, tagsData)
      setTagsForm(initialFormTagsFormState)
      setFormTouched(false)

      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setTimeout(() => onClose(), 1100)
      setLoadingMessage(pageStatics.messages.loading.loadingTags)

      onSetNotification({
        message: pageStatics.messages.notifications.assignTagsSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoading(false)
      onClose()
      onSetNotification({
        message: pageStatics.messages.notifications.assignTagsError,
        type: 'error',
      })
      throw new Error(err)
    }
  }

  const goToTags = () => {
    history.push('/connectionTags')
  }

  const buttonDisabled = formSaved || !formTouched

  return (
    <FullScreenDialog
      type="custom"
      titleBackground={color.color.code}
      title={pageStatics.data.titles.assignTagDialog}
      open={open}
      onClose={() => onClose()}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={assignTagsHandler}
          className={`${buttonClasses.defaultButton}`}
          disabled={buttonDisabled}
          style={{
            backgroundColor: color.color.code,
          }}
        >
          {pageStatics.buttons.saveTags}
        </Button>
      )}
    >
      <Box className={classes.viewCardData}>
        {loading && <LoadingBackdrop done={loadingDone} loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loadingTags}`} />}
        <Typography component="p" variant="body1" align="center" className={classes.offerClaimNote}>
          {pageStatics.data.description.assignTagDialog}
        </Typography>
        <Grid container spacing={3} className={classes.formTagsContainer}>
          {tags && tags.length > 0
            ? loadTabForm(tagsForm)
            : (
              <Box mt={2}>
                <Alert
                  title={pageStatics.messages.notifications.noTags.title}
                  description={pageStatics.messages.notifications.noTags.body}
                  type="info"
                  onClickHandler={() => goToTags()}
                  buttonText={pageStatics.buttons.goToTags}
                />
              </Box>
            )}
          {/* {addingTagLoading && <Box className={classes.addTagPrograssContainer}><CircularProgress style={{ color: '#272727' }} /></Box>}
          <Grid item xs={12}>
            <Box className={classes.addNewTagBoxContainer} mb={2}>
              <Grid container spacing={3} alignItems="center" justifyContent="center">
                {loadTagsForm(addTagForm)}
                <Box>
                  <Button
                    color="secondary"
                    onClick={e => addTagHandler(e)}
                    disabled={!addTagFormValid || !addTagFormTouched || addingTagLoading}
                    className={buttonClasses.defaultButton}
                    style={{
                      backgroundColor: (addTagFormValid && addTagFormTouched) && color.color.code,
                      width: '50px',
                    }}
                  >
                    {pageStatics.buttons.addTagShort}
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </FullScreenDialog>
  )
}

EditFormDialog.defaultProps = {
  open: false,
  formDetails: null,
  tags: null,
  userId: null,
}

EditFormDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  formDetails: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onSetNotification: PropTypes.func.isRequired,
  // onAddTag: PropTypes.func.isRequired,
  onAssignTags: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onAddTag: tagObj => dispatch(actions.addConnectionTag(tagObj)),
  onAssignTags: (formId, assignedTags) => dispatch(actions.assignTags(formId, assignedTags)),
})

export default connect(null, mapDispatchToProps)(EditFormDialog)
