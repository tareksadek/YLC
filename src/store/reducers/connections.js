import * as actionTypes from '../actions/actionTypes'
import { updateObj, dynamicSort } from '../../utilities/utils'

const initialState = {
  connections: null,
  connectionsCount: 0,
  connectionsPerPage: 50,
  connectionTags: null,
  connectionSettings: null,
  connectionForms: null,
  profileId: null,
  dataLoaded: false,
  loading: false,
  error: false,
}

const getConnectionsRequest = state => updateObj(state, { loading: true, dataLoaded: false })
const getConnectionsSuccess = (state, action) => updateObj(state, {
  connectionsCount: action.count,
  connections: action.connections,
  loading: false,
  error: false,
})
const addConnection = (state, action) => {
  const currenConnections = state.connections ? [...state.connections] : []
  return updateObj(state, {
    connections: [...currenConnections, action.connection],
    loading: false,
    error: false,
  })
}
const updateConnection = (state, action) => {
  const currentConnections = [
    ...state.connections,
  ]
  const connectionIndex = currentConnections.findIndex(connection => connection.id === action.connectionId)
  currentConnections[connectionIndex].firstName = action.firstName
  currentConnections[connectionIndex].lastName = action.lastName
  currentConnections[connectionIndex].userName = action.userName
  currentConnections[connectionIndex].email = action.email
  currentConnections[connectionIndex].workPhone = action.workPhone

  return updateObj(state, {
    connections: currentConnections,
    loading: false,
    error: false,
  })
}
const removeConnection = (state, action) => {
  const currenConnections = [...state.connections]
  const updatedConnections = currenConnections.filter(connection => connection.id !== action.connectionId)
  return updateObj(state, {
    connections: updatedConnections,
    loading: false,
    error: false,
  })
}
const getConnectionsFailure = state => updateObj(state, { loading: false, error: true })
const getConnectionFormsSuccess = (state, action) => {
  let forms = action.connectionForms
  if (action.assignedTags) {
    forms = forms.map(form => {
      const tags = action.assignedTags.find(tag => tag.formId === form.id)
      return {
        ...form,
        tags,
      }
    })
  }
  return updateObj(state, {
    connectionForms: forms,
    loading: false,
    error: false,
  })
}
const assignTagsSuccess = (state, action) => {
  const currentConnectionForms = [...state.connectionForms]
  const connectionFormIndex = currentConnectionForms.findIndex(connectionForm => connectionForm.id === action.formId)
  currentConnectionForms[connectionFormIndex].tags = action.assignedTags
  return updateObj(state, {
    connectionForms: currentConnectionForms,
    loading: false,
    error: false,
  })
}
const assignConnectionTagsSuccess = (state, action) => {
  const currentConnections = [...state.connections]
  const connectionIndex = currentConnections.findIndex(connection => connection.id === action.connectionId)
  currentConnections[connectionIndex].tags = action.assignedTags
  currentConnections[connectionIndex].tagsDisplay = action.assignedTagsDisplay
  return updateObj(state, {
    connections: currentConnections,
    loading: false,
    error: false,
  })
}
const activateForm = (state, action) => {
  const currenSettings = { ...state.connectionSettings }
  return updateObj(state, {
    connectionSettings: {
      ...currenSettings,
      activeFormId: action.formId,
    },
    loading: false,
    error: false,
  })
}
const getConnectionTagsSuccess = (state, action) => updateObj(state, {
  connectionTags: action.connectionTags.sort(dynamicSort('value')),
  loading: false,
  error: false,
})
const addConnectionTag = (state, action) => {
  const currenTags = [...state.connectionTags]
  return updateObj(state, {
    connectionTags: [action.connectionTag, ...currenTags].sort(dynamicSort('value')),
    loading: false,
    error: false,
  })
}
const updateConnectionTag = (state, action) => {
  const currentTags = [...state.connectionTags]
  const tagIndex = currentTags.findIndex(tag => tag.id === action.tagId)
  currentTags[tagIndex].value = action.tagValue
  currentTags[tagIndex].display = action.tagValue
  currentTags[tagIndex].color = action.tagColor
  return updateObj(state, {
    connectionTags: currentTags,
    loading: false,
    error: false,
  })
}
const removeConnectionTag = (state, action) => {
  const currentTags = [...state.connectionTags]
  const updatedConnectionTags = currentTags.filter(tag => tag.id !== action.tagId).sort(dynamicSort('value'))
  return updateObj(state, {
    connectionTags: updatedConnectionTags,
    loading: false,
    error: false,
  })
}
const getConnectionSettingsSuccess = (state, action) => updateObj(state, {
  connectionSettings: action.connectionSettings,
  loading: false,
  error: false,
})
const updateEmbedForm = (state, action) => {
  const currenSettings = { ...state.connectionSettings }
  return updateObj(state, {
    connectionSettings: {
      ...currenSettings,
      embedForm: action.embedForm,
    },
    loading: false,
    error: false,
  })
}
const updateConnectionSettings = (state, action) => {
  const currenSettings = { ...state.connectionSettings }
  return updateObj(state, {
    connectionSettings: {
      ...currenSettings,
      ...action.updatedSettings,
    },
    loading: false,
    error: false,
  })
}
const addConnectionSettings = (state, action) => updateObj(state, {
  connectionSettings: action.connectionSettings,
  loading: false,
  error: false,
})
const getConnectionsDataSuccess = (state, action) => {
  let forms = action.connectionForms
  if (action.assignedTags) {
    forms = forms.map(form => {
      const tags = action.assignedTags.find(tag => tag.formId === form.id)
      return {
        ...form,
        tags,
      }
    })
  }
  return updateObj(state, {
    connectionsCount: action.count,
    connections: action.connections,
    connectionSettings: action.connectionSettings,
    connectionTags: action.connectionTags.sort(dynamicSort('value')),
    connectionForms: forms,
    profileId: action.profileId,
    dataLoaded: true,
    loading: false,
    error: false,
  })
}
const connectionProcessFinished = state => updateObj(state, { loading: false })

const connectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CONNECTIONS_REQUEST: return getConnectionsRequest(state)
    case actionTypes.GET_CONNECTIONS_SUCCESS: return getConnectionsSuccess(state, action)
    case actionTypes.GET_CONNECTIONS_FAILURE: return getConnectionsFailure(state)
    case actionTypes.CONNECTION_PROCESS_FINISHED: return connectionProcessFinished(state)
    case actionTypes.ADD_CONNECTION_SUCCESS: return addConnection(state, action)
    case actionTypes.UPDATE_CONNECTION_SUCCESS: return updateConnection(state, action)
    case actionTypes.REMOVE_CONNECTION_SUCCESS: return removeConnection(state, action)
    case actionTypes.GET_CONNECTION_FORMS_SUCCESS: return getConnectionFormsSuccess(state, action)
    case actionTypes.ASSIGN_TAGS_SUCCESS: return assignTagsSuccess(state, action)
    case actionTypes.ASSIGN_CONNECTION_TAGS_SUCCESS: return assignConnectionTagsSuccess(state, action)
    case actionTypes.ACTIVATE_FORM_SUCCESS: return activateForm(state, action)
    case actionTypes.GET_CONNECTION_TAGS_SUCCESS: return getConnectionTagsSuccess(state, action)
    case actionTypes.ADD_CONNECTION_TAG_SUCCESS: return addConnectionTag(state, action)
    case actionTypes.UPDATE_CONNECTION_TAG_SUCCESS: return updateConnectionTag(state, action)
    case actionTypes.REMOVE_CONNECTION_TAG_SUCCESS: return removeConnectionTag(state, action)
    case actionTypes.GET_CONNECTION_SETTINGS_SUCCESS: return getConnectionSettingsSuccess(state, action)
    case actionTypes.GET_CONNECTION_DATA_SUCCESS: return getConnectionsDataSuccess(state, action)
    case actionTypes.ADD_CONNECTION_SETTINGS_SUCCESS: return addConnectionSettings(state, action)
    case actionTypes.UPDATE_CONNECTION_SETTINGS_SUCCESS: return updateConnectionSettings(state, action)
    case actionTypes.UPDATE_EMBED_FORM_SUCCESS: return updateEmbedForm(state, action)
    default: return state
  }
}

export default connectionsReducer
