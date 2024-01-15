import { getFirestoreInstance } from './firebase'

export const createOffer = async offerData => {
  try {
    const db = await getFirestoreInstance()
    db.collection('offers').doc().set({
      ...offerData,
    })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getOffers = async () => {
  let offers = []
  let offerData
  let offersRes

  try {
    const db = await getFirestoreInstance()
    offersRes = await db.collection('offers').orderBy('addedOn').get()
    offersRes.forEach(offer => {
      offerData = offer.data()
      offerData.id = offer.id
      offers = [...offers, offerData]
    })
  } catch (err) {
    throw new Error(err)
  }

  return offers
}

export const getOfferById = async offerId => {
  let offerData
  let offerRes

  try {
    const db = await getFirestoreInstance()
    offerRes = await db.collection('offers').doc(offerId).get()
    offerData = offerRes.data()
  } catch (err) {
    throw new Error(err)
  }

  return offerData
}

export const getOfferByUserId = async userId => {
  let offerRes = []

  try {
    const db = await getFirestoreInstance()
    const offers = await db.collection('offers').where('userId', '==', userId).get()
    if (offers.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    offers.forEach(doc => {
      offerRes = [...offerRes, doc.data()]
    })
  } catch (err) {
    throw new Error(err)
  }

  return offerRes[0]
}

export const updateOffer = async (offerId, updateData) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('offers').doc(offerId).update(updateData)
  } catch (err) {
    throw new Error(err.message)
  }
}

export const deleteOfferByCreatedDate = async addedOn => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('offers').where('addedOn', '==', addedOn).get().delete()
    return true
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
    throw new Error(err.message)
  }
}
