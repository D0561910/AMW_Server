import * as admin from 'firebase-admin';

const serviceAccount = {
    "type": "service_account",
    "project_id": "sqa-project-b2222",
    "private_key_id": "6545bbaa4108de49ac6212f0b69c9bbf1db238a7",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSRRnD9E4pQnLj\nKcVl8n5RvEot6bhBG3T9Bzb25ZJZOGNDE9UF4VJ+pym8Cwp4zc2lEAlgkIwXag/2\nO4KF4ZaXWyI/I74JiO+cIMeyh6Nyp2sUr9ZKO0gb7zs4ZEcVV5uasTQk3/dcA+Ml\nveMqwJWl2T67mBTwHHLym3+QB0nUKar7GChRBPFUgFi/ZKHnd0UV2+Qtr314Vmi3\n/RvFoNclSXwT39AithBi/bw8RVpJpV19zRV8D0UqWdFRbd/BEYpv5Ushj/TumLvL\n6zGul7eCCEXPeIlc0wnvfTuGzdkc60UoDASqgxcR3vyyVVGyOmwzwNpfOdHCOFWg\niMcdKgOhAgMBAAECggEAIl7CMeomto7SibhDuIDVThX5iBy6jgXnbw61WNE4xVW2\nv/mnafElU2eOplqlqQ527WK8LakjBRbEqiqbELhJrc7rP6ffgd580Cf5jICoYm7k\nTXrai8K57DsEEpktl1r9J+GMVPS5EbTe9cXespfNPlFO9EoNLhxwW6C4TroqQsAK\n8oJ8/54fiq7ABFPawTacq29RL4K2Prf2saUC0ege6cPFg4v0s0HQP9gvO4K+wgYJ\nOK+HTkNuIVDksOgwipZkWdQvYkeUCaGsJ0aphpVozElJWvHsy+/HjcxloSb3dPua\nRVC77HGCTbEMZYyD2U6H+dwXYpp9MaMju1lu+5bU2QKBgQDyoFQB72zx4Wr5/tGM\njBe7NKZx6T8ysdN7ICsMifMsEZnX9AdXCG+UTj1wGQpLy8eOX55xMWC9/3GDDjgE\nEIquo9RLxc1mxNsAUuacwrd3qTgGIKp/eQLC5m7YC+IwEaXPa36t1X2Lod1qmm1+\n/stHot4zm8B5ky/nGtfxJdHRTQKBgQDd3DITz3uOZV8TngKZKTQ3LpOfb/hVWgZL\nMj13gtJ2ZeNxnyvVO9CcbBwAY/H10r4glysX3TbmjECqdpGNq47IMjDS2bxPf9By\n9SINRju4HhDdHOGRpFQbdO4LmLrrTPCSEZo//nYSPMw3wlrzaJ1RUPhqgHgMAgzb\nGZZZgigRpQKBgQDOOSguXOskzIy44LYL2Cdzn1S6DZ8B39P5G2Z7yeU+19cDjw+O\nEkWEsNvXo/D0a8i6YtuxKl8oHy7EThmemtDFj8qqfP4RE9FxfQU2yOpYcySDUNCa\neKi4MFSWncMrSFS+8IdECeoj/PjN22SmRLtTsENdak03CLv2mwJgndyxIQKBgQDW\nBfOxNLjm11fu3sF2607Z5O64IhYYkG394It3XRaW7ReKpphsbfWC0K/6mG/0Ssbr\nPalurhKmOaqwRw2G83ccHX8ICNAmiRCXtW6SC6zUovx1scTQ8QvKKPTy7vVyxJhW\n8PAyx9EzKr9/EtkWc1c/+LKMWz5zpw6r1nU6B9uLmQKBgGdM3M6Kn7xZ3PB7hyBQ\nvtfe5jNXJEuFQz09OToAu/4/Hfvk55XktLTfiUXlqxvv4qJ+VH0/wKeFwd/gPHCy\nMKGU7q/xzYYSJ9DbpEvXpr6aYeZtQTkqNNnoua4/XZ09ciPUfYf6CAToAUT8xPS1\nmC77kaHFJCYWP+GIKXJBBWd0\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-qy4os@sqa-project-b2222.iam.gserviceaccount.com",
    "client_id": "115376012843567032063",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qy4os%40sqa-project-b2222.iam.gserviceaccount.com"
  }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sqa-project-b2222.firebaseio.com',
  storageBucket: 'sqa-project-b2222.appspot.com'
});

export default admin;