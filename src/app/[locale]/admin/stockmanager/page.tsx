'use client';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Cascader, Checkbox, ColorPicker, Form, Input, InputNumber, Select, Slider, Switch, TreeSelect } from 'antd';
import type { FormProps } from 'antd';
import { categoryService, productService, stockService } from '@/service/service';
import type { TableProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Space, Table, Tag, DatePicker, Button, Drawer, Radio, Modal } from 'antd';
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import Category from '../../category/[id]/page';
import { IProduct,IProductCart } from '@/interfaces/product';
const { Dragger } = Upload;




interface StockDataType {
  product_id: number;
  size: string;
  stock: number;
  stock_id: number;
}
type FieldType = {
  category_is: number;
  name: string;
  price_vnd: number;
  price_usd: number;
  desc_vi: string;
  desc_en: string;
  file: any;
  product_id?:number;
} & { [key: string]: any };

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
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      // message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      // message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    // console.log('Dropped files', e.dataTransfer.files);
  },
};
const StockManager = () => {
  const [formStock] = Form.useForm();
  const [formProduct] = Form.useForm();
  const baseURL = 'https://api.easybadwork.com';
  const [randomNumber, setRandomNumber] = useState(11);
  const [allProduct, setAllProduct] = useState<IProduct[]>([]);
  const [allCategory, setAllCategory] = useState<any[]>([]);
  const [openStock, setOpenStock] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [currentStock, setCurrentStock] = useState<StockDataType[]>([]);

  const [currentStockItem, setCurrentStockItem] = useState<StockDataType>();
  const [modalStockTitle, setModalStockTitle] = useState('Add stock');
  const [modalProductTitle, setModalProductTitle] = useState('Add product');
  console.log('all category',allCategory)
  // console.log('all product',allProduct)
  console.log('current stock', currentStock);
  console.log('current product', currentProduct);
  //add product layout
  const columns: TableProps<IProduct>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      // render: (item) => <a>{item.slice(4)}</a>,
      render: (item) => (item ? <img src={baseURL + `${item[0]?.slice(4)}`} alt="product" width={50} /> : 'No image'),
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
      dataIndex: 'price_usd',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => showModalProduct('Update product',record)}>
            <a>Edit</a>
          </button>
          <button onClick={() => showDrawerStock(record)}>
            <a>Stock</a>
          </button>
          <button onClick={() => deleteProduct(record.product_id)} >
            <a>Delete</a>
          </button>
        </Space>
      ),
    },
  ];
  //add stock layout
  const stockColumns: TableProps<StockDataType>['columns'] = [
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
          <button onClick={() => showModalStock('Update stock', record)}>
            {' '}
            <a>Set </a>{' '}
          </button>

          <button onClick={() => deleteStock(record.stock_id)}>
            <a>Delete </a>
          </button>
        </Space>
      ),
    },
  ];

  //modal product input
  const showModalProduct = (value: string,record:any) => {
    setOpen(true);
    setModalProductTitle(value);
    setCurrentProduct(record);
    setRandomNumber(Math.random());
  };

