"use client";
import { useParams } from "next/navigation";

import { products } from "@/mockup";
import CarouselComponent from "@/component/carousel/CarouselComponent";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { increment, update } from "@/redux/slices/counterSlice";
import { addItem } from "@/redux/slices/cartSlice";

const Detail = () => {
  const dispatch = useAppDispatch();

  let count = useAppSelector((state) => state.counter.count);
  console.log("count add", count);
  const params = useParams();
  console.log(params.id);

  const currentProduct = products.find((product) => product.id === params.id);

  // Check if the currentProduct is found
  if (!currentProduct) {
    return <div>Product not found</div>;
  }
  console.log("currentProduct", currentProduct);

  const handleClick = () => {
    count = count + 1;

    localStorage.setItem("count", count.toString());
    dispatch(update(count));

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    cartItems.push(currentProduct);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    dispatch(addItem(currentProduct));
  };

  return (
    <section className="pt-1">
      <CarouselComponent products={currentProduct.image} />
      <div className="px-2">
        <p className="text-sm mb-2">{currentProduct.price}</p>
        <p className="uppercase text-xl mb-10">{currentProduct.name}</p>
        <div className="mb-8">
          <p>DETAIL</p>
          <p>{currentProduct.description}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>SIZE</p> <p>Size Chart</p>
        </div>

        <p>S M L</p>
        <div
          className=" rounded p-4 mb-2  mt-8 "
          style={{ backgroundColor: "#d0f491" }}
        >
          <button onClick={handleClick} className="w-full">Add to Cart</button>
        </div>
      </div>
    </section>
  );
};

export default Detail;
