import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import s from './DepartmentList.module.scss';
import Firebase from '../../context/firebaseContext';
import { Link } from 'react-router-dom';

const DepartmentList = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allVacations, setAllVacations] = useState([]);

    const { getUsersRef, getDepartmentsRef, getVacationsRef } = useContext(Firebase);

    useEffect(() => {
        getUsersRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllUsers(res))
            .catch(e => console.log(e));
    }, []);
    useEffect(() => {
        getDepartmentsRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllDepartments(res))
            .catch(e => console.log(e));
    }, []);
    useEffect(() => {
        getVacationsRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllVacations(res))
            .catch(e => console.log(e));
    }, []);

    const deleteDepartment = (id) => {
        const arr = [];
        const result = allDepartments.filter(item => item.id !== id);
        setAllDepartments(result);
        getDepartmentsRef().set(result);
    }

    return (
        <>
            <h2 className={cn(s['page-title'])}>Список отделов компании</h2>
            <div className={cn(s['wrap'])}>
                <Link to="department/new-department" className={cn(s['button-new-object'], s['.button-new-object__text'])}>
                    Добавить отдел
                </Link>
            </div>
            <div>
                {allDepartments.map((item, index) => (
                    <div key={item.id} className={cn(s['one-row'])}>
                        <div className={cn(s['one-row__number'])}>
                            <span>{`${index + 1}.`}</span>
                        </div> 
                        <div className={cn(s['one-row__name'], s['one-row__elem'], s['one-row__name_position'])}>
                            {item.name}
                        </div>
                        <div className={cn(s['one-row__buttons'], s['one-row__elem'], s['one-row__buttons_position'])}>
                            <Link to={`department/${item.id}`} className={cn(s['one-row__redaction'])}>
                                Редактировать
                            </Link>
                            <button onClick={() => deleteDepartment(item.id)} className={cn(s['one-row__delete'])}>Удалить</button>
                        </div>
                    </div>    
                ))}
            </div>
        </>
    );
}

export default DepartmentList;