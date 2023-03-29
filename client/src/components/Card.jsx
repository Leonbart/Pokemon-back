import styles from './Card.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Card(props) {
   let location = useLocation();

   // store in types an array of html span tags for each pokemon's type (to be rendered in the card specs)
   const types = props.types.map((t, index) => <span className={styles.specs} key={index}>{t}</span>);

   // useEffect(() => {
   // }, []);


   return (
      <div className={styles.divCard}>
         <div className={styles.divImgContainer}>
            <img className={styles.imgCard} src={props.image} alt="img not found" />
         </div>

         {/* Id */}
         <div className={styles.idContainer}>
            <div className={styles.id}> #{props.id}</div>
         </div>

         {/* Name */}
         <div className={styles.nameContainer}>
            {/* <Link to={`/detail/${props.id}`} style={{ textDecoration: 'none' }}> */}
            <div className={styles.name}> {props.name}</div>
            {/* </Link> */}
         </div>

         {/* Specs */}
         <div className={styles.divSpecs}>
            {types}
         </div>
      </div>
   );
}
