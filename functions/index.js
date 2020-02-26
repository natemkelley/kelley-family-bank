const functions = require("firebase-functions");

//initialize admin (required for firestore)
const admin = require('firebase-admin');
admin.initializeApp();


exports.createUserDB = functions.auth.user().onCreate(async (user) => {
  console.log('A new user signed in for the first time', user.displayName);

  const fullName = user.displayName || 'Anonymous';

  await admin.firestore().collection('messages').add({
    name: 'Firebase Bot',
    text: `${fullName} signed in for the first time! Welcome!`,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    dump: user
  });
  console.log('Welcome message written to database.');
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});



