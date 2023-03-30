import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/index.js';

export default function Filtering() {
    const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");
    const [selectedSourceFilter, setSelectedSourceFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState("none");

    // Set types to be displayed in select from allTypeNames state.
    const types = useSelector(state => state.allTypeNames);
    const typesOptions = types.map((type, index) => <option key={index} value={type}>{type}</option>)

    const dispatch = useDispatch();

    const handleFilterOrderChange = (e) => {
        e.preventDefault();

        // Set default values for selected options
        let typeFilter = selectedTypeFilter;
        let sourceFilter = selectedSourceFilter;
        let order = selectedOrder;

        // Verify which select changed (called the handler)
        switch (e.target.name) {
            case 'type':
                // This intermediate assignment is done to ensure that the latest value of selectedTypeFilter (got from e.target.value) is dispatched to the action filterAndOrder. This is because we are bypassing the asynchronous nature of useState. Investigating, I found that there is an alternative way of doing this with the 'useCallback' hook, but I found it more complicated.
                typeFilter = e.target.value;
                setSelectedTypeFilter(typeFilter);
                break;
            case 'source':
                sourceFilter = e.target.value;
                setSelectedSourceFilter(sourceFilter);
                break;
            case 'order':
                order = e.target.value;
                setSelectedOrder(order);
                break;
            default:
        };

        // Dispatch filterAndOrder action with an object created with the filtering and ordering data as the payload
        dispatch(actions.filterAndOrder({
            typeFilter: typeFilter,
            sourceFilter: sourceFilter,
            order: order,
        }))
    };

    useEffect(() => {
        dispatch(actions.getTypes());
    }, [dispatch]);

    return (
        // Ordering and Filtering
        <div
            className='divOrderFiltering'>
            {/* FILTER BY TYPE */}
            <span>Type</span>
            <select className='selectOrderFilter'
                name='type'
                value={selectedTypeFilter}
                onChange={handleFilterOrderChange}
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
                onChange={handleFilterOrderChange}
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
                value={selectedOrder}
                onChange={handleFilterOrderChange}
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