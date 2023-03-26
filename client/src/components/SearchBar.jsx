import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SearchBar.module.css';
import Button from './Button';
import {searchPokemonByName, searchPokemonById} from '../redux/actions/index.js'

export default function SearchBar() {
   const [pokeIDorName, setpokeIDorName] = useState('');
   const dispatch = useDispatch();

   const isIDorName = (val) => {
      // if val has any number, return 'id'
      // in any other case, return 'name'
      if (/\d/.test(val)) return ('id')
      else return ('name');
   };

   const handleChange = (e) => {
      setpokeIDorName(e.target.value);
   };


   return (
      <div className={styles.divSearch}>
         <input
            className={styles.input}
            type='search'
            placeholder='id or name...'
            value={pokeIDorName}
            onChange={handleChange}
         />
         <Button
            text='Search'
            onClick={() => {
               if (pokeIDorName !== '') {
                  // Check if Id or Name to choose the action to dispatch
                  if (isIDorName(pokeIDorName) === 'name') dispatch(searchPokemonByName(pokeIDorName.toLocaleLowerCase()))
                  else if (isIDorName(pokeIDorName) === 'id') dispatch(searchPokemonById(pokeIDorName.toLocaleLowerCase()));

                  setpokeIDorName('');
               }
            }}
         />
      </div>
   );
}
