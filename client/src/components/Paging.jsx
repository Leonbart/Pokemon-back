import styles from './Paging.module.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/index.js';

export default function Paging({ numPokesToDisplay, pokesPerPage }) {
    const currentPage = useSelector(state => state.currentPage);
    const dispatch = useDispatch();
    // Create an array with all page numbers based on the number of pokémons to display and the pokémons per page
    const pageNumbers = [];

    for (let i = 1; i <= (Math.ceil(numPokesToDisplay / pokesPerPage)); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav>
            <ul className={styles.ul}>
                {pageNumbers && pageNumbers.map(num => (
                    // <li className={num === currentPage ? styles.li} key={num}>
                    <li
                        className={`${styles.li} ${(num === currentPage) ? styles.current_page : styles.normal_page}`}
                        key={num}
                        onClick={() => dispatch(actions.setCurrentPage(num))}
                    >
                        {num}
                    </li>
                ))}
            </ul>
        </nav>
    )
}