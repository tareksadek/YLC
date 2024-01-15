import { isAfter, isBefore, isEqual } from 'date-fns'
import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  userId: null,
  parentId: null,
  defaultId: null,
  activeProfileId: null,
  firstName: null,
  lastName: null,
  middleName: null,
  namePrefix: null,
  nameSuffix: null,
  gender: null,
  nickname: null,
  career: null,
  organization: null,
  title: null,
  email: null,
  workPhone: null,
  homePhone: null,
  workFax: null,
  homeFax: null,
  birthday: null,
  note: null,
  address: null,
  marker: null,
  image: null,
  isMaster: null,
  masterId: null,
  masterProfileId: null,
  masterInvitationId: null,
  base64Photo: null,
  logo: null,
  vCardFile: null,
  vCardFileBlob: null,
  urlSuffix: null,
  links: null,
  masterLinks: null,
  socialLinksOrder: null,
  settings: null,
  connections: null,
  followers: null,
  following: null,
  invitations: null,
  invitationCode: null,
  filteredInvitations: null,
  passwordProtected: false,
  clickedNo: 0,
  redirect: null,
  defaultLinksToTheme: false,
  bioVideo: null,
  accountSecret: null,
  teamData: null,
  connectionsCount: 0,
  allConnectionsCount: 0,
  uniqueConnectionsCount: 0,
  allProfilesVisits: 0,
  visits: 0,
  store: null,
  loading: false,
  error: false,
}

