import { useState } from 'react';
import './CreateForm.module.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button.jsx';
import styles from './CreateForm.module.css';
import * as actions from '../redux/actions/index.js';

export function validate(inputs) {
  let errors = {};


  //---name validation---
  if (/\d/.test(inputs.name)) { // Check if name has any number
    errors.name = "Name cannot contain any number"
    //---image URL validation---
    // } else if (check if a valid jpg or png image) {
    //   errors.image = "Could not fetch image"
  } //---hp validation---
  else if (parseInt(inputs.hp, 10) < 1 || parseInt(inputs.hp, 10) > 255) {
    errors.hp = "HP must be positive and 255 as maximum";
  } //---attack validation---
  else if (inputs.attack < 1 || inputs.attack > 255) {
    errors.attack = "Attack must be positive and 255 as maximum";
  } //---defense validation---
  else if (inputs.defense < 1 || inputs.defense > 255) {
    errors.defense = "Defense must be positive and 255 as maximum";
  } //---speed validation---
  else if (inputs.speed < 0 || inputs.speed > 255) {
    errors.speed = "Speed must be positive and 255 as maximum";
  } //---height validation---
  else if (inputs.height < 0 || inputs.height > 100) {
    errors.height = "Height must be positive and 100 as maximum";
  } //---weight validation---
  else if (inputs.weight < 0 || inputs.weight > 1000) {
    errors.weight = "Weight must be positive and 1000 as maximum";
  } //---types validation---
  else if (inputs.types.length < 1) {
    errors.types = "At least one type must be selected";
  };

  return errors;
};

export default function CreateForm() {
  const allTypes = useSelector(state => state.allTypeNames);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blankInputs = {
    name: '',
    image: '',
    hp: 0,
    attack: 0,
    defense: 0,
    speed: '',
    height: '',
    weight: '',
    types: [],
  };

  const blankErrors = {
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: '',
  };

  const [inputs, setInputs] = useState(blankInputs);
  const [errors, setErrors] = useState(blankErrors);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors(validate({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleTypesChange = (e) => {
    // A type has been checked
    if (e.target.checked) {
      setInputs({ ...inputs, types: [...inputs.types, e.target.name] });
      setErrors(validate({ ...inputs, types: [...inputs.types, e.target.name] }));
    }
    // A type has been unchecked
    else {
      let filteredTypes = inputs.types.filter((type) => type !== e.target.name);
      setInputs({ ...inputs, types: filteredTypes });
      setErrors(validate({ ...inputs, types: filteredTypes }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).length === 0) { // This check was done to display the create button, so it could be removed from here
      try {
        // Delete EMPTY keys (which are not mandatory, or wouldn't have been validated) to avoid failure in post
        let filteredInputs = {};
        for (const [key, value] of Object.entries(inputs)) {
          if (value !== "") filteredInputs[key] = value;
        }

        // Remove leading and trailing spaces from pokemon's name
        filteredInputs.name = filteredInputs.name.trim();

        await dispatch(actions.addPokemon(filteredInputs));
        window.alert('Pokémon created!');
        setInputs(blankInputs);
        setErrors(blankErrors);
      }
      catch (error) {
        window.alert(`Could not create Pokémon: ${error.message}`);
      }
    }
    else window.alert("Please check your Pokémon's data");
  };


  return (
    <div className={styles.divMainContainer}>

      <div className={styles.divTitle}>
        <span className={styles.title}>create new pokémon</span>
      </div>

      <form className={styles.form}>
        <label className={styles.formLabels} htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          // placeholder="name..."
          type="text"
          value={inputs.name}
          onChange={handleChange}
          className={(errors.name && (errors.name !== ''))? `${styles.warning} ${styles.formInputs}` : `${styles.formInputs}`}
        />
        <p className={styles.danger}>{errors.name}</p>

        <label className={styles.formLabels} htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          // placeholder="image URL..."
          type="text"
          value={inputs.image}
          onChange={handleChange}
          className={(errors.image && (errors.image !== ''))? `${styles.warning} ${styles.formInputs}` : `${styles.formInputs}`}
        />
        <p className={styles.danger}>{errors.image}</p>

        <label className={styles.formLabels} htmlFor="hp">HP</label>
        <input
          id="hp"
          name="hp"
          // placeholder="HP..."
          type="number"
          value={inputs.hp}
          onChange={handleChange}
          className={(errors.hp && (errors.hp !== ''))? `${styles.warning} ${styles.formInputs}` : `${styles.formInputs}`}
        />
        <p className={styles.danger}>{errors.hp}</p>

        <label className={styles.formLabels} htmlFor="attack">Attack</label>
        <input
          id="attack"
          name="attack"
          // placeholder="attack..."
          type="number"
          value={inputs.attack}
          onChange={handleChange}
          className={(errors.attack && (errors.attack !== ''))? `${styles.warning} ${styles.formInputs}` : `${styles.formInputs}`}
        />
        <p className={styles.danger}>{errors.attack}</p>

        <label className={styles.formLabels} htmlFor="defense">Defense</label>
        <input
          id="defense"
          name="defense"
          // placeholder="defense..."
          type="number"
          value={inputs.defense}
          onChange={handleChange}
          className={(errors.defense && (errors.defense !== ''))? `${styles.warning} ${styles.formInputs}` : `${styles.formInputs}`}
        />
        <p className={styles.danger}>{errors.defense}</p>

        <label className={styles.formLabels} htmlFor="speed">Speed</label>
        <input
          id="speed"
          name="speed"
          // placeholder="speed..."
          type="number"
          value={inputs.speed}
          onChange={handleChange}
          className={(errors.speed && (errors.speed !== ''))? `${styles.warning} ${styles.formInputs}` : `${styles.formInputs}`}
        />
        <p className={styles.danger}>{errors.speed}</p>

        <label className={styles.formLabels} htmlFor="height">Height</label>
        <input
          id="height"
          name="height"
          // placeholder="height..."
          type="number"
          value={inputs.height}
          onChange={handleChange}
          className={(errors.height && (errors.height !== ''))? `${styles.warning} ${styles.formInputs}` : `${styles.formInputs}`}
        />
        <p className={styles.danger}>{errors.height}</p>

        <label className={styles.formLabels} htmlFor="weight">Weight</label>
        <input
          id="weight"
          name="weight"
          // placeholder="weight..."
          type="number"
          value={inputs.weight}
          onChange={handleChange}
          className={(errors.weight && (errors.weight !== ''))? `${styles.warning} ${styles.formInputs}` : `${styles.formInputs}`}
        />
        <p className={styles.danger}>{errors.weight}</p>

        <fieldset>
          <legend className={styles.formLabels}>Choose Pokémon's types</legend>
          {allTypes.map((type, index) => (
            <label className={styles.formLabels} key={index}>
              <input
                type="checkbox"
                name={type}
                checked={inputs.types.includes(type)}
                onChange={handleTypesChange}
                // className={styles.formInputs}
              />
              {type}
            </label>
          ))}
          <p className={styles.danger}>{errors.types}</p>
        </fieldset>
      </form>

      <div className={styles.divButtons}>
        {/* ---CREATE button--- */}
        {(Object.values(errors).length === 0) ? <Button text="create" onClick={handleSubmit} /> : null}

        {/* ---CANCEL button--- */}
        <Button
          text='clear'
          onClick={() => {
            setInputs(blankInputs);
            setErrors(blankErrors);
          }}
        />
        <Button
          text='back'
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  )
}