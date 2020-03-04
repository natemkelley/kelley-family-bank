const { v4: uuidv4 } = require('uuid');
const functions = require("firebase-functions");

//initialize admin (required for firestore)
const admin = require('firebase-admin');
admin.initializeApp();


exports.createUserDB = functions.auth.user().onCreate(async (user) => {
  console.log('A new user signed in for the first time', user.displayName);

  const uuid = uuidv4();
  const uid = user.uid;
  const displayName = user.displayName

  await admin.firestore().collection('users').doc(user.uid).set({
    timeCreated: admin.firestore.FieldValue.serverTimestamp(),
    familyName: null,
    familyUsername:null,
    creator:user.displayName,
    creatorEmail:user.email,
    uid:user.uid,
    familyPassword:null,
    finishedSetupTutorial:false,
    setupTutorial:{
      intro:false,
      names:false,
      familyName:false,
      familyUsername:false,
      familyPassword:false,
      numberOfKids:false,
      kidsSetup:false,
      acc401K:false,
      accSavings:false
    }
  });
  await admin.firestore().collection(`users/${uid}/profiles`).doc(uuid).set({
    uuid:uuid,
    displayName:displayName,
    nickname:null,
    email:user.email,
    profilePic:null,
    type:'parent'
  });
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});



