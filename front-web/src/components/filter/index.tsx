import { useEffect, useState } from 'react';
import Select from 'react-select';
import { buildStoreNames } from '../../helpers';
import { StoreFilterData } from '../../types/filterData';
import { Store } from '../../types/store';
import { StoreNames } from '../../types/storeNames';
import { makeRequest } from '../../utils/request';
import './styles.css';

type Props = {
    onFilterChange: (filter: StoreFilterData) => void
};

const Filter = ({ onFilterChange }: Props) => {
    const [store, setStore] = useState<Store[]>();
    const [storeNames, setStoreNames] = useState<StoreNames>();

    const onChangeStore = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStore = event.target.value;

        console.log('Selected Store: ' + selectedStore)

        //setGender(selectedGender);
        //onFilterChange({ store: selectedStore });
    }

    useEffect(() => {
        makeRequest
            .get<Store[]>('/stores')
            .then((response) => {
                //const storeNames = buildStoreNames(response.data);
                //setStoreNames(storeNames);
                setStore(response.data);
            })
            .catch(() => {
                console.log('Error to fetch stores');
            });
    }, [])

    return (
        <div className='sales-filter-container'>
            <select className='sales-filter-select' onChange={onChangeStore}>
                {store?.map((store) => (
                    <option value={store.id}>{store.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;