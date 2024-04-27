import {initializeApp} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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

  const signUp = async () => {
    const signupName = document.getElementById('name'); 
    const signupEmail = document.getElementById('email'); 
    const signupPassword = document.getElementById('password'); 

    createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
    .then(userCredential => {
        addData(signupName, signupEmail, signupPassword)
        .then(() => {
            console.log("User registered with additional info");
        })
    })
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Error: " + errorMessage);
    });
}

  
   let user_list = collection (db, "user_list");
   console.log (db)
  
   async function addData(name, email, password) {
    await addDoc(user_list, {
        FullName: name.value,  
        Email: email.value,    
        Password: password.value 
    })
    .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        alert("User creation successful");
        name.value = '';  
        email.value = ''; 
        password.value = ''; 
    })
    .catch(error => {
        console.error("Failed to add user data: ", error);
        alert("Failed to add user data: " + error.message);
    });
}

       

  const signUpButton = document.getElementById('signUpButton');
if (signUpButton) {
    signUpButton.addEventListener('click', signUp);
}