import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Store } from '../../types/store';
import { StoreFilterData } from '../../types/storeFilterData';
import { makeRequest } from '../../utils/request';
import './styles.css';

type Props = {
    onSubmitFilter: (data: StoreFilterData) => void;
};


const Filter = ({ onSubmitFilter }: Props) => {
    const [store, setStore] = useState<Store[]>();

    const { handleSubmit, setValue, getValues, control } =
        useForm<StoreFilterData>();

    const onSubmit = (formData: StoreFilterData) => {
        onSubmitFilter(formData);
    };

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: '/stores',
            withCredentials: true,
        };

        makeRequest
            .get<Store[]>('/stores', { params })
            .then((response) => {
                setStore(response.data)
            })
            .catch(() => {
                console.log('Error to fetch sales by date');
            });
    }, [])


    return (
        <div className='sales-filter-container'>
            <form>
                <Controller
                    name="store"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={store}
                            isClearable
                            placeholder="Lojas"
                            classNamePrefix="sales-filter-select"
                            getOptionLabel={(store: Store) => store.name}
                            getOptionValue={(store: Store) => String(store.id)}
                        />
                    )}
                />
            </form>

        </div>
    );
};

export default Filter;