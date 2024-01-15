import { getFirestoreInstance } from './firebase'

export const createCounter = async (userId, counterData) => {
  try {
    const db = await getFirestoreInstance()
    const counter = await db.collection('counter').doc(userId).get()
    if (!counter.exists) {
      db.collection('counter').doc(userId).set({
        userId,
        ...counterData,
      })
    }
    return counter.exists
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getCounterBySuffix = async suffix => {
  let countersRes = []

  try {
    const db = await getFirestoreInstance()
    const counters = await db.collection('counter').where('urlSuffix', '==', suffix).get()
    if (counters.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    counters.forEach(doc => {
      countersRes = [...countersRes, doc.data()]
    })
  } catch (err) {
    throw new Error(err)
  }

  return countersRes[0]
}

export const getCounterById = async counterId => {
  let counterData
  let counterRes

  try {
    const db = await getFirestoreInstance()
    counterRes = await db.collection('counter').doc(counterId).get()
    counterData = counterRes.data()
  } catch (err) {
    throw new Error(err)
  }

  return counterData
}

export const countCardClicks = async suffix => {
  let countersRes = []

  try {
    const db = await getFirestoreInstance()
    const counters = await db.collection('counter').where('urlSuffix', '==', suffix).get()
    if (counters.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    counters.forEach(doc => {
      countersRes = [...countersRes, doc.data()]
    })
    const clicked = countersRes[0].clickedNo || 0
    await db.collection('counter').doc(countersRes[0].userId).update({ clickedNo: clicked + 1 })
  } catch (err) {
    throw new Error(err)
  }

  return countersRes[0]
}

export const createUserCounter = async (urlSuffix, userUID) => {
  const counterData = {
    urlSuffix,
    clickedNo: 0,
  }
  const counterExists = await createCounter(userUID, counterData)
  return counterExists
}

export const deleteCounterById = async userId => {
  try {
    const db = await getFirestoreInstance()
    const user = await db.collection('counter').doc(userId).get()
    if (user.exists) {
      await db.collection('counter').doc(userId).delete()
    } else {
      // eslint-disable-next-line
      console.log('counter doesnt exist');
    }
    return true
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
    throw new Error(err.message)
  }
}
