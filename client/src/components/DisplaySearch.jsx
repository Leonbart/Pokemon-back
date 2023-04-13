import { useSelector } from "react-redux";
import Card from './Card.jsx';
import styles from './DisplaySearch.module.css';
import { useEffect, useState } from "react";
import Button from './Button.jsx';
import { useNavigate } from "react-router-dom";

export default function DisplaySearch() {
    const searchedPokemon = useSelector(state => state.searchedPokemon);
    const [pokemonFound, setPokemonFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (JSON.stringify(searchedPokemon) !== '{}') setPokemonFound(true)
        else setPokemonFound(false);
    }, [searchedPokemon]);

    return (
        <div className={styles.divMainContainer}>
            {(!pokemonFound)
                ?
                <h1 style={{ fontSize: '1.5rem', fontWeight: '300', color: 'rgb(221, 100, 100)', backgroundColor: 'black', padding: '1rem 3rem', borderRadius: '0.5rem', width: 'fit-content', margin: '2rem auto' }}>
                    NO POKÉMON MATCHED YOUR SEARCH
                </h1>
                :
                <div className={styles.divCard}>
                    <Card
                        id={searchedPokemon.id}
                        name={searchedPokemon.name}
                        image={searchedPokemon.image}
                        types={searchedPokemon.types}
                    />
                </div>
            }
            <div className={styles.divButtons}>
                <Button
                    text='back'
                    onClick={() => navigate(-1)}
                />
                {/* <Button
                    text='delete'
                    onClick={() => null}  // Delete logic pending
                /> */}
            </div>
        </div>
    )
};