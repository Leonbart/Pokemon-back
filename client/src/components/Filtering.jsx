import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/index.js';

export default function Filtering() {
    const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");
    const [selectedSourceFilter, setSelectedSourceFilter] = useState("all");
    const [selectedNameOrder, setSelectedNameOrder] = useState("none");
    const [selectedAttackOrder, setSelectedAttackOrder] = useState("none");

    const types = useSelector(state => state.allTypeNames);
    const typesOptions = types.map((type, index) => <option key={index} value={type}>{type}</option>)

    const dispatch = useDispatch();

    const handleTypeFilterChange = (e) => {
        // setSelectedTypeFilter(e.target.value);

        // This intermediate assignment is done to ensure that the latest value of selectedTypeFilter (got from e.target.value) is dispatched to the action filterAndOrder. This is because we are bypassing the asynchronous nature of useState. Investigating I found that there is an alternative way of doing this with the 'useCallback' hook, but I found it more complicated.
        const typeFilter = e.target.value;
        setSelectedTypeFilter(typeFilter);

        dispatch(actions.filterAndOrder({
            typeFilter: typeFilter,
            sourceFilter: selectedSourceFilter,
            nameOrder: selectedNameOrder,   // can be 'none'
            attackOrder: selectedAttackOrder    // can be 'none'
        }))
    };

    useEffect(() => {
        dispatch(actions.getTypes());
    }, []);

    return (
        // Ordering and Filtering
        <div
            className='divOrderFiltering'>
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

            <span>Source</span>
            <select
                className='selectOrderFilter'
                name='source'
                value={selectedSourceFilter}
                onChange={handleTypeFilterChange}
            >
                <option value='all'>All</option>
                <option value='pokédex'>pokédex</option>
                <option value='created'>created</option>
            </select>
        </div>
    );
}