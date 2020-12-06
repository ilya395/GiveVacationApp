import React, { useEffect, useState, useContext } from 'react';
import Firebase from '../../context/firebaseContext';

const DepartForm = (props) => {
    // const id = props.match.params.id;
    const { history } = props;
    const [id, setId] = useState(props.match.params.id);
    const [allDepartments, setAllDepartments] = useState([]);
    const [thisDepartmentsName, setThisDepartmentsName] = useState('');
    const [thisDepartmentsIndex, setThisDepartmentsIndex] = useState(0);
    const { getDepartmentsRef } = useContext(Firebase);

    useEffect(async () => {

        await getDepartmentsRef()
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
                    setThisDepartmentsName(dev[0].name);
                    setThisDepartmentsIndex(dev[0].id);
                    console.log(dev[0].name);
                } else {
                    setThisDepartmentsName('введите название нового отдела');
                    setThisDepartmentsIndex(new Date().getTime());
                }                
            })
            .catch(e => console.log(e));
 
    }, []);

    const handleName = (event) => {
        setThisDepartmentsName(event.target.value);
        setThisDepartmentsIndex(event.target.dataset.index);
    }

    const submitForm = (event) => {
        event.preventDefault();
        console.log(id, thisDepartmentsIndex);
        const findResultIndex = allDepartments.findIndex(item => +item.id === +thisDepartmentsIndex);
        console.log(allDepartments, findResultIndex);
        if (findResultIndex !== -1) { // есть совпадения
            allDepartments[+findResultIndex].name = thisDepartmentsName;
            getDepartmentsRef()
                .set(allDepartments)
                .then(() => history.push('/departments'))
                .catch(e => console.log(e))
        } else { // нет совпадений
            allDepartments.push({
                name: thisDepartmentsName,
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
            <h2>Depart Form</h2>
            <div>
                <form onSubmit={submitForm}>
                    <div>
                        <label htmlFor="name">Название отдела</label>
                        <input type="text" id="name" name="name" data-index={thisDepartmentsIndex} defaultValue={thisDepartmentsName} onChange={handleName} />
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

export default DepartForm;