const getCardRequest = state => updateObj(state, { loading: true })
const getCardSettings = (state, action) => updateObj(state, {
  userId: action.userId,
  settings: action.settings,
  loading: false,
  error: false,
})
const toggleProfileActivity = state => {
  const currentSettings = { ...state.settings }

  return updateObj(state, {
    settings: { ...currentSettings, active: 'active' in currentSettings ? !currentSettings.active : false },
    loading: false,
    error: false,
  })
}
const changeThemeColor = (state, action) => {
  const currentSettings = { ...state.settings }
  const currentcolor = { ...state.settings.selectedColor }

  return updateObj(state, {
    settings: {
      ...currentSettings,
      selectedColor: {
        ...currentcolor,
        code: action.code,
        name: action.name,
      },
    },
    loading: false,
    error: false,
  })
}
const changeTheme = (state, action) => {
  const currentSettings = { ...state.settings }

  return updateObj(state, {
    settings: {
      ...currentSettings,
      theme: action.theme,
    },
    loading: false,
    error: false,
  })
}
const changeLayout = (state, action) => {
  const currentSettings = { ...state.settings }

  return updateObj(state, {
    settings: {
      ...currentSettings,
      layout: action.layout,
    },
    loading: false,
    error: false,
  })
}
const toggleDefaultLinksToTheme = state => updateObj(state, {
  defaultLinksToTheme: !state.defaultLinksToTheme,
  loading: false,
  error: false,
})
const toggleDrawer = state => {
  const currentSettings = { ...state.settings }

  return updateObj(state, {
    settings: {
      ...currentSettings,
      drawerEnabeled: !state.settings.drawerEnabeled,
    },
    loading: false,
    error: false,
  })
}
const getCardSuccess = (state, action) => updateObj(state, {
  userId: action.userId,
  parentId: action.parentId,
  defaultId: action.defaultId,
  activeProfileId: action.activeProfileId,
  firstName: action.firstName,
  lastName: action.lastName,
  middleName: action.middleName,
  namePrefix: action.namePrefix,
  nameSuffix: action.nameSuffix,
  gender: action.gender,
  nickname: action.nickname,
  career: action.career,
  organization: action.organization,
  title: action.title,
  email: action.email,
  workPhone: action.workPhone,
  homePhone: action.homePhone,
  workFax: action.workFax,
  homeFax: action.homeFax,
  birthday: action.birthday,
  note: action.note,
  address: action.address,
  marker: action.marker,
  image: action.image,
  isMaster: action.isMaster,
  masterId: action.masterId,
  masterProfileId: action.masterProfileId,
  masterInvitationId: action.masterInvitationId,
  base64Photo: action.base64Photo,
  logo: action.logo,
  vCardFile: action.vCardFile,
  vCardFileBlob: action.vCardFileBlob,
  urlSuffix: action.urlSuffix,
  links: action.links,
  masterLinks: action.masterLinks,
  socialLinksOrder: action.socialLinksOrder,
  settings: action.settings,
  connections: action.connections,
  followers: action.followers,
  following: action.following,
  invitations: action.invitations,
  invitationCode: action.invitationCode,
  filteredInvitations: action.invitations,
  passwordProtected: action.passwordProtected,
  clickedNo: action.clickedNo,
  redirect: action.redirect,
  defaultLinksToTheme: action.defaultLinksToTheme,
  bioVideo: action.bioVideo,
  accountSecret: action.accountSecret,
  teamData: action.teamData,
  connectionsCount: action.connectionsCount,
  allConnectionsCount: action.allConnectionsCount,
  uniqueConnectionsCount: action.uniqueConnectionsCount,
  allProfilesVisits: action.allProfilesVisits,
  visits: action.visits,
  store: action.store,
  loading: false,
  error: false,
})
const addConnection = (state, action) => {
  const newConnections = state.connections ? [...state.connections, action.connectionObj] : [action.connectionObj]

  return updateObj(state, {
    connections: newConnections,
    loading: false,
    error: false,
  })
}
const removeConnection = (state, action) => {
  const newConnections = [...state.connections].filter(connection => {
    const storeConnectionDate = connection.addedOn.seconds ? connection.addedOn.toDate() : connection.addedOn
    const selectedConnectionDate = action.addedOn.seconds ? action.addedOn.toDate() : action.addedOn
    return !isEqual(storeConnectionDate, selectedConnectionDate)
  })
  return updateObj(state, {
    connections: newConnections,
    loading: false,
    error: false,
  })
}
const updateConnection = (state, action) => {
  const currentConnections = [
    ...state.connections,
  ]
  const connectionIndex = currentConnections.findIndex(connection => {
    const storeConnectionDate = connection.addedOn.seconds ? connection.addedOn.toDate() : connection.addedOn
    const selectedConnectionDate = action.addedOn.seconds ? action.addedOn.toDate() : action.addedOn
    return isEqual(storeConnectionDate, selectedConnectionDate)
  })
  currentConnections[connectionIndex].firstName = action.firstName
  currentConnections[connectionIndex].lastName = action.lastName
  currentConnections[connectionIndex].email = action.email
  currentConnections[connectionIndex].workPhone = action.workPhone
  currentConnections[connectionIndex].vCardFile = action.vCardFile
  currentConnections[connectionIndex].note = action.note
  currentConnections[connectionIndex].userName = action.userName
  currentConnections[connectionIndex].organization = action.organization
  currentConnections[connectionIndex].title = action.title
  currentConnections[connectionIndex].website = action.website

  return updateObj(state, {
    connections: currentConnections,
    loading: false,
    error: false,
  })
}
const sortConnections = (state, action) => {
  const { sortValue } = action
  const { sortType } = action
  let newConnections = null
  if (state.connections) {
    newConnections = [...state.connections].sort((a, b) => {
      let arg1
      let arg2
      const aDate = a.addedOn.seconds ? a.addedOn.toDate() : a.addedOn
      const bDate = b.addedOn.seconds ? b.addedOn.toDate() : b.addedOn
      const comp1 = sortType === 'date' ? aDate : String(a[sortType]).toLowerCase()
      const comp2 = sortType === 'date' ? bDate : String(b[sortType]).toLowerCase()

      if (sortType === 'date') {
        arg1 = sortValue === 'asc' ? isAfter(comp1, comp2) : isBefore(comp1, comp2)
        arg2 = sortValue === 'asc' ? isAfter(comp2, comp1) : isBefore(comp2, comp1)
      } else {
        arg1 = sortValue === 'asc' ? comp1 > comp2 : comp1 < comp2
        arg2 = sortValue === 'asc' ? comp2 > comp1 : comp2 < comp1
      }

      if (arg1) {
        return 1
      }
      if (arg2) {
        return -1
      }
      return 0
    })
  }
  return updateObj(state, {
    connections: newConnections,
    loading: false,
    error: false,
  })
}
const addFollower = (state, action) => {
  const followers = state.followers ? [...state.followers, action.follower] : [action.follower]

  return updateObj(state, {
    followers,
    loading: false,
    error: false,
  })
}
const removeFollower = (state, action) => {
  const currentFollowers = [...state.followers]
  const updatedFollowers = currentFollowers.filter(follower => follower.userId !== action.followerId)
  return updateObj(state, {
    followers: updatedFollowers,
    loading: false,
    error: false,
  })
}
const sortFollowers = (state, action) => {
  const { sortValue } = action
  const { sortType } = action
  let newFollowers = null
  if (state.followers) {
    newFollowers = [...state.followers].sort((a, b) => {
      let arg1
      let arg2
      const aDate = a.addedOn.seconds ? a.addedOn.toDate() : a.addedOn
      const bDate = b.addedOn.seconds ? b.addedOn.toDate() : b.addedOn
      const comp1 = sortType === 'date' ? aDate : String(a[sortType]).toLowerCase()
      const comp2 = sortType === 'date' ? bDate : String(b[sortType]).toLowerCase()

      if (sortType === 'date') {
        arg1 = sortValue === 'asc' ? isAfter(comp1, comp2) : isBefore(comp1, comp2)
        arg2 = sortValue === 'asc' ? isAfter(comp2, comp1) : isBefore(comp2, comp1)
      } else {
        arg1 = sortValue === 'asc' ? comp1 > comp2 : comp1 < comp2
        arg2 = sortValue === 'asc' ? comp2 > comp1 : comp2 < comp1
      }

      if (arg1) {
        return 1
      }
      if (arg2) {
        return -1
      }
      return 0
    })
  }
  return updateObj(state, {
    followers: newFollowers,
    loading: false,
    error: false,
  })
}
const removeFollowing = (state, action) => {
  const currentFollowings = [...state.following]
  const updatedFollowingss = currentFollowings.filter(following => following.userId !== action.followingId)
  return updateObj(state, {
    following: updatedFollowingss,
    loading: false,
    error: false,
  })
}
const sortFollowings = (state, action) => {
  const { sortValue } = action
  const { sortType } = action
  let newFollowings = null
  if (state.following) {
    newFollowings = [...state.following].sort((a, b) => {
      let arg1
      let arg2
      const aDate = a.addedOn.seconds ? a.addedOn.toDate() : a.addedOn
      const bDate = b.addedOn.seconds ? b.addedOn.toDate() : b.addedOn
      const comp1 = sortType === 'date' ? aDate : String(a[sortType]).toLowerCase()
      const comp2 = sortType === 'date' ? bDate : String(b[sortType]).toLowerCase()

      if (sortType === 'date') {
        arg1 = sortValue === 'asc' ? isAfter(comp1, comp2) : isBefore(comp1, comp2)
        arg2 = sortValue === 'asc' ? isAfter(comp2, comp1) : isBefore(comp2, comp1)
      } else {
        arg1 = sortValue === 'asc' ? comp1 > comp2 : comp1 < comp2
        arg2 = sortValue === 'asc' ? comp2 > comp1 : comp2 < comp1
      }

      if (arg1) {
        return 1
      }
      if (arg2) {
        return -1
      }
      return 0
    })
  }
  return updateObj(state, {
    following: newFollowings,
    loading: false,
    error: false,
  })
}
const filterInvitations = (state, action) => {
  let newInvitations = null
  const { filterType } = action
  if (state.invitations && filterType === 'available') {
    newInvitations = [...state.invitations].filter(invitation => invitation.usedBy === null)
  } else if (state.invitations && filterType === 'used') {
    newInvitations = [...state.invitations].filter(invitation => invitation.usedBy !== null)
  } else {
    newInvitations = [...state.invitations]
  }
  return updateObj(state, {
    filteredInvitations: newInvitations,
    loading: false,
    error: false,
  })
}
const getCardFailure = state => updateObj(state, { loading: false, error: true })
const getCardProtected = (state, action) => updateObj(state, {
  userId: action.userId,
  firstName: action.firstName,
  lastName: action.lastName,
  middleName: action.middleName,
  namePrefix: action.namePrefix,
  nameSuffix: action.nameSuffix,
  image: action.image,
  base64Photo: action.base64Photo,
  redirect: action.redirect,
  settings: action.settings,
  loading: false,
  error: true,
  passwordProtected: true,
})
const redirectCardLink = (state, action) => updateObj(state, {
  redirect: action.isChecked ? action.link : null,
  loading: false,
  error: false,
})
const updateCard = (state, action) => updateObj(state, {
  ...action.newData,
  loading: false,
  error: false,
})
const clearCard = state => state

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CARD_REQUEST: return getCardRequest(state)
    case actionTypes.GET_CARD_SETTINGS: return getCardSettings(state, action)
    case actionTypes.GET_CARD_SUCCESS: return getCardSuccess(state, action)
    case actionTypes.GET_CARD_FAILURE: return getCardFailure(state)
    case actionTypes.TOGGLE_PROFILE_ACTIVITY: return toggleProfileActivity(state)
    case actionTypes.CHANGE_THEME_COLOR: return changeThemeColor(state, action)
    case actionTypes.CHANGE_THEME: return changeTheme(state, action)
    case actionTypes.CHANGE_LAYOUT: return changeLayout(state, action)
    case actionTypes.DEFAULT_LINKS: return toggleDefaultLinksToTheme(state)
    case actionTypes.TOGGLE_DRAWER: return toggleDrawer(state)
    case actionTypes.SORT_CONNECTIONS: return sortConnections(state, action)
    case actionTypes.ADD_CONNECTION: return addConnection(state, action)
    case actionTypes.REMOVE_CONNECTION: return removeConnection(state, action)
    case actionTypes.UPDATE_CONNECTION: return updateConnection(state, action)
    case actionTypes.SORT_FOLLOWERS: return sortFollowers(state, action)
    case actionTypes.SORT_FOLLOWINGS: return sortFollowings(state, action)
    case actionTypes.FILTER_INVITATIONS: return filterInvitations(state, action)
    case actionTypes.GET_CARD_PROTECTED: return getCardProtected(state, action)
    case actionTypes.REDIRECT_CARD_LINK: return redirectCardLink(state, action)
    case actionTypes.ADD_FOLLOWER: return addFollower(state, action)
    case actionTypes.REMOVE_FOLLOWER: return removeFollower(state, action)
    case actionTypes.REMOVE_FOLLOWING: return removeFollowing(state, action)
    case actionTypes.UPDATE_CARD: return updateCard(state, action)
    case actionTypes.CLEAR_CARD: return clearCard(initialState)
    default: return state
  }
}

export default cardReducer
