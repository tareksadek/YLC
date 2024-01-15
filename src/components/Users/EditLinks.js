import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import arrayMove from 'array-move'

import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'
import ProfileLinks from './ProfileLinks'
import RedirectProfile from '../Cards/EditCard/RedirectProfile'

import {
  getCardById, updateCard,
} from '../../API/cards'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { socialPlatforms } from '../../utilities/appVars'

import { layoutStyles } from '../../theme/layout'
import { editProfileStyles } from '../../containers/EditProfile/styles'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const EditLinks = ({
  closeDialog, dialogOpen, onSetNotification, userId,
}) => {
  const color = useColor()
  const classes = editProfileStyles()
  const layoutClasses = layoutStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile

  const [formTouched, setFormTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.updatingProfileLinks)
  const [socialLinks, setSocialLinks] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [socialLinksSorted, setSocialLinksSorted] = useState(false)
  const [customLinksSorted, setCustomLinksSorted] = useState(false)
  const [links, setLinks] = useState(null)
  const [redirect, setRedirect] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    let mounted = true

    if (mounted && userId) {
      (async () => {
        try {
          setLoading(true)
          const data = await getCardById(userId)
          setUserInfo(data)
          if (data.links) {
            const linksObj = data.links.reduce((obj, val) => {
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
            setLinks(linksObj)
          }
          if (data.redirect) {
            setRedirect(data.redirect)
          }
          if (data.socialLinksOrder) {
            const allPlatforms = data.socialLinksOrder.concat(socialPlatforms.filter(platform => data.socialLinksOrder.map(link => link.platform).indexOf(platform.platform) < 0))
            setSocialLinks(allPlatforms)
          } else {
            setSocialLinks(socialPlatforms)
          }
          setLoading(false)
        } catch (err) {
          throw new Error(err)
        }
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const processSocialLinks = link => {
    const data = { ...userInfo }
    const profileDataLinks = data.links ? [...data.links] : []
    const newLink = { ...link }
    newLink.originallyActive = newLink.active
    const linkIndex = data.links ? data.links.findIndex(profileLink => profileLink.platform === link.platform) : -1

    let newLinks
    if (linkIndex === 0 || linkIndex > -1) {
      profileDataLinks[linkIndex] = newLink
      newLinks = [...profileDataLinks]
    } else {
      newLinks = [...profileDataLinks, newLink]
    }
    return newLinks
  }

  const updateSocialLinks = async (e, link) => {
    e.preventDefault()
    setLoading(true)
    const data = { ...userInfo }
    const newLinks = processSocialLinks(link)

    const cardDetails = {
      ...data,
      links: newLinks,
    }

    try {
      setLoadingMessage(pageStatics.messages.loading.updatingLinks)

      await updateCard(userId, cardDetails)
      setUserInfo(prevState => ({
        prevState,
        links: newLinks,
      }))

      setFormTouched(false)
      setLoading(false)

      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksUpdateSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksUpdateError,
        type: 'error',
      })
    }
  }

  const addCustomLink = async (e, customLink) => {
    e.preventDefault()
    setLoading(true)
    setFormTouched(true)
    const data = { ...userInfo }
    const cardLinks = data.links && data.links.length > 0 ? data.links.filter(link => link.link !== '' && link.link !== 'http://' && link.link !== 'https://') : null
    const cardDetails = {
      ...data,
      links: cardLinks ? [...cardLinks, { ...customLink }] : [{ ...customLink }],
    }

    try {
      setLoadingMessage(pageStatics.messages.loading.addingLink)

      await updateCard(userId, cardDetails)
      setUserInfo(prevState => ({
        ...prevState,
        links: cardLinks ? [...cardLinks, customLink] : [customLink],
      }))

      setFormTouched(false)
      setLoading(false)

      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksUpdateSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksUpdateError,
        type: 'error',
      })
    }
  }

  const removeLink = key => {
    const currenLinks = links.custom ? [...links.custom] : null
    const updatedLinks = currenLinks ? currenLinks.filter(link => link.key !== key) : null
    setLinks(prevState => ({
      ...prevState,
      custom: updatedLinks,
    }))
  }

  const deleteCustomLink = async (e, key) => {
    if (e) { e.preventDefault() }
    const confirmBox = window.confirm(pageStatics.messages.notifications.deleteLinkPrompt)
    if (confirmBox === true) {
      setFormTouched(true)
      setLoadingMessage(pageStatics.messages.loading.deletingProfileLinks)
      setLoading(true)
      const data = { ...userInfo }
      // const teamLinks = data.teamData && data.teamData.links ? [...data.teamData.links] : []
      const allCardLinks = data.links && data.links.length > 0 ? data.links.filter(link => link.link !== '' && link.link !== 'http://' && link.link !== 'https://') : null
      const cardLinks = allCardLinks.filter(link => link.key !== key)
      const cardDetails = {
        ...data,
        links: cardLinks,
      }

      try {
        await updateCard(userId, cardDetails)
        setUserInfo(prevState => ({
          ...prevState,
          links: cardLinks,
        }))
        removeLink(key)

        setFormTouched(false)
        setLoading(false)

        onSetNotification({
          message: pageStatics.messages.notifications.profileLinkDeletedSuccess,
          type: 'success',
        })
      } catch (err) {
        onSetNotification({
          message: pageStatics.messages.notifications.profileLinkDeletedError,
          type: 'error',
        })
      }
    }
  }

  const updateSortedSocialLinksHandler = async e => {
    if (e) { e.preventDefault() }
    setLoading(true)
    const data = { ...userInfo }
    const cardDetails = {
      ...data,
      socialLinksOrder: socialLinks,
    }
    // if (isMaster) {
    //   cardDetails.teamData = {
    //     ...data.teamData,
    //     socialLinksOrder: socialLinks,
    //   }
    // }
    try {
      setLoadingMessage(pageStatics.messages.loading.sortingLinks)
      await updateCard(userId, cardDetails)
      setUserInfo(prevState => ({
        ...prevState,
        socialLinksOrder: socialLinks,
      }))

      setFormTouched(false)
      setSocialLinksSorted(false)
      setLoading(false)

      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksSortSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksSortError,
        type: 'error',
      })
    }
  }

  const socialLinksSort = (oldIndex, newIndex) => {
    if (oldIndex !== newIndex) {
      setFormTouched(true)
      setSocialLinksSorted(true)
      setSocialLinks(arrayMove(socialLinks, oldIndex, newIndex))
      // onSortSocialLinks()
    }
  }

  const updateSortedCustomLinksHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const data = { ...userInfo }
    const cardLinks = data.links && data.links.length > 0 ? data.links.filter(link => link.link !== '' && link.link !== 'http://' && link.link !== 'https://') : null
    const cardSocialLinks = cardLinks ? cardLinks.filter(link => link.platform !== 'custom') : null
    const currentCustomLinks = [...links.custom]
    const allLinks = [...cardSocialLinks, ...currentCustomLinks]
    const cardDetails = {
      ...data,
      links: allLinks,
    }

    try {
      setLoadingMessage(pageStatics.messages.loading.sortingLinks)
      await updateCard(userId, cardDetails)
      setUserInfo(prevState => ({
        ...prevState,
        links: allLinks,
      }))

      setFormTouched(false)
      setCustomLinksSorted(false)
      setLoading(false)

      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksSortSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksSortError,
        type: 'error',
      })
    }
  }

  const sortCustomLinks = (oldIndex, newIndex) => {
    const customLinks = [...links.custom]
    setLinks(prevState => ({
      ...prevState,
      custom: arrayMove(customLinks, oldIndex, newIndex),
    }))
  }

  const customLinksSort = (oldIndex, newIndex) => {
    if (oldIndex !== newIndex) {
      setFormTouched(true)
      setCustomLinksSorted(true)
      sortCustomLinks(oldIndex, newIndex)
    }
  }

  const redirectProfileHandler = async (e, redirectLink) => {
    if (e) { e.preventDefault() }
    setLoading(true)
    const data = { ...userInfo }
    const cardDetails = {
      ...data,
      redirect: redirectLink,
    }
    // if (isMaster) {
    //   cardDetails.teamData = {
    //     ...data.teamData,
    //     redirect: redirectLink,
    //   }
    // }
    try {
      setLoadingMessage(pageStatics.messages.loading.redirectingProfile)
      await updateCard(userId, cardDetails)
      setRedirect(redirectLink)

      setFormTouched(false)
      setLoading(false)

      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksRedirectedSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksRedirectedError,
        type: 'error',
      })
    }
  }

  const cleanClose = () => {
    closeDialog()
  }

  return (
    <FullScreenDialog
      open={dialogOpen}
      onClose={cleanClose}
      title={`${userInfo && userInfo.firstName ? userInfo.firstName : ''} ${userInfo && userInfo.lastName ? userInfo.lastName : ''} Links`}
      loading={false}
    >
      <Box>
        {loading ? (
          <LoadingBackdrop loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loadingLinks}`} />
        ) : (
          <Box className={classes.root}>
            <AppBar position="relative" className={layoutClasses.tabsHeader}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="links tabs"
                centered
                TabIndicatorProps={{
                  style: {
                    backgroundColor: color.color.code,
                  },
                }}
              >
                <Tab label={pageStatics.data.tabs.addLinks} className={`${layoutClasses.tabButton} ${layoutClasses.tabButtonLeft}`} style={{ paddingTop: 20 }} {...a11yProps(0)} />
                <Tab
                  label={(
                    <>
                      {pageStatics.data.tabs.redirectProfile}
                    </>
                  )}
                  className={`${layoutClasses.tabButton} ${layoutClasses.tabButtonRight}`}
                  style={{ paddingTop: 20 }}
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <div
              role="tabpanel"
              hidden={tabValue !== 0}
              id="simple-tabpanel-0"
              className={layoutClasses.tabPanelContainer}
              aria-labelledby="simple-tab-0"
            >
              {tabValue === 0 && (
                <ProfileLinks
                  links={links}
                  setLinks={setLinks}
                  profileLinks={userInfo && userInfo.links}
                  redirect={redirect}
                  setRedirect={setRedirect}
                  setUserInfo={setUserInfo}
                  loading={loading}
                  socialLinksOrder={socialLinks}
                  onSort={socialLinksSort}
                  onCustomSort={customLinksSort}
                  defaultLinksToTheme={userInfo && userInfo.defaultLinksToTheme}
                  onUpdateSocialLinks={updateSocialLinks}
                  socialLinksSorted={socialLinksSorted}
                  customLinksSorted={customLinksSorted}
                  onSortSocialLinks={updateSortedSocialLinksHandler}
                  onSortCustomLinks={updateSortedCustomLinksHandler}
                  onDeleteCustomLink={deleteCustomLink}
                  onAddCustomLink={addCustomLink}
                  disableActions={loading}
                />
              )}
            </div>
            <div
              role="tabpanel"
              hidden={tabValue !== 1}
              id="simple-tabpanel-1"
              className={layoutClasses.tabPanelContainer}
              aria-labelledby="simple-tab-1"
            >
              {tabValue === 1 && (
                <RedirectProfile
                  color={color.color.code}
                  links={links}
                  redirect={redirect}
                  defaultLinksToTheme={userInfo && userInfo.defaultLinksToTheme}
                  onRedirect={redirectProfileHandler}
                  disableActions={loading}
                />
              )}
            </div>
          </Box>
        )}
      </Box>
    </FullScreenDialog>
  )
}

EditLinks.defaultProps = {
  dialogOpen: false,
  userId: null,
}

EditLinks.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

export default EditLinks
