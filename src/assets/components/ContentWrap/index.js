import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import s from './ContentWrap.module.scss';

import Firebase from '../../context/firebaseContext';
import loginContext from '../../context/loginContext';
import Row from '../Row'; // в Row был Index, а не index - нетлифай не собирал
import { months, ALL_USERS_FROM_ALL_DEPARTMENTS_ID, rolesConfig } from '../../services/constants';
import SelectList from '../SelectList';

const ContentWrap = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allVacations, setAllVacations] = useState([]);
    const [bigData, setBigData] = useState([]);
    const [defaultYear, setDefaultYear] = useState(2021);
    const [thisDepartmentId, setThisDepartmentId] = useState(0);
    const [allYears, setAllYears] = useState([]);
    const [thisYear, setThisYear] = useState(new Date().getFullYear());
    const { getUsersRef, getDepartmentsRef, getVacationsRef, getYearsRef } = useContext(Firebase);

    const { userData, allUsersData, allVacationsData, allDepartmentsData } = useContext(loginContext);
    const [roleId, setRoleId] = useState(rolesConfig.defaultUser); 
    const [departsmentForThisRole, setDepartmentForThisRole] = useState(0);

    useEffect(() => {
        getYearsRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllYears(res))
            .catch(e => console.log(e))
            .finally(() => console.log('сходили за годами'));        
    }, []);
    useEffect(() => {
        // getUsersRef()
        //     .once('value')
        //     .then(response => response.val())
        //     .then(res => setAllUsers(res))
        //     .catch(e => console.log(e))
        //     .finally(() => console.log('сходили за юзерами', allUsers));  
            
        setAllUsers(allUsersData);
    }, [allUsersData]);
    // useEffect(() => {
    //     getDepartmentsRef()
    //         .once('value')
    //         .then(response => response.val())
    //         .then(res => {
    //             if (+roleId === rolesConfig.defaultUser || +roleId === rolesConfig.simpleUser && departsmentForThisRole !== 0) {
    //                 const departsment = res.filter(item => +item.id === +departsmentForThisRole);
    //                 if (departsment.length > 0) {
    //                     setAllDepartments(departsment);
    //                     setThisDepartmentId(departsment[0].id);
    //                 }
    //             } else {
    //                 res.unshift({
    //                     id: ALL_USERS_FROM_ALL_DEPARTMENTS_ID,
    //                     name: 'Все'
    //                 });
    //                 setAllDepartments(res);
    //                 setThisDepartmentId(res[0].id);
    //             }
    //         })
    //         .catch(e => console.log(e))
    //         .finally(() => console.log('сходили за отделами', allDepartments));
    // }, [roleId, departsmentForThisRole]);
    useEffect(() => {
        if (+roleId === rolesConfig.defaultUser || +roleId === rolesConfig.simpleUser && allDepartmentsData.length > 0) {
            const departsment = allDepartmentsData.filter(item => +item.id === +departsmentForThisRole);
            if (departsment.length > 0) {
                setAllDepartments(departsment);
                setThisDepartmentId(departsment[0].id);
            }
        } else {
            // console.log(allDepartmentsData, allDepartments)
            const result = allDepartmentsData.find(item => item.id === ALL_USERS_FROM_ALL_DEPARTMENTS_ID);
            // console.log(result)
            if (!result) {
                allDepartmentsData.unshift({
                    id: ALL_USERS_FROM_ALL_DEPARTMENTS_ID,
                    name: 'Все'
                });
                setAllDepartments(allDepartmentsData);
                setThisDepartmentId(allDepartmentsData[0].id);
            } else {
                setAllDepartments(allDepartmentsData);
                setThisDepartmentId(allDepartmentsData[0].id);               
            }
        }
    }, [allDepartmentsData, roleId, departsmentForThisRole]);

    useEffect(() => {
        // getVacationsRef()
        //     .once('value')
        //     .then(response => response.val())
        //     .then(res => setAllVacations(res))
        //     .catch(e => console.log(e))
        //     .finally(() => console.log('сходили за отпусками', allVacations));

        setAllVacations(allVacationsData);
    }, [allVacationsData]);
    useEffect(() => {
        const users = thisDepartmentId === ALL_USERS_FROM_ALL_DEPARTMENTS_ID ? allUsers : allUsers.filter(item => +item.department_id === +thisDepartmentId);
        const data = users.map(item => {
            const vacations = allVacations.filter(i => +i.user_id === +item.id && new Date(+i.vacation_start).getFullYear() === thisYear);
            const simpleViewOfVacations = [];
            vacations.forEach(item => {
                const startDateStamp = item.vacation_start;
                const endDateStamp = item.vacation_end;
                if ( new Date(startDateStamp).getMonth() === new Date(endDateStamp).getMonth() ) { // даты в одном месяце
                    simpleViewOfVacations.push([
                        {
                            type: 'start',
                            monthNumber: new Date(+item.vacation_start).getMonth(),
                            day: new Date(+item.vacation_start).getDate(),
                            year: new Date(+item.vacation_start).getFullYear(),
                            date: item.vacation_start
                        },
                        {
                            type: 'end',
                            monthNumber: new Date(+item.vacation_end).getMonth(),
                            day: new Date(+item.vacation_end).getDate(),
                            year: new Date(+item.vacation_end).getFullYear(),
                            date: item.vacation_end
                        }
                    ]);                    
                } else {
                    simpleViewOfVacations.push([
                        {
                            type: 'start',
                            monthNumber: new Date(+item.vacation_start).getMonth(),
                            day: new Date(+item.vacation_start).getDate(),
                            year: new Date(+item.vacation_start).getFullYear(),
                            date: item.vacation_start
                        },
                        {
                            type: 'end',
                            monthNumber: new Date(+item.vacation_start).getMonth(),
                            day: new Date( new Date(+item.vacation_start).getFullYear(), new Date(+item.vacation_start).getMonth() + 1, 0 ).getDate(),
                            year: new Date(+item.vacation_start).getFullYear(),
                            date: item.vacation_end
                        }
                    ]);

                    simpleViewOfVacations.push([
                        {
                            type: 'start',
                            monthNumber: new Date(+item.vacation_end).getMonth(),
                            day: new Date( new Date(+item.vacation_end).getFullYear(), new Date(+item.vacation_end).getMonth(), 1 ).getDate(),
                            year: new Date(+item.vacation_end).getFullYear(),
                            date: item.vacation_end
                        },
                        {
                            type: 'end',
                            monthNumber: new Date(+item.vacation_end).getMonth(),
                            day: new Date(+item.vacation_end).getDate(),
                            year: new Date(+item.vacation_end).getFullYear(),
                            date: item.vacation_end
                        }
                    ]);
                }
            })

            const result = {
                name: `${item.name} ${item.surname}`,
                id: item.id,
                vacations: simpleViewOfVacations,
            }
            return result;
        });
        setBigData(data);
    }, [allUsers, allVacations, allDepartments, thisYear, thisDepartmentId]);

    useEffect(() => {
        if (userData) {
            setRoleId(userData.role_id);
            setDepartmentForThisRole(userData.department_id);
        }
    }, [userData]);
    // useEffect(() => {
    //     if (+roleId === rolesConfig.defaultUser || +roleId === rolesConfig.simpleUser) {
    //         const departsment = allDepartments.filter(item => +item.id === +departsmentForThisRole);
    //         setAllDepartments(departsment);
    //         console.log(departsment);
    //         setThisDepartmentId(departsment[0].id);
    //     }
    // }, [roleId, allDepartments]);

    const chooseDepartment = (id) => {
        setThisDepartmentId(+id);
    }

    const chooseYear = (id) => {
        setThisYear(+id);
    }

    return (
        <>
            <h2 className={cn(s['page-title'])}>Расписание, дорогой(-ая)!</h2>
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
                        identificate={'selectDepartmentOnMainPage'}
                        title={'Выберите отдел'}
                        defaultValue={thisDepartmentId} 
                        handleFunction={chooseDepartment} 
                        data={allDepartments}
                    />
                </div>
            </div>
            <div>
                <div className={cn(s['content-title-block'])}>
                    <div className={cn(s['content-title-block__start-elem'])}>
                        Пользователи
                    </div>
                    {
                        months.map((item) => (
                            <div key={item} className={cn(s['content-title-block__elem'])}>
                                {item}
                            </div>
                        ))
                    }
                </div>
                <div className={cn(s['content-body-block'])}>
                    {
                        bigData.map(item => {
                            return (
                                <Row
                                    key={item.id}
                                    {...item}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default ContentWrap;