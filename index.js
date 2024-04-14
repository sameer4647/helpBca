import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js'

const firebaseConfig = {
  apiKey: "AIzaSyBxYq3K8OUenwaiQ4tksSWUy_RD7BFbgMk",
  authDomain: "helpbca2.firebaseapp.com",
  databaseURL: "https://helpbca2-default-rtdb.firebaseio.com/",
  projectId: "helpbca2",
  storageBucket: "helpbca2.appspot.com",
  messagingSenderId: "564298688138",
  appId: "1:564298688138:web:2c11510b4181540896ef73",
  measurementId: "G-C959NHVDCB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let user = null;

document.getElementById('createAccountDiv').style.display = 'none'

function checkUser() {
    if (localStorage.getItem('user')) {
        window.location.href = "./pages/homePage.html"
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    checkUser()
});


function createAccount() {
    const emailId = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, emailId, password).then((userCredential) => {
        user = userCredential.user
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = "./pages/homePage.html"
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

function loginAccount() {
    const emailId = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;
    signInWithEmailAndPassword(auth, emailId, password).then((userCredential) => {
        user = userCredential.user
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = "./pages/homePage.html"
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

document.getElementById('crButton').addEventListener('click', createAccount);
document.getElementById('login').addEventListener('click', loginAccount);


document.getElementById('createAccountText').addEventListener('click', function () {
    document.getElementById('createAccountDiv').style.display = 'block';
    document.getElementById('loginAccountDiv').style.display = 'none';
})
document.getElementById('loginText').addEventListener('click', function () {
    document.getElementById('createAccountDiv').style.display = 'none';
    document.getElementById('loginAccountDiv').style.display = 'block';
})



