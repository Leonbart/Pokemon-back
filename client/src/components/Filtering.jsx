import styles from './Filtering.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/index.js';
import Button from '../components/Button.jsx';

export default function Filtering() {
    // const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");
    // const [selectedSourceFilter, setSelectedSourceFilter] = useState("all");
    // const [selectedOrder, setSelectedOrder] = useState("none");
    const selectedTypeFilter = useSelector(state => state.selectedTypeFilter);
    const selectedSourceFilter = useSelector(state => state.selectedSourceFilter);
    const selectedOrder = useSelector(state => state.selectedOrder);

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
                dispatch(actions.setSelectedTypeFilter(typeFilter));
                break;
            case 'source':
                sourceFilter = e.target.value;
                dispatch(actions.setSelectedSourceFilter(sourceFilter));
                break;
            case 'order':
                order = e.target.value;
                dispatch(actions.setSelectedOrder(order));
                break;
            default:
        };

        // Dispatch filterAndOrder action with an object created with the filtering and ordering data as the payload
        dispatch(actions.filterAndOrder({
            typeFilter: typeFilter,
            sourceFilter: sourceFilter,
            order: order,
        }));

        // Set current page in 1
        dispatch(actions.setCurrentPage(1));
    };

    useEffect(() => {
        dispatch(actions.getTypes());
    }, [dispatch]);

    return (
        // Ordering and Filtering
        <div className={styles.divOrderFilter}>
            {/* FILTER BY TYPE */}
            <div className={styles.filterOrderColumn}>
                <span className={styles.selectTitle}>Type</span>
                <select className={styles.selectOrderFilter}
                    name='type'
                    value={selectedTypeFilter}
                    onChange={handleFilterOrderChange}
                >
                    {/* <option value="" disabled>Select Filter</option> */}
                    <option value='all'>All</option>
                    {typesOptions}
                </select>
            </div>

            {/* FILTER BY SOURCE */}
            <div className={styles.filterOrderColumn}>
                <span className={styles.selectTitle}>Source</span>
                <select
                    className={styles.selectOrderFilter}
                    name='source'
                    value={selectedSourceFilter}
                    onChange={handleFilterOrderChange}
                >
                    <option value='all'>All</option>
                    <option value='pokédex'>pokédex</option>
                    <option value='created'>created</option>
                </select>
            </div>

            {/* ORDER BY NAME OR ATTACK (ASC OR DESC) */}
            <div className={styles.filterOrderColumn}>
                <span className={styles.selectTitle}>Order by</span>
                <select
                    className={styles.selectOrderFilter}
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

            {/* RESET FILTERS BUTTON */}
            <div className={`${styles.filterOrderColumn} ${styles.resetFiltersButton}`}>
                <Button
                    text='reset filters'
                    onClick={() => {
                        dispatch(actions.setSelectedTypeFilter('all'));
                        dispatch(actions.setSelectedSourceFilter('all'));
                        dispatch(actions.setSelectedOrder('none'));
                        dispatch(actions.resetPokemonsFilters());
                        dispatch(actions.setCurrentPage(1));
                    }}
                />
            </div>
        </div>
    );
}