const onFinish = async (values:FieldType) => {
  const formData = new FormData();
  
  try {
    if (modalProductTitle === 'Add product') {
      console.log('Success: new ', values);

      // Add fields to formData
      Object.keys(values).forEach((key) => {
        if (key === 'file' && values[key]?.length > 0) {
          // Only append file if it exists
          formData.append(key, values[key][0].originFileObj);
        } else if (key !== 'file') {
          formData.append(key, values[key] as any);
        }
      });

      await productService.createProduct(formData);
      
      
      message.success('PRODUCT CREATED.');
    } else if (modalProductTitle === 'Update product') {
      console.log('Success: updated ', values);
const newValues = {...values,product_id:currentProduct.product_id}
      // Ensure product_id is included
      //formData.append('product_id', currentProduct.product_id);

      // Add fields to formData
      Object.keys(newValues).forEach((key) => {
        if (key === 'file' && newValues[key]?.length > 0) {
          // Only append file if it exists
          formData.append(key, newValues[key][0].originFileObj);
        } else if (key !== 'file') {
          formData.append(key, newValues[key] as any);
        }
      });
      formData.forEach((value, key) => {
        console.log(`formData update Product: ${key} = ${value}`);
      });
      await productService.updateProduct(formData);
      
     
      message.success('PRODUCT UPDATED.');
    }
    setOpen(false);
    fetchAllProduct();
  } catch (err) {
    console.error('Product Save Error:', err);
    message.error('Error saving product');
  }
};


  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showDrawerStock = (record:IProduct) => {
    console.log('get info stock',record)
    setOpenStock(true);

    setCurrentProduct(record);
    //setCurrentStock
  
  };

  const onCloseStock = () => {
    setOpenStock(false);
  };
  // modal add stock
  const [isModalOpenStock, setIsModalOpenStock] = useState(false);

  const showModalStock = (value: string, record:StockDataType | any) => {
    setIsModalOpenStock(true);
    setModalStockTitle(value);
    //console.log('record update pick',record)
    setCurrentStockItem(record);
    // lay size vào stock render
    // "size":"L",
    // "stock":12,
    // "product_id":1
    setRandomNumber(Math.random());
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

    // if title add ->
    if (modalStockTitle == 'Add stock') {
      const newValues = { ...values, product_id: currentProduct.product_id };
      try {
        const res = await stockService.createStock(newValues);
        console.log('Stock Create Response:', res.data);
        message.success(`STOCK CREATED.`);
        setIsModalOpenStock(false);
        // setOpenStock(false);
        setRandomNumber(Math.random());
      } catch (err) {
        console.error('Stock Create Error:', err);
      }
    } else if (modalStockTitle == 'Update stock') {
      //if title update ->
      const newValues = { ...values, product_id: currentProduct.product_id };
      try {
        const res = await stockService.updateStock(newValues);
        console.log('Stock update Response:', res.data);
        message.success(`STOCK UPDATED.`);
        setIsModalOpenStock(false);
        // setOpenStock(false);
        setRandomNumber(Math.random());
      } catch (err) {
        console.error('Stock update Error:', err);
      }
    }
  };

  const onFinishFailedStock: FormProps<FieldTypeStock>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed stock:', errorInfo);
  };
  const fetchCurrentStock = () => {
    if (currentProduct) {
      stockService
        .getStockById(currentProduct.product_id)
        .then((res) => {
          const takeData = res.data;
          console.log(res.data);
          console.log('res.data.type', takeData[0].type);
          if (res.data.slice(0, 2) == 'No') {
            console.log('case1');
            setCurrentStock([]);
            // setCurrentStock([{
            //   product_id: 0,
            //   size:'',
            //   stock:0,
            //   stock_id:0
            // }]);
          } else {
            console.log('case2');
            setCurrentStock(res.data);
          }
          // setCurrentStock(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const deleteStock = (stock_id: number) => {
    stockService
      .deleteStock(stock_id)
      .then((res) => {
        console.log(res);
        message.success(`You just delete the product.`);
        fetchAllProduct()
      })
      .catch((err) => {
        console.log(err);
      });
    setRandomNumber(Math.random());
  };
  const deleteProduct = (product_id:string)=>{
    productService
    .deleteProduct(Number( product_id))
    .then((result) => {
      console.log(result)
      message.success(`product deleted.`);
      fetchAllProduct();
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    fetchCurrentStock();
  }, [openStock, currentProduct]);
  useEffect(() => {
    fetchCurrentStock();
  }, [randomNumber]);

const fetchAllProduct = () => {
 productService
      .getAllProduct()
      .then((res) => {
        console.log(res);
        const filteredArray = res.data.filter((item:IProduct) => item.delete === false);
        setAllProduct(filteredArray.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
}
  //get all product
  useEffect(() => {
   fetchAllProduct()
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
  // set field modal stock
  useEffect(() => {
    console.log(' chạy set field stock');

    formStock.setFieldsValue({
      // email:info.email,
      // country:info.country,

      size: currentStockItem?.size,
      stock: currentStockItem?.stock,
    });
  }, [randomNumber]);
  const getCategoryId = (categoryName:string) => {
    const category = allCategory.find(cat => cat.category_name === categoryName);
    return category ? category.category_id : null;
  };
  //get field product
  useEffect(() => {
    const categoryId = getCategoryId(currentProduct?.category);
  
    formProduct.setFieldsValue({
   
      category_id:categoryId,  
      desc_vi: currentProduct?.desc_vi,
      desc_en: currentProduct?.desc_en,
      name: currentProduct?.name,
      
      price_usd: currentProduct?.price_usd,
      price_vnd:currentProduct?.price_vnd,
      
      // size: currentStockItem?.size,
      // stock: currentStockItem?.stock,
    });
  }, [randomNumber]);


  //search name of product
  


  return (
    <>
      <Button type="primary" className="mb-2" onClick={() => showModalProduct('Add product',0)}>
        Add product
      </Button>
      <Table columns={columns} dataSource={allProduct} />
      <Modal title={modalProductTitle} open={open} footer={''} onCancel={() => setOpen(false)}>
        <p>
          <Form
          form={formProduct}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="Category" name="category_id" rules={[{ required: true, message: 'Please input' }]}>
              <Select>
                {allCategory.map((item) => (
                  <Select.Option value={item.category_id}>{item.category_name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="price_vnd" name="price_vnd">
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
{/* up hình */}
 <Form.Item
              label="Upload"
              valuePropName="fileList"
              name="file"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
         
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
      <Drawer title="Stock manager" onClose={onCloseStock} open={openStock} placement="left">
        <div className="">
          <div>
            <p>{currentProduct?.name}</p>
            {currentProduct ?  <img src={baseURL + `${currentProduct?.image[0]?.slice(4)}`} alt="product" width={200} /> :''  }
           
            <Button type="primary" className="mb-2" onClick={() => showModalStock('Add stock',0)}>
              Add stock
            </Button>
          </div>
        </div>
        <div>
          <Table columns={stockColumns} dataSource={currentStock} />
        </div>
      </Drawer>
      {/* modal add stock */}
      <Modal
        title={modalStockTitle}
        open={isModalOpenStock}
        onOk={handleOkStock}
        onCancel={handleCancelStock}
        footer={''}
      >
        <Form
          // name="basic"
          form={formStock}
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
            <Input 
            
             disabled={modalStockTitle === 'Add stock' ? false : true} 
             />
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
  );
};

export default StockManager;
