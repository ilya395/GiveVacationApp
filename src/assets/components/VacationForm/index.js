import React, { useState, useEffect, useContext } from 'react';
import Firebase from '../../context/firebaseContext';

import cn from 'classnames';
import s from './VacationForm.module.scss';
import SelectList from '../SelectList';

const VacationForm = (props) => {
    const { history } = props;
    const { getVacationsRef, getUsersRef } = useContext(Firebase);
    const [id, setId] = useState(props.match.params.id);
    const [allVacations, setAllVacations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [thisUserId, setThisUserId] = useState(0);
    const [thisVacationName, setThisVacationName] = useState('');
    const [thisVacationIndex, setThisVacationIndex] = useState(0);
    const [vacationStart, setVacationStart] = useState(0);
    const [vacationEnd, setVacationEnd] = useState(0);
    const [vacationStartValue, setVacationStartValue] = useState(0);
    const [vacationEndValue, setVacationEndValue] = useState(0);
    
    useEffect(() => {
        getUsersRef()
            .once('value')
            .then(response => response.val())
            .then(res => {
                setAllUsers(res);
            })
            .catch(e => console.log(e))
            .finally(() => console.log('сходили за юзерами'));
    }, []);
    useEffect(() => {
        getVacationsRef()
            .once('value')
            .then(response => response.val())
            .then(res => {
                if (res == null) {
                    res = [];
                }
                setAllVacations(res);
                return res;
            })
            .then((res) => {
                console.log(id)
                if (id !== 'new-vacation' && id !== 0) {

                    const vacation = res.filter(item => item.id === +id);

                    const objectOfVacationer = allUsers.find(item => +item.id === +vacation[0].user_id);

                    setThisVacationName(`${objectOfVacationer.name} ${objectOfVacationer.surname}`);
                    
                    const startDate = vacation[0].vacation_start;
                    setVacationStartValue(startDate);
                    setVacationStart(`${new Date(startDate).getFullYear()}-${(new Date(startDate).getMonth() + 1) > 9 ? (new Date(startDate).getMonth() + 1) : `0${new Date(startDate).getMonth() + 1}`}-${new Date(startDate).getDate() > 9 ? new Date(startDate).getDate() : `0${new Date(startDate).getDate()}`}`);
                    
                    const endDate = vacation[0].vacation_end;
                    setVacationEndValue(endDate);
                    setVacationEnd(`${new Date(endDate).getFullYear()}-${(new Date(endDate).getMonth() + 1) > 9 ? (new Date(endDate).getMonth() + 1) : `0${new Date(endDate).getMonth() + 1}`}-${new Date(endDate).getDate() > 9 ? new Date(endDate).getDate() : `0${new Date(endDate).getDate()}`}`);
                    
                    setThisVacationIndex(vacation[0].id);

                    setThisUserId(+objectOfVacationer.id);
                } else {
                    setThisVacationName('Имя нового отпускника');
                    setThisVacationIndex(new Date().getTime());
                    allUsers[0] ? setThisUserId(allUsers[0].id) : setThisUserId(0);
                }                
            })
            .catch(e => console.log(e))
            .finally(() => console.log('сходили за отпусками', allVacations));
    }, [allUsers]);

    const handleChangeName = (event) => {
        setThisUserId(event.target.value);
    }

    const handleChangeVacationStart = (event) => {
        setVacationStart(event.target.value);
        setVacationStartValue(event.target.valueAsNumber);
    }

    const handleChangeVacationEnd = (event) => {
        setVacationEnd(event.target.value);
        setVacationEndValue(event.target.valueAsNumber);
    }

    const submitForm = (event) => {
        event.preventDefault();

        const findResultIndex = allVacations.findIndex(item => +item.id === +thisVacationIndex);
        if (findResultIndex !== -1) { // есть совпадения
            allVacations[+findResultIndex].user_id = thisUserId;
            allVacations[+findResultIndex].vacation_end = vacationEndValue;
            allVacations[+findResultIndex].vacation_start = vacationStartValue;
            if (thisUserId !== 0 && vacationEndValue !== 0 && vacationStartValue !== 0) {
                getVacationsRef()
                    .set(allVacations)
                    .then(() => history.push('/vacations'))
                    .catch(e => console.log(e));
            } else {
                alert('Ошибка в данных');
            }
        } else { // нет совпадений
            allVacations.push({
                user_id: thisUserId,
                vacation_end: vacationEndValue,
                vacation_start: vacationStartValue,
                id: new Date().getTime(),
            });

            if (thisUserId !== 0 && vacationEndValue !== 0 && vacationStartValue !== 0) {
                getVacationsRef()
                    .set(allVacations)
                    .then(() => history.push('/vacations'))
                    .catch(e => console.log(e));
            } else {
                alert('Ошибка в данных');
            }
        }
    }

    return (
        <>
            <h2 className={cn(s['page-title'])}>{id === 'new-vacation' ? 'Новый отпуск' : 'Отпуск для пользователя'}</h2>
            <div>
                <form 
                    onSubmit={submitForm}
                    className={cn(s.form)}
                >
                    <div className={cn(s['form-field'], s['form-field__select-wrap'])}>
                        <label htmlFor="user" className={cn(s['select-label'])}>
                            Пользователь:
                        </label>
                        <select
                            id="user"
                            name="user"
                            value={+thisUserId}
                            onChange={handleChangeName}
                            className={cn(s['select-element'])}
                        >
                            {allUsers.map((item) => {
                                const fullName = `${item.name} ${item.surname}`;
                                return (
                                    <option key={item.id} value={+item.id}>{fullName}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={cn(s['form-field'], s['form-field__input-date-wrap'])}>
                        <label htmlFor="vacation_start" className={cn(s['select-label'])}>
                            Начало отпускного периода:
                        </label>
                        <input
                            type="date"
                            id="vacation_start"
                            name="vacation_start"
                            value={vacationStart}
                            onChange={handleChangeVacationStart}
                            className={cn(s['date-input'])}
                        />
                    </div>
                    <div className={cn(s['form-field'], s['form-field__input-date-wrap'])}>
                        <label htmlFor="vacation_end" className={cn(s['select-label'])}>
                            Конец отпускного периода:
                        </label>
                        <input
                            type="date"
                            id="vacation_end"
                            name="vacation_end"
                            value={vacationEnd}
                            onChange={handleChangeVacationEnd}
                            className={cn(s['date-input'])}
                        />
                    </div>
                    <div className={cn(s['form-field'])}>
                        <button className={cn(s['submit-button'])}>
                            Отправить
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default VacationForm;