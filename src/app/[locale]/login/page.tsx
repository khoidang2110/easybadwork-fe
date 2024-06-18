"use client"
import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { userService } from '@/service/service';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import { notification } from 'antd';
//import toast from "react-hot-toast";
type FieldType = {
  name?: string;
  password?: string;
  
};


const Login = () => {


  const router = useRouter()
  const localeActive = useLocale();
 
useEffect(() => {
  const loginInfo = localStorage?.getItem("USER");
  if(loginInfo==`"welcome!"`){
    router.push(`/${localeActive}/admin`);
  }


}, []);
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  
  console.log('Success:', values);
  userService
      .login(values)
      .then((res) => {
     
        if (res.status === 200) {
          localStorage.setItem("USER", JSON.stringify(res.data));
         // toast.success("Đăng nhập thành công");
          router.push(`/${localeActive}/admin`);
         
        } else {
         // toast.error(`Error: ${res.status}`);
        }
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
        //  toast.error("Đăng nhập thất bại: User not found (404)");
        openNotification()
        } else {
         // toast.error("Đăng nhập thất bại");
         openNotification()
        }
        console.log(err);
      });

};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
  


const [api, contextHolder] = notification.useNotification();

const openNotification = () => {
  api.open({
    message: 'Đăng nhập thất bại',
    duration: 0,
  });
};

 return (
  
  <div  className='pt-20 flex justify-center pr-10 '>
  {contextHolder}
 <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="name"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

  

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
);
};

export default Login;