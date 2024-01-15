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
import AddConnectionTagDialog from '../../components/Connections/AddConnectionTagDialog'
import EditConnectionTagDialog from '../../components/Connections/EditConnectionTagDialog'
import ConnectionTagsList from '../../components/Connections/ConnectionTagsList'
import Alert from '../../layout/Alert'
import SkeletonContainer from '../../layout/SkeletonContainer'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { formsStyles } from './styles'

import { createConnectionTag, getConnectionTagByValue, deleteConnectionTagById } from '../../API/connections'

import { useColor } from '../../hooks/useDarkMode'
import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { generateRandomString } from '../../utilities/utils'

import * as actions from '../../store/actions'

const ConnectionTags = ({
  cardData, connectionTags, onSetNotification, onAddTag, onLoadConnectionTags, onRemoveTag,
  connectionLoading, onUpdateTag,
}) => {
  const color = useColor()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const classes = formsStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingTags)
  const [addTagLoadingDone, setAddTagLoadingDone] = useState(false)
  const [addTagLoading, setAddTagLoading] = useState(false)
  const [addTagDialogOpen, setAddTagDialogOpen] = useState(window.location.hash === '#ctag')

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

  const [selectedTagColor, setSelectedTagColor] = useState(null)
  const [editTagDialogOpen, setEditTagDialogOpen] = useState(window.location.hash === '#editlabel')
  const [editTagDialogData, setEditTagDialogData] = useState(null)

  // useEffect(() => {
  //   let mounted = true

  //   if ((mounted && !cardData.userId) || !isTheLoggedinUser) {
  //     (async () => {
  //       setLoading(true)
  //       await onLoadCardByUserId(auth.user.uid)
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //     })()
  //   }

  //   return () => { mounted = false }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth.user.uid, onLoadCardByUserId, isTheLoggedinUser])

  useEffect(() => {
    let mounted = true

    if (mounted && cardData.userId && !cardData.loading && !connectionTags) {
      (async () => {
        // setLoading(true)
        await onLoadConnectionTags(cardData.userId)
        // setLoadingDone(true)
        // setTimeout(() => setLoading(false), 1000)
      })()
    }

    return () => { mounted = false }
  }, [onLoadConnectionTags, auth.user.uid, connectionTags, cardData])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  useEffect(() => {
    const onHashChange = () => {
      setAddTagDialogOpen(window.location.hash === '#ctag')
      setEditTagDialogOpen(window.location.hash === '#editlabel')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const changeLabelColorHandler = selectedColor => {
    setSelectedTagColor(selectedColor.code)
  }

  const addTagHandler = async e => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.addingTag)
    setAddTagLoading(true)
    setAddTagLoadingDone(false)
    const formDetails = createFormValuesObj(addTagForm)
    const tagValue = formDetails.display.trim().toLowerCase().replaceAll(' ', '_')
    formDetails.display = formDetails.display.trim()
    formDetails.value = tagValue
    formDetails.code = generateRandomString()
    formDetails.count = 0
    formDetails.color = selectedTagColor
    try {
      const existingTag = await getConnectionTagByValue(cardData.userId, tagValue)
      if (existingTag) {
        onSetNotification({
          message: `${pageStatics.messages.notifications.tagExists.first} ${tagValue} ${pageStatics.messages.notifications.tagExists.second}`,
          type: 'warning',
        })
        setAddTagLoading(false)
        setAddTagLoadingDone(true)
        return
      }
      const createdTag = await createConnectionTag(cardData.userId, formDetails)
      formDetails.id = createdTag
      onAddTag(formDetails)
      setFormTouched(false)
      setFormValid(false)
      setAddTagLoadingDone(true)
      setTimeout(() => setAddTagLoading(false), 1000)
      onSetNotification({
        message: pageStatics.messages.notifications.tagAddedSuccess,
        type: 'success',
      })
      setAddTagForm(prevForm => ({
        ...prevForm,
        display: {
          ...prevForm.display,
          value: '',
          isValid: false,
          touched: false,
        },
      }))
      setSelectedTagColor(null)
    } catch (err) {
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
    const confirmDeleteMessage = pageStatics.messages.notifications.deleteTagPrompt.assigned.third
    const confirmBox = window.confirm(confirmDeleteMessage)
    if (confirmBox === true) {
      setLoadingDone(false)
      setLoading(true)
      try {
        await deleteConnectionTagById(cardData.userId, tagId)
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
    window.location.hash = '#ctag'
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

  const openEditTagDialogHandler = tag => {
    setEditTagDialogData(tag)
    window.location.hash = '#editlabel'
  }

  const closeEditTagDialogHandler = () => {
    setEditTagDialogData(null)
    window.history.back()
  }

  const clearEditDialogData = () => {
    setEditTagDialogData(null)
  }

  if (cardData.loading || connectionLoading || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.page}>
          <Box>
            <InfoBox infoList={[pageStatics.data.description.connectionTags.first, pageStatics.data.description.connectionTags.second, pageStatics.data.description.connectionTags.third]} />
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
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 50 },
            ]}
            />
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={`${loadingMessage || pageStatics.messages.loading.loadingTags}`} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={`${loadingMessage || pageStatics.messages.loading.loadingTags}`} boxed />}
      <Header title={pageStatics.data.titles.connectionTags}>
        <Box>
          <InfoBox infoList={[pageStatics.data.description.connectionTags.first, pageStatics.data.description.connectionTags.second, pageStatics.data.description.connectionTags.third]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <form>
            <Box className={classes.root}>
              {connectionTags && connectionTags.length > 0 ? (
                <Box className={`${layoutClasses.panel}`} style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Box pl={1.5} pr={1.5}>
                    <PageTitle
                      title={pageStatics.data.titles.tagsPanel}
                    />
                    <Box mb={2}>
                      <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                        {pageStatics.data.description.tagsPanel}
                      </Typography>
                    </Box>
                  </Box>
                  <ConnectionTagsList
                    tags={connectionTags}
                    onTagDelete={deleteTagHandler}
                    onTagEdit={openEditTagDialogHandler}
                  />
                </Box>
              ) : (
                <Alert
                  title={pageStatics.messages.notifications.noTags.title}
                  description={pageStatics.messages.notifications.noTags.body}
                  type="info"
                />
              )}
              <Box className={classes.editButtonContainer}>
                <Button
                  color="secondary"
                  onClick={() => openAddTagDialogHandler()}
                  className={buttonClasses.defaultButton}
                  style={{
                    backgroundColor: color.color.code,
                    minWidth: '250px',
                  }}
                >
                  {pageStatics.buttons.addTag}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
        <AddConnectionTagDialog
          open={addTagDialogOpen}
          onClose={closeAddTagDialogHandler}
          formElements={addTagForm}
          onChange={inputChangeHandler}
          onAddTag={addTagHandler}
          formValid={formValid}
          formTouched={formTouched}
          onChangeColor={changeLabelColorHandler}
          selectedTagColor={selectedTagColor}
          loading={addTagLoading}
          loadingDone={addTagLoadingDone}
          loadingMessage={loadingMessage}
        />
        {editTagDialogData && (
          <EditConnectionTagDialog
            open={editTagDialogOpen}
            onClose={closeEditTagDialogHandler}
            tag={editTagDialogData}
            onUpdateTag={onUpdateTag}
            onChangeColor={changeLabelColorHandler}
            selectedTagColor={selectedTagColor}
            userId={cardData.userId}
            onSetNotification={onSetNotification}
            clearEditDialogData={clearEditDialogData}
          />
        )}
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
  connectionTags: state.connections.connectionTags,
  connectionLoading: state.connections.loading,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCardByUserId: userId => dispatch(actions.loadCardByUserId(userId)),
  onAddTag: tagObj => dispatch(actions.addConnectionTag(tagObj)),
  onUpdateTag: (tagId, tagValue, tagColor) => dispatch(actions.updateConnectionTag(tagId, tagValue, tagColor)),
  onRemoveTag: tagId => dispatch(actions.removeConnectionTag(tagId)),
  onLoadConnectionTags: userId => dispatch(actions.loadConnectionTags(userId)),
})

ConnectionTags.defaultProps = {
  cardData: null,
  connectionTags: null,
  connectionLoading: false,
}

ConnectionTags.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onSetNotification: PropTypes.func.isRequired,
  // onLoadCardByUserId: PropTypes.func.isRequired,
  // switchTheme: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onUpdateTag: PropTypes.func.isRequired,
  onLoadConnectionTags: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
  connectionTags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  connectionLoading: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionTags)
