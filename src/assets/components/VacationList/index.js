import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import s from './VacationList.module.scss';

import Firebase from '../../context/firebaseContext';
import { Link } from 'react-router-dom';

const VacationList = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allVacations, setAllVacations] = useState([]);

    const { getUsersRef, getDepartmentsRef, getVacationsRef } = useContext(Firebase);

    useEffect(() => {
        getUsersRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllUsers(res))
            .catch(e => console.log(e))
            .finally(() => console.log('сходили за юзерами', allUsers));
    }, []);
    useEffect(() => {
        getDepartmentsRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllDepartments(res))
            .catch(e => console.log(e))
            .finally(() => console.log('сходили за отделами', allDepartments));
    }, []);
    useEffect(() => {
        getVacationsRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllVacations(res))
            .catch(e => console.log(e))
            .finally(() => console.log('сходили за отпусками', allVacations));
    }, []);

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
            <h2 className={cn(s['page-title'])}>Список отпусков</h2>
            <div className={cn(s['wrap'])}>
                <Link to="vacation/new-vacation" className={cn(s['button-new-object'], s['.button-new-object__text'])}>
                    Добавить отпуск
                </Link>
            </div>
            <div>
                {allVacations.map((item, index) => {

                    const objectOfUser = allUsers.length > 0 ? allUsers.find(i => +item.user_id === +i.id) : {name: 'Получение имени ...', surname: 'Получение фамилии ...'};
                    const fullName = `${objectOfUser.name} ${objectOfUser.surname}`;

                    return (
                        <div key={item.id} className={cn(s['one-row'])}>
                            <div className={cn(s['one-row__number'])}>
                                <span>{`${index + 1}.`}</span>
                            </div>   
                            <div className={cn(s['one-row__name'], s['one-row__elem'])}>
                                <span>{fullName}</span>
                            </div>
                            <div className={cn(s['one-row__dates'], s['one-row__elem'])}>
                                <span>
                                    {`${new Date(item.vacation_start).getFullYear()}-${new Date(item.vacation_start).getMonth()}-${new Date(item.vacation_start).getDate()} : ${new Date(item.vacation_end).getFullYear()}-${new Date(item.vacation_end).getMonth()}-${new Date(item.vacation_end).getDate()}`}
                                </span>
                            </div>
                            <div className={cn(s['one-row__buttons'], s['one-row__elem'])}>
                                <Link to={`vacation/${item.id}`} className={cn(s['one-row__redaction'])}>
                                    Редактировать
                                </Link>
                                <button onClick={() => deleteVacation(item.id)} className={cn(s['one-row__delete'])}>Удалить</button>
                            </div>
                        </div> 
                    );   
                })}
            </div>
        </>
    );
}

export default VacationList;