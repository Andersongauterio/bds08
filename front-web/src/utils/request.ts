import  axios, { AxiosRequestConfig }  from "axios";
import { FilterData } from "../types/filterData";

const baseURL = 'http://localhost:8080';

export const makeRequest = axios.create({
  baseURL
});

export const buildFilterParams = (
  filterData?: FilterData,
  extraParams?: Record<string, unknown>
) => {
  return {
    gender: filterData?.store,
    ...extraParams
  };
};