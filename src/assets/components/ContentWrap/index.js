import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import s from './ContentWrap.module.scss';

import Firebase from '../../context/firebaseContext';
import Row from '../Row';
import { months } from '../../services/constants';

const ContentWrap = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allVacations, setAllVacations] = useState([]);
    const [bigData, setBigData] = useState([]);
    const [defaultYear, setDefaultYear] = useState(2021);

    const { getUsersRef, getDepartmentsRef, getVacationsRef } = useContext(Firebase);

    // useEffect(async () => {

    //     if (allUsers.length == 0) {
    //         await getUsersRef()
    //             .once('value')
    //             .then(response => response.val())
    //             .then(res => setAllUsers(res))
    //             .catch(e => console.log(e))
    //             .finally(() => console.log('сходили за юзерами', allUsers));
    //     }

    //     if (allDepartments.length == 0) {
    //         await getDepartmentsRef()
    //             .once('value')
    //             .then(response => response.val())
    //             .then(res => setAllDepartments(res))
    //             .catch(e => console.log(e))
    //             .finally(() => console.log('сходили за отделами', allDepartments));
    //     }
        
    //     if (allVacations.length == 0) {
    //         await getVacationsRef()
    //             .once('value')
    //             .then(response => response.val())
    //             .then(res => setAllVacations(res))
    //             .catch(e => console.log(e))
    //             .finally(() => console.log('сходили за отпусками', allVacations))
    //     }

    // }, [allUsers, allDepartments, allVacations]); // allUsers, allDepartments, allVacations, login

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
    useEffect(() => {
        const data = allUsers.map(item => {
            const vacations = allVacations.filter(i => +i.user_id === +item.id);
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
    }, [allUsers, allVacations, allDepartments])

    return (
        <>
            <h2>Content, Dear!</h2>
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