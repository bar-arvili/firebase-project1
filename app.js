import {initializeApp} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {getAuth, signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyClSvA2B2cqSbSzKxeSdcs7aINonQfBU5g",
    authDomain: "fir-project-c88ae.firebaseapp.com",
    projectId: "fir-project-c88ae",
    storageBucket: "fir-project-c88ae.appspot.com",
    messagingSenderId: "181903023191",
    appId: "1:181903023191:web:bd167e29366cca35cc5712"
  };


  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  const auth = getAuth(app);

const signIn = async () => {

  const signInEmail = document.getElementById('login-email').value;
  const signInPassword = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, signInEmail, signInPassword)
  .then((Approval) => {
    const user = Approval.user;
    console.log(user);
    alert("user successfully logged in");
    window.location.href = 'users.html'; 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    alert("Error: " + errorMessage);
  });
  }


const signInButton = document.getElementById('signInButton');
if (signInButton) {
    signInButton.addEventListener('click', signIn)
}

onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = 'users.html'; 
  } else {
    window.location.href = 'index.html'; 
  }
});

