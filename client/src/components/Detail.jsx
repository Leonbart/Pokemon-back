import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import styles from './Detail.module.css';

export default function Detail() {
    const { pokeId } = useParams();

    const [pokemon, setPokemon] = useState({});
    const navigate = useNavigate();

    const nameStyle = {
        color: 'rgba(230, 230, 230, 1)',
        margin: '1rem 0',
        fontWeight: '600',
        fontSize: '2rem',
    };

    useEffect(() => {
        fetch(`http://localhost:3001/pokemons/${pokeId}`)
            .then((response) => response.json())
            .then((poke) => {
                if (poke.name) {
                    setPokemon(poke);
                } else {
                    window.alert(`No pokemon found with this ID: ${pokeId}`);
                }
            })
            .catch((err) => {
                window.alert(`No pokemon found with this ID: ${pokeId}`);
            });
        return setPokemon({});
    }, [pokeId]);

    return (
        <>
                <div className={styles.divDetail}>
                    <div className={styles.divData}>
                        <p style={nameStyle}>{pokemon.name}</p>
                        <p className={styles.specs}>id: {pokemon.id}</p>
                        <p className={styles.specs}>hp: {pokemon.hp}</p>
                        <p className={styles.specs}>attack: {pokemon.attack}</p>
                        <p className={styles.specs}>defense: {pokemon.defense}</p>
                        <p className={styles.specs}>speed: {pokemon.speed}</p>
                        <p className={styles.specs}>height: {pokemon.height}</p>
                        <p className={styles.specs}>weight: {pokemon.weight}</p>
                        <p className={styles.specs}>types: {pokemon.types}</p>
                    </div>
                    <div className={styles.divImage}>
                        <img src={pokemon.image} className={styles.image} alt="pokemon" />
                    </div>
                </div>
                <div className={styles.divButtonBack}>
                    <Button
                        text='back'
                        onClick={() => navigate(-1)}
                    />
                </div>
        </>
    );
};