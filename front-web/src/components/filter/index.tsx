import { useEffect, useState } from 'react';
import Select from 'react-select';
import { FilterData } from '../../types/filterData';
import { Store } from '../../types/store';
import { makeRequest } from '../../utils/request';
import './styles.css';

type Props = {
    onFilterChange: (filter: FilterData)=> void
  };

const Filter = ({ onFilterChange }: Props) => {

    const [store, setStore] = useState<Store[]>([]);

    useEffect(() => {
        makeRequest
            .get<Store[]>('/stores', {})
            .then((response) => {
                setStore(response.data);
            })
            .catch(() => {
                console.log('Error to fetch stores');
            });
    }, [])

    return (
        <div className='sales-filter-container'>
            <Select
                options={store}
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