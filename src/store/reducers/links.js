import arrayMove from 'array-move'
import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'
import { validityCheck } from '../../utilities/form'

const initialState = {
  links: null,
  linksValid: false,
  redirect: null,
  defaultLinksToTheme: false,
  changed: false,
  loading: false,
  error: false,
}

const getLinksRequest = state => updateObj(state, { loading: true })
const getLinksSuccess = (state, action) => {
  const linksObj = action.links.reduce((obj, val) => {
    const valx = val
    valx.saved = true
    valx.originalLink = valx.link
    valx.originalActive = valx.active
    const linkObj = obj
    const key = valx.platform === 'custom' || valx.platform === 'menu' ? valx.platform : 'social'
    if (!obj[key]) {
      linkObj[key] = []
    }
    linkObj[key].push(valx)
    return linkObj
  }, {})

  return updateObj(state, {
    links: linksObj,
    linksChanged: action.linksChanged,
    redirect: action.redirect,
    defaultLinksToTheme: action.defaultLinksToTheme,
    loading: false,
    error: false,
  })
}
const getLinksFailure = (state, action) => updateObj(state, {
  loading: false,
  error: action.error,
})
const addLink = (state, action) => {
  let customLinks
  let menuLinks
  let socialLinks
  if (state.links && state.links.custom) {
    customLinks = action.link.platform === 'custom' ? [...state.links.custom, action.link] : [...state.links.custom]
  } else {
    customLinks = action.link.platform === 'custom' ? [action.link] : []
  }
  if (state.links && state.links.menu) {
    menuLinks = action.link.platform === 'menu' ? [...state.links.menu, action.link] : [...state.links.menu]
  } else {
    menuLinks = action.link.platform === 'menu' ? [action.link] : []
  }
  if (state.links && state.links.social) {
    socialLinks = action.link.platform !== 'custom' && action.link.platform !== 'menu' ? [...state.links.social, action.link] : [...state.links.social]
  } else {
    socialLinks = action.link.platform !== 'custom' && action.link.platform !== 'menu' ? [action.link] : []
  }
  return updateObj(state, {
    links: {
      ...state.links,
      custom: customLinks,
      menu: menuLinks,
      social: socialLinks,
    },
    linksValid: action.linkType ? action.link.platform === action.linkType : action.link.platform === 'custom',
    changed: true,
    loading: false,
    error: false,
  })
}
const addLinkFinished = state => updateObj(state, { loading: false })
const updateLink = (state, action) => {
  const currenLinks = {
    ...state.links,
    social: [...state.links.social],
  }
  const linkValid = validityCheck(action.link, action.validationRules)
  const updatedLinks = currenLinks.social.map(link => {
    const returnValue = { ...link }
    if (link.platform === action.platform) {
      returnValue.link = action.link
      returnValue.touched = action.touched
      returnValue.valid = linkValid.isValid
      returnValue.errorMessage = linkValid.errorMessage
    }
    return returnValue
  })

  return updateObj(state, {
    links: {
      custom: state.links.custom ? [...state.links.custom] : [],
      menu: state.links.menu ? [...state.links.menu] : [],
      social: updatedLinks,
    },
    linksValid: linkValid.isValid,
    changed: true,
    loading: false,
    error: false,
  })
}
const toggleLink = (state, action) => {
  const toggledLinkIndex = [...state.links.social].findIndex(link => link.platform === action.platform)
  const socialLinks = [...state.links.social]
  const toggledLink = socialLinks[toggledLinkIndex]
  socialLinks[toggledLinkIndex].active = !toggledLink.active

  return updateObj(state, {
    links: {
      ...state.links,
      social: socialLinks,
    },
    linksValid: true,
    changed: true,
    loading: false,
    error: false,
  })
}
const deactivateLink = (state, action) => {
  const toggledLinkIndex = [...state.links.social].findIndex(link => link.platform === action.platform)
  const socialLinks = [...state.links.social]
  if (toggledLinkIndex > -1) {
    socialLinks[toggledLinkIndex].active = false
  }

  return updateObj(state, {
    links: {
      ...state.links,
      social: socialLinks,
    },
    linksValid: true,
    changed: true,
    loading: false,
    error: false,
  })
}
const redirectLink = (state, action) => updateObj(state, {
  redirect: action.isChecked ? action.link : null,
  linksValid: true,
  changed: true,
  loading: false,
  error: false,
})
const removeLink = (state, action) => {
  const currenLinks = state.links.custom ? [...state.links.custom] : null
  const updatedLinks = currenLinks ? currenLinks.filter(link => link.key !== action.key) : null
  return updateObj(state, {
    links: {
      ...state.links,
      custom: updatedLinks,
    },
    changed: true,
    loading: false,
    error: false,
  })
}
const removeMenuLink = (state, action) => {
  const currenLinks = [...state.links.menu]
  const updatedLinks = currenLinks.filter(link => link.key !== action.key)
  return updateObj(state, {
    links: {
      ...state.links,
      menu: updatedLinks,
    },
    changed: true,
    loading: false,
    error: false,
  })
}
const sortCustomLinks = (state, action) => {
  const customLinks = [...state.links.custom]
  return updateObj(state, {
    links: {
      ...state.links,
      custom: arrayMove(customLinks, action.oldIndex, action.newIndex),
    },
    changed: true,
  })
}
const sortMenuLinks = (state, action) => {
  const menuLinks = [...state.links.menu]
  return updateObj(state, {
    links: {
      ...state.links,
      menu: arrayMove(menuLinks, action.oldIndex, action.newIndex),
    },
    changed: true,
  })
}
const sortSocialLinks = state => updateObj(state, { changed: true })
const linksSaved = state => updateObj(state, { changed: false })
const clearLinks = state => state

const linksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LINKS_REQUEST: return getLinksRequest(state)
    case actionTypes.GET_LINKS_SUCCESS: return getLinksSuccess(state, action)
    case actionTypes.GET_LINKS_FAILURE: return getLinksFailure(state, action)
    case actionTypes.ADD_LINK: return addLink(state, action)
    case actionTypes.ADD_LINK_FINISHED: return addLinkFinished(state)
    case actionTypes.UPDATE_LINK: return updateLink(state, action)
    case actionTypes.TOGGLE_LINK: return toggleLink(state, action)
    case actionTypes.DEACTIVATE_LINK: return deactivateLink(state, action)
    case actionTypes.REDIRECT_LINK: return redirectLink(state, action)
    case actionTypes.REMOVE_LINK: return removeLink(state, action)
    case actionTypes.REMOVE_MENU_LINK: return removeMenuLink(state, action)
    case actionTypes.SORT_CUSTOM_LINKS: return sortCustomLinks(state, action)
    case actionTypes.SORT_MENU_LINKS: return sortMenuLinks(state, action)
    case actionTypes.SORT_SOCIAL_LINKS: return sortSocialLinks(state)
    case actionTypes.LINKS_SAVED: return linksSaved(state)
    case actionTypes.CLEAR_LINKS: return clearLinks(initialState)
    default: return state
  }
}

export default linksReducer
