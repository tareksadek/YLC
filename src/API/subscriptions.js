import { loadStripe } from '@stripe/stripe-js'
import * as firebase from 'firebase/app'
import 'firebase/functions'
import { getFirestoreInstance } from './firebase'

export const getAllPackages = async () => {
  let allPackages = []

  try {
    const db = await getFirestoreInstance()
    const packages = await db.collection('packages').where('active', '==', true).get()
    if (packages.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      packages.forEach(doc => {
        const pack = doc.data()
        pack.id = doc.id
        allPackages = [...allPackages, pack]
      })
    }
  } catch (err) {
    throw new Error(err)
  }
  return allPackages
}

export const getProductById = async productId => {
  try {
    const db = await getFirestoreInstance()
    const product = await db.collection('packages').doc(productId).get()
    if (product.exists) {
      const productData = product.data()
      return productData
    }
    return false
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getPackagePrices = async () => {
  let allPackages = []

  try {
    const db = await getFirestoreInstance()
    const existingPackages = await getAllPackages()
    const packages = await db.collection('packages').doc(existingPackages[0].id).collection('prices').get()
    if (packages.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      packages.forEach(doc => {
        const pack = doc.data()
        pack.id = doc.id
        allPackages = [...allPackages, pack]
      })
    }
  } catch (err) {
    throw new Error(err)
  }
  return allPackages
}

export const getProductPricesById = async productId => {
  let allProducts = []

  try {
    const db = await getFirestoreInstance()
    const products = await db.collection('packages').doc(productId).collection('prices').get()
    if (products.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      products.forEach(doc => {
        const product = doc.data()
        product.id = doc.id
        allProducts = [...allProducts, product]
      })
    }
  } catch (err) {
    throw new Error(err)
  }
  return allProducts
}

// export const checkoutUser = async (userId, priceId, successUrl, cancelUrl) => {
//   try {
//     const db = await getFirestoreInstance()
//     db.collection('subscribers').doc(userId).collection('checkout_sessions').add({
//       price: priceId,
//       success_url: successUrl,
//       cancel_url: cancelUrl,
//       allow_promotion_codes: true,
//       // trial_from_plan: true,
//       // trial_end: parseInt(1579313395 / 1000, 10),
//       // trial_period_days: trialPeriod,
//     })
//       .then(docRef => {
//         docRef.onSnapshot(async snap => {
//           const { error, sessionId } = snap.data()
//           if (error) {
//             throw new Error()
//           }

//           if (sessionId) {
//             const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY)
//             await stripe.redirectToCheckout({ sessionId })
//           }
//         })
//       })
//   } catch (err) {
//     // console.log(err);
//     throw new Error()
//   }
// }

export const checkoutUser = async (userId, priceId, successUrl, cancelUrl, isSubscription) => {
  try {
    const db = await getFirestoreInstance()
    db.collection('subscribers').doc(userId).collection('checkout_sessions').add({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
    })
      .then(docRef => {
        docRef.onSnapshot(async snap => {
          const { error, sessionId } = snap.data()
          if (error) {
            throw new Error()
          }

          if (sessionId) {
            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY)
            await stripe.redirectToCheckout({ sessionId })
          }
        })
      })
  } catch (err) {
    throw new Error()
  }
}

export const getSubscribedUser = async userId => {
  let allSubscribers = []

  try {
    const db = await getFirestoreInstance()
    const subscriberDoc = await db.collection('subscribers').doc(userId).get()
    const subscriberDocData = subscriberDoc.data()
    const subscribers = await db.collection('subscribers').doc(userId)
      .collection('subscriptions').get()
    if (subscribers.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      allSubscribers = null
    } else {
      subscribers.forEach(doc => {
        const data = doc.data()
        data.stripeId = subscriberDocData.stripeId
        allSubscribers = [...allSubscribers, data]
      })
    }
  } catch (err) {
    throw new Error()
  }
  return allSubscribers
}

export const getOneTimeUser = async userId => {
  let allSubscribers = []

  try {
    const db = await getFirestoreInstance()
    const subscriberDoc = await db.collection('subscribers').doc(userId).get()
    const subscriberDocData = subscriberDoc.data()
    const subscribers = await db.collection('subscribers').doc(userId)
      .collection('payments').get()
    if (subscribers.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      allSubscribers = null
    } else {
      subscribers.forEach(doc => {
        const data = doc.data()
        data.stripeId = subscriberDocData.stripeId
        allSubscribers = [...allSubscribers, data]
      })
    }
  } catch (err) {
    throw new Error()
  }
  return allSubscribers
}

export const getAllSubscribersIds = async () => {
  let allIds = []

  try {
    const db = await getFirestoreInstance()
    const users = await db.collection('subscribers').get()
    if (users.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      users.forEach(doc => {
        allIds = [...allIds, doc.id]
      });
    }
  } catch (err) {
    throw new Error(err)
  }
  return allIds
}

// export const sendToCustomerPortal = async () => {
//   try {
//     const functionRef = firebase.default
//       .functions()
//       .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
//     const { data } = await functionRef({ returnUrl: window.location.origin });
//     window.location.assign(data.url);
//   } catch (err) {
//     console.log(err);
//   }
// }

export const sendToCustomerPortal = async () => {
  try {
    const functionRef = firebase
      .app()
      .functions('us-central1')
      .httpsCallable('ext-firestore-stripe-payments-createPortalLink');
    const { data } = await functionRef({
      returnUrl: window.location.origin,
    });
    window.location.assign(data.url);
  } catch (err) {
    throw new Error()
  }
}

export const deleteSubscriberById = async userId => {
  try {
    const db = await getFirestoreInstance()
    const subscriber = await db.collection('subscribers').doc(userId).get()
    if (subscriber.exists) {
      await db.collection('subscribers').doc(userId).delete()
    } else {
      // eslint-disable-next-line
      console.log('subscriber doesnt exist');
    }
    return true
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
    throw new Error(err.message)
  }
}
