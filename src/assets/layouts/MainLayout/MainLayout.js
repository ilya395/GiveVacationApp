import React, { useState, useEffect, useContext } from 'react';

import './MainLayout.scss';
import { Layout, Typography} from 'antd';

import LogoutButton from '../../components/LogoutButton/LogoutButton';

import Firebase from '../../context/firebaseContext';

import MenuWrap from '../../components/MenuWrap';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const MainLayout = ({children, ...props}) => {

  const { auth } = useContext(Firebase);

  const logoutPlz = () => {
    console.log('ок, logout');

    auth.signOut();
    localStorage.removeItem('userId');

    const { history } = props;
    history.push('/auth');
  }

  return(
    <>
      <Layout className="layout">
        <Header>
          {/* <div className="logo" /> */}
          <i style={{color: 'rgba(255, 255, 255, 0.65)'}}>когданибудьздесьбудетлого</i>
          <MenuWrap />
          <div>
            <LogoutButton logoutPlz={logoutPlz} />
          </div>
        </Header>
        <Content style={{ padding: '0 50px', overflow: 'auto', }}>
          <div className="site-layout-content">
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by DVM-Group</Footer>
      </Layout>
    </>
  );
}

export default MainLayout;