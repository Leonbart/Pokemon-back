import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import styles from './LandingPage.module.css';
import logo from '../assets/logos/Pokemon-01-cropped.svg';

export default function LandingPage(props) {

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