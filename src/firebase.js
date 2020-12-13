import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
  apiKey: 'AIzaSyD_lKrgoW-536I0P5z-032DVqv0C5q3rOo',
  authDomain: 'fettle-tracker.firebaseapp.com',
  databaseURL: 'https://fettle-tracker-default-rtdb.firebaseio.com',
  projectId: 'fettle-tracker',
  storageBucket: 'fettle-tracker.appspot.com',
  messagingSenderId: '1001921941259',
  appId: '1:1001921941259:web:5d05485ce2581dd0579c0e',
  measurementId: 'G-RQS3KSBC87',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
