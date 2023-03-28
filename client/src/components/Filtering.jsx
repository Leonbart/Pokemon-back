import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions/index.js';

export default function Filtering() {
    const [ selectedOrdering, setSelectedOrdering] = useState("");
    const [ selectedFiltering, setSelectedFiltering] = useState("");

    const dispatch = useDispatch();

    const handleOrderChange = (e) => {
        // dispatch(actions.orderCards(e.target.value));
        setSelectedOrdering(e.target.value);
        setSelectedFiltering("");
    };

    const handleFilterChange = (e) => {
        // dispatch(actions.filterCards(e.target.value));
        setSelectedFiltering(e.target.value);
        setSelectedOrdering("");
    };

    return (
            // Ordering and Filtering
            <div
                className='divOrderFiltering'>
                <select className='selectOrderFilter'
                    name='order'
                    value={selectedOrdering}
                    onChange={handleOrderChange}
                // defaultValue=""
                >
                    <option value="" disabled>Select Order</option>
                    <option value='ASC'>Ascending</option>
                    <option value='DESC'>Descending</option>
                </select>

                <select
                    className='selectOrderFilter'
                    name='filter'
                    value={selectedFiltering}
                    onChange={handleFilterChange}
                // defaultValue=""
                >
                    <option value="" disabled>Select Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Genderless'>Genderless</option>
                    <option value='unknown'>unknown</option>
                </select>
            </div>
    );
}