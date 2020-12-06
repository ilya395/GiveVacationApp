import React, { useContext, useEffect, useState } from 'react';

import LoginContext from '../../context/loginContext';

import { Tabs } from 'antd';

import Firebase from '../../context/firebaseContext';

import CustomModal from '../CustomModal';
import UserForm from '../UserForm';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
  }

const Management = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allVacations, setAllVacations] = useState([]);

    const [visibleModal, setVisibleModal] = useState(false);
    const [changing, setChanging] = useState(null);

    const { login } = useContext(LoginContext);
    // console.log(login)

    const { getUsersRef, getDepartmentsRef, getVacationsRef } = useContext(Firebase);

    const changeOrAddUser = (data) => {
        console.log(data);
    }

    const jumpModal = () => {
        setVisibleModal(!visibleModal);
    }

    const changeUser = (id) => {
        console.log('change', id);
        const result = allUsers.filter(item => item.id === id);
        setChanging(result[0]);
        jumpModal();
    }
    const deleteUser = (id) => {
        console.log('delete', id)
        const arr = [];
        const result = allUsers.filter(item => item.id !== id);
        setAllUsers(result);
        getUsersRef().set(result);
    }
    const addUser = (e) => {
        // if (e.target.dataset.object == 'add-user') {
            console.log('нужно вызвать модалку для создания юзера');
            // setChildrenComponentForModal(UserForm)
            setChanging(null);
            jumpModal();
        // }
    }

    useEffect(async () => {
        await getUsersRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllUsers(res));

        await getDepartmentsRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllDepartments(res));

        await getVacationsRef()
            .once('value')
            .then(response => response.val())
            .then(res => setAllVacations(res));

    }, []); // allUsers, allDepartments, allVacations, login

    return (
        <>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Сотрудники" key="users">
                    хочу увидеть всех сотрудников
                    <div>
                        {allUsers.map(item => (
                            <div key={item.id}>
                                <div>
                                    {`${item.name} ${item.surname}`}
                                </div>
                                <div>
                                    <button onClick={() => changeUser(item.id)}>редактировать</button>
                                    <button onClick={() => deleteUser(item.id)}>удалить</button>
                                </div>
                            </div>    
                        ))}
                    </div>
                    <button onClick={() => addUser()}>добавить</button>
                </TabPane>
                <TabPane tab="Отделы" key="departments">
                    хочу увидеть все отделы
                </TabPane>
                <TabPane tab="Периоды отпусков" key="vacations">
                    хочу увидеть все отпуска
                </TabPane>
            </Tabs>
            <CustomModal 
                seeModal={visibleModal}
                jumpModal={jumpModal}
            >
                <UserForm
                    whoWillChange={changing}
                    changeOrAdd={changeOrAddUser}
                    resetUserForm={!visibleModal}
                />
            </CustomModal>
        </>
    );
}

export default Management;