import  axios from "axios";
import { StoreFilterData } from "../components/filter";

const baseURL = 'http://localhost:8080';

export const makeRequest = axios.create({
  baseURL
});

export const buildFilterParams = (
  filterData?: StoreFilterData,
  extraParams?: Record<string, unknown>
) => {
  return {
    gender: filterData?.store,
    ...extraParams
  };
};