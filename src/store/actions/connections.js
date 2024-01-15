import * as actionTypes from './actionTypes'
import {
  getCardConnections, getConnectionForms, getConnectionSettings, getConnectionTags,
  getDefaultFormId, getAssignedTags,
} from '../../API/connections'
// import { getSubscribedUser } from '../../API/subscriptions'

export const getConnectionsRequest = () => ({
  type: actionTypes.GET_CONNECTIONS_REQUEST,
})

export const getConnectionsSuccess = connections => ({
  type: actionTypes.GET_CONNECTIONS_SUCCESS,
  connections,
  count: connections.length,
})

export const getConnectionsFailure = error => ({
  type: actionTypes.GET_CONNECTIONS_FAILURE,
  error,
})

export const startAddConnection = connection => ({
  type: actionTypes.ADD_CONNECTION_SUCCESS,
  connection,
})

export const startUpdateConnection = (connectionId, connectionData) => ({
  type: actionTypes.UPDATE_CONNECTION_SUCCESS,
  firstName: connectionData.firstName,
  lastName: connectionData.lastName,
  userName: connectionData.userName,
  email: connectionData.email,
  workPhone: connectionData.workPhone,
  connectionId,
})

export const startRemoveConnection = connectionId => ({
  type: actionTypes.REMOVE_CONNECTION_SUCCESS,
  connectionId,
})

export const getConnectionFormsSuccess = (connectionForms, assignedTags) => ({
  type: actionTypes.GET_CONNECTION_FORMS_SUCCESS,
  connectionForms,
  assignedTags,
})

export const assignTagsSuccess = (formId, assignedTags) => ({
  type: actionTypes.ASSIGN_TAGS_SUCCESS,
  formId,
  assignedTags,
})

export const assignConnectionTagsSuccess = (connectionId, assignedTags, assignedTagsDisplay) => ({
  type: actionTypes.ASSIGN_CONNECTION_TAGS_SUCCESS,
  connectionId,
  assignedTags,
  assignedTagsDisplay,
})

export const activateFormSuccess = formId => ({
  type: actionTypes.ACTIVATE_FORM_SUCCESS,
  formId,
})

export const updateEmbedFormSuccess = embedForm => ({
  type: actionTypes.UPDATE_EMBED_FORM_SUCCESS,
  embedForm,
})

export const getConnectionTagsSuccess = connectionTags => ({
  type: actionTypes.GET_CONNECTION_TAGS_SUCCESS,
  connectionTags,
})

export const startAddConnectionTag = connectionTag => ({
  type: actionTypes.ADD_CONNECTION_TAG_SUCCESS,
  connectionTag,
})

export const startUpdateConnectionTag = (tagId, tagValue, tagColor) => ({
  type: actionTypes.UPDATE_CONNECTION_TAG_SUCCESS,
  tagId,
  tagValue,
  tagColor,
})

export const startRemoveConnectionTag = tagId => ({
  type: actionTypes.REMOVE_CONNECTION_TAG_SUCCESS,
  tagId,
})

export const getConnectionSettingsSuccess = connectionSettings => ({
  type: actionTypes.GET_CONNECTION_SETTINGS_SUCCESS,
  connectionSettings,
})

export const startAddConnectionSettings = connectionSettings => ({
  type: actionTypes.ADD_CONNECTION_SETTINGS_SUCCESS,
  connectionSettings,
})

export const startUpdateConnectionSettings = updatedSettings => ({
  type: actionTypes.UPDATE_CONNECTION_SETTINGS_SUCCESS,
  updatedSettings,
})

export const connectionProcessFinished = () => ({
  type: actionTypes.CONNECTION_PROCESS_FINISHED,
})

export const startGetConnectionDataSuccess = (profileId, connectionSettings, connectionTags, connectionForms, assignedTags, connections) => ({
  type: actionTypes.GET_CONNECTION_DATA_SUCCESS,
  connectionSettings,
  connectionTags,
  connectionForms,
  assignedTags,
  connections,
  profileId,
  count: connections ? connections.length : 0,
})

export const loadConnections = userId => async dispatch => {
  dispatch(getConnectionsRequest())
  try {
    const connections = await getCardConnections(userId)
    dispatch(getConnectionsSuccess(connections))
  } catch (err) {
    dispatch(getConnectionsFailure(err))
  }
}

export const removeUserConnection = connectionId => dispatch => {
  dispatch(getConnectionsRequest())
  dispatch(startRemoveConnection(connectionId))
  dispatch(connectionProcessFinished())
}

export const addUserConnection = connection => dispatch => {
  dispatch(startAddConnection(connection))
}

