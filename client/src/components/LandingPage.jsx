import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import styles from './LandingPage.module.css';
import logo from '../assets/logos/Pokemon-01-cropped.svg';
import * as actions from '../redux/actions/index.js';
import { useDispatch } from 'react-redux';

export default function LandingPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        const getPokes = async () => {
            try {
                await dispatch(actions.getPokemons());
            } catch (error) {
                window.alert('PROBLEM RETREIVING POKEMONS, PLEASE TRY LATER');
            }
        }

        getPokes();
    }, [dispatch]);

    return (
        <div className={styles.divLanding}>
            <div className={styles.divImgContainer}>
                <img src={logo} className={styles.image} alt='logo' />
            </div>

            <div className={styles.divButton}>
                <Link to='/home'>
                    <Button text="Start" onClick={null} />
                </Link>
            </div>
        </div>
    );
}