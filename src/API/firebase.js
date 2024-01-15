import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import * as vars from '../utilities/appVars'

export const firebaseApp = firebase.initializeApp(vars.FIREBASE_CONFIG)

// export const db = firebaseApp.firestore()

// export const dbFunctions = firebaseApp.functions()

export const getFirestoreInstance = async () => {
  if (!firebaseApp.firestore) {
    await import('firebase/firestore');
  }

  return firebaseApp.firestore();
}

export const getFirebaseAuth = async () => {
  if (!firebaseApp.auth) {
    await import('firebase/auth');
  }

  return firebaseApp.auth();
}

export const getFirebaseFunctions = async () => {
  if (!firebaseApp.functions) {
    await import('firebase/functions');
  }

  return firebaseApp.functions();
}

export const getFirebaseStorage = () => firebaseApp.storage()
