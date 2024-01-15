import * as actionTypes from './actionTypes'
import {
  getCardBySuffix,
  getCardById,
  // getMasterCardByInvitation,
} from '../../API/cards'
import { getInvitationByCode } from '../../API/invitations'
// import { getSubscribedUser } from '../../API/subscriptions'
// import { loadProfiles } from './profile'
// import { getFirebaseStorage } from '../../API/firebase'

export const getCardRequest = () => ({
  type: actionTypes.GET_CARD_REQUEST,
})
export const getCardSettings = card => ({
  type: actionTypes.GET_CARD_SETTINGS,
  userId: card.userId || null,
  settings: card.settings || null,
})
export const getCardSuccess = (card, vCardFileBlob) => ({
  type: actionTypes.GET_CARD_SUCCESS,
  userId: card.userId || null,
  parentId: card.parentId || null,
  defaultId: card.defaultId || null,
  activeProfileId: card.activeProfileId || null,
  firstName: card.firstName || null,
  lastName: card.lastName || null,
  middleName: card.middleName || null,
  namePrefix: card.namePrefix || null,
  nameSuffix: card.nameSuffix || null,
  gender: card.gender || null,
  nickname: card.nickname || null,
  career: card.career || null,
  organization: card.organization || null,
  title: card.title || null,
  email: card.email || null,
  workPhone: card.workPhone || null,
  homePhone: card.homePhone || null,
  workFax: card.workFax || null,
  homeFax: card.homeFax || null,
  birthday: card.birthday || null,
  note: card.note || null,
  address: card.address || null,
  marker: card.marker || null,
  image: card.image || null,
  isMaster: card.isMaster || false,
  masterId: card.masterId || null,
  masterProfileId: card.masterProfileId || null,
  masterInvitationId: card.masterInvitationId || null,
  base64Photo: card.base64Photo || null,
  logo: card.logo || null,
  vCardFile: card.vCardFile || null,
  vCardFileBlob: vCardFileBlob || null,
  urlSuffix: card.urlSuffix || null,
  links: card.links || null,
  masterLinks: card.masterLinks || null,
  socialLinksOrder: card.socialLinksOrder || null,
  settings: card.settings || null,
  connections: card.connections || null,
  followers: card.followers || null,
  following: card.following || null,
  invitations: (card.childInvitations && card.childInvitations.length > 0) ? [...card.childInvitations, {
    code: card.invitationCode,
    used: true,
    usedBy: card.userId,
    usedOn: null,
  }] : null,
  invitationCode: card.invitationData.code || null,
  filteredInvitations: card.childInvitations || null,
  passwordProtected: card.passwordProtected || false,
  clickedNo: card.clickedNo || 0,
  redirect: card.redirect || null,
  defaultLinksToTheme: card.defaultLinksToTheme || false,
  bioVideo: card.bioVideo || null,
  accountSecret: card.accountSecret || null,
  teamData: card.teamData || null,
  connectionsCount: card.connectionsCount || 0,
  allConnectionsCount: card.allConnectionsCount || 0,
  uniqueConnectionsCount: card.uniqueConnectionsCount || 0,
  allProfilesVisits: card.allProfilesVisits || 0,
  visits: card.visits || 0,
  store: card.store || null,
})

export const getCardFailure = error => ({
  type: actionTypes.GET_CARD_FAILURE,
  error,
})

export const startToggleProfileActivity = () => ({
  type: actionTypes.TOGGLE_PROFILE_ACTIVITY,
})

export const startChangeThemeColor = (code, name) => ({
  type: actionTypes.CHANGE_THEME_COLOR,
  code,
  name,
})

export const startChangeTheme = theme => ({
  type: actionTypes.CHANGE_THEME,
  theme,
})

export const startChangeLayout = layout => ({
  type: actionTypes.CHANGE_LAYOUT,
  layout,
})

export const defaultLinksToTheme = () => ({
  type: actionTypes.DEFAULT_LINKS,
})

