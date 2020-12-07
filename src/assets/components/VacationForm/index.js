import React, { useState, useEffect, useContext } from 'react';
import Firebase from '../../context/firebaseContext';

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
    

    useEffect(async () => {

        if (allUsers.length == 0) {
            await getUsersRef()
                .once('value')
                .then(response => response.val())
                .then(res => {
                    setAllUsers(res);
                })
                .catch(e => console.log(e))
                .finally(() => console.log('сходили за юзерами'));
        }
        if (allVacations.length == 0 && allUsers.length != 0) {
            await getVacationsRef()
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
                        setVacationStart(`${new Date(startDate).getFullYear()}-${(new Date(startDate).getMonth() + 1) > 9 ? (new Date(startDate).getMonth() + 1) : `0${new Date(startDate).getMonth() + 1}`}-${new Date(startDate).getDate()}`);
                        
                        const endDate = vacation[0].vacation_end;
                        setVacationEndValue(endDate);
                        setVacationEnd(`${new Date(endDate).getFullYear()}-${(new Date(endDate).getMonth() + 1) > 9 ? (new Date(endDate).getMonth() + 1) : `0${new Date(endDate).getMonth() + 1}`}-${new Date(endDate).getDate()}`);
                        
                        setThisVacationIndex(vacation[0].id);

                        setThisUserId(+objectOfVacationer.id);
                    } else {
                        setThisVacationName('Имя нового отпускника');
                        setThisVacationIndex(new Date().getTime());
                        setThisUserId(allUsers[0].id);
                    }                
                })
                .catch(e => console.log(e))
                .finally(() => console.log('сходили за отпусками', allVacations));
        } 
    }, [allUsers, allVacations]);

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
            <h2>Vacation Form {id}</h2>
            <div>
                <form 
                    onSubmit={submitForm}
                >
                    <div>
                        <label htmlFor="user">
                            Пользователь
                        </label>
                        <select
                            id="user"
                            name="user"
                            value={+thisUserId}
                            onChange={handleChangeName}
                        >
                            {allUsers.map((item) => {
                                const fullName = `${item.name} ${item.surname}`;
                                return (
                                    <option key={item.id} value={+item.id}>{fullName}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="vacation_start">
                            Начало отпускного периода
                        </label>
                        <input
                            type="date"
                            id="vacation_start"
                            name="vacation_start"
                            value={vacationStart}
                            onChange={handleChangeVacationStart}
                        />
                    </div>
                    <div>
                        <label htmlFor="vacation_end">
                            Конец отпускного периода
                        </label>
                        <input
                            type="date"
                            id="vacation_end"
                            name="vacation_end"
                            value={vacationEnd}
                            onChange={handleChangeVacationEnd}
                        />
                    </div>
                    <div>
                        <button>
                            Отправить
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default VacationForm;