import { getFirestoreInstance } from './firebase'

export const getMilestones = async () => {
  let milestones = []
  let milestonesData
  let milestonesRes

  try {
    const db = await getFirestoreInstance()
    milestonesRes = await db.collection('milestones').orderBy('goal').get()
    milestonesRes.forEach(card => {
      milestonesData = card.data()
      milestonesData.id = card.id
      milestones = [...milestones, milestonesData]
    })
  } catch (err) {
    throw new Error(err)
  }

  return milestones
}