export const toggleBottomDrawer = () => ({
  type: actionTypes.TOGGLE_DRAWER,
})

export const startSortConnections = (sortValue, sortType) => ({
  type: actionTypes.SORT_CONNECTIONS,
  sortValue,
  sortType,
})

export const startAddConnection = connectionObj => ({
  type: actionTypes.ADD_CONNECTION,
  connectionObj,
})

export const startRemoveConnection = addedOn => ({
  type: actionTypes.REMOVE_CONNECTION,
  addedOn,
})

export const startUpdateConnection = (addedOn, connectionData) => ({
  type: actionTypes.UPDATE_CONNECTION,
  addedOn,
  firstName: connectionData.firstName,
  lastName: connectionData.lastName,
  email: connectionData.email,
  workPhone: connectionData.workPhone,
  vCardFile: connectionData.vCardFile,
  note: connectionData.note,
  userName: connectionData.userName,
  organization: connectionData.organization,
  title: connectionData.title,
  website: connectionData.website,
})

export const startSortFollowers = (sortValue, sortType) => ({
  type: actionTypes.SORT_FOLLOWERS,
  sortValue,
  sortType,
})

export const startSortFollowings = (sortValue, sortType) => ({
  type: actionTypes.SORT_FOLLOWINGS,
  sortValue,
  sortType,
})

export const startAddFollower = follower => ({
  type: actionTypes.ADD_FOLLOWER,
  follower,
})

export const startRemoveFollower = followerId => ({
  type: actionTypes.REMOVE_FOLLOWER,
  followerId,
})

export const startRemoveFollowing = followingId => ({
  type: actionTypes.REMOVE_FOLLOWING,
  followingId,
})

export const startFilterInvitation = filterType => ({
  type: actionTypes.FILTER_INVITATIONS,
  filterType,
})

export const getCardProtected = card => ({
  type: actionTypes.GET_CARD_PROTECTED,
  userId: card.userId || null,
  defaultId: card.defaultId || null,
  firstName: card.firstName || null,
  lastName: card.lastName || null,
  middleName: card.middleName || null,
  namePrefix: card.namePrefix || null,
  nameSuffix: card.nameSuffix || null,
  redirect: card.redirect || null,
  base64Photo: card.base64Photo || null,
  settings: card.settings || null,
  // imageFile,
})

export const redirectProfileLink = (isChecked, link) => ({
  type: actionTypes.REDIRECT_CARD_LINK,
  link,
  isChecked,
})

export const clearCard = () => ({
  type: actionTypes.CLEAR_CARD,
})

export const updateCardData = newData => ({
  type: actionTypes.UPDATE_CARD,
  newData,
})

