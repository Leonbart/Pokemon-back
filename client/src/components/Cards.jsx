import styles from './Cards.module.css';
import Card from './Card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/index.js';

export default function Cards() {
   const selectedPokemons = useSelector(state => state.selectedPokemons);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(actions.getPokemons());
   }, []);

   return (
      <div className={styles.divCards}>
         {selectedPokemons.length === 0
            ? <h1>NO POKÉMON MATCHED YOUR SEARCH</h1>
            : selectedPokemons.map((elem, index) =>
               <Card
                  key={index}
                  id={elem.id}
                  name={elem.name}
                  image={elem.image}
                  types={elem.types}
               />)}
      </div>
   )
}
