import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import styles from './Detail.module.css';

export default function Detail() {
    const { pokeId } = useParams();

    const [character, setCharacter] = useState({});
    const navigate = useNavigate();

    const nameStyle = {
        color: 'rgba(230, 230, 230, 1)',
        margin: '1rem 0',
        fontWeight: '600',
        fontSize: '2rem',
    };

    useEffect(() => {
        'http://localhost:3001/pokemons'
        fetch(`http://localhost:3001/rickandmorty/detail/${pokeId}`)
            .then((response) => response.json())
            .then((char) => {
                if (char.name) {
                    setCharacter(char);
                } else {
                    window.alert("No character found with this ID");
                }
            })
            .catch((err) => {
                window.alert("No character found with this ID");
            });
        return setCharacter({});
    }, [pokeId]);

    return (
        <div className={styles.divDetail}>
            <div className={styles.divData}>
                <p style={nameStyle}>{character.name}</p>
                <p className={styles.specs}>
                    <span>STATUS: </span>
                    <span className={(character.status === 'Alive') ? styles.alive : (character.status === 'Dead') ? styles.dead : null}>{character.status}</span>
                </p>
                <p className={styles.specs}>SPECIES: {character.species}</p>
                <p className={styles.specs}>GENDER: {character.gender}</p>
                <p className={styles.specs}>ORIGIN: {character.origin?.name}</p>
                <p className={styles.specs}>LOCATION: {character.location?.name}</p>
                <div className={styles.divButtonBack}>
                    <Button
                        text='go back'
                        onClick={() => navigate(-1)}
                    />
                </div>
            </div>
            <img src={character.image} className='Image' alt="character" />
        </div>
    );
};