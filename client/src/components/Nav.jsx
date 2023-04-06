import SearchBar from './SearchBar.jsx';
import Button from './Button';
import Filtering from './Filtering.jsx';
import styles from './Nav.module.css';
import logo from '../assets/logos/Pokemon-01.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {

    let location = useLocation();

    return (
        <div className={styles.divNav}>
            <div className={styles.divLeft}>
                <Link to='/home'>
                    <img className={styles.image} src={logo} alt='Pokémon' />
                </Link>
                <Link to='/home'>
                    <Button text='home' />
                </Link>
                <Link to='/about'>
                    <Button text='about' />
                </Link>
            </div>
            <div className={styles.divSearchBar}>
                {location.pathname === '/home' ?
                    <SearchBar /> : null
                }
            </div>
            <div>
                {location.pathname === '/home' ?
                    <Filtering /> : null
                }
            </div>
            <div className={styles.createButton}>
                {location.pathname === '/home' ?
                    <Link to='/create'>
                        <Button text='new pokémon' />
                    </Link>
                    : null
                }
            </div>
        </div>
    );
}