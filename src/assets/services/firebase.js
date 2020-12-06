import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCcY9SjOgc7yL6UihqaIq0wwlULYGIBnmM",
    authDomain: "vacations-app-9686b.firebaseapp.com",
    databaseURL: "https://vacations-app-9686b.firebaseio.com",
    projectId: "vacations-app-9686b",
    storageBucket: "vacations-app-9686b.appspot.com",
    messagingSenderId: "533684716413",
    appId: "1:533684716413:web:b66c494c733440e3b5c214",
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_DATABASE_URL,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_APP_ID
};

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig); // инициализируем firebase с конфигом

        this.auth = firebase.auth();
        this.database = firebase.database();
        this.userUid = null;
    }

    signWithEmail = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    // методы для работы с бд
    getDepartmentsRef = () => this.database.ref('/departments/');
    getUsersRef = () => this.database.ref('/users/');
    getVacationsRef = () => this.database.ref('/vacations/');

    requestRef = (str) => this.database.ref(str);
}

export default Firebase;