import {initializeApp} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {getFirestore, getDocs, collection, doc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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

const signOutBtn = document.getElementById('signOutBtn');
if (signOutBtn) {
    signOutBtn.addEventListener('click', handleSignOut);
}

onAuthStateChanged(auth, user => {
  if (user) {
    displayUserTable();
  } else {
    window.location.href = 'index.html';
  }
});

async function deleteUser(userId) {
    const userDoc = doc(db, "user_list", userId); 
    deleteDoc(userDoc)
      .then(() => {
        console.log("Document deleted with ID: ", userId);
        displayUserTable();
      })
      .catch(error => {
        console.error("Error deleting document: ", error);
      });
}

function handleSignOut() {
  signOut(auth)
      .then(() => {
          console.log("The user has logged out");
          alert("The user has successfully logged out");
      })
      .catch(error => {
          console.log(error.code, error.message);
          alert(error.message);
      });
}

async function displayUserTable() {
  const tableBody = document.getElementById("user_list"); 
  tableBody.innerHTML = "";

  getDocs(collection(db, "user_list")) 
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = doc.data();
        const row = document.createElement("tr");

        const fullNameCell = document.createElement("td");
        fullNameCell.textContent = data.FullName; 
        row.appendChild(fullNameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = data.Email; 
        row.appendChild(emailCell);

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener('click', () => deleteUser(doc.id));
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error getting documents: ", error);
    });
}

const checkAuthState = () => {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      console.log("User is signed in");
    } else {
      console.log("User is signed out");
      window.location.href = 'index.html'; 
    }
  });
};

checkAuthState();






 



