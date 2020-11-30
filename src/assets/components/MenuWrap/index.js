import React from 'react';
import { NavLink, } from 'react-router-dom';

import { Menu } from 'antd';

const MenuWrap = () => {

    return (
        <>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
                <NavLink to="/">Главная</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink to="/manage">Настройки</NavLink>
            </Menu.Item>
          </Menu>
        </>
    );
}

export default MenuWrap;