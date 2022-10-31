import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getAllCountries, getCountryByName } from '../redux/actions';

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

    function handleBack(e) {
        dispatch(getAllCountries());
    }

    return (
        <div>
            <span>Buscar por nombre </span>
            <input type="text" placeholder='Ingrese el pais...' value={name} onChange={e => handleChange(e)}
            />
            <button onClick={e => handleSubmit(e)}>Buscar</button>
            <button onClick={e => handleBack(e)}>Volver a cargar todos</button>
        </div>
    );
}