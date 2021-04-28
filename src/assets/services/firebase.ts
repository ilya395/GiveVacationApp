import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

class Firebase {
    auth: firebase.auth.Auth;
    database: firebase.database.Database;
    userUid: null;
    constructor() {
        firebase.initializeApp(firebaseConfig); // инициализируем firebase с конфигом

        this.auth = firebase.auth();
        this.database = firebase.database();
        this.userUid = null;
    }

    signWithEmail = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

    // методы для работы с бд
    getRolesRef = () => this.database.ref('/roles/');
    getYearsRef = () => this.database.ref('/years/');
    getDepartmentsRef = () => this.database.ref('/departments/');
    getUsersRef = () => this.database.ref('/users/');
    getVacationsRef = () => this.database.ref('/vacations/');

    requestRef = (str: string) => this.database.ref(str);
}

const InstanseFirebase = new Firebase();

export default InstanseFirebase;