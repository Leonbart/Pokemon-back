import { useState } from 'react';
import styles from './SearchBar.module.css';
import Button from './Button';

export default function SearchBar(props) {

   const [characterID, setCharacterID] = useState('');

   const handleChange = (e) => {
      setCharacterID(e.target.value);
   };


   return (
      <div className={styles.divSearch}>
         <input
            className={styles.input}
            type='search'
            placeholder='Character ID...'
            value={characterID}
            onChange={handleChange}
         />
         <Button
            text='Add'
            onClick={() => {
               props.onSearch(characterID);
               setCharacterID('');
            }}
         />
         <Button
            text='Add Random'
            onClick={() => {
               props.onSearch(Math.floor(Math.random() * 826 + 1))
               setCharacterID('');
            }}
         />
      </div>
   );
}
