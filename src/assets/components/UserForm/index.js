import React from 'react';

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
    return (
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Имя"
            name="name"
            rules={[
              {
                required: true,
                message: 'Имя',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Фамилия"
            name="surname"
            rules={[
              {
                required: true,
                message: 'Фамилия',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Логин"
            name="login"
            rules={[
              {
                required: true,
                message: 'Логин',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
    );
}

export default UserForm;