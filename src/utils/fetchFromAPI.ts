import axiosClient from './http-common';

export const getListProduct = async () => {
  const { data } = await axiosClient.get(`/product/get-products-category?categoryName=&page=0&size=5`);
  return data;
};

export const getFilterProduct = async (payload: any) => {
  const { data } = await axiosClient.get(`/product/get-products-category?categoryName=${payload}&page=0&size=5`);
  return data;
};
