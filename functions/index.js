const { v4: uuidv4 } = require('uuid');
const functions = require("firebase-functions");

//initialize admin (required for firestore)
const admin = require('firebase-admin');
admin.initializeApp();


exports.createUserDB = functions.auth.user().onCreate(async (user) => {
  console.log('A new user signed in for the first time', user.displayName);

  const fullName = user.displayName || 'Anonymous';
  const uuid = uuidv4();

  await admin.firestore().collection('messages').add({
    name: fullName,
    email:user.email,
    uid:user.uid,
    timeCreated: admin.firestore.FieldValue.serverTimestamp(),
    dump: JSON.stringify(user),
    uuid:uuid
  });
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});



