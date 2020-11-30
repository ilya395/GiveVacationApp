import React, { useContext } from 'react';

import LoginContext from '../../context/loginContext';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
  }

const Management = () => {

    const { login } = useContext(LoginContext);
    console.log(login)

    return (
        <>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Сотрудники" key="users">
                Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Отделы" key="departments">
                Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Периоды отпусков" key="vacations">
                Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </>
    );
}

export default Management;