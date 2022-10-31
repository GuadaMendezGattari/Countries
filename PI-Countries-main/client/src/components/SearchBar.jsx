import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../redux/actions';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getCountryByName(name));
        setName('');
    }

    return (
        <div>
            <label>Buscar por nombre </label>
            <input 
            type="text"
            placeholder='Ingrese el pais...'
            value={name}
            onChange={e => handleChange(e)}
            />
            <button type='submit' onSubmit={e => handleSubmit(e)}>Buscar</button>
        </div>
    );
}