import React, { useState, useEffect, useContext } from 'react';
// import cn from 'classnames';
// import s from './UserList.module.scss';
import Firebase from '../../context/firebaseContext';
import { Link } from 'react-router-dom';

const DepartmentList = (props) => {

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

    const deleteDepartment = (id) => {
        const arr = [];
        const result = allDepartments.filter(item => item.id !== id);
        setAllDepartments(result);
        getDepartmentsRef().set(result);
    }

    return (
        <>
            <h2>Departament List</h2>
            <div>
                <button>
                    <Link to="department/new-department">
                        Добавить отдел
                    </Link>
                </button>
            </div>
            <div>
                {allDepartments.map(item => (
                    <div key={item.id}>
                        <div>
                            {item.name}
                        </div>
                        <div>
                            <button>
                                <Link to={`department/${item.id}`}>
                                    Редактировать
                                </Link>
                            </button>
                            <button onClick={() => deleteDepartment(item.id)}>Удалить</button>
                        </div>
                    </div>    
                ))}
            </div>
        </>
    );
}

export default DepartmentList;