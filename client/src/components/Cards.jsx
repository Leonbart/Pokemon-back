require('dotenv').config();
const { POKES_PER_PAGE } = process.env;
import styles from './Cards.module.css';
import Card from './Card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/index.js';

export default function Cards() {
   const selectedPokemons = useSelector(state => state.selectedPokemons);
   const currentPage = useSelector(state => state.currentPage);
   const [firstDisplayIndex, setFirstDisplayIndex] = useState(0);
   const [lastDisplayIndex, setLastDisplayIndex] = useState(POKES_PER_PAGE);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(actions.getPokemons());
   }, []);

   // Set range of pokemons to display, based on indexes of selectedPokemons array
   useEffect(() => {

   }, [currentPage]);

   return (
      <div className={styles.divCards}>
         {selectedPokemons.length === 0
            ? <h1 style={{color: 'red'}}>NO POKÉMON MATCHED YOUR SEARCH</h1>
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
