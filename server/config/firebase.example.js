import * as admin from 'firebase-admin';

const serviceAccount = { serviceAccountObject }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
  storageBucket: '<DATABASE_NAME>.appspot.com'
});

export default admin;