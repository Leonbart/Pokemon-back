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
         {selectedPokemons.map((elem, index) =>
            <Card
               key={index}
               id={elem.id}
               name={elem.name}
               image={elem.image}
               hp={elem.hp}
               attack={elem.attack}
               defense={elem.defense}
               speed={elem.speed}
               height={elem.height}
               weight={elem.weight}
            />)}
      </div>
   )
}
