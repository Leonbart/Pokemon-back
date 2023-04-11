import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SearchBar.module.css';
import Button from './Button';
import { searchPokemonByName, searchPokemonById } from '../redux/actions/index.js'

export default function SearchBar() {
   const [pokeIDorName, setpokeIDorName] = useState(''); // contents of search input
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

   const handleKeyDown = (e) => {
      console.log(e.keyCode);
      if (e.keyCode === 13) handleSearch();
   };

   const handleSearch = () => {
      if (pokeIDorName !== '') {
         // Check if Id or Name to choose the action to dispatch
         let nameOrId = isIDorName(pokeIDorName);
         if (nameOrId === 'name') dispatch(searchPokemonByName(pokeIDorName.toLocaleLowerCase()))
         else if (nameOrId === 'id') dispatch(searchPokemonById(pokeIDorName.toLocaleLowerCase()));

         setpokeIDorName('');
      }
   }


   return (
      <div className={styles.divSearch}>
         <div className={styles.searchColumn}>
            <span className={styles.searchTitle}>id / name</span>
            <input
               className={styles.input}
               type='search'
               // placeholder='id or name...'
               value={pokeIDorName}
               onChange={handleChange}
               onKeyDown={handleKeyDown}
            />
         </div>
         <div className={`${styles.searchColumn} ${styles.searchButton}`}>
            <Button
               text='Search'
               onClick={handleSearch}
            />
         </div>
      </div>
   );
}
