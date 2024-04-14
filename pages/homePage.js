import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js'
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js"


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
const database = getDatabase(app);
const auth = getAuth(app);

function logOut() {
    if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
    }
    signOut(auth).then(() => {
        window.location.href = '../index.html'
        alert('Logout Successful')
    }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

function validation(data) {
    let pwd = prompt("Please enter password to access", "");
    if(pwd === null) {
        window.location.href = '../index.html';
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
        }
    }else if(pwd !== data.toString()) {
        alert("Password is incorrect");
        validation(data);
    }
}

function getDataBaseValue() {
    const starCountRef = ref(database, 'password');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if(data) {
            validation(data);
        }
    });
}
getDataBaseValue()

document.getElementById('logOutBtn').addEventListener('click', logOut); 