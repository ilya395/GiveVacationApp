import React from 'react';

import InstanseFirebase from '../services/firebase';

export type FirebaseContextType = typeof InstanseFirebase
// {
//     getUsersRef, 
//     getDepartmentsRef, 
//     getVacationsRef, 
//     getYearsRef
//     auth
// }
 
const FirebaseContext = React.createContext<FirebaseContextType | null>(null);

export default FirebaseContext;