import React, { useEffect, useState, useContext } from 'react';
import Firebase from '../../context/firebaseContext';

import cn from 'classnames';
import s from './DepartmentForm.module.scss';

const DepartForm = (props) => {
    // const id = props.match.params.id;
    const { history } = props;
    const [id, setId] = useState(props.match.params.id);
    const [allDepartments, setAllDepartments] = useState([]);
    const [thisDepartmentName, setThisDepartmentName] = useState('');
    const [thisDepartmentIndex, setThisDepartmentIndex] = useState(0);
    const { getDepartmentsRef } = useContext(Firebase);

    useEffect(() => {

        getDepartmentsRef()
            .once('value')
            .then(response => response.val())
            .then(res => {
                setAllDepartments(res);
                return res;
            })
            .then((res) => {
                console.log(id)
                if (id !== 'new-department' && id !== 0) {
                    
                    console.log(res)
                    const dev = res.filter(item => item.id === +id);
                    console.log(dev)
                    setThisDepartmentName(dev[0].name);
                    setThisDepartmentIndex(dev[0].id);
                    console.log(dev[0].name);
                } else {
                    setThisDepartmentName('');
                    setThisDepartmentIndex(new Date().getTime());
                }                
            })
            .catch(e => console.log(e));
 
    }, []);

    const handleName = (event) => {
        setThisDepartmentName(event.target.value);
        setThisDepartmentIndex(event.target.dataset.index);
    }

    const submitForm = (event) => {
        event.preventDefault();
        console.log(id, thisDepartmentIndex);
        const findResultIndex = allDepartments.findIndex(item => +item.id === +thisDepartmentIndex);
        console.log(allDepartments, findResultIndex);
        if (findResultIndex !== -1) { // есть совпадения
            allDepartments[+findResultIndex].name = thisDepartmentName;
            getDepartmentsRef()
                .set(allDepartments)
                .then(() => history.push('/departments'))
                .catch(e => console.log(e))
        } else { // нет совпадений
            allDepartments.push({
                name: thisDepartmentName,
                id: new Date().getTime(),
            });
            console.log(allDepartments)
            getDepartmentsRef()
                .set(allDepartments)
                .then(() => history.push('/departments'))
                .catch(e => console.log(e))
        }
    }

    return (
        <>
            <h2 className={cn(s['page-title'])}>{id === 'new-department' ? 'Новый отдел' : 'Редактировать отдел'}</h2>
            <div>
                <form 
                    onSubmit={submitForm}
                    className={cn(s.form)}
                >
                    <div
                        className={cn(s['form-field'], s['form-field__select-wrap'])}
                    >
                        <label
                            htmlFor="name"
                            className={cn(s['select-label'])}
                        >
                            Название отдела:
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            data-index={thisDepartmentIndex} 
                            defaultValue={thisDepartmentName}
                            placeholder={thisDepartmentName}
                            onChange={handleName}
                            className={cn(s['input-elem'])}
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

export default DepartForm;