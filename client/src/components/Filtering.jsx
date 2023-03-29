import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/index.js';

export default function Filtering() {
    const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");
    const [selectedSourceFilter, setSelectedSourceFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState("none");

    const types = useSelector(state => state.allTypeNames);
    const typesOptions = types.map((type, index) => <option key={index} value={type}>{type}</option>)

    const dispatch = useDispatch();

    const handleTypeFilterChange = (e) => {
        // setSelectedTypeFilter(e.target.value);

        // This intermediate assignment is done to ensure that the latest value of selectedTypeFilter (got from e.target.value) is dispatched to the action filterAndOrder. This is because we are bypassing the asynchronous nature of useState. Investigating I found that there is an alternative way of doing this with the 'useCallback' hook, but I found it more complicated.
        const typeFilter = e.target.value;
        setSelectedTypeFilter(typeFilter);

        dispatch(actions.filterAndOrder({
            typeFilter: typeFilter,             // can be 'all'
            sourceFilter: selectedSourceFilter, // can be 'all'
            Order: selectedOrder,               // can be 'none'
        }))
    };

    const handleSourceFilterChange = (e) => {
        
    };
    
    const handleOrderChange = (e) => {
    
    };

        useEffect(() => {
        dispatch(actions.getTypes());
    }, []);

    return (
        // Ordering and Filtering
        <div
            className='divOrderFiltering'>
            {/* FILTER BY TYPE */}
            <span>Type</span>
            <select className='selectOrderFilter'
                name='type'
                value={selectedTypeFilter}
                onChange={handleTypeFilterChange}
            >
                {/* <option value="" disabled>Select Filter</option> */}
                <option value='all'>All</option>
                {typesOptions}
            </select>

            {/* FILTER BY SOURCE */}
            <span>Source</span>
            <select
                className='selectOrderFilter'
                name='source'
                value={selectedSourceFilter}
                onChange={handleSourceFilterChange}
            >
                <option value='all'>All</option>
                <option value='pokédex'>pokédex</option>
                <option value='created'>created</option>

            </select>

            {/* ORDER BY NAME OR ATTACK (ASC OR DESC) */}
            <span>Order by</span>
            <select
                className='selectOrderFilter'
                name='order'
                value={selectedSourceFilter}
                onChange={handleOrderChange}
            >
                <option value='none'>None</option>
                <option value='name-asc'>name (ascending)</option>
                <option value='name-desc'>name (descending)</option>
                <option value='attack-asc'>attack (ascending)</option>
                <option value='attack-desc'>attack (descending)</option>
            </select>
        </div>
    );
}