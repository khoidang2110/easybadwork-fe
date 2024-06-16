"use client";
import React, { useEffect, useState } from 'react';
import { Drawer,Select } from 'antd';
import { useParams } from "next/navigation";
import { products } from "@/mockup";
import CarouselComponent from "@/component/carousel/CarouselComponent";
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { increment, update } from "@/redux/features/counterSlice";
import { addItem } from "@/redux/features/cartSlice";
import { productService, stockService } from '@/service/service';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import { IProduct, IProductCart, IStock } from '@/interfaces/product';
import { NO_IMAGE } from '@/constant';
const Detail = () => {
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };


  const localeActive = useLocale();
 const t = useTranslations('detail');
  // console.log('local active',localeActive)
const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
console.log("currentProduct", currentProduct);
// const baseURL = 'http://14.225.218.217:8081';
const baseURL = 'https://api.easybadwork.com/';
let fullImageURLs = currentProduct?.image?.map(item => `${baseURL}${item.replace('/app', '')}`)|| [];
if (fullImageURLs.length == 0){
fullImageURLs = [NO_IMAGE]
}
console.log("fullImageURLs",fullImageURLs);

  const [stock, setStock] = useState<IStock[]>([]);
// const [sizeOption, setSizeOption] = useState([]);
const [sizeSelect, setSizeSelect] = useState('');
const [quantity, setQuantity] = useState(1);
console.log('sizeSelect',sizeSelect)
const [itemAvailable, setItemAvailable] = useState(0);
console.log("item available",itemAvailable)
// console.log('sizeOption',sizeOption)
  console.log('stock',stock)

  const [isToggled, setIsToggled] = useState(true);
  //const [sizeActive, setsizeActive] = useState('');


  const dispatch = useAppDispatch();

  let count = useAppSelector((state) => state.counter.count);
  //console.log("count add", count);
  const params = useParams();
  //console.log("params.id",params.id);

 // const currentProduct = products.find((product) => product.id === params.id);

  // Check if the currentProduct is found
  // if (!currentProduct) {
  //   return <div>Product not found</div>;
  // }
  //

  const handleClick = () => {
    count = count + quantity;
    localStorage.setItem("count", count.toString());
    dispatch(update(count));

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
   // const productWithSize:IProductCart = {...currentProduct,size:sizeSelect,quantity:quantity,image:fullImageURLs}
   const productWithSize: IProductCart = {
    product_id: currentProduct!.product_id,
    name: currentProduct!.name,
    price_vnd: currentProduct!.price_vnd,
    price_usd: currentProduct!.price_usd,
    desc_vi: currentProduct!.desc_vi,
    desc_en: currentProduct!.desc_en,
    category: currentProduct!.category,
    image: fullImageURLs,
    size: sizeSelect,
    quantity: quantity,
    
  }; 
   console.log("product with size",productWithSize)
    //cartItems.push(currentProduct);
    cartItems.push(productWithSize);
//console.log('cartitem',cartItems)

    localStorage.setItem("cart", JSON.stringify(cartItems));
   // dispatch(addItem(currentProduct));
   dispatch(addItem(productWithSize));
  };


  const handleQuantityChange = (calculation:string) => {
if(calculation=="-"){
  if(quantity==1){
    return;
  }else{
    setQuantity( quantity =>  quantity -1  )
    setItemAvailable(itemAvailable =>  itemAvailable +1 )
  }
}else if(calculation=="+"){
  if(itemAvailable==0){
    return;
  }else{
    setQuantity( quantity =>  quantity +1  )
    setItemAvailable(itemAvailable =>  itemAvailable -1 )
  }
 
}

  };

  const handleSizeChange = (position: string) => {
//console.log('position',position)

    // if(sizeSelect==''){
    //   setIsToggled(!isToggled);
    //   setSizeSelect(position);
    // }else
     if (sizeSelect == position){
      return;
    }else{
      setQuantity(1);
      setSizeSelect(position);
      const item = stock.find(item => item?.size === position);
      if (item) {
          setItemAvailable(item?.stock-1);
          
      } else {
          setItemAvailable(0);
          
      }
      
    }


  }

  useEffect(() => {
    stockService
      .getStockById(Number(params.id))
      .then((res) => {
       // console.log("stock api", res);
        // setProducts(res.data.content);

        // filter size hết
        const filteredInventory:IStock[] = res.data.filter((item:IStock) => item.stock !== 0);
        setStock(filteredInventory);
        // const options = filteredInventory.map(item=>({
        //   value:item.size,
        //   label:item.size
        // }))
        // setSizeOption(options);
        setSizeSelect(filteredInventory[0].size)
        setItemAvailable(filteredInventory[0].stock-1)
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    
    productService
    .getProductById(Number(params.id))
    .then((res) => {
     // console.log("prodduct api by id", res);
      // setProducts(res.data.content);

      // filter size hết
     
      setCurrentProduct(res.data);


    })
    .catch((err) => {});
  
  }, []);

  const [open, setOpen] = useState(false);
 

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };




let sumPrice = '0';
if(currentProduct){
  if(localeActive=='vi'){
    sumPrice = (currentProduct.price_vnd * quantity).toLocaleString();
  }else {
    sumPrice = (currentProduct.price_usd * quantity).toLocaleString();
  }
}

let showStock = t('noStock')
//console.log('showstock',showStock)
if(itemAvailable>3){
  showStock= t('inStock')
  //console.log('showstock in',showStock)
}else if(itemAvailable<=3 && itemAvailable !=0){
showStock = t('lowStock')
//console.log('showstock low',showStock)
}else if(itemAvailable==0){
  showStock = t('noStock')
 // console.log('showstock no',showStock)
}

  return (
    <section className="pt-1">
      <CarouselComponent products={fullImageURLs} />
      <div className="px-2">
        <p className="text-sm mb-2">{localeActive=='vi'? currentProduct?.price_vnd?.toLocaleString() : currentProduct?.price_usd?.toLocaleString()   } {t('currency')} </p>
        <p className="uppercase text-xl mb-10">{currentProduct?.name}</p>
        <div className="mb-8">
          <p>{t('detail')}</p>
          <p>{localeActive=='vi'?  currentProduct?.desc_vi : currentProduct?.desc_en}</p>
        </div>
        <div className="flex flex-row items-center  justify-between">

        <p className='pr-3'>{t('size')}</p> 
        
        <button onClick={showDrawer} className={styles.SizeChartButton}>{t('sizeChart')}</button>
        
       
        </div>
        <div className='flex pt-2'>
        {stock.map(item =>(
            <div className='pr-2'>
            <button className={`${styles.SizeButton} ${isToggled && sizeSelect == item.size ? styles.SizeButtonActive : '' }`}  onClick={() => handleSizeChange(item?.size)}> 
              {item.size}
              </button>
            </div>
        ))}
          </div>
<div className='pt-2'>
{/* <p>{t('only')} {itemAvailable} {t('left')}</p> */}
<p>{showStock}</p>



</div> { stock.length>0 && <div
          className=" rounded p-4 mb-2  mt-8 flex justify-between"
          style={{ borderColor:'black'   , borderWidth: '1px'}}
        >
          <button onClick={()=>handleQuantityChange('-')} className="px-2 text-lg font-semibold">-</button>
          <p>{quantity}</p>
          <button onClick={()=>handleQuantityChange('+')} className="px-2 text-lg font-semibold">+</button>
        </div> }

   
 
       {stock.length>0 && 

<div
          className="rounded p-4 mb-2  mt-8  "
          style={{ backgroundColor: "#002549" ,color:'white'}}
        >
          <button onClick={handleClick} className="flex justify-between w-full">{t('addToCart')} <p>{sumPrice} {t('currency')} </p></button>
          
        </div>
       } 
      </div>
     
 
      <Drawer
        title="Size Chart"
        placement='top'
        closable={false}
        onClose={onClose}
        open={open}
        key={'top'}
        height='300'
      >
  <img src="/images/sizeChart.jpg" alt="" />
      </Drawer>
     
    </section>
  );
};

export default Detail;
