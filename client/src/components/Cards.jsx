import styles from './Cards.module.css';
import Card from './Card';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import * as actions from '../redux/actions/index.js';

export default function Cards(props) {
   const { characters } = props;
   const dispatch = useDispatch();

   useEffect(() => {
   }, []);

   return (
      <div className={styles.divCards}>
         {/* {characters.map((elem, index) =>
            <Card
               key={index}
               id={elem.id}
               name={elem.name}
               species={elem.species}
               gender={elem.gender}
               image={elem.image}
               onClose={props.onClose}
            />)} */}
      </div>
   )
}
