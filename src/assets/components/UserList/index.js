import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import s from './UserList.module.scss';
import { Link } from 'react-router-dom';
import Firebase from '../../context/firebaseContext';

const UserList = (props) => {

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

    const deleteUser = (id) => {
        console.log('delete', id)
        const arr = [];
        const result = allUsers.filter(item => item.id !== id);
        setAllUsers(result);
        getUsersRef().set(result);        
    }

    return (
        <>
            <h2>User List</h2>
            <div>
                <button>
                    <Link to="user/new-user">
                        Новый пользователь
                    </Link>
                </button>
            </div>
            <div>
                {allUsers.map(item => (
                    <div key={item.id}>
                        <div>
                            {`${item.name} ${item.surname}`}
                        </div>
                        <div>
                            <button>
                                <Link to={`/user/${item.id}`}>
                                    Редактировать
                                </Link>
                            </button>
                            <button onClick={() => deleteUser(item.id)}>Удалить</button>
                        </div>
                    </div>    
                ))}                
            </div>
        </>
    );
}

export default UserList;