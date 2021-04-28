import React, { useContext, useEffect, useState } from 'react';

import { History } from 'history';

import './AuthLayout.scss';

import { Form, Input, Button } from 'antd';
import FirebaseContext from '../../context/firebaseContext';
import Preloader from '../../components/Preloader/Preloader';

// import { Store, ValidateErrorEntity } from 'antd/lib/form/interface'; // "antd/lib/form/interface"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
};

type PropsType = {
    history: History
}

type onFinishType = {
    email: string
    password: string
}

const AuthLayout: React.FC<PropsType> = ({history, ...props}) => {

    // console.log('#### props in Auth: ', props, props.history);

    const [loading, setLoading] = useState(true);
    useEffect(() => setLoading(false), []);

    // const [history, setHistory] = useState(null);
    // useEffect(() => {
    //     const { history } = props;
    //     setHistory(history);
    // }, [props]);

    const [authOk, setAuthOk] = useState(false);

    // let localUserData = localStorage.getItem('userId');
    // const [localData, setLocalData] = useState(localUserData);

    const { signWithEmail }: any = useContext(FirebaseContext); // ?
    // const { history } = props; // useContext(RoutesContext);
    
    useEffect(() => {
        // const { history } = props;
        if ( authOk === true ) {
            // console.log(history);
            history.push('/');  
        }
    }, [authOk, history]);

    const onFinish = <T, >(values: onFinishType): Promise<T> => {

    //   const { history } = props;

      const {email, password} = values;

      return signWithEmail(email, password)
        .then((res: {user:{uid:string}}) => {
            console.log('Success!');
            // console.log(res, values);
            setAuthOk(true);
            localStorage.setItem('userId', res.user.uid);
            
            // console.log(localStorage.getItem('userId'));
            // console.log(history);
            history.push('/');
        })
        .catch(() => {
            console.log('кто ты тварь?');
            setAuthOk(false);
        });
    };
    
    const onFinishFailed = (errorInfo: any) => { // ? // ValidateErrorEntity 
      console.log('Failed:', errorInfo);
    };

    if (loading) {
        return (
          <Preloader />
        );
    }

    return (
        <div className="form-wrap">
            <Form
                {...layout}
                name="basic"
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="form"
            >
                <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Please input your email!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
        
                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>
        
                <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AuthLayout;