import axiosClient from './http-common';

export const getListProduct = async () => {
  const { data } = await axiosClient.get(`/product/get-all-products`);
  return data;
};

export const getFilterProduct = async (payload: any) => {
  const { data } = await axiosClient.get(`/product/get-all-products?name=${payload}`);
  return data;
};
