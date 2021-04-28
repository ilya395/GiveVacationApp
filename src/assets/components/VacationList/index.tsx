import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import s from './VacationList.module.scss';

import Firebase from '../../context/firebaseContext';
import { Link } from 'react-router-dom';
import SelectList from '../SelectList';

import loginContext from '../../context/loginContext';
import { rolesConfig, ALL_USERS_FROM_ALL_DEPARTMENTS_ID } from '../../services/constants'
import { useDispatch, useSelector } from 'react-redux';

const VacationList = () => {

    const { userData } =  useContext(loginContext);

    // console.log(login);

    // const [allYears, setAllYears] = useState(allYearsData);
    const [thisYear, setThisYear] = useState(new Date().getFullYear());
    // const [allUsers, setAllUsers] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [thisDepartmentId, setThisDepartmentId] = useState(0);
    const [allVacations, setAllVacations] = useState([]);
    const [choosedVacations, setChoosedVacations] = useState([]);

    const { getUsersRef, getDepartmentsRef, getVacationsRef, getYearsRef } = useContext(Firebase);

    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.allUsers);
    const allYears = useSelector(state => state.allYears);

    const allDepartmentsData = useSelector(state => state.allDepartments);
    const allVacationsData = useSelector(state => state.allVacations);
    
    useEffect(() => {
        if (+userData.role_id === rolesConfig.simpleUser) {
            const departaments = allDepartmentsData.filter(item => +item.id === +userData.department_id)

            setAllDepartments(departaments);
            setThisDepartmentId(+departaments[0].id);
        } else {
            setAllDepartments(allDepartmentsData);
            setThisDepartmentId(+allDepartmentsData[0].id);            
        }
    }, [allDepartmentsData, userData]);

    useEffect(() => {
        if (+userData.role_id === rolesConfig.simpleUser) {
            const vacations = allVacationsData.filter(item => +item.user_id === +userData.id);
            setAllVacations(vacations);
        } else {
            setAllVacations(allVacationsData);
        }
    }, [allVacationsData, userData]);

    useEffect(() => {
        const users = allUsers.filter(item => +item.department_id === +thisDepartmentId);
        const usersId = users.map(item => +item.id);
        const result = thisDepartmentId === ALL_USERS_FROM_ALL_DEPARTMENTS_ID ? allVacations.filter(item => new Date(+item.vacation_start).getFullYear() === +thisYear && new Date(+item.vacation_end).getFullYear() === +thisYear) : allVacations.filter(item => usersId.indexOf(+item.user_id) !== -1 && new Date(+item.vacation_start).getFullYear() === +thisYear && new Date(+item.vacation_end).getFullYear() === +thisYear);
        setChoosedVacations(result);
    }, [allUsers, allVacations, thisYear, thisDepartmentId]);

    useEffect(() => {
        console.log(allVacations, allVacationsData);
    });

    const deleteVacation = (id) => {
        // const result = allVacations.filter(item => +item.id !== +id);
        // setAllVacations(result);
        // getVacationsRef().set(result);

        // dispatch({
        //     type: 'DELETE_THIS_VACATION',
        //     payload: +id,
        // });

        dispatch(deleteVacation(+id));
    }

    const chooseDepartment = (id) => {
        // console.log(id); // id отдела
        setThisDepartmentId(id);
    }

    const chooseYear = (id) => {
        // console.log(id); // id года
        setThisYear(+id);
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
                <div className={cn(s['wrap__add-vacation'])}>
                    <Link to="vacation/new-vacation" className={cn(s['button-new-object'], s['.button-new-object__text'])}>
                        Добавить отпуск
                    </Link>
                </div>
                <div className={cn(s['wrap__manage'])}>
                    <div className={cn(s['wrap__year'])}>
                        <SelectList
                            identificate={'selectYear'}
                            title={'Выберите год'}
                            defaultValue={new Date().getFullYear()} 
                            handleFunction={chooseYear} 
                            data={allYears}
                        />                   
                    </div>
                    <div className={cn(s['wrap__select'])}>
                        <SelectList
                            identificate={'selectDepartmentInVacationList'}
                            title={'Выберите отдел'}
                            defaultValue={allDepartments[0].id} 
                            handleFunction={chooseDepartment} 
                            data={allDepartments}
                        />
                    </div>
                </div>
            </div>
            <div>
                {
                    choosedVacations.length === 0 
                    ? (
                        <>
                            <h2>Нет отпусков</h2>
                        </>
                    )
                    : choosedVacations.map((item, index) => {

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
                                        {`${new Date(item.vacation_start).getFullYear()}-${new Date(item.vacation_start).getMonth() + 1}-${new Date(item.vacation_start).getDate()}  :  ${new Date(item.vacation_end).getFullYear()}-${new Date(item.vacation_end).getMonth() + 1}-${new Date(item.vacation_end).getDate()}`}
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
                    })
                }
            </div>
        </>
    );
}

export default VacationList;