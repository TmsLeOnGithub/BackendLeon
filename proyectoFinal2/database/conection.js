import admin from "firebase-admin";
import * as firebaseConfig from "../firebase_config.json";

//const admin= admin()//?????

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
});

const conect= async ()=>{
  try{
    db= admin.firestore();
    console.log('Firebase conectado')
    return db
  }
  catch{
    console.log ('EROR AL CONECTARSE A FIREBASE', e)
  }
}

module.exports = conect;