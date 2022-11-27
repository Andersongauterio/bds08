import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Store } from '../../types/store';
import { makeRequest } from '../../utils/request';
import './styles.css';

const Filter = () => {

    const [selectStores, setSelectStores] = useState<Store[]>([]);

    useEffect(() => {
        makeRequest
            .get<Store[]>('/stores', {})
            .then((response) => {
                setSelectStores(response.data);
            })
            .catch(() => {
                console.log('Error to fetch stores');
            });
    }, [])

    return (
        <div className='sales-filter-container'>
            <Select
                options={selectStores}
                isClearable
                placeholder="Lojas"
                classNamePrefix="sales-filter-select"
                getOptionLabel={(store: Store) => store.name}
                getOptionValue={(store: Store) => String(store.id)}
            />
        </div>
    );
};

export default Filter;