import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import parse from 'html-react-parser'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import PageTitle from '../../layout/PageTitle'
import Alert from '../../layout/Alert'
import InfoBox from '../../components/Ui/InfoBox'
import FormsList from '../../components/Connections/FormsList'
import FormDetailsDialog from '../../components/Connections/FormDetailsDialog'
import EditFormDialog from '../../components/Connections/EditFormDialog'
import FormElement from '../../components/Ui/FormElement'
import SkeletonContainer from '../../layout/SkeletonContainer'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'
import { useAuth } from '../../hooks/use-auth'

import { updateConnectionSettings, updateEmbedForm } from '../../API/connections'

import * as actions from '../../store/actions'

const Forms = ({
  cardData, connections, connectionForms, connectionSettings, connectionTags, onLoadConnectionData, onActivateForm, onSetNotification,
  onUpdateEmbedForm, onUpdateConnectionSettings,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const color = useColor()
  const auth = useAuth()
  const pageStatics = language.languageVars.pages.connections
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingForms)
  const [formDialogOpen, setFormDialogOpen] = useState(window.location.hash === '#form')
  const [formDialogData, setFormDialogData] = useState(null)
  const [editFormDialogOpen, setEditFormDialogOpen] = useState(window.location.hash === '#editform')
  const [editFormDialogData, setEditFormDialogData] = useState(null)
  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [formSaved, setFormSaved] = useState(false)

  const [infoForm, setInfoForm] = useState({
    buttonTitle: createFormElementObj('input', `${pageStatics.forms.formSettings.buttonTitle}*`,
      {
        type: 'text',
        name: 'buttonTitle',
        placeholder: `${pageStatics.forms.formSettings.buttonTitle}*`,
        help: pageStatics.forms.formSettings.buttonTitleHelp,
      },
      connectionSettings && connectionSettings.buttonTitle ? connectionSettings.buttonTitle : pageStatics.data.titles.defaultButtonTitle,
      null,
      { required: true, maxLength: 25 },
      false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    formTitle: createFormElementObj('input', `${pageStatics.forms.formSettings.formTitle}*`,
      { type: 'text', name: 'formTitle', placeholder: `${pageStatics.forms.formSettings.formTitle}*` },
      connectionSettings && connectionSettings.formTitle ? connectionSettings.formTitle : pageStatics.data.titles.defaultFormTitle,
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
    formDescription: createFormElementObj('textarea', `${pageStatics.forms.formSettings.formDescription}`,
      { type: 'text', name: 'formDescription', placeholder: `${pageStatics.forms.formSettings.formDescription}` },
      connectionSettings && connectionSettings.formDescription ? connectionSettings.formDescription : pageStatics.data.description.defaultFormDescription,
      null,
      { required: false },
      true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const [currentForm, setCurrenForm] = useState(connectionSettings && connectionSettings.embedForm && connectionSettings.embedForm.embedCode && connectionSettings.embedForm.formType ? connectionSettings.embedForm.formType : null)
  const [typeFormValid, setTypeFormValid] = useState(false)
  const [typeFormTouched, setTypeFormTouched] = useState(false)
  const [typeForm, setTypeForm] = useState({
    formType: createFormElementObj('select', pageStatics.forms.formType.formType,
      { name: 'formType' },
      connectionSettings && connectionSettings.embedForm && connectionSettings.embedForm.embedCode && connectionSettings.embedForm.formType ? connectionSettings.embedForm.formType : '',
      [
        { value: 'google', display: 'Google Form' },
        { value: 'microsoft', display: 'Microsoft Form' },
        { value: 'typeform', display: 'Type Form' },
        { value: 'jotform', display: 'Jot Form' },
      ],
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

  const [embedFormValid, setEmbedFormValid] = useState(false)
  const [embedFormTouched, setEmbedFormTouched] = useState(false)
  const [embedFormSaved, setEmbedFormSaved] = useState(false)
  const [embedForm, setEmbedForm] = useState({
    embedCode: createFormElementObj('textarea', `${pageStatics.forms.formEmbed.embedCode}*`,
      {
        type: 'text',
        name: 'embedCode',
        placeholder: `${pageStatics.forms.formEmbed.embedCode}*`,
        parse: 'disabled',
      },
      connectionSettings && connectionSettings.embedForm && connectionSettings.embedForm.embedCode ? connectionSettings.embedForm.embedCode : '',
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

  // useEffect(() => {
  //   let mounted = true

  //   if ((mounted && !cardData.userId) || !isTheLoggedinUser) {
  //     (async () => {
  //       setLoading(true)
  //       await onLoadCard(auth.user.uid)
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //     })()
  //   }

  //   return () => { mounted = false }
  // }, [onLoadCard, auth.user.uid, cardData.userId, isTheLoggedinUser])

  useEffect(() => {
    let mounted = true

    if (mounted && cardData.userId && !cardData.loading) {
      (async () => {
        await onLoadConnectionData(cardData.userId)
      })()
    }

    return () => { mounted = false }
  }, [onLoadConnectionData, cardData])

  useEffect(() => {
    if (connectionSettings) {
      const adjustedInfoForm = adjustFormValues(infoForm, connectionSettings, null)
      setInfoForm(prevForm => ({ ...prevForm, ...adjustedInfoForm.adjustedForm }))
      setFormValid(adjustedInfoForm.formValid)
    }
    if (connectionSettings && connectionSettings.embedForm) {
      const adjustedEmbedForm = adjustFormValues(embedForm, connectionSettings.embedForm, null)
      setEmbedForm(prevForm => ({ ...prevForm, ...adjustedEmbedForm.adjustedForm }))
      setEmbedFormValid(adjustedEmbedForm.formValid)

      const adjustedTypeForm = adjustFormValues(typeForm, connectionSettings.embedForm, null)
      setTypeForm(prevForm => ({ ...prevForm, ...adjustedTypeForm.adjustedForm }))
      setTypeFormValid(adjustedTypeForm.formValid)

      setCurrenForm(adjustedTypeForm.adjustedForm.formType.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionSettings])

  useEffect(() => {
    const onHashChange = () => {
      setFormDialogOpen(window.location.hash === '#form')
      setEditFormDialogOpen(window.location.hash === '#editform')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  const openFormDialogHandler = form => {
    setFormDialogData(form)
    window.location.hash = '#form'
  }

  const closeFormDialogHandler = () => {
    window.history.back()
    setFormDialogData(null)
  }

  const openEditFormDialogHandler = form => {
    setEditFormDialogData(form)
    window.location.hash = '#editform'
  }

  const closeEditFormDialogHandler = () => {
    setEditFormDialogData(null)
    window.history.back()
  }

  const activateFormHandler = async (e, formId) => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.activatingForm)
    setLoadingDone(false)
    setLoading(true)
    try {
      await updateConnectionSettings(cardData.userId, { activeFormId: formId })
      onActivateForm(formId)
      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setLoadingMessage(pageStatics.messages.loading.loadingForms)
      onSetNotification({
        message: pageStatics.messages.notifications.activateFormSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setLoadingMessage(pageStatics.messages.loading.loadingForms)
      onSetNotification({
        message: pageStatics.messages.notifications.activateFormError,
        type: 'success',
      })
    }
  }

  const updateInfoHandler = async e => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.updatingSettings)
    setLoadingDone(false)
    setLoading(true)
    const infoFormDetails = createFormValuesObj(infoForm)
    try {
      await updateConnectionSettings(cardData.userId, infoFormDetails)
      onUpdateConnectionSettings(infoFormDetails)
      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setLoadingMessage(pageStatics.messages.loading.loadingForms)

      onSetNotification({
        message: pageStatics.messages.notifications.settingsUpdateSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoadingDone(true)
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.settingsUpdateError,
        type: 'error',
      })
    }
  }

  const updateEmbedFormHandler = async e => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.savingEmbedForm)
    setLoadingDone(false)
    setLoading(true)
    const typeFormDetails = createFormValuesObj(typeForm)
    const embedFormDetails = createFormValuesObj(embedForm)
    const embedFormData = {
      ...typeFormDetails,
      ...embedFormDetails,
    }
    try {
      await updateEmbedForm(cardData.userId, embedFormData)
      onUpdateEmbedForm(embedFormData)
      setLoadingDone(true)
      setEmbedFormSaved(true)
      setEmbedFormTouched(false)
      setTimeout(() => setLoading(false), 1000)
      setLoadingMessage(pageStatics.messages.loading.loadingForms)

      onSetNotification({
        message: pageStatics.messages.notifications.embedFormUpdateSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoadingDone(true)
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.embedFormUpdateError,
        type: 'error',
      })
    }
  }

  const inputChangeHandler = async (eve, key, formName) => {
    let changeEvent
    let adjustedTypeForm = null
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

    if (formName === 'info') {
      const adjustedInfoForm = adjustFormValues(infoForm, changeEvent, key)
      setInfoForm(adjustedInfoForm.adjustedForm)
      setFormValid(adjustedInfoForm.formValid)
      setFormTouched(true)
      setFormSaved(false)
    }

    if (formName === 'type') {
      adjustedTypeForm = adjustFormValues(typeForm, changeEvent, key)
      setCurrenForm(adjustedTypeForm.adjustedForm.formType.value)
      setTypeForm(adjustedTypeForm.adjustedForm)
      setTypeFormValid(adjustedTypeForm.formValid)
      setTypeFormTouched(true)
    }

    if (formName === 'embed') {
      const adjustedEmbedForm = adjustFormValues(embedForm, changeEvent, key)
      const embedCodeValue = adjustedEmbedForm.adjustedForm.embedCode.value
      const embedFormType = currentForm
      if (embedCodeValue && embedFormType === 'typeform' && /<\/?[a-z][\s\S]*>/i.test(embedCodeValue)) {
        const tmp = document.createElement('DIV')
        tmp.innerHTML = embedCodeValue
        const formDiv = tmp.getElementsByTagName('div')[0]
        const formCode = formDiv.getAttribute('data-tf-widget')
        adjustedEmbedForm.adjustedForm.embedCode.value = formCode
      }
      if (embedCodeValue && embedFormType === 'jotform' && /<\/?[a-z][\s\S]*>/i.test(embedCodeValue)) {
        const tmp = document.createElement('DIV')
        tmp.innerHTML = embedCodeValue
        const formFrame = tmp.getElementsByTagName('iframe')[0]
        formFrame.setAttribute('scrolling', 'yes')
        adjustedEmbedForm.adjustedForm.embedCode.value = tmp.innerHTML
      }
      setEmbedForm(adjustedEmbedForm.adjustedForm)
      setEmbedFormValid(adjustedEmbedForm.formValid)
      setEmbedFormTouched(true)
      setEmbedFormSaved(false)
    }
  }

  const loadFormContent = (formElements, formName) => {
    const form = Object.keys(formElements).map((formEl, i) => (
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
        changed={e => inputChangeHandler(e, formEl, formName)}
        grid={formElements[formEl].grid}
        disabled={loading}
        key={formEl + i}
      />
    ))

    return form
  }

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading
  const embedButtonDisabled = embedFormSaved || (embedFormTouched && !embedFormValid) || (typeFormTouched && !typeFormValid) || !embedFormTouched || loading

  if (connections.loading || cardData.loading || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.connectionForms}>
          <Box>
            <InfoBox infoList={[pageStatics.data.description.connectionForms]} />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
              ]}
              />
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
              ]}
              />
            </Box>
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />}
      <Header title={pageStatics.data.titles.connectionForms}>
        <Box>
          <InfoBox infoList={[pageStatics.data.description.connectionForms]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <Box className={`${layoutClasses.panel}`}>
            <PageTitle
              title={pageStatics.data.titles.settingsPanel}
            />
            <Box mb={2}>
              <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                {pageStatics.messages.info.formSettings.first}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {loadFormContent(infoForm, 'info')}
            </Grid>
            <Button
              className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
              onClick={e => updateInfoHandler(e)}
              disabled={buttonDisabled}
              style={{
                backgroundColor: color.color.code,
              }}
            >
              {pageStatics.buttons.saveFormSettings}
            </Button>
          </Box>
          {(connectionForms && connectionForms.length > 0) ? (
            <>
              <Box className={`${layoutClasses.panel}`}>
                <PageTitle
                  title={pageStatics.data.titles.formsPanel}
                />
                <Box mb={2}>
                  <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                    {pageStatics.messages.info.forms.first}
                  </Typography>
                </Box>
                <FormsList
                  forms={connectionForms}
                  onOpenFormDialog={openFormDialogHandler}
                  onOpenEditDialog={openEditFormDialogHandler}
                  onUseForm={activateFormHandler}
                  connectionSettings={connectionSettings}
                  embedButtonDisabled={embedButtonDisabled}
                  useButtonEnabled={!!(connectionSettings.embedForm && connectionSettings.embedForm.embedCode && connectionSettings.embedForm.formType)}
                  typeForm={typeForm}
                  embedForm={embedForm}
                  onEmbedFormChange={inputChangeHandler}
                  onEmbedFormSaved={updateEmbedFormHandler}
                  showEmbedForm={(typeFormTouched && typeFormValid) || !!(connectionSettings.embedForm && connectionSettings.embedForm.embedCode && connectionSettings.embedForm.formType)}
                  currentForm={currentForm}
                />
              </Box>
            </>
          ) : (
            <Alert
              title={pageStatics.messages.info.noForms.title}
              description={pageStatics.messages.info.noForms.first}
              type="info"
            />
          )}
        </Box>
        {formDialogOpen && (
          <FormDetailsDialog
            open={formDialogOpen}
            onClose={closeFormDialogHandler}
            formDetails={formDialogData}
            connectionSettings={connectionSettings}
            onUseForm={activateFormHandler}
          />
        )}
        {editFormDialogOpen && (
          <EditFormDialog
            open={editFormDialogOpen}
            onClose={closeEditFormDialogHandler}
            formDetails={editFormDialogData}
            connectionSettings={connectionSettings}
            tags={connectionTags && connectionTags.length > 0 ? connectionTags : null}
            userId={cardData.userId}
          />
        )}
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
  connections: state.connections,
  connectionSettings: state.connections.connectionSettings,
  connectionTags: state.connections.connectionTags,
  connectionForms: state.connections.connectionForms,
})

const mapDispatchToProps = dispatch => ({
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
  onLoadConnectionData: userId => dispatch(actions.loadConnectionData(userId)),
  onActivateForm: (userId, formId) => dispatch(actions.activateForm(userId, formId)),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onUpdateEmbedForm: embedForm => dispatch(actions.updateEmbedForm(embedForm)),
  onUpdateConnectionSettings: updatedSettings => dispatch(actions.updateConnectionSettings(updatedSettings)),
})

Forms.defaultProps = {
  cardData: null,
  connections: null,
  connectionSettings: null,
  connectionTags: null,
  connectionForms: null,
}

Forms.propTypes = {
  // onLoadCard: PropTypes.func.isRequired,
  onLoadConnectionData: PropTypes.func.isRequired,
  onActivateForm: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  // switchTheme: PropTypes.func.isRequired,
  connectionSettings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  connectionTags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  connectionForms: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  connections: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onUpdateEmbedForm: PropTypes.func.isRequired,
  onUpdateConnectionSettings: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Forms)
