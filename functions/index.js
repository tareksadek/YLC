const functions = require('firebase-functions')
const admin = require('firebase-admin')
const dateFns = require('date-fns')

admin.initializeApp()

exports.getUser = functions.https.onCall(async data => {
  let user = null
  try {
    user = await admin.auth().getUserByEmail(data.email)
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return user
})

exports.addSuperAdminRole = functions.https.onCall(async data => {
  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, superAdmin: true } : { superAdmin: true }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
      stripeRole: 'subscriber'
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} has been made a superAdmin.`,
    },
  }
})

exports.addTeamMasterRole = functions.https.onCall(async data => {
  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, isMaster: true } : { isMaster: true }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} has been made a superAdmin.`,
    },
  }
})

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  if (context.auth.token.claims.superAdmin !== true) {
    return {
      message: {
        type: 'error',
        body: 'Only super admin can create admins, sucker!',
      },
    }
  }

  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, admin: true } : { admin: true }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} has been made an admin.`,
    },
  }
})

exports.disableAdminRole = functions.https.onCall(async (data, context) => {
  if (context.auth.token.claims.superAdmin !== true) {
    return {
      error: 'Only super admin can disable admins, sucker!',
    }
  }

  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, admin: false } : { admin: false }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} has been disabled as admin.`,
    },
  }
})

exports.addSubscriberRole = functions.https.onCall(async data => {
  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, subscriber: true } : { subscriber: true }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} is subscribed.`,
    },
  }
})

exports.disableSubscriberRole = functions.https.onCall(async data => {
  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, subscriber: false } : { subscriber: false }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} has been disabled as subscriber.`,
    },
  }
})

exports.createUser = functions.https.onCall(async (data, context) => {
  if (context.auth.token.claims.superAdmin !== true) {
    return {
      message: {
        type: 'error',
        body: 'Only super admin can create users, sucker!',
      },
    }
  }

  try {
    const user = await admin.auth().createUser(data)
    return user
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }
})

exports.updateUserData = functions.https.onCall(async (data, context) => {
  if (context && context.auth.token.claims.superAdmin !== true) {
    return {
      message: {
        type: 'error',
        body: 'Only super admin can change user email, sucker!',
      },
    }
  }

  try {
    const user = await admin.auth().updateUser(data.userId, { email: data.email })
    console.log('user logs');
    console.log(user);
    return user
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }
})

exports.deleteUser = functions.https.onCall(async (uid, context) => {
  if (context.auth.token.claims.superAdmin !== true) {
    return {
      message: {
        type: 'error',
        body: 'Only super admin can delete users, sucker!',
      },
    }
  }

  try {
    await admin.auth().deleteUser(uid)
    return {
      message: {
        type: 'success',
        body: `user deleted successfully.`,
      },
    }
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }
})

exports.deleteTeamMemberUser = functions.https.onCall(async (data, context) => {
  if (context.auth.uid !== data.masterId) {
    return {
      message: {
        type: 'error',
        body: 'Only master can delete his team members user.',
      },
    }
  }

  try {
    await admin.auth().deleteUser(data.memberId)
    return {
      message: {
        type: 'success',
        body: `user deleted successfully.`,
      },
    }
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }
})

const generateRandomNumber = () => Math.floor(1000000000000 + Math.random() * 9000000000000).toString()

exports.readOrders = functions.https.onRequest(async (request, response) => {
  let code
  let childInvitationObj
  const orderId = new Number(request.body.id).toString()
  const orderItems = request.body.line_items.map(item => {
    return {
      itemId: item.id,
      itemName: item.name,
      itemQantity: item.quantity,
    }
  })
  const orderItemsCount = request.body.line_items.reduce((accumulator, current) => accumulator + current.quantity, 0);
  const orderData = {
    orderId: orderId,
    orderQuantity: orderItemsCount,
    orderName: request.body.name,
    proccessedAt: Date.parse(request.body.processed_at),
    user: {
      firstName: request.body.customer.first_name,
      lastName: request.body.customer.last_name,
      email: request.body.customer.email,
    },
    items: orderItems,
  }
  const parentInvitationObj = {
    code: orderId,
    type: orderItemsCount > 1 ? 'parent' : 'single',
    expirationDate: dateFns.addDays(new Date(), 364),
    used: false,
    usedBy: null,
    usedOn: null,
    childInvitations: orderItemsCount > 1 ? [] : null,
    package: orderItemsCount > 1 ? 'corporate' : 'individual',
  }
  try {
    const orderDocument = await admin.firestore().collection('orders').doc(orderId).get()
    const childInvitations = orderItemsCount > 1 ? [] : null
    if (!orderDocument.exists) {
      await admin.firestore().collection('orders').doc(orderId).set(orderData)

      if (orderItemsCount > 1) {
        for (let step = 0; step < orderItemsCount - 1; step++) {
          code = generateRandomNumber()
          childInvitationObj = {
            code: code,
            type: 'child',
            expirationDate: dateFns.addDays(new Date(), 364),
            used: false,
            usedBy: null,
            usedOn: null,
            parentInvitation: orderId,
            package: 'individual',
          }
          await admin.firestore().collection('invitations').doc(code).set(childInvitationObj)
          await childInvitations.push({ code: code, usedBy: null, usedOn: null })
        }
      }
      parentInvitationObj.childInvitations = childInvitations
      await admin.firestore().collection('invitations').doc(orderId).set(parentInvitationObj)
    }
    response.send("200")
  } catch (err) {
    response.send("500")
  }
})

exports.countVisits = functions.firestore
  .document('cards/{cardId}/visits/{visitId}')
  .onCreate((snap, context) => {
    const cardId = context.params.cardId

    const cardRef = admin.firestore().collection('cards').doc(cardId);
    return cardRef.update({
      visits: admin.firestore.FieldValue.increment(1),
      allProfilesVisits: admin.firestore.FieldValue.increment(1),
    })
})

exports.addAlwayProRole = functions.https.onCall(async data => {
  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, alwaysPro: true } : { alwaysPro: true }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} has been made a pro.`,
    },
  }
})

exports.countConnections = functions.firestore
  .document('cards/{cardId}/connections/{connectionId}')
  .onCreate((snap, context) => {
    const cardId = context.params.cardId
    const connectionData = snap.data()

    const isVisitorConnection = !connectionData.addedByOwner
    
    const cardRef = admin.firestore().collection('cards').doc(cardId)
    return cardRef.update({
      connectionsCount: admin.firestore.FieldValue.increment(1),
      uniqueConnectionsCount: isVisitorConnection ? admin.firestore.FieldValue.increment(1) : admin.firestore.FieldValue.increment(0),
    })
  })
