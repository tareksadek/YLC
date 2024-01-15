import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { useParams, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import arrayMove from 'array-move'

import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import ProfileLinks from '../../components/Cards/EditCard/ProfileLinks'
import RedirectProfile from '../../components/Cards/EditCard/RedirectProfile'
import Header from '../../layout/Header'
import InfoBox from '../../components/Ui/InfoBox'
import Alert from '../../layout/Alert'
import SkeletonContainer from '../../layout/SkeletonContainer'

// import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { editProfileStyles } from './styles'

import { updateCard } from '../../API/cards'
// import { getFirebaseStorage } from '../../API/firebase'
import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'

// import { generateVcard } from '../../utilities/utils'

import { socialPlatforms } from '../../utilities/appVars'

import * as actions from '../../store/actions'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Links = ({
  cardData, onSetNotification, links, onLoadLinks, linksChanged, onSortCustomLinks, onSortSocialLinks, onLinksFormSaved,
  redirect, error, onRemoveLink, onUpdateCard, activeProfileId, onClearLinks,
}) => {
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile

  // const { cardId } = useParams()
  const auth = useAuth()
  const userId = auth.user.uid
  // const profileId = auth.user.uid !== cardId && auth.superAdminStatus ? cardId : userId
  // const profileId = userId
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix
  const [formTouched, setFormTouched] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.updatingProfileLinks)
  // const [existingVcard, setExistingVcard] = useState(null)
  // const [newVcardName, setNewVcardName] = useState(null)
  // const [formSaved, setFormSaved] = useState(false)
  const [socialLinks, setSocialLinks] = useState(null)
  // const [allLinks, setAllLinks] = useState([])
  const [tabValue, setTabValue] = useState(0)
  const [socialLinksSorted, setSocialLinksSorted] = useState(false)
  const [customLinksSorted, setCustomLinksSorted] = useState(false)

  const classes = editProfileStyles()
  const layoutClasses = layoutStyles()
  // const buttonClasses = buttonStyles()

  // const isMaster = auth.accountType === 'master'

  // useEffect(() => {
  //   let mounted = true
  //   if (mounted) {
  //     if (!cardData || !cardData.userId || !isTheLoggedinUser) {
  //       (async () => {
  //         setLoading(true)
  //         const data = await onLoadCardByUserId(userId)
  //         // if (data.vCardFile) {
  //         //   setExistingVcard(data.vCardFile)
  //         // }
  //         if (data.links) {
  //           await onLoadLinks(data.links, data?.redirect || null, data?.defaultLinksToTheme || false)
  //         } else {
  //           onClearLinks()
  //         }
  //         if (data.socialLinksOrder) {
  //           const allPlatforms = data.socialLinksOrder.concat(socialPlatforms.filter(platform => data.socialLinksOrder.map(link => link.platform).indexOf(platform.platform) < 0))
  //           setSocialLinks(allPlatforms)
  //         } else {
  //           setSocialLinks(socialPlatforms)
  //         }
  //         // setNewVcardName(`${language.languageVars.appNameCAPS}_${data.urlSuffix}.vcf`)
  //         setLoadingDone(true)
  //         setTimeout(() => setLoading(false), 1000)
  //       })()
  //     } else {
  //       if (cardData.links) {
  //         onLoadLinks(cardData.links, cardData?.redirect || null, cardData?.defaultLinksToTheme || false)
  //       }
  //       if (cardData.socialLinksOrder) {
  //         const allPlatforms = cardData.socialLinksOrder.concat(socialPlatforms.filter(platform => cardData.socialLinksOrder.map(link => link.platform).indexOf(platform.platform) < 0))
  //         setSocialLinks(allPlatforms)
  //       } else {
  //         setSocialLinks(socialPlatforms)
  //       }
  //     }
  //   }

  //   return () => { mounted = false }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userId, onLoadLinks, onLoadCardByUserId, isTheLoggedinUser])

  // useEffect(() => {
  //   let mounted = true
  //   if (mounted && cardData.userId) {
  //     if (!cardData || !cardData.userId || !isTheLoggedinUser) {
  //       (async () => {
  //         setLoading(true)
  //         const data = await onLoadCardByUserId(userId)
  //         // if (data.vCardFile) {
  //         //   setExistingVcard(data.vCardFile)
  //         // }
  //         if (data.links) {
  //           await onLoadLinks(data.links, data?.redirect || null, data?.defaultLinksToTheme || false)
  //         } else {
  //           onClearLinks()
  //         }
  //         if (data.socialLinksOrder) {
  //           const allPlatforms = data.socialLinksOrder.concat(socialPlatforms.filter(platform => data.socialLinksOrder.map(link => link.platform).indexOf(platform.platform) < 0))
  //           setSocialLinks(allPlatforms)
  //         } else {
  //           setSocialLinks(socialPlatforms)
  //         }
  //         // setNewVcardName(`${language.languageVars.appNameCAPS}_${data.urlSuffix}.vcf`)
  //         setLoadingDone(true)
  //         setTimeout(() => setLoading(false), 1000)
  //       })()
  //     } else {
  //       if (cardData.links) {
  //         onLoadLinks(cardData.links, cardData?.redirect || null, cardData?.defaultLinksToTheme || false)
  //       }
  //       if (cardData.socialLinksOrder) {
  //         const allPlatforms = cardData.socialLinksOrder.concat(socialPlatforms.filter(platform => cardData.socialLinksOrder.map(link => link.platform).indexOf(platform.platform) < 0))
  //         setSocialLinks(allPlatforms)
  //       } else {
  //         setSocialLinks(socialPlatforms)
  //       }
  //     }
  //   }

  //   return () => { mounted = false }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userId, onLoadLinks, onLoadCardByUserId, isTheLoggedinUser])

  useEffect(() => {
    if (cardData.userId && !cardData.loading) {
      // setLoading(true)
      // if (data.vCardFile) {
      //   setExistingVcard(data.vCardFile)
      // }
      if (cardData.links) {
        onLoadLinks(cardData.links, cardData?.redirect || null, cardData?.defaultLinksToTheme || false)
      } else {
        onClearLinks()
      }
      if (cardData.socialLinksOrder) {
        const allPlatforms = cardData.socialLinksOrder.concat(socialPlatforms.filter(platform => cardData.socialLinksOrder.map(link => link.platform).indexOf(platform.platform) < 0))
        setSocialLinks(allPlatforms)
      } else {
        setSocialLinks(socialPlatforms)
      }
      // setNewVcardName(`${language.languageVars.appNameCAPS}_${data.urlSuffix}.vcf`)
      // setLoadingDone(true)
      // setTimeout(() => setLoading(false), 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const timer = ms => new Promise(res => setTimeout(res, ms))

  // const updateTeamData = async (dataFromMaster, updateVcard) => {
  //   let updatedData = null
  //   let memberDetails = null
  //   let vCardFile = null
  //   let metaData = null
  //   let memberNewVcardName = null
  //   for (let i = 0; i < teamMembers.length; i += 1) {
  //     try {
  //       /* eslint-disable no-await-in-loop */
  //       setLoadingDone(false)
  //       await timer(1000)
  //       setLoadingMessage(`${pageStatics.messages.loading.updatingTeamMember.first} ${i + 1} ${pageStatics.messages.loading.updatingTeamMember.second} ${teamMembers.length}`)
  //       updatedData = dataFromMaster
  //       memberDetails = {
  //         ...teamMembers[i],
  //         ...updatedData,
  //       }
  //
  //       if (updateVcard) {
  //         memberNewVcardName = `${language.languageVars.appNameCAPS}_${teamMembers[i].urlSuffix}.vcf`
  //
  //         vCardFile = generateVcard(memberDetails, memberDetails.links, memberNewVcardName, memberDetails.base64Photo?.code || null, memberDetails.base64Photo?.type || null)
  //         memberDetails.vCardFile = vCardFile.name
  //         metaData = {
  //           contentDisposition: 'attachment',
  //           filename: vCardFile.name,
  //           contentType: 'text/vcard',
  //         }
  //         await getFirebaseStorage().ref(`/card/${vCardFile.name}`).put(vCardFile, metaData)
  //       }
  //
  //       await updateCard(teamMembers[i].userId, memberDetails)
  //       setLoadingDone(true)
  //       await timer(1000)
  //     } catch (err) {
  //       onSetNotification({
  //         message: pageStatics.messages.notifications.profileLinksUpdateError,
  //         type: 'error',
  //       })
  //     }
  //   }
  // }

  // const updateSocialLinks = async (e, link) => {
  //   e.preventDefault()
  //   setLoadingDone(false)
  //   setLoading(true)
  //   const data = { ...cardData }
  //   const profileDataLinks = data.links || []
  //   const newLink = link
  //   const linkIndex = data.links ? data.links.findIndex(profileLink => profileLink.platform === link.platform) : -1
  //   const linkExists = (linkIndex && linkIndex !== -1) || false
  //   console.log(data.links);
  //   console.log(link);
  //   console.log(linkIndex);
  //   console.log(linkExists);
  //   newLink.originallyActive = newLink.active
  //   let newLinks
  //   if (linkIndex === 0 || linkIndex > -1) {
  //     console.log('edit link');
  //     profileDataLinks[linkIndex] = newLink
  //     newLinks = [...profileDataLinks]
  //   } else {
  //     console.log('new link');
  //     newLinks = [...profileDataLinks, newLink]
  //   }
  //   console.log(newLinks);
  //   const cardDetails = {
  //     ...data,
  //     links: newLinks,
  //   }
  //   try {
  //     if (existingVcard) {
  //       setLoadingMessage(pageStatics.messages.loading.validatingLinks)
  //       const confirmVcardFileExists = await getFirebaseStorage().ref(`card/${existingVcard}`).listAll()
  //       if (confirmVcardFileExists.items.length > 0) {
  //         await getFirebaseStorage().ref(`card/${existingVcard}`).delete()
  //       }
  //     }
  //
  //     const vCardFile = generateVcard(cardDetails, newLinks, newVcardName, cardDetails.base64Photo?.code || null, cardDetails.base64Photo?.type || null)
  //     cardDetails.vCardFile = vCardFile.name
  //     const metaData = {
  //       contentDisposition: 'attachment',
  //       filename: vCardFile.name,
  //       contentType: 'text/vcard',
  //     }
  //     setLoadingMessage(pageStatics.messages.loading.updatingLinks)
  //     await getFirebaseStorage().ref(`/card/${vCardFile.name}`).put(vCardFile, metaData)
  //     await updateCard(cardId, cardDetails)
  //
  //     await onUpdateCard({ links: newLinks })
  //
  //     setLoadingDone(true)
  //     await timer(1000)
  //
  //     if (auth.accountType === 'master' && teamMembers && teamMembers.length > 0) {
  //       await updateTeamData({
  //         links: newLinks,
  //       }, true)
  //     }
  //
  //     setFormTouched(false)
  //     setTimeout(() => setLoading(false), 1000)
  //
  //     onSetNotification({
  //       message: pageStatics.messages.notifications.profileLinksUpdateSuccess,
  //       type: 'success',
  //     })
  //   } catch (err) {
  //     onSetNotification({
  //       message: pageStatics.messages.notifications.profileLinksUpdateError,
  //       type: 'error',
  //     })
  //   }
  // }
  const processSocialLinks = link => {
    const data = { ...cardData }
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

  // const processTeamMembersLinks = link => {
  //   const data = { ...cardData }
  //   const currentMemberLinks = data.teamData && data.teamData.links ? [...data.teamData.links] : []
  //   const newMemberLink = { ...link }
  //   newMemberLink.memberClicks = []
  //   const linkIndex = data.links ? data.links.findIndex(profileLink => profileLink.platform === link.platform) : -1
  //   let newMemberLinks
  //   if (linkIndex === 0 || linkIndex > -1) {
  //     newMemberLink.memberClicks = currentMemberLinks[linkIndex].memberClicks
  //     currentMemberLinks[linkIndex] = newMemberLink
  //     newMemberLinks = [...currentMemberLinks]
  //   } else {
  //     newMemberLink.memberClicks = []
  //     let memberClickObj
  //     for (let i = 0; i < teamMembers.length; i += 1) {
  //       memberClickObj = {
  //         id: teamMembers[i].id,
  //         clicked: 0,
  //       }
  //       newMemberLink.memberClicks.push(memberClickObj)
  //     }
  //     newMemberLinks = [...currentMemberLinks, newMemberLink]
  //   }

  //   return {
  //     links: newMemberLinks,
  //   }
  // }

  const updateSocialLinks = async (e, link) => {
    e.preventDefault()
    setLoadingDone(false)
    setLoading(true)
    const data = { ...cardData }
    const newLinks = processSocialLinks(link)

    const cardDetails = {
      ...data,
      links: newLinks,
    }

    // if (isMaster) {
    //   const teamLinks = processTeamMembersLinks(link)
    //   cardDetails.teamData = {
    //     ...data.teamData,
    //     ...teamLinks,
    //   }
    // }

    try {
      setLoadingMessage(pageStatics.messages.loading.updatingLinks)

      await updateCard(activeProfileId || userId, cardDetails)
      await onUpdateCard({ links: newLinks })
      // await onUpdateCard({ links: newLinks, ...(isMaster && { teamData: cardDetails.teamData || null }) })

      setLoadingDone(true)

      setFormTouched(false)
      setTimeout(() => setLoading(false), 1000)

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
    setLoadingDone(false)
    setLoading(true)
    setFormTouched(true)
    const data = { ...cardData }
    const cardLinks = data.links && data.links.length > 0 ? data.links.filter(link => link.link !== '' && link.link !== 'http://' && link.link !== 'https://') : null
    const cardDetails = {
      ...data,
      links: cardLinks ? [...cardLinks, { ...customLink }] : [{ ...customLink }],
    }

    // if (isMaster) {
    //   const teamCustomLink = { ...customLink }
    //   let memberClickObj
    //   teamCustomLink.memberClicks = []
    //   for (let i = 0; i < teamMembers.length; i += 1) {
    //     memberClickObj = {
    //       id: teamMembers[i].id,
    //       clicked: 0,
    //     }
    //     teamCustomLink.memberClicks.push(memberClickObj)
    //   }
    //   cardDetails.teamData = {
    //     ...data.teamData,
    //     links: [...data.teamData.links, teamCustomLink],
    //   }
    // }

    try {
      setLoadingMessage(pageStatics.messages.loading.addingLink)

      await updateCard(activeProfileId || userId, cardDetails)
      await onUpdateCard({ links: cardLinks ? [...cardLinks, customLink] : [customLink] })
      // await onUpdateCard({ links: cardLinks ? [...cardLinks, customLink] : [customLink], ...(isMaster && { teamData: cardDetails.teamData || null }) })

      setLoadingDone(true)
      await timer(1000)

      onLinksFormSaved()

      setFormTouched(false)
      setTimeout(() => setLoading(false), 1000)

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

  const deleteCustomLink = async (e, key) => {
    if (e) { e.preventDefault() }
    const confirmBox = window.confirm(pageStatics.messages.notifications.deleteLinkPrompt)
    if (confirmBox === true) {
      setFormTouched(true)
      setLoadingMessage(pageStatics.messages.loading.deletingProfileLinks)
      setLoadingDone(false)
      setLoading(true)
      const data = { ...cardData }
      // const teamLinks = data.teamData && data.teamData.links ? [...data.teamData.links] : []
      const allCardLinks = data.links && data.links.length > 0 ? data.links.filter(link => link.link !== '' && link.link !== 'http://' && link.link !== 'https://') : null
      const cardLinks = allCardLinks.filter(link => !(link.key === key && link.platform === 'custom'))
      const cardDetails = {
        ...data,
        links: cardLinks,
      }
      // if (isMaster) {
      //   cardDetails.teamData = {
      //     ...data.teamData,
      //     links: teamLinks.filter(link => link.key !== key),
      //   }
      // }
      try {
        await updateCard(activeProfileId || userId, cardDetails)
        await onUpdateCard({ links: cardLinks })
        // await onUpdateCard({ links: cardLinks, ...(isMaster && { teamData: cardDetails.teamData || null }) })
        await onRemoveLink(key)

        setLoadingDone(true)
        await timer(1000)

        onLinksFormSaved()

        // setFormSaved(true)
        setFormTouched(false)
        setTimeout(() => setLoading(false), 1000)

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
      if (error) {
        onSetNotification({
          message: pageStatics.messages.notifications.deleteLinkError,
          type: 'error',
        })
      }
    }
  }

  const updateSortedSocialLinksHandler = async e => {
    if (e) { e.preventDefault() }
    setLoadingDone(false)
    setLoading(true)
    const data = { ...cardData }
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
      await updateCard(activeProfileId || userId, cardDetails)
      await onUpdateCard({ socialLinksOrder: socialLinks })
      // await onUpdateCard({ socialLinksOrder: socialLinks, ...(isMaster && { teamData: cardDetails.teamData || null }) })

      setLoadingDone(true)
      await timer(1000)

      onLinksFormSaved()

      setFormTouched(false)
      setSocialLinksSorted(false)
      setTimeout(() => setLoading(false), 1000)

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
      onSortSocialLinks()
    }
  }

  const updateSortedCustomLinksHandler = async e => {
    e.preventDefault()
    setLoadingDone(false)
    setLoading(true)
    const data = { ...cardData }
    const cardLinks = data.links && data.links.length > 0 ? data.links.filter(link => link.link !== '' && link.link !== 'http://' && link.link !== 'https://') : null
    const cardSocialLinks = cardLinks ? cardLinks.filter(link => link.platform !== 'custom') : null
    const currentCustomLinks = [...links.custom]
    const allLinks = [...cardSocialLinks, ...currentCustomLinks]
    const cardDetails = {
      ...data,
      links: allLinks,
    }
    // if (isMaster) {
    //   const teamSocialLinks = data.teamData.links ? data.teamData.links.filter(link => link.platform !== 'custom') : null
    //   const teamCustomLinks = data.teamData.links ? data.teamData.links.filter(link => link.platform === 'custom') : null
    //   const currentTeamCustomLinks = [...links.custom]
    //   let currentLink
    //   let refLinkIndex
    //   let refLinkClicks
    //   const processedTeamCustomLinks = currentTeamCustomLinks.map(cLink => {
    //     currentLink = { ...cLink }
    //     refLinkIndex = teamCustomLinks.findIndex(link => link.link === currentLink.link)
    //     refLinkClicks = teamCustomLinks[refLinkIndex].memberClicks
    //     currentLink.memberClicks = refLinkClicks
    //     return currentLink
    //   })
    //   const allTeamLinks = [...teamSocialLinks, ...processedTeamCustomLinks]
    //   cardDetails.teamData = {
    //     ...data.teamData,
    //     links: allTeamLinks,
    //   }
    // }
    try {
      setLoadingMessage(pageStatics.messages.loading.sortingLinks)
      await updateCard(activeProfileId || userId, cardDetails)
      await onUpdateCard({ links: allLinks })
      // await onUpdateCard({ links: allLinks, ...(isMaster && { teamData: cardDetails.teamData || null }) })

      setLoadingDone(true)
      await timer(1000)

      onLinksFormSaved()

      setFormTouched(false)
      setCustomLinksSorted(false)
      setTimeout(() => setLoading(false), 1000)

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

  const customLinksSort = (oldIndex, newIndex) => {
    if (oldIndex !== newIndex) {
      setFormTouched(true)
      setCustomLinksSorted(true)
      onSortCustomLinks(oldIndex, newIndex)
    }
  }

  const redirectProfileHandler = async (e, redirectLink) => {
    if (e) { e.preventDefault() }
    setLoadingDone(false)
    setLoading(true)
    const data = { ...cardData }
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
      await updateCard(activeProfileId || userId, cardDetails)
      await onUpdateCard({ redirect: redirectLink })
      // await onUpdateCard({ redirect: redirectLink, ...(isMaster && { teamData: cardDetails.teamData || null }) })

      setLoadingDone(true)
      await timer(1000)

      onLinksFormSaved()

      setFormTouched(false)
      setTimeout(() => setLoading(false), 1000)

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

  // const isLinksValid = allLinks.length > 0 ? allLinks.filter(link => link.active && !link.valid).length === 0 : false
  // const buttonDisabled = (formSaved && !linksChanged) || (!formTouched && !linksChanged) || (linksChanged && !isLinksValid) || loading

  // if (auth.user && userId !== cardId && !auth.superAdminStatus) {
  //   return <Redirect to="/auth" />
  // }

  if (!cardData.userId || cardData.loading || !socialLinks || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.teamLinks}>
          <Box>
            <InfoBox infoList={[
              pageStatics.messages.info.teamLinks.first,
              pageStatics.messages.info.teamLinks.second,
              // ...auth.accountType === 'master' ? [pageStatics.messages.info.links.master] : [],
            ]}
            />
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
              ]}
              />
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
              ]}
              />
            </Box>
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={`${formTouched || linksChanged ? loadingMessage : pageStatics.messages.loading.loadingLinks}`} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={`${formTouched || linksChanged ? loadingMessage : pageStatics.messages.loading.loadingLinks}`} boxed />}
      <Header title={pageStatics.data.titles.teamLinks}>
        <Box>
          <InfoBox infoList={[
            pageStatics.messages.info.teamLinks.first,
            pageStatics.messages.info.teamLinks.second,
            // ...auth.accountType === 'master' ? [pageStatics.messages.info.links.master] : [],
          ]}
          />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          {redirect && (
            <Alert
              title={pageStatics.data.titles.redirected}
              description={redirect}
              type="info"
            />
          )}
          <form>
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
                    socialLinksOrder={socialLinks}
                    onSort={socialLinksSort}
                    onCustomSort={customLinksSort}
                    defaultLinksToTheme={cardData.defaultLinksToTheme}
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
                    defaultLinksToTheme={cardData.defaultLinksToTheme}
                    onRedirect={redirectProfileHandler}
                    disableActions={loading}
                  />
                )}
              </div>
            </Box>
            {
              // <Box className={classes.editButtonContainer}>
              //   <Button
              //     color="secondary"
              //     onClick={e => updateCardHandler(e)}
              //     disabled={buttonDisabled}
              //     className={buttonClasses.defaultButton}
              //     style={{
              //       backgroundColor: !buttonDisabled && color.color.code,
              //       minWidth: '250px',
              //     }}
              //   >
              //     {pageStatics.buttons.updateLinks}
              //   </Button>
              // </Box>
            }
          </form>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
  // teamMembers: state.teamMembers.teamMembers,
  invitationCode: state.cards.invitationCode,
  links: state.links.links,
  linksChanged: state.links.changed,
  redirect: state.links.redirect,
  error: state.links.error,
  activeProfileId: state.profiles.activeProfileId,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadLinks: (cardLinks, redirect, defaultToTheme) => dispatch(actions.loadLinks(cardLinks, redirect, defaultToTheme)),
  onClearLinks: () => dispatch(actions.clearLinks()),
  onSortCustomLinks: (oldIndex, newIndex) => dispatch(actions.sortCustomLinks(oldIndex, newIndex)),
  onSortSocialLinks: () => dispatch(actions.sortSocialLinks()),
  onLinksFormSaved: () => dispatch(actions.linksSaved()),
  onLoadCardByUserId: userId => dispatch(actions.loadCardByUserId(userId)),
  onRemoveLink: key => dispatch(actions.removeLink(key)),
  onUpdateCard: newData => dispatch(actions.updateCard(newData)),
})

Links.defaultProps = {
  cardData: null,
  // teamMembers: null,
  links: null,
  linksChanged: false,
  redirect: null,
  error: false,
  activeProfileId: null,
}

Links.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  // teamMembers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  //   PropTypes.array,
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]))),
  onSetNotification: PropTypes.func.isRequired,
  onLoadLinks: PropTypes.func.isRequired,
  onClearLinks: PropTypes.func.isRequired,
  onSortCustomLinks: PropTypes.func.isRequired,
  onSortSocialLinks: PropTypes.func.isRequired,
  onLinksFormSaved: PropTypes.func.isRequired,
  links: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])))),
  linksChanged: PropTypes.bool,
  redirect: PropTypes.string,
  onLoadCardByUserId: PropTypes.func.isRequired,
  // switchTheme: PropTypes.func.isRequired,
  onRemoveLink: PropTypes.func.isRequired,
  error: PropTypes.bool,
  onUpdateCard: PropTypes.func.isRequired,
  activeProfileId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Links)
