import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD7Y3vb7mNdWMUZ5OPSKaKoXwos0EMlYSM",
    authDomain: "very-hot-burgers-c47ca.firebaseapp.com",
    databaseURL: "https://very-hot-burgers-c47ca-default-rtdb.europe-west1.firebasedatabase.app",
})

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;