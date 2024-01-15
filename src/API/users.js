import { getFirestoreInstance } from './firebase'

export const createUser = async (userId, email, userName, urlSuffix, method, accountType, invitationPatch, invitationCode, packageType, created, firstLogin, lastLogin, accountSecret) => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    if (!user.exists) {
      db.collection('users').doc(userId).set({
        email,
        userId,
        userName,
        urlSuffix,
        method,
        created,
        firstLogin,
        lastLogin,
        settings: {
          accountType,
          invitationPatch,
          invitationCode,
          package: packageType,
          active: true,
          masterId: null,
          boarded: false,
        },
        claims: {},
        accountSecret: accountSecret || null,
      })
    }
    return user.exists
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getAllUsers = async superAdminEmail => {
  let allUsers = []

  try {
    const db = await getFirestoreInstance()
    const users = await db.collection('users').orderBy('created', 'desc').get()
    if (users.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      users.forEach(doc => {
        allUsers = [...allUsers, doc.data()]
      });
    }
  } catch (err) {
    throw new Error(err)
  }
  return allUsers.filter(user => user.email !== superAdminEmail)
}

export const getRequestedUsers = async (superAdminEmail, startDate, endDate, sortBy, order) => {
  let allUsers = []
  try {
    const db = await getFirestoreInstance()
    const users = await db.collection('users')
      .where(sortBy, '>', startDate)
      .where(sortBy, '<', endDate)
      .orderBy(sortBy, order)
      .get()
    if (users.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      users.forEach(doc => {
        allUsers = [...allUsers, doc.data()]
      });
    }
  } catch (err) {
    throw new Error(err)
  }
  return allUsers.filter(user => user.email !== superAdminEmail)
}

export const getUsersByKeyword = async (superAdminEmail, searchKeyword, searchFor, orderBy, order) => {
  let allUsers = []
  try {
    const db = await getFirestoreInstance()
    let users
    if (searchFor === 'accountSecret') {
      users = await db.collection('users')
        .where(searchFor, '>=', searchKeyword)
        .where(searchFor, '<=', `${searchKeyword}\uf8ff`)
        .orderBy('accountSecret', 'asc')
        .get()
    } else if (searchFor === 'invitationPatch') {
      users = await db.collection('users')
        .where('settings.invitationPatch', '>=', searchKeyword)
        .where('settings.invitationPatch', '<=', `${searchKeyword}\uf8ff`)
        .orderBy('settings.invitationPatch', order)
        .orderBy(orderBy, order)
        .get()
    } else if (searchFor === orderBy) {
      users = await db.collection('users')
        .where(searchFor, '>=', searchKeyword)
        .where(searchFor, '<=', `${searchKeyword}\uf8ff`)
        .orderBy(searchFor, order)
        .get()
    } else {
      users = await db.collection('users')
        .where(searchFor, '>=', searchKeyword)
        .where(searchFor, '<=', `${searchKeyword}\uf8ff`)
        .orderBy(searchFor, order)
        .orderBy(orderBy, order)
        .get()
    }
    if (users.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      users.forEach(doc => {
        allUsers = [...allUsers, doc.data()]
      });
    }
  } catch (err) {
    throw new Error(err)
  }
  return allUsers.filter(user => user.email !== superAdminEmail)
}

export const setUserClaims = async (userId, claim) => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    const userClaims = user.data().claims
    await db.collection('users').doc(userId).update({ claims: { ...userClaims, ...claim } })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const changeUserCreatedMethod = async userId => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('users').doc(userId).update({ method: 'invitation' })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateLoginDates = async userId => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    const firstLogin = user.data().firstLogin || new Date()
    await db.collection('users').doc(userId).update(
      { firstLogin, lastLogin: new Date() },
    )
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updatePackage = async (userId, packageType) => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    const userSettings = user.data().settings
    await db.collection('users').doc(userId).update({ settings: { ...userSettings, package: packageType } })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateUserSettings = async (userId, accountType, invitationCode, masterId, masterInvitationId) => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    const userSettings = user.data().settings
    await db.collection('users').doc(userId).update({
      settings: {
        ...userSettings, accountType, invitationCode, masterId: masterId || null, masterInvitationId: masterInvitationId || null,
      },
    })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const boardUser = async userId => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    const userSettings = user.data().settings
    await db.collection('users').doc(userId).update({
      settings: {
        ...userSettings, boarded: true,
      },
    })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateAccountActivity = async (userId, activeState) => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    const userSettings = user.data().settings
    await db.collection('users').doc(userId).update({ settings: { ...userSettings, active: activeState } })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const setWelcomeEmailSent = async userId => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    const userSettings = user.data().settings
    await db.collection('users').doc(userId).update({ settings: { ...userSettings, welcomeEmailSent: true } })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateEmail = async (userId, email) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('users').doc(userId).update({ email })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const setUserPref = async (userId, readerName, readerBirthDate) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('users').doc(userId).update({ readerName, readerBirthDate })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const setUserSettings = async (userId, claim) => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    const userSettings = user.data().settings
    await db.collection('users').doc(userId).update({ settings: { ...userSettings, ...claim } })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const setUserShopData = async (userId, shopData) => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    const userSettings = user.data().settings
    await db.collection('users').doc(userId).update({ settings: { ...userSettings, shopData } })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getUserById = async userId => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    if (user.exists) {
      const userData = user.data()
      return userData
    }
    return false
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getUserBySuffix = async suffix => {
  let userRes = []

  try {
    const db = await getFirestoreInstance()
    const users = await db.collection('users').where('urlSuffix', '==', suffix).get()
    if (users.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    users.forEach(doc => {
      userRes = [...userRes, doc.data()]
    })
  } catch (err) {
    throw new Error(err)
  }

  return userRes[0]
}

export const deleteUserById = async userId => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('users').doc(userId).get()
    if (user.exists) {
      await db.collection('users').doc(userId).delete()
    } else {
      // eslint-disable-next-line
      console.log('user doesnt exist');
    }
    return true
  } catch (err) {
    throw new Error(err.message)
  }
}
