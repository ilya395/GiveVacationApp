import React, { useEffect, useState } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
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

const UserForm = (props) => {

    // const onFinish = values => {
    //     console.log('Success:', values);
    // };
    
    // const onFinishFailed = errorInfo => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
      <>
        user form
      </>
        // <Form
        //   {...layout}
        //   name="basic"
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        //   form={form}
        // >
        //   <Form.Item
        //     label="Имя"
        //     name="name"
        //     rules={[
        //       {
        //         required: true,
        //         message: 'Имя',
        //       },
        //     ]}
        //   >
        //     <Input />
        //   </Form.Item>
    
        //   <Form.Item
        //     label="Фамилия"
        //     name="surname"
        //     rules={[
        //       {
        //         required: true,
        //         message: 'Фамилия',
        //       },
        //     ]}
        //   >
        //     <Input />
        //   </Form.Item>

        //   <Form.Item
        //     label="Логин"
        //     name="login"
        //     rules={[
        //       {
        //         required: true,
        //         message: 'Логин',
        //       },
        //     ]}
        //   >
        //     <Input />
        //   </Form.Item>
    
        //   <Form.Item {...tailLayout}>
        //     <Button type="primary" htmlType="submit">
        //       Отправить
        //     </Button>
        //   </Form.Item>
        // </Form>
    );
}

export default UserForm;