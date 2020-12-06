import React, { useState, useEffect, useContext } from 'react';
import Firebase from '../../context/firebaseContext';

const VacationForm = (props) => {
    const { history } = props;
    const [id, setId] = useState(props.match.params.id);
    const [allVacations, setAllVacations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [thisVacationName, setThisVacationName] = useState('');
    const [thisVacationIndex, setThisVacationIndex] = useState(0);
    const [vacationStart, setVacationStart] = useState(0);
    const [vacationEnd, setVacationEnd] = useState(0);
    const { getVacationsRef, getUsersRef } = useContext(Firebase);

    useEffect(async () => {

        if (allUsers.length == 0) {
            getUsersRef()
                .once('value')
                .then(response => response.val())
                .then(res => setAllUsers(res))
                .catch(e => console.log(e))
                .finally(() => console.log('сходили за юзерами', allUsers));
        } 

        if (allVacations.length == 0 && allUsers.length != 0) {
            getVacationsRef()
                .once('value')
                .then(response => response.val())
                .then(res => {
                    setAllVacations(res);
                    return res;
                })
                .then((res) => {
                    console.log(id)
                    if (id !== 'new-vacation' && id !== 0) {
                        console.log(res)
                        const dev = res.filter(item => item.id === +id);
                        const objectOfVacationer = allUsers.find(item => +item.id === +dev[0].user_id);
                        setThisVacationName(`${objectOfVacationer.name} ${objectOfVacationer.surname}`);
                        const startDate = objectOfVacationer.vacation_start;
                        setVacationStart(`${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`);
                        const endDate = objectOfVacationer.vacation_end;
                        setVacationEnd(`${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`);
                        setThisVacationIndex(dev[0].id);
                    } else {
                        setThisVacationName('Имя нового отпускника');
                        setThisVacationIndex(new Date().getTime());
                    }                
                })
                .catch(e => console.log(e))
                .finally(() => console.log('сходили за отпусками', allVacations));
        }

    }, [allUsers, allVacations]);

    const handleChangeName = (event) => {
        console.log(event.target.value);
        // setThisVacationName(event.target.value);

    }

    const handleChangeVacationStart = (event) => {
        setVacationStart(event.target.valueAsNumber);
    }

    const handleChangeVacationEnd = (event) => {
        setVacationEnd(event.target.valueAsNumber);
    }

    const submitForm = (event) => {
        event.preventDefault();

    }

    return (
        <>
            <h2>Vacation Form {id}</h2>
            <div>
                <form onSubmit={submitForm}>
                    <div>
                        <label htmlFor="user">
                            Пользователь
                        </label>
                        <select
                            id="user"
                            name="user"
                            placeholder={thisVacationName}
                            onChange={handleChangeName}
                        >
                            {allUsers.map(item => {
                                const fullName = `${item.name} ${item.surname}`;
                                return (
                                    <option key={item.id} value={fullName}>{fullName}</option>
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
                            placeholder={vacationStart}
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
                            placeholder={vacationEnd}
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