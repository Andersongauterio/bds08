import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Store } from '../../types/store';
import { makeRequest } from '../../utils/request';
import './styles.css';

export type FilterData = {
    store?: Store;
};

type Props = {
    onFilterChange: (data: FilterData) => void;
};

const Filter = ({ onFilterChange }: Props) => {
    const [store, setStore] = useState<Store[]>();

    const { handleSubmit, setValue, getValues, control } =
        useForm<FilterData>();

    const onSubmit = (formData: FilterData) => {
        onFilterChange(formData);
    };

    const handleChangeStore = (value: Store) => {
        setValue('store', value);

        const obj: FilterData = {
            store: getValues('store'),
        };

        onFilterChange(obj);
    };

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: '/stores'
        };

        makeRequest
            .get<Store[]>('/stores', { params })
            .then((response) => {
                setStore(response.data)
            })
            .catch(() => {
                console.log('Error to fetch stores');
            });
    }, [])

    return (
        <div className='sales-filter-container'>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            onChange={(value) => handleChangeStore(value as Store)}
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