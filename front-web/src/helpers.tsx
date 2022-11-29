import { SalesByGender } from "./types/salesByGender";

export const buildSalesByStoreChart = (sales: SalesByGender[]) => {
  const labels = sales.map((sale) => sale.gender);
  const series = sales.map((sale) => sale.sum);

  return {
    labels,
    series
  };
};