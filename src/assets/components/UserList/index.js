import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import s from './UserList.module.scss';
import { Link } from 'react-router-dom';
import Firebase from '../../context/firebaseContext';
import SelectList from '../SelectList';
import { ALL_USERS_FROM_ALL_DEPARTMENTS_ID } from '../../services/constants';

const UserList = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allVacations, setAllVacations] = useState([]);
    const [thisDepartmentId, setThisDepartmentId] = useState(0);
    const [choosedUsers, setChoosedUsers] = useState([]);

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
            .then(res => {
                res.unshift({
                    id: ALL_USERS_FROM_ALL_DEPARTMENTS_ID,
                    name: 'Все'
                });
                setAllDepartments(res);
                setThisDepartmentId(res[0].id);
            })
            .catch(e => console.log(e));
    }, []);
    useEffect(() => {
        getVacationsRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllVacations(res))
            .catch(e => console.log(e));
    }, []);

    useEffect(() => {
        const users = thisDepartmentId === ALL_USERS_FROM_ALL_DEPARTMENTS_ID ? allUsers : allUsers.filter(item => +item.department_id === +thisDepartmentId);
        setChoosedUsers(users);
    }, [thisDepartmentId]);

    const deleteUser = (id) => {
        console.log('delete', id)
        const arr = [];
        const result = allUsers.filter(item => item.id !== id);
        setAllUsers(result);
        getUsersRef().set(result);        
    }

    const chooseDepartment = (id) => {
        setThisDepartmentId(id);
    }

    return (
        <>
            <h2 className={cn(s['page-title'])}>Список пользователей</h2>
            <div className={cn(s['wrap'])}>
                <div className={cn(s['wrap__add-vacation'])}>
                    <Link to="user/new-user" className={cn(s['button-new-object'], s['.button-new-object__text'])}>
                        Новый пользователь
                    </Link>
                </div>
                <div className={cn(s['wrap__manage'])}>
                    <div className={cn(s['wrap__select'])}>
                        <SelectList
                            identificate={'selectDepartmentInUserList'}
                            title={'Выберите отдел'}
                            defaultValue={thisDepartmentId} 
                            handleFunction={chooseDepartment} 
                            data={allDepartments}
                        />
                    </div>
                </div>
            </div>
            <div>
                {choosedUsers.map((item, index) => (
                    <div key={item.id} className={cn(s['one-row'])}>
                        <div className={cn(s['one-row__number'])}>
                            <span>{`${index + 1}.`}</span>
                        </div> 
                        <div className={cn(s['one-row__name'], s['one-row__elem'], s['one-row__name_position'])}>
                            {`${item.name} ${item.surname}`}
                        </div>
                        <div className={cn(s['one-row__buttons'], s['one-row__elem'], s['one-row__buttons_position'])}>
                            <Link to={`/user/${item.id}`} className={cn(s['one-row__redaction'])}>
                                Редактировать
                            </Link>
                            <button 
                                onClick={() => deleteUser(item.id)}
                                className={cn(s['one-row__delete'])}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>    
                ))}                
            </div>
        </>
    );
}

export default UserList;