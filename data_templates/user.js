var firebasefunction = {
    "uid": "mBXM5cotsbYoC23ExMqlMc89fTH3",
    "email": "nmkelley@asu.edu",
    "emailVerified": true,
    "displayName": "Nate Kelley",
    "photoURL": "https://lh3.googleusercontent.com/a-/AAuE7mAdB_piCtK9XnqCC2eyBqWijFPeCKmYRa7un7Gq6A",
    "phoneNumber": null,
    "disabled": false,
    "passwordHash": null,
    "passwordSalt": null,
    "tokensValidAfterTime": null,
    "metadata": {
      "creationTime": "2020-02-25T20:32:16Z",
      "lastSignInTime": "2020-02-25T20:32:16Z"
    },
    "customClaims": {},
    "providerData": [{
      "displayName": "Nate Kelley",
      "email": "nmkelley@asu.edu",
      "photoURL": "https://lh3.googleusercontent.com/a-/AAuE7mAdB_piCtK9XnqCC2eyBqWijFPeCKmYRa7un7Gq6A",
      "providerId": "google.com",
      "uid": "101795255004324619827"
    }]
  }
  
  var passcodes=[{
    parents:[uuid],
    uuid:String,
    passcode:Number
  }];

  var familyUserNames;

  var myUser ={
    timeCreated:String,
    familyName:String,
    familyUsername:String,
    creator:String,
    uid:String,
    familyPassword:String,
    creatorEmail:String,
    profiles:{
      parents:[{
        uuid:String,
        firstName:String,
        lastName:String,
      }],
      kids:[{
        firstName:String,
        age:Number,
        birthMonth:Number,
        uuid:String,
        profilePic:String
      }]
    },
    accounts:[{
      type:'401k',
      accountName:String,
      purpose:String,
      kids:[uuid],
      withdrawDate:String,
      match:{
        status:Boolean,
        max:Number,
        period:'Year',
        maxGrowth:Number,
        APR:Percent
      }
    },
    {
      accountName:String,
      kids:[uuid],
      rate:Number,
      per:'Period',
      startingBalance:Number,
      maxReturnPer:'Period',
      accountLimit:Number
    }
  ],
    setupTutorial:{
      started:false,
      names:false,
      familyName:false,
      familyUsername:false,
      familyPassword:false,
      numberOfKids:false,
      kidsSetup:false,
      acc401K:false,
      accSavings:false
    }
  }