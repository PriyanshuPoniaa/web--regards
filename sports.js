// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Elements
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const contentDiv = document.getElementById('content');
const authDiv = document.getElementById('auth');
const eventsDiv = document.getElementById('events');

// Login event
loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('User logged in:', userCredential.user);
            loadEvents();
        })
        .catch(error => {
            console.error('Error logging in:', error);
        });
});

// Register event
registerBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('User registered:', userCredential.user);
            loadEvents();
        })
        .catch(error => {
            console.error('Error registering:', error);
        });
});

// Logout event
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        console.log('User logged out');
        authDiv.style.display = 'block';
        contentDiv.style.display = 'none';
    });
});

// Load events
const loadEvents = () => {
    authDiv.style.display = 'none';
    contentDiv.style.display = 'block';
    db.collection('events').get().then(querySnapshot => {
        eventsDiv.innerHTML = '';
        querySnapshot.forEach(doc => {
            const event = doc.data();
            eventsDiv.innerHTML += `<div>${event.name} - ${event.location} - ${event.time}</div>`;
        });
    });
};

// Auth state listener
auth.onAuthStateChanged(user => {
    if (user) {
        loadEvents();
    } else {
        authDiv.style.display = 'block';
        contentDiv.style.display = 'none';
    }
});
