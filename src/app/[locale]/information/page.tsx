"use client";
import React, { useEffect, useState } from 'react';
import { Breadcrumb, ConfigProvider } from 'antd';
import Link from "next/link";
import { useLocale } from 'next-intl';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/hook';
import Image from 'next/image';
import { addInfo } from '@/redux/features/infoSlice';
import { useTranslations } from "next-intl";
import styles from './styles.module.css';
type FieldType = {
  email?:string;
  country?:string;
  fullName?: string;
  address?:string;
  dist?:string;
  city?:string;
  phone?:string;
  
};

const Information  = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = useState<FieldType>({
    email:'',
    country:'',
    fullName:'',
    address:'',
    dist:'',
    city:'',
    phone:''
  });
  console.log('info state info',info)
  const localeActive = useLocale();
  const router = useRouter()
  const dispatch = useAppDispatch();
  const t = useTranslations('info');

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    router.push(`/${localeActive}/payment`);
    dispatch(addInfo(values));
    localStorage.setItem("info", JSON.stringify(values));
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


let localeHide = true;
if(localeActive == 'vi'){
  localeHide = false
}

useEffect(() => {
  
  const localInfo = JSON.parse(localStorage.getItem("info") || "{}");
setInfo(localInfo);

}, []);
useEffect(() => {
  console.log(' chạy set field')
  
  form.setFieldsValue({
    email:info.email,
    country:info.country,
    fullName:info.fullName,
    address:info.address,
    dist:info.dist,
    city:info.city,
    phone:info.phone,
  });


}, [info]);
    return(
    <div className="text-center px-2 ">
     <Image width={90} height={90} src="/images/ebw_logo2.png" alt="menu" className={styles.headerImg} />
     <Breadcrumb className='flex justify-center'
      separator=">"
    items={[
      {
        title: <Link href={`/${localeActive}/cart`} className="">
          {t('cart')}
      
        </Link>,
      },
      {
        title: <p className='text-black font-bold'>
{t('information')}
        </p>
       ,
      },
      {
        title:<Link href={`/${localeActive}/payment`} className="">
      {t('payment')}
         </Link>,
      }
    ]}
  />
  <div className="flex flex-row justify-between px-3 py-4 text-sm">
        <p>{t('shippingAddress')}</p>
        
      </div>
      <ConfigProvider
  theme={{

    token: {
      /* here is your global tokens */
      // colorPrimary:"black",
      colorPrimary:'#002549'
    },
  }}
>
<Form
form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ }}
    style={{ maxWidth: "100%" }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    
  >
    <Form.Item<FieldType>
      label=""
      name="email"
      
      rules={[{ required: true, message: `${t('pleaseInputYour')} email` }, {
        type: 'email',
        message: 'The input is not valid Email!',
      }]}
      style={{textAlign:'left'}}
    >
      <Input placeholder="Email" style={{ display: 'inline-block', width: '100%',padding:'13px', lineHeight: '32px', textAlign: 'left' }}/>
    </Form.Item>
{localeHide ?  <Form.Item<FieldType>
      label=""
      name="country"
      
      rules={[{ required: true, message: 'Please input your Country!' }]}
    >
      <Input placeholder="Country/region" style={{ display: 'inline-block', width: '100%',padding:'13px', lineHeight: '32px', textAlign: 'left' }}/>
    </Form.Item> : '' }
   

    <Form.Item<FieldType>
      label=""
      name="fullName"
      style={{textAlign:'left'}}
      rules={[{ required: true, message: `${t('pleaseInputYour')} ${t('fullName')}` }]}
    >
      <Input placeholder={t('fullName')} style={{ display: 'inline-block', width: '100%',padding:'13px', lineHeight: '32px', textAlign: 'left' }}/>
    </Form.Item>
    <Form.Item<FieldType>
      label=""
      name="address"
      style={{textAlign:'left'}}
      rules={[{ required: true, message: `${t('pleaseInputYour')} ${t('address')}` }]}
    >
      <Input placeholder={t('address')} style={{ display: 'inline-block', width: '100%',padding:'13px', lineHeight: '32px', textAlign: 'left' }}/>
    </Form.Item>
    <Form.Item<FieldType>
      label=""
      name="dist"
      
      rules={[{ required: false, message: 'Please input your District!' }]}
    >
      <Input placeholder={t('dist')} style={{ display: 'inline-block', width: '100%',padding:'13px', lineHeight: '32px', textAlign: 'left' }}/>
    </Form.Item>
    <Form.Item<FieldType>
      label=""
      name="city"
      
      rules={[{ required: false, message: 'Please input your City!' }]}
    >
      <Input placeholder={t('city')} style={{ display: 'inline-block', width: '100%',padding:'13px', lineHeight: '32px', textAlign: 'left' }}/>
    </Form.Item>

    <Form.Item<FieldType>
      label=""
      name="phone"
      style={{textAlign:'left'}}
      rules={[{ required: true, message:`${t('pleaseInputYour')} ${t('phone')}` }]}
    >
      <Input placeholder={t('phone')} style={{ display: 'inline-block', width: '100%',padding:'13px', lineHeight: '32px', textAlign: 'left' }}/>
    </Form.Item>
  

    <Form.Item  >
      <Button  htmlType="submit" block style={{ height:'60px', fontSize:'18px' }} type='primary' >
      {t('continueToPayment')}
      </Button>
    </Form.Item>
  </Form>
</ConfigProvider>
      

  
    </div>
  );}
  
  export default Information;
  