import React, { useState, useEffect, useContext } from 'react';

import './MainLayout.scss';
import { Layout, Typography} from 'antd';

import LogoutButton from '../../components/LogoutButton/LogoutButton';

import FirebaseContext from '../../context/firebaseContext';

import MenuWrap from '../../components/MenuWrap';

import { History } from 'history';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

type PropsType = {
  children: React.Component
  history: History
  props: {}
}

const MainLayout: React.FC<PropsType> = ({children, history, ...props}) => {

  const { auth }: any = useContext(FirebaseContext); // ?
  // const { history } = props;

  const logoutPlz = () => {
    console.log('ок, logout');

    auth.signOut();
    localStorage.removeItem('userId');

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