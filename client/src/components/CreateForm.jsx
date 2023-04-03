import { useState } from 'react';
import './CreateForm.modules.css';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Button from './Button.jsx';
import axios from 'axios';

export function validate(inputs) {
  let errors = {};

  //---name validation---
  if (!inputs.name) {
    errors.name = "Name required"
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
        // Delete empty keys (that are not mandatory, or wouldn't have been validated) to avoid failure in post
        let filteredInputs = {};
        for (const [key, value] of Object.entries(inputs)) {
          if (value !== "") filteredInputs[key] = value;
        }
        const response = await axios.post('http://localhost:3001/pokemons', filteredInputs);
        console.log(response.data);
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
    <div>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          placeholder="name..."
          type="text"
          value={inputs.name}
          onChange={handleChange}
          className={errors.name && 'warning'}
        />
        <p className='danger'>{errors.name}</p>

        <label htmlFor="image">Image URL:</label>
        <input
          id="image"
          name="image"
          placeholder="image URL..."
          type="text"
          value={inputs.image}
          onChange={handleChange}
          className={errors.image && 'warning'}
        />
        <p className='danger'>{errors.image}</p>

        <label htmlFor="hp">HP:</label>
        <input
          id="hp"
          name="hp"
          // placeholder="HP..."
          type="number"
          value={inputs.hp}
          onChange={handleChange}
          className={errors.hp && 'warning'}
        />
        <p className='danger'>{errors.hp}</p>

        <label htmlFor="attack">Attack:</label>
        <input
          id="attack"
          name="attack"
          // placeholder="attack..."
          type="number"
          value={inputs.attack}
          onChange={handleChange}
          className={errors.attack && 'warning'}
        />
        <p className='danger'>{errors.attack}</p>

        <label htmlFor="defense">Defense:</label>
        <input
          id="defense"
          name="defense"
          // placeholder="defense..."
          type="number"
          value={inputs.defense}
          onChange={handleChange}
          className={errors.defense && 'warning'}
        />
        <p className='danger'>{errors.defense}</p>

        <label htmlFor="speed">Speed:</label>
        <input
          id="speed"
          name="speed"
          // placeholder="speed..."
          type="number"
          value={inputs.speed}
          onChange={handleChange}
          className={errors.speed && 'warning'}
        />
        <p className='danger'>{errors.speed}</p>

        <label htmlFor="height">Height:</label>
        <input
          id="height"
          name="height"
          // placeholder="height..."
          type="number"
          value={inputs.height}
          onChange={handleChange}
          className={errors.height && 'warning'}
        />
        <p className='danger'>{errors.height}</p>

        <label htmlFor="weight">Weight:</label>
        <input
          id="weight"
          name="weight"
          // placeholder="weight..."
          type="number"
          value={inputs.weight}
          onChange={handleChange}
          className={errors.weight && 'warning'}
        />
        <p className='danger'>{errors.weight}</p>

        <fieldset>
          <legend>Choose Pokémon's types</legend>
          {allTypes.map((type, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name={type}
                checked={inputs.types.includes(type)}
                onChange={handleTypesChange}
              />
              {type}
            </label>
          ))}
          <p className='danger'>{errors.types}</p>
        </fieldset>
      </form>

      <div>
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
          text='cancel'
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  )
}