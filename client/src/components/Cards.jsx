import styles from './Cards.module.css';
import Card from './Card.jsx';
import Paging from './Paging.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/index.js';

const POKES_PER_PAGE = process.env.REACT_APP_API_POKES_PER_PAGE;

export default function Cards() {
   const selectedPokemons = useSelector(state => state.selectedPokemons);
   const [currentPage, setCurrentPage] = useState(1);
   const firstDisplayIdx = (currentPage - 1) * POKES_PER_PAGE;
   const lastDisplayIdx = currentPage * POKES_PER_PAGE - 1;
   const dispatch = useDispatch();

   // Create a function that sets the current page, to past to Paging child component
   const updCurrentPage = (pageNumber) => setCurrentPage(pageNumber);

   useEffect(() => {
      dispatch(actions.getPokemons());
   }, [dispatch]);


   return (
      <>
         <div>
            <Paging
               setPage={updCurrentPage}
               numPokesToDisplay={selectedPokemons.length}
               pokesPerPage={POKES_PER_PAGE}
            />
         </div>
         <div className={styles.divCards}>
            {selectedPokemons.length === 0
               ? <h1 style={{ color: 'red' }}>NO POKÉMON MATCHED YOUR SEARCH</h1>
               : selectedPokemons.slice(firstDisplayIdx, lastDisplayIdx + 1).map((elem, index) =>
                  <Card
                     key={index}
                     id={elem.id}
                     name={elem.name}
                     image={elem.image}
                     types={elem.types}
                  />)}
         </div>
         <div>
            <Paging
               setPage={updCurrentPage}
               numPokesToDisplay={selectedPokemons.length}
               pokesPerPage={POKES_PER_PAGE}
            />
         </div>
      </>
   )
}
