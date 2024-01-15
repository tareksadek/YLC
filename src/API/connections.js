import { getFirestoreInstance } from './firebase'

export const createConnection = async (userId, connectionData) => {
  try {
    const db = await getFirestoreInstance()
    const addedConnection = await db.collection('cards').doc(userId)
      .collection('connections')
      .add({
        userId,
        ...connectionData,
      })
    return addedConnection
  } catch (err) {
    throw new Error(err.message)
  }
}

export const connectionClaimedOffer = async (userId, connectionData) => {
  let allConnections = []
  try {
    const db = await getFirestoreInstance()
    const connections = await db.collection('cards').doc(userId)
      .collection('connections')
      .where('email', '==', connectionData.email)
      .get()
    if (!connections.empty) {
      connections.forEach(doc => {
        allConnections = [...allConnections, { ...doc.data(), id: doc.id }]
      })
      const targetConnection = allConnections[0]
      const connectionId = targetConnection.id
      await db.collection('cards').doc(userId)
        .collection('connections')
        .doc(connectionId)
        .update(connectionData)
    } else {
      await db.collection('cards').doc(userId)
        .collection('connections')
        .add({
          userId,
          ...connectionData,
        })
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getCardConnections = async userId => {
  let allConnections = []

  try {
    const db = await getFirestoreInstance()
    const connections = await db.collection('cards').doc(userId)
      .collection('connections')
      .orderBy('addedOn', 'desc')
      .get()
    if (connections.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      connections.forEach(doc => {
        allConnections = [...allConnections, { ...doc.data(), id: doc.id }]
      })
    }
  } catch (err) {
    throw new Error(err)
  }
  return allConnections
}

export const getCardConnectionsTotal = async userId => {
  let connectionsLength = 0

  try {
    const db = await getFirestoreInstance()
    const connections = await db.collection('cards').doc(userId)
      .collection('connections')
      .get()
    if (connections.empty) {
      // eslint-disable-next-line
      connectionsLength = 0
    } else {
      connectionsLength = connections.size
    }
  } catch (err) {
    throw new Error(err)
  }
  return connectionsLength
}

export const getConnectionByEmail = async (userId, connectionEmail) => {
  let connectionRes = []

  try {
    const db = await getFirestoreInstance()
    const connections = await db.collection('cards').doc(userId)
      .collection('connections')
      .where('email', '==', connectionEmail)
      .get()
    if (connections.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      return false
    }
    connections.forEach(connection => {
      connectionRes = [...connectionRes, connection.data()]
    })
  } catch (err) {
    throw new Error(err)
  }

  return connectionRes[0]
}

export const updateConnectionById = async (userId, connectionId, updateData) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('cards').doc(userId)
      .collection('connections')
      .doc(connectionId)
      .update(updateData)
  } catch (err) {
    throw new Error(err.message)
  }
}

export const deleteConnectionById = async (userId, connectionId) => {
  try {
    const db = await getFirestoreInstance()
    const connection = await db.collection('cards').doc(userId)
      .collection('connections')
      .doc(connectionId)
      .get()
    if (connection.exists) {
      await db.collection('cards').doc(userId)
        .collection('connections')
        .doc(connectionId)
        .delete()
    } else {
      // eslint-disable-next-line
      console.log('connection doesnt exist');
    }
    return true
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getConnectionForms = async () => {
  let allConnectionForms = []

  try {
    const db = await getFirestoreInstance()
    const connectionForms = await db.collection('connectionForms').where('isActive', '==', true).get()
    if (connectionForms.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      connectionForms.forEach(doc => {
        allConnectionForms = [...allConnectionForms, { ...doc.data(), id: doc.id.trim() }]
      })
    }
  } catch (err) {
    throw new Error(err)
  }
  return allConnectionForms
}

export const getConnectionSettings = async userId => {
  let settings
  let settingsData = null
  let settingsDocId = null

  try {
    const db = await getFirestoreInstance()
    const settingsDoc = await db.collection('cards').doc(userId)
      .collection('connectionSettings')
      .get()
    if (settingsDoc.docs && settingsDoc.docs.length > 0) {
      settingsDoc.docs.forEach(doc => {
        settingsDocId = doc.id
      })
      settings = await db.collection('cards').doc(userId)
        .collection('connectionSettings')
        .doc(settingsDocId)
        .get()
      settingsData = settings.data()
    }
  } catch (err) {
    throw new Error(err)
  }

  return settingsData
}

export const getDefaultFormId = async () => {
  let allForms = []
  let formId = null
  try {
    const db = await getFirestoreInstance()
    const forms = await db.collection('connectionForms')
      .where('isDefault', '==', true)
      .get()
    if (!forms.empty) {
      forms.forEach(doc => {
        allForms = [...allForms, { ...doc.data(), id: doc.id }]
      })
      const targetForm = allForms[0]
      formId = targetForm.id
    }
  } catch (err) {
    throw new Error(err.message)
  }
  return formId
}

export const updateConnectionSettings = async (userId, settingsData) => {
  let settingsDocId = null
  try {
    const db = await getFirestoreInstance()
    const settingsDoc = await db.collection('cards').doc(userId)
      .collection('connectionSettings')
      .get()
    if (settingsDoc.docs && settingsDoc.docs.length > 0) {
      settingsDoc.docs.forEach(doc => {
        settingsDocId = doc.id
      })
    }
    if (settingsDocId) {
      await db.collection('cards').doc(userId)
        .collection('connectionSettings')
        .doc(settingsDocId)
        .update(settingsData)
    } else {
      const addedSettings = await db.collection('cards').doc(userId)
        .collection('connectionSettings')
        .add({
          userId,
          ...settingsData,
        })
      return addedSettings
    }
    return true
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateEmbedForm = async (userId, embedData) => {
  let settingsDocId = null
  try {
    const db = await getFirestoreInstance()
    const settingsDoc = await db.collection('cards').doc(userId)
      .collection('connectionSettings')
      .get()
    if (settingsDoc.docs && settingsDoc.docs.length > 0) {
      settingsDoc.docs.forEach(doc => {
        settingsDocId = doc.id
      })
    }
    if (settingsDocId) {
      await db.collection('cards').doc(userId)
        .collection('connectionSettings')
        .doc(settingsDocId)
        .update({ embedForm: embedData })
    } else {
      const addedSettings = await db.collection('cards').doc(userId)
        .collection('connectionSettings')
        .add({
          userId,
          embedForm: embedData,
        })
      return addedSettings
    }
    return true
  } catch (err) {
    throw new Error(err.message)
  }
}

export const createConnectionTag = async (userId, tagData) => {
  try {
    const db = await getFirestoreInstance()
    const addedTag = await db.collection('cards').doc(userId)
      .collection('connectionTags')
      .add({
        userId,
        ...tagData,
      })
    return addedTag.id
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getConnectionTags = async userId => {
  let tags = []
  let tagData
  let tagsRes

  try {
    const db = await getFirestoreInstance()
    tagsRes = await db.collection('cards').doc(userId)
      .collection('connectionTags')
      .orderBy('value', 'desc')
      .get()
    if (tags.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
    } else {
      tagsRes.forEach(tag => {
        tagData = tag.data()
        tagData.id = tag.id
        tags = [...tags, tagData]
      })
    }
  } catch (err) {
    throw new Error(err)
  }

  return tags
}

export const getConnectionTagById = async (userId, tagId) => {
  let tagData
  let tagRes

  try {
    const db = await getFirestoreInstance()
    tagRes = await db.collection('cards').doc(userId)
      .collection('connectionTags')
      .doc(tagId)
      .get()
    tagData = tagRes.data()
  } catch (err) {
    throw new Error(err)
  }

  return tagData
}

export const updateTagCount = async (userId, tagId) => {
  try {
    const db = await getFirestoreInstance()
    const tag = await db.collection('cards').doc(userId)
      .collection('connectionTags')
      .doc(tagId)
      .get()
    const tagCount = tag.data().count
    await db.collection('cards').doc(userId)
      .collection('connectionTags')
      .doc(tagId)
      .update({ count: tagCount + 1 })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getConnectionTagByValue = async (userId, tagValue) => {
  let tagRes
  let allTags = []

  try {
    const db = await getFirestoreInstance()
    tagRes = await db.collection('cards').doc(userId)
      .collection('connectionTags')
      .where('value', '==', tagValue)
      .get()
    if (tagRes.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      allTags = null
    } else {
      tagRes.forEach(doc => {
        allTags = [...allTags, doc.data()]
      })
    }
  } catch (err) {
    throw new Error(err)
  }

  return allTags
}

export const updateConnectionTag = async (userId, tagId, tagValue, tagColor) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('cards').doc(userId)
      .collection('connectionTags')
      .doc(tagId)
      .update({ value: tagValue, display: tagValue, color: tagColor })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const deleteConnectionTagById = async (userId, tagId) => {
  try {
    const db = await getFirestoreInstance()
    const tag = await db.collection('cards').doc(userId)
      .collection('connectionTags')
      .doc(tagId)
      .get()
    if (tag.exists) {
      await db.collection('cards').doc(userId)
        .collection('connectionTags')
        .doc(tagId)
        .delete()
    } else {
      // eslint-disable-next-line
      console.log('tag doesnt exist');
    }
    return true
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateConnectionTagCount = async (userId, tagId) => {
  try {
    const db = await getFirestoreInstance()
    const tag = await db.collection('cards').doc(userId)
      .collection('connectionTags')
      .doc(tagId)
      .get()
    const tagCount = tag.data().count
    await db.collection('cards').doc(userId)
      .collection('connectionTags')
      .doc(tagId)
      .update({ count: tagCount + 1 })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getAssignedTags = async userId => {
  let tagsRes = []
  try {
    const db = await getFirestoreInstance()
    const assignedTags = await db.collection('cards').doc(userId)
      .collection('assignedTags')
      .get()
    if (assignedTags.empty) {
      // eslint-disable-next-line
      console.log('No matching documents.')
      tagsRes = null
    } else {
      assignedTags.forEach(doc => {
        tagsRes = [...tagsRes, { ...doc.data(), id: doc.id }]
      })
    }
  } catch (err) {
    throw new Error(err.message)
  }
  return tagsRes
}

export const assignTags = async (userId, formId, tags) => {
  let tagsRes = []
  let tagData
  try {
    const db = await getFirestoreInstance()
    const assignedTags = await db.collection('cards').doc(userId)
      .collection('assignedTags')
      .where('formId', '==', formId)
      .get()
    if (assignedTags.empty) {
      await db.collection('cards').doc(userId)
        .collection('assignedTags')
        .add({
          userId,
          ...tags,
        })
    } else {
      assignedTags.forEach(tag => {
        tagData = tag.data()
        tagData.id = tag.id
        tagsRes = [...tagsRes, tagData]
      })
      const tagDocId = tagsRes[0].id
      await db.collection('cards').doc(userId)
        .collection('assignedTags')
        .doc(tagDocId)
        .update(tags)
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const assignConnectionTags = async (userId, connectionId, tags, tagsDisplay) => {
  try {
    const db = await getFirestoreInstance()
    await db.collection('cards').doc(userId)
      .collection('connections')
      .doc(connectionId)
      .update({ tags, tagsDisplay })
  } catch (err) {
    throw new Error(err.message)
  }
}
