import styles from './Card.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Card(props) {

   let location = useLocation();

   // useEffect(() => {
   // }, []);


   return (
      <div className={styles.divCard}>
         <div className={styles.divImgContainer}>
            <img className={styles.imgCard} src={props.image} alt="img not found" />
            <div className={styles.nameContainer}>
               {/* <Link to={`/detail/${props.id}`} style={{ textDecoration: 'none' }}> */}
                  <div className={styles.name}> {props.name}</div>
               {/* </Link> */}
            </div>
         </div>

         {/* Specs */}
         <div className={styles.divSpecs}>
            {/* {console.log(props)} */}
            <span className={styles.specs}>{props.id}</span>

            <span className={styles.specs}>{props.attack}</span>
            <span className={styles.specs}>{props.defense}</span>
         </div>
      </div>
   );
}
