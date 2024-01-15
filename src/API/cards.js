import { isEqual } from 'date-fns'
import { getFirestoreInstance } from './firebase'
import { defaultSettings } from '../utilities/appVars'

export const createCard = async (userId, cardData, isExtraProfile) => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('cards').doc(userId).get()
    let extraProfileId = null
    if (!user.exists) {
      await db.collection('cards').doc(userId).set({
        parentId: null,
        userId,
        ...cardData,
      })
    } else if (isExtraProfile) {
      const extraProfile = await db.collection('cards').add({
        parentId: userId,
        ...cardData,
      })
      extraProfileId = extraProfile.id
    }
    return {
      userExists: user.exists,
      extraProfileId,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getCardBySuffix = async suffix => {
  let cardRes = []

  try {
    const db = await getFirestoreInstance()
    const cards = await db.collection('cards').where('urlSuffix', '==', suffix).get()
    if (cards.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    cards.forEach(doc => {
      cardRes = [...cardRes, doc.data()]
    })
  } catch (err) {
    throw new Error(err)
  }
  return cardRes[0]
}

export const getCardSettingsBySuffix = async suffix => {
  let cardRes = []

  try {
    const db = await getFirestoreInstance()
    const cards = await db.collection('cards').where('urlSuffix', '==', suffix).get()
    if (cards.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    cards.forEach(doc => {
      cardRes = [...cardRes, doc.data()]
    })
  } catch (err) {
    throw new Error(err)
  }

  return cardRes[0].settings
}

export const getCards = async () => {
  let cards = []
  let cardData
  let cardsRes

  try {
    const db = await getFirestoreInstance()
    cardsRes = await db.collection('cards').orderBy('userId').get()
    cardsRes.forEach(card => {
      cardData = card.data()
      cardData.id = card.id
      cards = [...cards, cardData]
    })
  } catch (err) {
    throw new Error(err)
  }

  return cards
}

export const getCardById = async cardId => {
  let cardData
  let cardRes

  try {
    const db = await getFirestoreInstance()
    cardRes = await db.collection('cards').doc(cardId).get()
    cardData = cardRes.data()
  } catch (err) {
    throw new Error(err)
  }

  return cardData
}

export const getLinksById = async cardId => {
  let cardData
  let cardRes

  try {
    const db = await getFirestoreInstance()
    cardRes = await db.collection('cards').doc(cardId).get()
    cardData = cardRes.data().links || null
  } catch (err) {
    throw new Error(err)
  }

  return cardData
}

export const getTeamMemberLinksById = async cardId => {
  let cardData
  let cardRes

  try {
    const db = await getFirestoreInstance()
    cardRes = await db.collection('cards').doc(cardId).get()
    cardData = cardRes.data().masterLinks || null
  } catch (err) {
    throw new Error(err)
  }

  return cardData
}

export const getCardBySecretCode = async secretCode => {
  let cardRes = []

  try {
    const db = await getFirestoreInstance()
    const cards = await db.collection('cards').where('accountSecret', '==', secretCode).get()
    if (cards.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    cards.forEach(doc => {
      cardRes = [...cardRes, doc.data()]
    })
  } catch (err) {
    throw new Error(err)
  }

  return cardRes[0]
}

export const updateCard = async (cardId, updateData) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('cards').doc(cardId).update(updateData)
  } catch (err) {
    throw new Error(err.message)
  }
}

export const redirectCard = async (cardId, redirectURL) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('cards').doc(cardId).update({
      redirect: redirectURL,
    })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const setCardSettings = async (cardId, settings, defaultColorBool) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardSettings = card.data().settings
    const cardToTheme = card.data().defaultLinksToTheme || false
    await db.collection('cards').doc(cardId).update({ settings: { ...cardSettings, ...settings }, defaultLinksToTheme: typeof defaultColorBool === 'undefined' ? cardToTheme : defaultColorBool })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const addExtraProfile = async (cardId, extraProfile) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardProfiles = card.data().profiles || []
    const newCardProfiles = [...cardProfiles, extraProfile]
    await db.collection('cards').doc(cardId).update({ profiles: newCardProfiles, activeProfileId: extraProfile.id })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const activateProfile = async (userId, activeProfileId) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('cards').doc(userId).update({ activeProfileId })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getAllProfiles = async cardId => {
  let cardData
  let cardRes
  let cardProfiles = null

  try {
    const db = await getFirestoreInstance()
    cardRes = await db.collection('cards').doc(cardId).get()
    cardData = cardRes.data()
    cardProfiles = cardData.profiles || null
  } catch (err) {
    throw new Error(err)
  }

  return cardProfiles
}

export const getActiveProfileId = async cardId => {
  let cardData
  let cardRes
  let activeProfileId = null

  try {
    const db = await getFirestoreInstance()
    cardRes = await db.collection('cards').doc(cardId).get()
    cardData = cardRes.data()
    activeProfileId = cardData.activeProfileId || null
  } catch (err) {
    throw new Error(err)
  }

  return activeProfileId
}

export const changeUserProfileCreatedMethod = async userId => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('cards').doc(userId).update({ createdBy: null })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const countCardClicks = async suffix => {
  let cardRes = []
  let clicked

  try {
    const db = await getFirestoreInstance()
    const cards = await db.collection('cards').where('urlSuffix', '==', suffix).get()
    if (cards.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    cards.forEach(doc => {
      cardRes = [...cardRes, doc.data()]
    })
    clicked = cardRes[0].clickedNo || 0
    const cardId = cardRes[0].userId
    await db.collection('cards').doc(cardId).update({ clickedNo: clicked + 1 })
  } catch (err) {
    throw new Error(err.message)
  }
  return clicked + 1
}

export const updateProfileVisitsBySuffix = async suffix => {
  let cardRes = []
  let cardIds = []

  try {
    const db = await getFirestoreInstance()
    const cards = await db.collection('cards').where('urlSuffix', '==', suffix).get()
    if (cards.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    cards.forEach(doc => {
      cardRes = [...cardRes, doc.data()]
      cardIds = [...cardIds, doc.id]
    })
    const cardId = cardIds[0]
    const cardVisits = cardRes[0].visits || 0
    await db.collection('cards').doc(cardId).update({ visits: cardVisits + 1 })
  } catch (err) {
    throw new Error(err)
  }

  return cardRes[0].settings
}

export const updateProfileVisitsById = async (cardId, defaultId, deviceType) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    // const defaultCard = await db.collection('cards').doc(defaultId).get()
    if (card.exists) {
      // const cardData = card.data()
      // const defaultCardData = defaultCard.data()
      const today = new Date().toLocaleDateString()
      const visitsQuery = await db.collection('cards').doc(cardId)
        .collection('visits')
        .where('date', '==', today)
        .get()
      if (visitsQuery.empty) {
        // await db.collection('cards').doc(cardId).update({ visits: cardData.visits ? cardData.visits + 1 : 1 })
        // await db.collection('cards').doc(defaultId).update({ allProfilesVisits: defaultCardData.allProfilesVisits ? defaultCardData.allProfilesVisits + 1 : 1 })
        await db.collection('cards').doc(cardId)
          .collection('visits')
          .add({
            count: 1,
            date: new Date(),
            deviceType,
          })
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const updateProfileConnectionsById = async (cardId, defaultId, addedByUser) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const defaultCard = await db.collection('cards').doc(defaultId).get()
    if (card.exists) {
      const cardData = card.data()
      const defaultCardData = defaultCard.data()
      await db.collection('cards').doc(cardId).update({
        connectionsCount: cardData.connectionsCount ? cardData.connectionsCount + 1 : 1,
        ...(!addedByUser && { uniqueConnectionsCount: cardData.uniqueConnectionsCount ? cardData.uniqueConnectionsCount + 1 : 1 }),
      })
      if (cardId !== defaultId) {
        await db.collection('cards').doc(defaultId).update({ allConnectionsCount: defaultCardData.allConnectionsCount ? defaultCardData.allConnectionsCount + 1 : 1 })
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const deductConnectionsById = async (cardId, defaultId, addedByUser) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const defaultCard = await db.collection('cards').doc(defaultId).get()
    if (card.exists) {
      const cardData = card.data()
      const defaultCardData = defaultCard.data()
      await db.collection('cards').doc(cardId).update({
        connectionsCount: cardData.connectionsCount - 1,
        ...(!addedByUser && { uniqueConnectionsCount: cardData.uniqueConnectionsCount - 1 }),
      })
      if (cardId !== defaultId) {
        await db.collection('cards').doc(defaultId).update({ allConnectionsCount: defaultCardData.allConnectionsCount - 1 })
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const setTeamSettings = async (cardId, settings, defaultColorBool) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const { teamData } = card.data()
    const teamSettings = teamData.settings
    const cardToTheme = card.data().teamData.defaultLinksToTheme || false
    await db.collection('cards').doc(cardId).update({
      teamData: {
        ...teamData,
        settings: {
          ...teamSettings,
          ...settings,
        },
        defaultLinksToTheme: typeof defaultColorBool === 'undefined' ? cardToTheme : defaultColorBool,
      },
    })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateProfileActivity = async (cardId, activeState) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardSettings = card.data().settings
    await db.collection('cards').doc(cardId).update({ settings: { ...cardSettings, active: activeState } })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const toggleMemberLock = async (cardId, activeState) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('cards').doc(cardId).update({ masterLocked: activeState })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const disableChildInvitationInParent = async (cardId, childInvitationCode, userId) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const { childInvitations } = card.data()
    const childInvitationIndex = childInvitations.findIndex((obj => obj.code === childInvitationCode))
    childInvitations[childInvitationIndex].used = true
    childInvitations[childInvitationIndex].usedBy = userId
    childInvitations[childInvitationIndex].usedOn = new Date()
    await db.collection('cards').doc(cardId).update({
      childInvitations,
    })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const countLinkClicks = async (suffix, linkUrl) => {
  let cardRes = []
  try {
    const db = await getFirestoreInstance()
    const cards = await db.collection('cards').where('urlSuffix', '==', suffix).get()
    if (cards.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    cards.forEach(doc => {
      cardRes = [...cardRes, doc.data()]
    })
    const { links, userId } = cardRes[0]
    const linkIndex = links.findIndex((link => link.link === linkUrl))

    if (links[linkIndex].clicked) {
      links[linkIndex].clicked += 1
    } else {
      links[linkIndex].clicked = 1
    }

    await db.collection('cards').doc(userId).update({
      links,
    })
    return true
  } catch (err) {
    throw new Error(err.message)
  }
}

export const countTeamLinkClicks = async (masterId, linkUrl, linkKey) => {
  let currentLinks
  try {
    const db = await getFirestoreInstance()
    const masterCard = await db.collection('cards').doc(masterId).get()
    const { links } = masterCard.data()
    if (links) {
      const linkIndex = links.findIndex((link => link.link === linkUrl && link.key === linkKey))
      if (linkIndex >= 0) {
        if (links[linkIndex].teamClicks) {
          links[linkIndex].teamClicks += 1
        } else {
          links[linkIndex].teamClicks = 1
        }
        currentLinks = links
      }
    }
    await db.collection('cards').doc(masterId).update({
      links: currentLinks,
    })
    return true
  } catch (err) {
    throw new Error(err.message)
  }
}

export const countTeamMemberLinkClicks = async (memberId, masterId, linkUrl, linkKey, linkPlatform, linkActive) => {
  // let cardRes
  let currentLinks
  try {
    const db = await getFirestoreInstance()
    const memberCard = await db.collection('cards').doc(memberId).get()
    const { masterLinks } = memberCard.data()
    if (masterLinks) {
      const linkIndex = masterLinks.findIndex((link => link.link === linkUrl && link.key === linkKey))
      if (linkIndex >= 0) {
        masterLinks[linkIndex].clicked += 1
        currentLinks = masterLinks
      } else {
        currentLinks = [...masterLinks, {
          clicked: 1,
          link: linkUrl,
          key: linkKey,
          platform: linkPlatform,
          active: linkActive,
        }]
      }
    } else {
      currentLinks = [{
        clicked: 1,
        link: linkUrl,
        key: linkKey,
        platform: linkPlatform,
        active: linkActive,
      }]
    }
    await db.collection('cards').doc(memberId).update({
      masterLinks: currentLinks,
    })
    // masterCards.forEach(masterCard => {
    //   cardRes = masterCard.data()
    // })
    // const { teamData, userId } = cardRes
    // const masterId = userId
    // const clickedLink = teamData.links.find(link => link.link === linkUrl)
    // const clickedLinkIndex = teamData.links.findIndex(link => link.link === linkUrl)
    // const { memberClicks } = clickedLink
    // const linkClicks = memberClicks.find(clickObj => clickObj.id === memberId)
    // const linkClicksIndex = memberClicks.findIndex(clickObj => clickObj.id === memberId)
    // if (linkClicks === undefined && linkClicksIndex === -1) {
    //   teamData.links[clickedLinkIndex].memberClicks.push({
    //     id: memberId,
    //     clicked: 1,
    //   })
    // } else {
    //   teamData.links[clickedLinkIndex].memberClicks[linkClicksIndex].clicked += 1
    // }
    // // const { clicked } = linkClicks
    // await db.collection('cards').doc(masterId).update({
    //   teamData: {
    //     ...teamData,
    //     links: [
    //       ...teamData.links,
    //     ],
    //   },
    // })
    return true
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateConnections = async (cardId, connection) => {
  let newConnections
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardConnections = card.data().connections
    if (cardConnections) {
      newConnections = [...cardConnections, connection]
      await db.collection('cards').doc(cardId).update({ connections: newConnections })
    } else {
      newConnections = connection
      await db.collection('cards').doc(cardId).update({ connections: [newConnections] })
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const removeConnection = async (cardId, addedOn) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardConnections = card.data().connections
    const removeIndex = cardConnections.findIndex(item => {
      const dbConnectionDate = item.addedOn.seconds ? item.addedOn.toDate() : item.addedOn
      const selectedConnectionDate = addedOn.seconds ? addedOn.toDate() : addedOn
      return isEqual(dbConnectionDate, selectedConnectionDate)
    })
    cardConnections.splice(removeIndex, 1)
    await db.collection('cards').doc(cardId).update({ connections: cardConnections })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateFollowers = async (cardId, follower) => {
  let newFollowers
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardFollowers = card.data().followers
    const followerExists = cardFollowers && cardFollowers.some(cardFollower => cardFollower.userId === follower.userId)
    if (cardFollowers && !followerExists) {
      newFollowers = [...cardFollowers, follower]
      await db.collection('cards').doc(cardId).update({ followers: newFollowers })
    }
    if (!cardFollowers && !followerExists) {
      newFollowers = follower
      await db.collection('cards').doc(cardId).update({ followers: [newFollowers] })
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateFollowing = async (cardId, following) => {
  let newFollowing
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardFollowing = card.data().following
    const followingExists = cardFollowing && cardFollowing.some(cardFollower => cardFollower.userId === following.userId)
    if (cardFollowing && !followingExists) {
      newFollowing = [...cardFollowing, following]
      await db.collection('cards').doc(cardId).update({ following: newFollowing })
    }
    if (!cardFollowing && !followingExists) {
      newFollowing = following
      await db.collection('cards').doc(cardId).update({ following: [newFollowing] })
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getConnectionByVcard = async (cardId, vCardFile) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardConnections = card.data().connections
    const connection = cardConnections.find(item => item.vCardFile === vCardFile)
    return connection
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateConnectionByVcard = async (cardId, vCardFile, connectionData) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardConnections = card.data().connections
    const connectionIndex = cardConnections.findIndex(item => item.vCardFile === vCardFile)
    cardConnections[connectionIndex].firstName = connectionData.firstName
    cardConnections[connectionIndex].lastName = connectionData.lastName
    cardConnections[connectionIndex].email = connectionData.email
    cardConnections[connectionIndex].workPhone = connectionData.workPhone
    cardConnections[connectionIndex].vCardFile = connectionData.vCardFile
    cardConnections[connectionIndex].note = connectionData.note
    cardConnections[connectionIndex].userName = connectionData.userName
    cardConnections[connectionIndex].organization = connectionData.organization
    cardConnections[connectionIndex].title = connectionData.title
    cardConnections[connectionIndex].website = connectionData.website
    await db.collection('cards').doc(cardId).update({ connections: cardConnections })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getConnectionByDateAdded = async (cardId, addedOn) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardConnections = card.data().connections
    const connection = cardConnections.find(item => {
      const dbConnectionDate = item.addedOn.seconds ? item.addedOn.toDate() : item.addedOn
      const selectedConnectionDate = addedOn.seconds ? addedOn.toDate() : addedOn
      return isEqual(dbConnectionDate, selectedConnectionDate)
    })
    return connection
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateConnectionByDateAdded = async (cardId, addedOn, connectionData) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardConnections = card.data().connections
    const connectionIndex = cardConnections.findIndex(item => {
      const dbConnectionDate = item.addedOn.seconds ? item.addedOn.toDate() : item.addedOn
      const selectedConnectionDate = addedOn.seconds ? addedOn.toDate() : addedOn
      return isEqual(dbConnectionDate, selectedConnectionDate)
    })
    cardConnections[connectionIndex].firstName = connectionData.firstName
    cardConnections[connectionIndex].lastName = connectionData.lastName
    cardConnections[connectionIndex].email = connectionData.email
    cardConnections[connectionIndex].workPhone = connectionData.workPhone
    cardConnections[connectionIndex].note = connectionData.note
    cardConnections[connectionIndex].userName = connectionData.userName
    cardConnections[connectionIndex].organization = connectionData.organization
    cardConnections[connectionIndex].title = connectionData.title
    cardConnections[connectionIndex].website = connectionData.website
    await db.collection('cards').doc(cardId).update({ connections: cardConnections })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateOfferByDateAdded = async (cardId, addedOn, offerData) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardOffers = card.data().offers
    const offerIndex = cardOffers.findIndex(item => {
      const dbOfferDate = item.addedOn.seconds ? item.addedOn.toDate() : item.addedOn
      const selectedOfferDate = addedOn.seconds ? addedOn.toDate() : addedOn
      return isEqual(dbOfferDate, selectedOfferDate)
    })
    cardOffers[offerIndex].active = offerData.active
    cardOffers[offerIndex].image = offerData.image
    cardOffers[offerIndex].title = offerData.title
    cardOffers[offerIndex].description = offerData.description
    cardOffers[offerIndex].tagLine = offerData.tagLine
    cardOffers[offerIndex].startDate = offerData.startDate
    cardOffers[offerIndex].endDate = offerData.endDate
    cardOffers[offerIndex].limit = offerData.limit
    cardOffers[offerIndex].oldPrice = offerData.oldPrice
    cardOffers[offerIndex].newPrice = offerData.newPrice
    cardOffers[offerIndex].discount = offerData.discount
    await db.collection('cards').doc(cardId).update({ offers: cardOffers })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const removeFollower = async (cardId, followerId) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardFollowers = card.data().followers
    const removeIndex = cardFollowers.findIndex(item => item.userId === followerId)
    cardFollowers.splice(removeIndex, 1)
    await db.collection('cards').doc(cardId).update({ followers: cardFollowers })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const removeFollowing = async (cardId, followingId) => {
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardFollowings = card.data().following
    const removeIndex = cardFollowings.findIndex(item => item.userId === followingId)
    cardFollowings.splice(removeIndex, 1)
    await db.collection('cards').doc(cardId).update({ following: cardFollowings })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const createUserCard = async (profileData, invitationData, accountSecret, vCardFile, isExtraProfile) => {
  const cardData = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    middleName: profileData.middleName || null,
    title: profileData.title || null,
    email: profileData.email,
    namePrefix: profileData.namePrefix || null,
    nameSuffix: profileData.nameSuffix || null,
    nickname: profileData.nickname || null,
    note: profileData.note || null,
    isMaster: profileData.isMaster || false,
    masterProfileId: profileData.masterProfileId || null,
    masterInvitationId: profileData.masterInvitationId || null,
    parentId: profileData.parentId || null,
    defaultId: profileData.defaultId || null,
    method: profileData.method || null,
    passwordProtected: profileData.passwordProtected || null,
    redirect: profileData.redirect || null,
    address: profileData.address || null,
    marker: profileData.marker || null,
    bioVideo: profileData.bioVideo || null,
    birthday: profileData.birthday || null,
    clickedNo: profileData.clickedNo || null,
    organization: profileData.organization || null,
    connections: profileData.connections || null,
    logo: profileData.logo || null,
    gender: profileData.gender || null,
    homeFax: profileData.homeFax || null,
    homePhone: profileData.homePhone || null,
    image: profileData.image || null,
    invitationCode: profileData.invitationCode || null,
    invitations: profileData.invitations || null,
    career: profileData.career || null,
    defaultLinksToTheme: profileData.defaultLinksToTheme || null,
    urlSuffix: profileData.urlSuffix || null,
    settings: profileData.settings || defaultSettings,
    accountSecret,
    vCardFile: vCardFile || null,
    links: profileData.links || null,
    socialLinksOrder: profileData.socialLinksOrder || null,
    followers: profileData.followers || null,
    following: profileData.following || null,
    createdBy: profileData.createdBy || null,
    visits: profileData.visits || 0,
    workFax: profileData.workFax || null,
    workPhone: profileData.workPhone || null,
    invitationData,
    store: profileData.store,
  }
  const newCard = await createCard(profileData.userId, cardData, isExtraProfile)
  return { cardExists: newCard.userExists, extraProfileId: newCard.extraProfileId, urlSuffix: profileData.urlSuffix }
}

export const deleteCardByuserId = async userId => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('cards').doc(userId).get()
    if (user.exists) {
      await db.collection('cards').doc(userId).delete()
    } else {
      // eslint-disable-next-line
      console.log('user doesnt exist');
    }
    return true
  } catch (err) {
    // eslint-disable-next-line
    throw new Error(err.message)
  }
}

export const getTeamCards = async masterId => {
  let cards = []
  let cardData
  let cardsRes

  try {
    const db = await getFirestoreInstance()
    cardsRes = await db.collection('cards').where('masterProfileId', '==', masterId).orderBy('firstName', 'asc').get()
    cardsRes.forEach(card => {
      cardData = card.data()
      cardData.id = card.id
      cards = [...cards, cardData]
    })
  } catch (err) {
    throw new Error(err)
  }
  return cards
}

export const getMasterCardByInvitation = async invitationCode => {
  let cardRes = []

  try {
    const db = await getFirestoreInstance()
    const cards = await db.collection('cards').where('invitationCode', '==', invitationCode).get()
    if (cards.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    cards.forEach(doc => {
      cardRes = [...cardRes, doc.data()]
    })
  } catch (err) {
    throw new Error(err)
  }

  return cardRes[0]
}

export const addRequest = async (cardId, requestObj) => {
  let newRequests
  try {
    const db = await getFirestoreInstance()
    const card = await db.collection('cards').doc(cardId).get()
    const cardRequests = card.data().requests
    if (cardRequests) {
      newRequests = [...cardRequests, requestObj]
      await db.collection('cards').doc(cardId).update({ requests: newRequests })
    } else {
      newRequests = requestObj
      await db.collection('cards').doc(cardId).update({ requests: [newRequests] })
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getCardVisits = async (userId, dateLimit) => {
  let allVisits = []

  try {
    const db = await getFirestoreInstance()
    const visits = await db.collection('cards').doc(userId)
      .collection('visits')
      .where('date', '>=', dateLimit)
      .orderBy('date', 'desc')
      .get()
    if (visits.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      visits.forEach(doc => {
        allVisits = [...allVisits, { ...doc.data(), id: doc.id }]
      })
    }
  } catch (err) {
    throw new Error(err)
  }
  return allVisits
}

export const getTotalVisitsById = async cardId => {
  let cardData
  let cardRes

  try {
    const db = await getFirestoreInstance()
    cardRes = await db.collection('cards').doc(cardId).get()
    cardData = cardRes.data()
  } catch (err) {
    throw new Error(err)
  }

  return cardData.allProfilesVisits
}
