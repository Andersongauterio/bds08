import  axios from "axios";
import { Store } from "../types/store";

export type StoreFilterData = {
  store: Store | null;
};

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