export const updateUserConnection = (connectionId, connectionData) => async dispatch => {
  dispatch(startUpdateConnection(connectionId, connectionData))
}

export const loadConnectionForms = userId => async dispatch => {
  dispatch(getConnectionsRequest())
  try {
    const forms = await getConnectionForms()
    const assignedTags = await getAssignedTags(userId)
    dispatch(getConnectionFormsSuccess(forms, assignedTags))
  } catch (err) {
    dispatch(getConnectionsFailure(err))
  }
}

export const assignTags = (formId, assignedTags) => dispatch => {
  dispatch(assignTagsSuccess(formId, assignedTags))
}

export const assignConnectionTags = (connectionId, assignedTags, assignedTagsDisplay) => dispatch => {
  dispatch(assignConnectionTagsSuccess(connectionId, assignedTags, assignedTagsDisplay))
}

export const activateForm = formId => dispatch => {
  dispatch(getConnectionsRequest())
  dispatch(activateFormSuccess(formId))
  dispatch(connectionProcessFinished())
}

export const updateEmbedForm = embedForm => dispatch => {
  dispatch(getConnectionsRequest())
  dispatch(updateEmbedFormSuccess(embedForm))
  dispatch(connectionProcessFinished())
}

export const loadConnectionTags = (userId, masterId) => async dispatch => {
  dispatch(getConnectionsRequest())
  const profileId = masterId || userId
  try {
    const tags = await getConnectionTags(profileId)
    dispatch(getConnectionTagsSuccess(tags))
  } catch (err) {
    dispatch(getConnectionsFailure(err))
  }
}

export const addConnectionTag = tag => dispatch => {
  dispatch(getConnectionsRequest())
  dispatch(startAddConnectionTag(tag))
  dispatch(connectionProcessFinished())
}

export const updateConnectionTag = (tagId, tagValue, tagColor) => dispatch => {
  dispatch(getConnectionsRequest())
  dispatch(startUpdateConnectionTag(tagId, tagValue, tagColor))
  dispatch(connectionProcessFinished())
}

export const removeConnectionTag = tagId => dispatch => {
  // dispatch(getConnectionsRequest())
  dispatch(startRemoveConnectionTag(tagId))
  dispatch(connectionProcessFinished())
}

export const loadConnectionSettings = userId => async dispatch => {
  dispatch(getConnectionsRequest())
  try {
    const settings = await getConnectionSettings(userId)
    const defaultFormId = await getDefaultFormId()
    if (settings) {
      dispatch(getConnectionSettingsSuccess({ ...settings, defaultFormId: defaultFormId.trim() }))
    } else {
      dispatch(getConnectionSettingsSuccess({ defaultFormId: defaultFormId.trim() }))
    }
  } catch (err) {
    dispatch(getConnectionsFailure(err))
  }
}

export const addConnectionSettings = settings => dispatch => {
  dispatch(getConnectionsRequest())
  dispatch(startAddConnectionSettings(settings))
  dispatch(connectionProcessFinished())
}

export const updateConnectionSettings = updatedSettings => dispatch => {
  dispatch(getConnectionsRequest())
  dispatch(startUpdateConnectionSettings(updatedSettings))
  dispatch(connectionProcessFinished())
}

export const loadConnectionData = (userId, masterId, loadAllConnections) => async dispatch => {
  dispatch(getConnectionsRequest())
  try {
    let settingObj
    const profileId = masterId || userId
    // const subscriber = await getSubscribedUser(userId)
    const settings = await getConnectionSettings(profileId)
    const defaultFormId = await getDefaultFormId()
    // const subscriberStatus = subscriber ? subscriber[0].status : null
    // const isPro = subscriber ? subscriberStatus === 'active' || subscriberStatus === 'trialing' : false
    if (settings) {
      settingObj = { ...settings, defaultFormId: defaultFormId.trim() }
    } else {
      settingObj = { defaultFormId: defaultFormId.trim() }
    }

    // if (!isPro) {
    //   settingObj = {
    //     ...settings,
    //     defaultFormId,
    //     activeFormId: defaultFormId,
    //     embedForm: null,
    //   }
    // }

    const tags = await getConnectionTags(profileId)

    const forms = await getConnectionForms()
    const assignedTags = await getAssignedTags(profileId)

    const connections = loadAllConnections ? await getCardConnections(userId) : null

    dispatch(startGetConnectionDataSuccess(userId, settingObj, tags, forms, assignedTags, connections))
  } catch (err) {
    dispatch(getConnectionsFailure(err && { message: 'There was a problem loading data. Please reload the page.' }))
  }
}
