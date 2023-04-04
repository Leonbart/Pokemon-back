import styles from './Paging.module.css';

export default function Paging({ setPage, numPokesToDisplay, pokesPerPage }) {
    // Create an array with all page numbers based on the number of pokémons to display and the pokémons per page
    const pageNumbers = [];

    for (let i = 1; i <= (Math.ceil(numPokesToDisplay / pokesPerPage)); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav>
            <ul className={styles.ul}>
                {pageNumbers && pageNumbers.map(num => (
                    <li className={styles.li} key={num}>
                        <span onClick={() => setPage(num)}>{num}</span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}