import React, { useContext, useEffect, useState } from 'react';
import { NavLink, } from 'react-router-dom';

import { Menu } from 'antd';
import routesConfig from '../../routes/manageToRoutes';
import loginContext from '../../context/loginContext';
import { rolesConfig } from '../../services/constants';

import { connect } from 'react-redux';

const MenuWrap = (props) => {
  // const { login, userData } = useContext(loginContext);
  console.log('#context: ',useContext(loginContext));
  console.log('#props: ', props);
  const { thisUser } = props;
  const [roleId, setRoleId] = useState(rolesConfig.defaultUser);

  // useEffect(() => {
  //   if (userData) {
  //     setRoleId(userData.role_id);
  //   }
  // }, [userData]);

  useEffect(() => {
    if (thisUser) {
      setRoleId(thisUser.role_id);
    }
  }, [thisUser]);

  return (
      <>
        <Menu 
          theme="dark" 
          mode="horizontal" 
          // defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1">
            <NavLink to={routesConfig.home.url}>{routesConfig.home.title}</NavLink>
          </Menu.Item>
          {
            roleId !== rolesConfig.defaultUser
            ? (
              roleId !== rolesConfig.simpleUser
              ? (
                <>
                  <Menu.Item key="2">
                    <NavLink to={routesConfig.users.url}>{routesConfig.users.title}</NavLink>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <NavLink to={routesConfig.vacations.url}>{routesConfig.vacations.title}</NavLink>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <NavLink to={routesConfig.departments.url}>{routesConfig.departments.title}</NavLink>
                  </Menu.Item>
                </>
              )
              : (
                <>
                  <Menu.Item key="3">
                    <NavLink to={routesConfig.vacations.url}>{routesConfig.vacations.title}</NavLink>
                  </Menu.Item>
                </>
              )
            )
            : (
              <>
              </>
            )
          }
        </Menu>
      </>
  );
}

const mapStateToProps = (state) => {
  console.log('#state from redux',state)
  return {
    ...state,
  }
}

export default connect(mapStateToProps)(MenuWrap);