export const loadCard = (suffix, password, isAuthenticated, authStatus) => async dispatch => {
  // let imageFile = null
  // let vCardFileBlob = null
  // let masterCard
  try {
    const card = await getCardBySuffix(suffix)
    let masterCard
    if (!card.isMaster) {
      if (card.masterInvitationId) {
        const { usedBy } = await getInvitationByCode(card.masterInvitationId)
        masterCard = await getCardById(usedBy)
      } else if (card.masterProfileId) {
        masterCard = await getCardById(card.masterProfileId)
      }
      if (masterCard) {
        card.career = masterCard.career || null
        card.organization = masterCard.organization
        card.address = masterCard.address
        card.marker = masterCard.marker
        card.image = masterCard.image
        if (card.logo) {
          card.logo.style = masterCard.logo ? masterCard.logo.style || 'circle' : null
        }
        card.links = masterCard.links
        card.socialLinksOrder = masterCard.socialLinksOrder
        card.settings = masterCard.settings
        card.defaultLinksToTheme = masterCard.defaultLinksToTheme
        card.bioVideo = masterCard.bioVideo
        card.store = masterCard.store
      }
    }
    // const subscriber = await getSubscribedUser(card.defaultId)
    // const cardProfiles = card.profiles && card.profiles.length > 0 ? card.profiles : null
    // const activeProfileId = card.activeProfileId || null
    // const subscriberStatus = subscriber ? subscriber[0].status : null
    // const isPro = subscriber ? subscriberStatus === 'active' || subscriberStatus === 'trialing' : false
    // const isTheLoggedinUser = isAuthenticated && isAuthenticated.uid === card.defaultId

    // console.log(card);
    // console.log(isAuthenticated);

    // if (cardProfiles && activeProfileId && isPro) {
    //   // console.log(activeProfileId);
    //   card = await getCardById(activeProfileId)
    //   card.userId = activeProfileId
    // }

    // if (!isPro) {
    //   card.settings.layout = 'social'
    //   card.passwordProtected = false
    //   card.settings.profilePasswordActive = false
    //   card.settings.active = true
    //   card.redirect = null
    //   card.marker = null
    // }

    // if (card.masterId) {
    //   masterCard = await getMasterCardByInvitation(card.masterId)
    //   card = {
    //     ...card,
    //     ...masterCard.teamData,
    //   }
    // }

    // if (card.image) {
    //   imageFile = await getFirebaseStorage().ref(`profile/${card.image}`).getDownloadURL()
    // }
    // if (card.vCardFile) {
    //   vCardFileBlob = await getFirebaseStorage().ref(`card/${card.vCardFile}`).getDownloadURL()
    // }
    if (!card) {
      dispatch(getCardFailure({ message: 'The requested Profile doesn\'t exist.' }))
      return
    }

    if (authStatus !== 'processing' && authStatus !== 'prelogin' && authStatus !== 'starting') {
      dispatch(getCardRequest())
      // if (cardProfiles && isAuthenticated && isTheLoggedinUser) {
      //   dispatch(loadProfiles(card.defaultId))
      // }
      const { profilePasswordActive, profilePassword } = card.settings
      if (!isAuthenticated && password && profilePasswordActive && password === profilePassword) {
        dispatch(getCardSuccess(card, null))
        window.localStorage.setItem('profilePass', password)
        return
      }

      if (isAuthenticated && card.userId !== isAuthenticated.uid && password && profilePasswordActive && password === profilePassword) {
        dispatch(getCardSuccess(card, null))
        window.localStorage.setItem('profilePass', password)
        return
      }

      if (!isAuthenticated && password && profilePasswordActive && password !== profilePassword) {
        dispatch(getCardFailure({ message: 'Wrong profile key' }))
        window.localStorage.setItem('profilePass', null)
        return
      }

      if (isAuthenticated && card.userId !== isAuthenticated.uid && password && profilePasswordActive && password !== profilePassword) {
        dispatch(getCardFailure({ message: 'Wrong profile key' }))
        window.localStorage.setItem('profilePass', null)
        return
      }

      if (!isAuthenticated && !password && profilePasswordActive && profilePassword !== '') {
        dispatch(getCardProtected(card))
        return
      }

      if (isAuthenticated && card.userId !== isAuthenticated.uid && !password && profilePasswordActive && profilePassword !== '') {
        dispatch(getCardProtected(card))
        return
      }
      dispatch(getCardSuccess(card, null))
    }
  } catch (err) {
    dispatch(getCardFailure(err && { message: 'Weak or no internet connection.' }))
  }
}

