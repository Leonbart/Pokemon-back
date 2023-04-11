import styles from './Cards.module.css';
import Card from './Card.jsx';
import Paging from './Paging.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/index.js';
import loadingImg from '../assets/loading/image_processing_cropped_resized3.gif';

const POKES_PER_PAGE = process.env.REACT_APP_API_POKES_PER_PAGE;

export default function Cards() {
   const selectedPokemons = useSelector(state => state.selectedPokemons);
   const allPokemonsLoaded = useSelector(state => state.allPokemonsLoaded);
   const currentPage = useSelector(state => state.currentPage);
   const firstDisplayIdx = (currentPage - 1) * POKES_PER_PAGE;
   const lastDisplayIdx = currentPage * POKES_PER_PAGE - 1;
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(actions.getPokemons());
   }, [dispatch]);


   console.log('allPokemonsLoaded:');
   console.log(allPokemonsLoaded);

   
   return (
      <>
         {(!allPokemonsLoaded)
            /* {(true) */
            ? <div className={styles.divLoading}>
               <img src={loadingImg} alt='Loading...'></img>
            </div>
            : (selectedPokemons.length === 0)
               ? <h1 style={{ fontSize: '1.5rem', fontWeight: '300', color: 'rgb(221, 100, 100)', backgroundColor: 'black', padding: '1rem 3rem', borderRadius: '0.5rem', width: 'fit-content', margin: '2rem auto' }}>
                  NO POKÉMON MATCHED YOUR SEARCH
               </h1>
               :
               <>
                  <div>
                     <Paging
                        numPokesToDisplay={selectedPokemons.length}
                        pokesPerPage={POKES_PER_PAGE}
                     />
                  </div>
                  <div className={styles.divCards}>
                     {selectedPokemons.slice(firstDisplayIdx, lastDisplayIdx + 1).map((elem, index) =>
                        <Card
                           key={index}
                           id={elem.id}
                           name={elem.name}
                           image={elem.image}
                           types={elem.types}
                        />)
                     }
                  </div>
               </>
         }
      </>
   )
}
