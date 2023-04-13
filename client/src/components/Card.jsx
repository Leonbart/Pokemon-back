import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card(props) {

   // store in types an array of html span tags for each pokemon's type (to be rendered in the card specs)
   const types = props.types?.map((t, index) => <span className={styles.specs} key={index}>{t}</span>);

   return (
      <Link to={`/detail/${props.id}`} style={{ textDecoration: 'none' }}>
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
               <div className={styles.name}> {props.name}</div>
            </div>

            {/* Specs */}
            <div className={styles.divSpecs}>
               {types}
            </div>
         </div>
      </Link>
   );
}