export const loadCardByUserId = (userId, isMaster) => async dispatch => {
  dispatch(getCardRequest())
  // let imageFile = null
  const vCardFileBlob = null
  try {
    const card = await getCardById(userId)
    // const cardProfiles = card.profiles && card.profiles.length > 0 ? card.profiles : null
    // const activeProfileId = card.activeProfileId || null

    // if (cardProfiles && activeProfileId && isPro) {
    //   card = await getCardById(activeProfileId)
    //   card.userId = activeProfileId
    // }
    if (!isMaster) {
      let masterCard
      if (card.masterInvitationId) {
        const { usedBy } = await getInvitationByCode(card.masterInvitationId)
        masterCard = await getCardById(usedBy)
      } else if (card.masterProfileId) {
        masterCard = await getCardById(card.masterProfileId)
      }
      if (masterCard) {
        card.career = masterCard.career
        card.organization = masterCard.organization
        card.address = masterCard.address
        card.marker = masterCard.marker
        card.image = masterCard.image
        if (card.logo) {
          card.logo.style = masterCard.logo ? masterCard.logo.style || 'circle' : null
        }
        card.links = masterCard.links
        card.socialLinksOrder = masterCard.socialLinksOrder
        card.settings = masterCard.settings
        card.redirect = masterCard.redirect
        card.defaultLinksToTheme = masterCard.defaultLinksToTheme
        card.bioVideo = masterCard.bioVideo
        card.store = masterCard.store
      }
    }

    // if (cardProfiles) {
    //   dispatch(loadProfiles(userId))
    // }
    // if (card.image) {
    //   imageFile = await getFirebaseStorage().ref(`profile/${card.image}`).getDownloadURL()
    // }
    // if (card.vCardFile) {
    //   vCardFileBlob = await getFirebaseStorage().ref(`card/${card.vCardFile}`).getDownloadURL()
    // }
    dispatch(getCardSuccess(card, vCardFileBlob))
    return card
  } catch (err) {
    dispatch(getCardFailure(err))
  }
  return true
}

export const loadCardSettingsByUserId = userId => async dispatch => {
  dispatch(getCardRequest())
  try {
    const card = await getCardById(userId)
    dispatch(getCardSettings(card))
  } catch (err) {
    dispatch(getCardFailure(err))
  }
}

export const toggleProfileActivity = () => async dispatch => {
  dispatch(startToggleProfileActivity())
}

export const changeThemeColor = (code, name) => async dispatch => {
  dispatch(startChangeThemeColor(code, name))
}

export const changeTheme = theme => async dispatch => {
  dispatch(startChangeTheme(theme))
}

export const changeLayout = layout => async dispatch => {
  dispatch(startChangeLayout(layout))
}

export const defaultLinks = () => dispatch => {
  dispatch(defaultLinksToTheme())
}

export const toggleDrawer = () => dispatch => {
  dispatch(toggleBottomDrawer())
}

export const sortConnections = (sortValue, sortType) => async dispatch => {
  dispatch(getCardRequest())
  dispatch(startSortConnections(sortValue, sortType))
}

export const addConnection = connectionObj => async dispatch => {
  dispatch(getCardRequest())
  dispatch(startAddConnection(connectionObj))
}

export const removeConnection = addedOn => async dispatch => {
  dispatch(getCardRequest())
  dispatch(startRemoveConnection(addedOn))
}

export const updateConnection = (addedOn, connectionData) => async dispatch => {
  dispatch(getCardRequest())
  dispatch(startUpdateConnection(addedOn, connectionData))
}

export const sortFollowers = (sortValue, sortType) => async dispatch => {
  dispatch(getCardRequest())
  dispatch(startSortFollowers(sortValue, sortType))
}

export const sortFollowings = (sortValue, sortType) => async dispatch => {
  dispatch(getCardRequest())
  dispatch(startSortFollowings(sortValue, sortType))
}

export const addFollower = follower => async dispatch => {
  dispatch(startAddFollower(follower))
}

export const removeFollower = followerId => async dispatch => {
  dispatch(startRemoveFollower(followerId))
}

export const removeFollowing = followingId => async dispatch => {
  dispatch(startRemoveFollowing(followingId))
}

export const filterInvitations = filterType => async dispatch => {
  dispatch(getCardRequest())
  dispatch(startFilterInvitation(filterType))
}

export const redirectCardLink = (isChecked, link) => dispatch => {
  dispatch(redirectProfileLink(isChecked, link))
}

export const updateCard = newData => async dispatch => {
  dispatch(updateCardData(newData))
}
