export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type SalesByGender = {
    gender: Gender;
    sum: number;
  };