import React, { useState, useEffect, useContext } from 'react';
// import cn from 'classnames';
// import s from './UserList.module.scss';

import Firebase from '../../context/firebaseContext';
import { Link } from 'react-router-dom';

const VacationList = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allVacations, setAllVacations] = useState([]);

    const { getUsersRef, getDepartmentsRef, getVacationsRef } = useContext(Firebase);

    useEffect(async () => {
        await getUsersRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllUsers(res));

        await getDepartmentsRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllDepartments(res));

        await getVacationsRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllVacations(res));

    }, []); // allUsers, allDepartments, allVacations, login

    // const {} = props;
    const deleteVacation = (id) => {
        console.log('delete', id)
        const arr = [];
        const result = allVacations.filter(item => item.id !== id);
        setAllVacations(result);
        getVacationsRef().set(result);
    }

    return (
        <>
            <h2>Vacation List</h2>
            <div>
                <button>
                    <Link to="vacation/new-vacation">
                        Добавить отпуск
                    </Link>
                </button>
            </div>
            <div>
                {allVacations.map(item => (
                    <div key={item.id}>
                        <div>
                            {item.user_id}
                        </div>
                        <div>
                            <button>
                                <Link to={`vacation/${item.id}`}>
                                    Редактировать
                                </Link>
                            </button>
                            <button onClick={() => deleteVacation(item.id)}>Удалить</button>
                        </div>
                    </div>    
                ))}
            </div>
        </>
    );
}

export default VacationList;