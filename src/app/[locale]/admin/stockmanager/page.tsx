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
 
} from 'antd';
import type { FormProps } from 'antd';
import { categoryService, productService, stockService } from '@/service/service';
import type { TableProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Space, Table, Tag, DatePicker, Button, Drawer, Radio, Modal  } from 'antd';
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
const { Dragger } = Upload;

interface DataType {
  order_id:string;
  full_name: string;
  email:string;
  phone:string;

 
}
// interface StockDataType {
//   product_id:number;
//   size: string;
//  stock: number;
//  stock_id: number;

// }
type FieldType = {
  category_is: number;
  name: string;
  price_vnd: number;
  price_usd: number;
  desc_vi:string;
  desc_en:string;
file:any;

};
type FieldTypeStock = {
  size: string;
  stock: string;
  product_id: number;
};
const { TextArea } = Input;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      // message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      // message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
const StockManager = () => {
  const baseURL = 'https://api.easybadwork.com';
  const [allProduct, setAllProduct] =  useState<any[]>([

  ]);
  const [allCategory, setAllCategory]  = useState<any[]>([]);
  const [openStock, setOpenStock] = useState(false);
  const [open, setOpen] = useState(false);
const [currentProduct, setCurrentProduct] = useState<any>(null);
const [currentStock, setCurrentStock] = useState<any[]>([]);
  // console.log('category',allCategory)
  // console.log('all product',allProduct)
  console.log('current stock',currentStock)
console.log('current product',currentProduct)
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      // render: (item) => <a>{item.slice(4)}</a>,
      render: (item) => item ? <img src={baseURL + `${item[0]?.slice(4)}`} alt="product" width={50} /> : 'No image',
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
        onClick={()=>showDrawerStock(record)}
        >

       <a>Stock</a>
       </button>
        </Space>
      ),
    },

  ];
  const stockColumns: TableProps<DataType>['columns'] = [
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Update </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]; 


//modal
  const showModal = () => {
    setOpen(true);
  };

 const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  console.log('Success:', values);
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (key === 'file') {
      formData.append(key, values[key][0].originFileObj);
    } else {
      formData.append(key, values[key]);
    }
  });

  try {
    const res = await productService.createProduct(formData);
    console.log('formData truyền vào',formData)
    console.log("Product Create Response:", res.data);
    setOpen(false);
    message.success(` PRODUCT CREATED.`);
  } catch (err) {
    console.error("Product Create Error:", err);
  }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


const showDrawerStock = (record) => {
  setOpenStock(true);
  setCurrentProduct(record)
  //setCurrentStock
 // console.log('get info stock',record)
};

const onCloseStock = () => {
  setOpenStock(false);
};
// modal add stock 
const [isModalOpenStock, setIsModalOpenStock] = useState(false);

const showModalStock = () => {
  setIsModalOpenStock(true);
};

const handleOkStock = () => {
  setIsModalOpenStock(false);
};

const handleCancelStock = () => {
  setIsModalOpenStock(false);
};
// form add size - stock
const onFinishStock: FormProps<FieldTypeStock>['onFinish'] = async (values) => {
  console.log('Success stock:', values);
  const newValues = { ...values, product_id: currentProduct.product_id };
  try {
    const res = await stockService.createStock(newValues);
    console.log('Stock Create Response:', res.data);
    message.success(`STOCK CREATED.`);
    setIsModalOpenStock(false);
    // setOpenStock(false);
  } catch (err) {
    console.error("Stock Create Error:", err);
  }
};

const onFinishFailedStock: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed stock:', errorInfo);
};


useEffect(() => {
  if (currentProduct) {
    stockService
      .getStockById(currentProduct.product_id)
      .then((res) => {
        setCurrentStock(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }
}, [openStock, currentProduct]);

//get all product
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
// get all category
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
  <>
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
       
        <Form.Item label="Upload" valuePropName="fileList" name="file" getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}>
            {/* <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> */}
              <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>

  </Dragger>
          </Form.Item>
        
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
      </Form>
        </p>
      </Modal>
      <Drawer title="Stock manager" onClose={onCloseStock} open={openStock}         placement='left'>
        <div className=''>
<div>

        <p>{currentProduct?.name}</p>
        <img src={baseURL + `${currentProduct?.image[0]?.slice(4)}`} alt="product" width={200} /> 
        <Button type="primary" className='mb-2' onClick={showModalStock}>Add stock</Button>
</div>
</div>
<div>
<Table columns={stockColumns} dataSource={currentStock} />
</div>
      
       
      </Drawer>
      {/* modal add stock */}
      <Modal title="Add stock" open={isModalOpenStock} onOk={handleOkStock} onCancel={handleCancelStock}     footer={''}>
      <Form
    // name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    
    // initialValues={{ remember: true }}
    onFinish={onFinishStock}
    onFinishFailed={onFinishFailedStock}
    // autoComplete="off"
  >
    <Form.Item<FieldTypeStock>
      label="Size"
      name="size"
      rules={[{ required: true, message: 'Please input your Size!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldTypeStock>
      label="Stock"
      name="stock"
      rules={[{ required: true, message: 'Please input your Stock!' }]}
    >
      <Input />
    </Form.Item>

    

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Modal>
  </>
)};

export default StockManager;