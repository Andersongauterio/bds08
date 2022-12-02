import { SalesByGender } from "./types/salesByGender";
import { Store } from "./types/store";

export const buildSalesByStoreChart = (sales: SalesByGender[]) => {
    const labels = sales.map((sale) => sale.gender);
    const series = sales.map((sale) => sale.sum);

    return {
        labels,
        series
    };
};

export const buildStoreNames = (stores: Store[]) => {
    const storeName = stores.map((store) => store.name);
    return storeName;
};