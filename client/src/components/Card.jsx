import styles from './Card.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

export default function Card(props) {

   let location = useLocation();

   const character = {
      name: props.name,
      id: props.id,
      image: props.image,
      gender: props.gender,
      species: props.species,
   };


   useEffect(() => {

   }, []);


   return (
      <div className={styles.divCard}>
         <div className={styles.divImgContainer}>
            <img className={styles.imgCard} src={props.image} alt="img not found" />
            <div className={styles.nameContainer}>
               <Link to={`/detail/${props.id}`} style={{ textDecoration: 'none' }}>
                  <div className={styles.name}> {props.name}</div>
               </Link>
            </div>
         </div>

         {/* Specs */}
         <div className={styles.divSpecs}>
            {/* {console.log(props)} */}
            <span className={styles.specs}>{props.id}</span>

            <span className={styles.specs}>{props.gender}</span>
            <span className={styles.specs}>{props.species}</span>
         </div>
      </div>
   );
}
