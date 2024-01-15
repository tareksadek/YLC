import * as actionTypes from './actionTypes'

export const getLinksRequest = () => ({
  type: actionTypes.GET_LINKS_REQUEST,
})

export const getLinksSuccess = (links, redirect, defaultLinksToTheme) => ({
  type: actionTypes.GET_LINKS_SUCCESS,
  linksChanged: false,
  links,
  redirect: redirect || null,
  defaultLinksToTheme: defaultLinksToTheme || false,
})

export const getLinksFailure = error => ({
  type: actionTypes.GET_LINKS_FAILURE,
  error,
})

export const addLinkToProfile = (link, linkType) => ({
  type: actionTypes.ADD_LINK,
  link,
  linkType: linkType || null,
})

export const addLinkFinished = () => ({
  type: actionTypes.ADD_LINK_FINISHED,
})

export const updateProfileLink = (platform, link, validationRules) => ({
  type: actionTypes.UPDATE_LINK,
  touched: true,
  validationRules,
  platform,
  link,
})

export const toggleProfileLink = platform => ({
  type: actionTypes.TOGGLE_LINK,
  platform,
})

export const deactivateProfileLink = platform => ({
  type: actionTypes.DEACTIVATE_LINK,
  platform,
})

export const redirectProfileLink = (isChecked, link) => ({
  type: actionTypes.REDIRECT_LINK,
  link,
  isChecked,
})

export const removeProfileLink = key => ({
  type: actionTypes.REMOVE_LINK,
  key,
})

export const startRemoveMenuLink = key => ({
  type: actionTypes.REMOVE_MENU_LINK,
  key,
})

export const sortCustom = (oldIndex, newIndex) => ({
  type: actionTypes.SORT_CUSTOM_LINKS,
  oldIndex,
  newIndex,
})

export const sortMenu = (oldIndex, newIndex) => ({
  type: actionTypes.SORT_MENU_LINKS,
  oldIndex,
  newIndex,
})

export const sortSocialLinks = () => ({
  type: actionTypes.SORT_SOCIAL_LINKS,
})

export const linksSaved = () => ({
  type: actionTypes.LINKS_SAVED,
})

export const clearLinks = () => ({
  type: actionTypes.CLEAR_LINKS,
})

export const sortCustomLinks = (oldIndex, newIndex) => dispatch => {
  dispatch(sortCustom(oldIndex, newIndex))
}

export const sortMenuLinks = (oldIndex, newIndex) => dispatch => {
  dispatch(sortMenu(oldIndex, newIndex))
}

export const addLink = link => dispatch => {
  dispatch(getLinksRequest())
  dispatch(addLinkToProfile(link))
  dispatch(addLinkFinished())
}

export const updateLink = (platform, link, validationRules) => dispatch => {
  dispatch(getLinksRequest())
  dispatch(updateProfileLink(platform, link, validationRules))
  dispatch(addLinkFinished())
}

export const toggleLink = platform => dispatch => {
  dispatch(getLinksRequest())
  dispatch(toggleProfileLink(platform))
  dispatch(addLinkFinished())
}

export const deactivateLink = platform => dispatch => {
  dispatch(getLinksRequest())
  dispatch(deactivateProfileLink(platform))
  dispatch(addLinkFinished())
}

export const redirectLink = (isChecked, link) => dispatch => {
  dispatch(getLinksRequest())
  dispatch(redirectProfileLink(isChecked, link))
  dispatch(addLinkFinished())
}

export const removeLink = key => dispatch => {
  dispatch(getLinksRequest())
  dispatch(removeProfileLink(key))
  dispatch(addLinkFinished())
}

export const removeMenuLink = key => dispatch => {
  dispatch(getLinksRequest())
  dispatch(startRemoveMenuLink(key))
  dispatch(addLinkFinished())
}

export const loadLinks = (links, redirect, defaultToTheme) => dispatch => {
  dispatch(getLinksRequest())
  dispatch(getLinksSuccess(links, redirect, defaultToTheme))
}
