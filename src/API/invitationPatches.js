import { getFirestoreInstance } from './firebase'
import { generateRandomString } from '../utilities/utils'

export const getAllPatches = async () => {
  let patches = []
  let patchData
  let patchesRes

  try {
    const db = await getFirestoreInstance()
    patchesRes = await db.collection('patches').orderBy('createdOn').get()
    patchesRes.forEach(patch => {
      patchData = patch.data()
      patches = [...patches, patchData]
    })
  } catch (err) {
    throw new Error(err)
  }

  return patches
}

export const getPatchesByPackage = async packageType => {
  let patches = []
  let patchData
  let patchesRes

  try {
    const db = await getFirestoreInstance()
    patchesRes = await db.collection('patches').where('package', '==', packageType).orderBy('createdOn').get()
    patchesRes.forEach(patch => {
      patchData = patch.data()
      patches = [...patches, patchData]
    })
  } catch (err) {
    throw new Error(err)
  }

  return patches
}

export const getPatchByPatchId = async patchId => {
  try {
    const db = await getFirestoreInstance()
    const patch = await db.collection('patches').doc(patchId).get()
    if (patch.exists) {
      return patch.data()
    }
    return false
  } catch (err) {
    throw new Error(err.message)
  }
}

export const generatePatchCode = async (title, packageType, contains, productId, theme, store, alwaysPro, patchDocId) => {
  try {
    const code = patchDocId || generateRandomString()
    const today = new Date()
    const db = await getFirestoreInstance()
    const patchCode = await db.collection('patches').where('patchId', '==', code).get()
    let patchObj
    if (!patchCode.exists) {
      patchObj = {
        patchId: code,
        productId,
        patchTitle: title,
        status: 'ready',
        package: packageType,
        createdOn: today,
        contains,
        theme,
        store,
        alwaysPro,
      }
      db.collection('patches').doc(code).set(patchObj)
    }
    return patchObj
  } catch (err) {
    throw new Error(err.message)
  }
}

export const deletePatchById = async patchId => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('patches').doc(patchId).delete()
    return true
  } catch (err) {
    throw new Error(err.message)
  }
}

export const changePatchTitle = async (patchId, patchTitle) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('patches').doc(patchId).update({ patchTitle })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const changePatchStatus = async (patchId, status) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('patches').doc(patchId).update({ status })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updatePatchInvitations = async (type, invitationNum, patchId) => {
  try {
    const db = await getFirestoreInstance()
    const patch = await db.collection('patches').doc(patchId).get()
    const currentInvitationsCount = patch.data().contains
    if (type === 'add') {
      await db.collection('patches').doc(patchId).update({ contains: Number(currentInvitationsCount) + Number(invitationNum) })
    } else if (type === 'subtract') {
      await db.collection('patches').doc(patchId).update({ contains: Number(currentInvitationsCount) - Number(invitationNum) })
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const addPatchMaster = async (patchId, masterId) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('patches').doc(patchId).update({ masterId })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updatePatch = async (patchId, updateData) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('patches').doc(patchId).update(updateData)
  } catch (err) {
    throw new Error(err.message)
  }
}
