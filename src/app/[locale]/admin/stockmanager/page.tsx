"use client"
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Cascader,
  Checkbox,
  ColorPicker,
 
  Form,
  Input,
  InputNumber,
 
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import type { FormProps } from 'antd';
import { categoryService, productService } from '@/service/service';
import type { TableProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Space, Table, Tag, DatePicker, Button, Drawer, Radio, Modal  } from 'antd';
interface DataType {
  order_id:string;
  full_name: string;
  email:string;
  phone:string;

 
}

type FieldType = {
  category_is: number;
  name: string;
  price_vnd: number;
  price_usd: number;
  desc_vi:string;
  desc_en:string;
file:any;

};

const { TextArea } = Input;
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const props: UploadProps = {
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'uploading',
      url: 'http://www.baidu.com/xxx.png',
      percent: 33,
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
};
const StockManager = () => {

  const [allProduct, setAllProduct] =  useState<any[]>([

  ]);
  const [allCategory, setAllCategory]  = useState<any[]>([]);
  console.log('category',allCategory)
  console.log('all product',allProduct)
  useEffect(() => {
    
    productService
    .getAllProduct()
    .then((res) => {
   
     console.log(res)
  setAllProduct(res.data)
    })
    .catch((err) => {
    
      console.log(err);
    });
  
  }, []);
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Product id',
      dataIndex: 'product_id',
      key: 'product_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price_vnd',
      key: 'price_vnd',
      dataIndex: 'price_vnd',
    },
    {
      title: 'Price_usd',
      key: 'price_usd',
    dataIndex:'price_usd',
      
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
       <button
        // onClick={() => showDrawer(record)}
        >

       <a>Edit</a>
       </button>
       <button
        // onClick={() => showDrawer(record)}
        >

       <a>Stock</a>
       </button>
        </Space>
      ),
    },

  ];
  // modal 
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

 const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
  productService
  .createProduct(values)
  .then((res) => {
    console.log("product create api", res);
    // setProducts(res.data.content);

   
  })
  .catch((err) => {
    console.log(err);
  });
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};



  useEffect(() => {
    categoryService
    .getAllCategory()
    .then((res) => {
      //console.log("product api", res);
      // setProducts(res.data.content);

      setAllCategory(res.data);
    })
    .catch((err) => {});
  
   
   
  }, []);
  return (
  <div  className=''>
 <Button type="primary" className='mb-2'onClick={showModal}>Add product</Button>
 <Table columns={columns} dataSource={allProduct} />
 <Modal
        title="Title"
        open={open}
        footer={''}
       
        onCancel={() => setOpen(false)}
      >
        <p>

        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: 600 }}
      >
    
    <Form.Item label="Category"
        
         name="category_id"
         rules={[{ required: true, message: 'Please input'}]}>
          <Select>{
            allCategory.map(item=>(
<Select.Option value={item.category_id} >{item.category_name}</Select.Option>
            ))
            }
           
          </Select>
        </Form.Item>
        <Form.Item label="name" name='name' >
          <Input />
        </Form.Item>
        <Form.Item label="price_vnd" name="price_vnd" >
        <InputNumber />
        </Form.Item>
        <Form.Item label="price_usd" name="price_usd">
        <InputNumber />
        </Form.Item>
        <Form.Item label="desc_vi" name="desc_vi">
        <TextArea rows={2} />
        </Form.Item>
        <Form.Item label="desc_en" name="desc_en">
        <TextArea rows={2} />
        </Form.Item>
       
        <Form.Item label="Upload" valuePropName="fileList" name='file' getValueFromEvent={normFile}>
        <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
        </Form.Item>
       
        
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
      </Form>
        </p>
      </Modal>
  </div>
)};

export default StockManager;