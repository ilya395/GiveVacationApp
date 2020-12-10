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
        // if (allUsers.length == 0 && allDepartments.length == 0 && allVacations.length == 0) {
        //     await getUsersRef()
        //         .once('value')
        //         .then(response => response.val())
        //         .then(res => setAllUsers(res))
        //         .catch(e => console.log(e))
        //         .finally(() => console.log('сходили за юзерами', allUsers))

        //     await getDepartmentsRef()
        //         .once('value')
        //         .then(response => response.val())
        //         .then(res => setAllDepartments(res))
        //         .catch(e => console.log(e))
        //         .finally(() => console.log('сходили за отделами', allDepartments))

        //     await getVacationsRef()
        //         .once('value')
        //         .then(response => response.val())
        //         .then(res => setAllVacations(res))
        //         .catch(e => console.log(e))
        //         .finally(() => console.log('сходили за отпусками', allVacations))
        // }

        if (allUsers.length == 0) {
            await getUsersRef()
                .once('value')
                .then(response => response.val())
                .then(res => setAllUsers(res))
                .catch(e => console.log(e))
                .finally(() => console.log('сходили за юзерами', allUsers));
        }

        if (allDepartments.length == 0) {
            await getDepartmentsRef()
                .once('value')
                .then(response => response.val())
                .then(res => setAllDepartments(res))
                .catch(e => console.log(e))
                .finally(() => console.log('сходили за отделами', allDepartments))
        }
        
        if (allVacations.length == 0) {
            await getVacationsRef()
                .once('value')
                .then(response => response.val())
                .then(res => setAllVacations(res))
                .catch(e => console.log(e))
                .finally(() => console.log('сходили за отпусками', allVacations))
        }

    }, [allUsers, allDepartments, allVacations]); // allUsers, allDepartments, allVacations, login

    // const {} = props;
    const deleteVacation = (id) => {
        console.log('delete', id)
        const arr = [];
        const result = allVacations.filter(item => +item.id !== +id);
        setAllVacations(result);
        getVacationsRef().set(result);
    }

    if (allVacations.length == 0) {
        return (
            <>
                <h2>Нет отпусков</h2>
            </>
        );
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
                {allVacations.map(item => {

                    const objectOfUser = allUsers.length > 0 ? allUsers.find(i => +item.user_id === +i.id) : {name: 'Получение имени ...', surname: 'Получение фамилии ...'};
                    console.log(objectOfUser)
                    const fullName = `${objectOfUser.name} ${objectOfUser.surname}`;

                    // try {

                    // } catch (e) {
                    //     console.log(e)
                    // }

                    return (
                        <div key={item.id}>
                            <div>
                                {fullName}
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
                    );   
                })}
            </div>
        </>
    );
}

export default VacationList;