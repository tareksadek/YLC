const admin = require('firebase-admin');
const serviceAccount = require('./ylc-teams-firebase-adminsdk-t9b2t-368f0ce70b.json');

const fireInit = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ylc-teams.firebaseio.com',
})

export default fireInit
