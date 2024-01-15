import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import InfoBox from '../../components/Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../layout/Header'
import AddTagDialog from '../../components/Offers/AddTagDialog'
import TagsList from '../../components/Offers/TagsList'
import Alert from '../../layout/Alert'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { offersStyles } from './styles'

import { createOfferTag, getOfferTagByValue, deleteOfferTagById } from '../../API/offers'

import { useColor } from '../../hooks/useDarkMode'
import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { generateRandomString } from '../../utilities/utils'

import * as actions from '../../store/actions'

const OfferTags = ({
  cardData, offers, onSetNotification, onLoadCardByUserId, switchTheme, onAddTag, onLoadOfferTags, onRemoveTag,
}) => {
  const color = useColor()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.offers
  const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const classes = offersStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingTags)
  const [addTagDialogOpen, setAddTagDialogOpen] = useState(window.location.hash === '#ntag')

  const [addTagForm, setAddTagForm] = useState({
    display: createFormElementObj('input', `${pageStatics.forms.addTagDialog.tag}*`,
      { type: 'text', name: 'tag', placeholder: `${pageStatics.forms.addTagDialog.tag}*` }, '', null, { required: true }, false,
      {
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

    if ((mounted && !cardData.userId) || !isTheLoggedinUser) {
      (async () => {
        setLoading(true)
        await onLoadCardByUserId(auth.user.uid)
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user.uid, onLoadCardByUserId, isTheLoggedinUser])

  useEffect(() => {
    let mounted = true

    if (mounted && cardData.userId && !offers.offerTags) {
      (async () => {
        setLoading(true)
        await onLoadOfferTags(auth.user.uid)
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
      })()
    }

    return () => { mounted = false }
  }, [onLoadOfferTags, auth.user.uid, offers.offerTags, cardData.userId])

  useEffect(() => {
    if (window.localStorage.getItem('originalTheme')) {
      switchTheme(window.localStorage.getItem('originalTheme'))
    }
  }, [switchTheme])

  useEffect(() => {
    const onHashChange = () => {
      setAddTagDialogOpen(window.location.hash === '#ntag')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const addTagHandler = async e => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.addingTag)
    setLoading(true)
    setLoadingDone(false)
    const formDetails = createFormValuesObj(addTagForm)
    const tagValue = formDetails.display.trim().toLowerCase().replaceAll(' ', '_')
    formDetails.display = formDetails.display.trim()
    formDetails.value = tagValue
    formDetails.code = generateRandomString()
    formDetails.count = 0
    try {
      const existingTag = await getOfferTagByValue(auth.user.uid, tagValue)
      if (existingTag) {
        onSetNotification({
          message: `${pageStatics.messages.notifications.tagExists.first} ${tagValue} ${pageStatics.messages.notifications.tagExists.second}`,
          type: 'warning',
        })
        setLoading(false)
        setLoadingDone(true)
        return
      }
      const createdTag = await createOfferTag(auth.user.uid, formDetails)
      formDetails.id = createdTag
      onAddTag(formDetails)
      setFormTouched(false)
      setFormValid(false)
      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      onSetNotification({
        message: pageStatics.messages.notifications.tagAddedSuccess,
        type: 'success',
      })
    } catch (err) {
      console.log(err);
      onSetNotification({
        message: pageStatics.messages.notifications.tagAddedError,
        type: 'error',
      })
    }

    window.history.back()
  }

  const deleteTagHandler = async (e, tagId) => {
    if (e) { e.preventDefault() }
    setLoadingMessage(pageStatics.messages.loading.removingTag)
    const targetTag = offers.offerTags.filter(tag => tag.id === tagId)[0]
    const confirmDeleteMessage = targetTag.count > 1
      ? `${targetTag.display} ${pageStatics.messages.notifications.deleteTagPrompt.asigned.first}
    ${targetTag.count} ${pageStatics.messages.notifications.deleteTagPrompt.asigned.second} ${pageStatics.messages.notifications.deleteTagPrompt.asigned.third}`
      : `${pageStatics.messages.notifications.deleteTagPrompt.first} ${targetTag.display} ${pageStatics.messages.notifications.deleteTagPrompt.second}`
    const confirmBox = window.confirm(confirmDeleteMessage)
    if (confirmBox === true) {
      setLoadingDone(false)
      setLoading(true)
      try {
        await deleteOfferTagById(auth.user.uid, tagId)
        await onRemoveTag(tagId)

        setLoadingDone(true)
        setFormTouched(false)
        setTimeout(() => setLoading(false), 1000)

        onSetNotification({
          message: pageStatics.messages.notifications.tagDeletedSuccess,
          type: 'success',
        })
      } catch (err) {
        onSetNotification({
          message: pageStatics.messages.notifications.tagDeletedError,
          type: 'error',
        })
      }
    }
  }

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedForm = adjustFormValues(addTagForm, changeEvent, key)
    setAddTagForm(adjustedForm.adjustedForm)
    setFormValid(adjustedForm.formValid)
    setFormTouched(true)
  }

  const openAddTagDialogHandler = () => {
    window.location.hash = '#ntag'
  }

  const closeAddTagDialogHandler = () => {
    setAddTagForm(prevForm => ({
      ...prevForm,
      display: {
        ...prevForm.display,
        value: '',
        isValid: false,
        touched: false,
      },
    }))
    window.history.back()
  }

  if (loading) {
    return <LoadingBackdrop done={loadingDone} loadingText={`${loadingMessage || pageStatics.messages.loading.loadingTags}`} />
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.offerTags}>
        <Box mb={3}>
          <InfoBox infoList={[pageStatics.data.description.offerTags]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <form>
            <Box className={classes.root}>
              <Box className={`${layoutClasses.panel}`}>
                <PageTitle
                  title={pageStatics.data.titles.tagsPanel}
                />
                <Box mb={2}>
                  <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                    {pageStatics.data.description.tagsPanel}
                  </Typography>
                </Box>
                {offers && offers.offerTags && offers.offerTags.length > 0 && (
                  <TagsList
                    tags={offers.offerTags}
                    onTagDelete={deleteTagHandler}
                  />
                )}
                {offers && (!offers.offerTags || offers.offerTags.length === 0) && (
                  <Alert
                    title={pageStatics.messages.notifications.noTags.title}
                    description={pageStatics.messages.notifications.noTags.body}
                    type="info"
                  />
                )}
                <Button
                  className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                  onClick={() => openAddTagDialogHandler()}
                  style={{
                    backgroundColor: color.color.code,
                  }}
                >
                  {pageStatics.buttons.addTag}
                </Button>
                <AddTagDialog
                  open={addTagDialogOpen}
                  onClose={closeAddTagDialogHandler}
                  formElements={addTagForm}
                  onChange={inputChangeHandler}
                  onAddTag={addTagHandler}
                  formValid={formValid}
                  formTouched={formTouched}
                  color={color.color.code}
                />
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
  offers: state.offers,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCardByUserId: userId => dispatch(actions.loadCardByUserId(userId)),
  onAddTag: tagObj => dispatch(actions.addOfferTag(tagObj)),
  onRemoveTag: tagId => dispatch(actions.removeOfferTag(tagId)),
  onLoadOfferTags: userId => dispatch(actions.loadOfferTags(userId)),
})

OfferTags.defaultProps = {
  cardData: null,
  offers: null,
}

OfferTags.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onSetNotification: PropTypes.func.isRequired,
  onLoadCardByUserId: PropTypes.func.isRequired,
  switchTheme: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onLoadOfferTags: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
  offers: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferTags)
