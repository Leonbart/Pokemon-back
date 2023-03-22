import React from 'react';
import Button from './Button.jsx';
import styles from './LandingPage.module.css';
import logo from '../assets/logos/Pokemon-01.svg';

export default function LandingPage(props) {

    return (
        <div className={styles.divLanding}>
            <div className={styles.divImgContainer}>
                <img src={logo} className={styles.image} alt='logo' />
            </div>

            <div className={styles.divButton}>
                <Button text="Start" onClick={null} />
            </div>
        </div>
    );
}