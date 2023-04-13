import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import styles from './Detail.module.css';

export default function Detail() {
    const { pokeId } = useParams();

    const [pokemon, setPokemon] = useState({});
    const navigate = useNavigate();

    const nameStyle = {
        // color: 'rgba(230, 230, 230, 1)',
        color: 'rgb(190, 215, 190)',
        fontWeight: '600',
        fontSize: '2rem',
        textTransform: 'capitalize',
        wordWrap: "break-word",
    };

    useEffect(() => {
        // Retrieve pokemon from backend instead of from store, in case more specs are needed
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
        <div className={styles.divMain}>
            <div className={styles.divName}>
                <span style={nameStyle}>{pokemon.name}</span>
            </div>

            <div className={styles.divDetail}>
                <div className={styles.divData}>
                    <table className={styles.specs}>
                        <tbody>
                            <tr key='100'>
                                <td>id</td>
                                <td>#{pokemon.id}</td>
                            </tr>
                            <tr key='101'>
                                <td>hp</td>
                                <td>{pokemon.hp}</td>
                            </tr>
                            <tr key='102'>
                                <td>attack</td>
                                <td>{pokemon.attack}</td>
                            </tr>
                            <tr key='103'>
                                <td>defense</td>
                                <td>{pokemon.defense}</td>
                            </tr>
                            <tr key='104'>
                                <td>speed</td>
                                <td>{pokemon.speed}</td>
                            </tr>
                            <tr key='105'>
                                <td>height</td>
                                <td>{pokemon.height} m.</td>
                            </tr>
                            <tr key='106'>
                                <td>weight</td>
                                <td>{pokemon.weight} kg.</td>
                            </tr>
                            <tr key='107'>
                                <td>types:</td>
                            </tr>
                            {pokemon.types?.map((type, index) =>
                                <tr>
                                    <td key={index} className={styles.tdType}>{type}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
        </div>
    );
};