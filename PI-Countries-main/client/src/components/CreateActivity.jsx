import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { /* createActivity, */ getAllCountries, getAllActivities } from '../redux/actions';
import {Link} from 'react-router-dom';

export default function CreateActivity() {
    const dispatch = useDispatch();
    
    const [input, setInput] = useState({
        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        countries: []
    });

    useEffect(() => {
        dispatch(getAllActivities());
        dispatch(getAllCountries());
    }, [dispatch]);

    const countries = useSelector(s => s.countries).sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    });
    const activities = useSelector(s => s.activities);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        //hacer validacion
    }

    function handleCountries(e) {
        console.log(e.target.value)
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
        //hacer validacion   
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:3001/activities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: input.name,
                difficulty: input.difficulty,
                duration: input.duration,
                season: input.season,
                countries: input.countries
            })
        });
        setInput({
            name: '',
            difficulty: 0,
            duration: 0,
            season: '',
            countries: []
        });
    }

    return (
        <div>
            <Link to='/home'><button>Volver al home</button></Link>
            <div>
                {
                    activities?.length > 0 ?
                    activities?.map(el => {
                        return (
                            <div key={el.id}>
                                <h5>{el.name}</h5>
                                <ul>
                                    <li>Dificultad: {el.difficulty}</li>
                                    <li>Duracion: {el.duration}</li>
                                    <li>Season: {el.season}</li>
                                </ul>
                            </div>
                        );
                    })
                    :
                    <h3>No hay actividades</h3>
                }
            </div>
            <h2>Formulario de creacion de actividad</h2>
            <form>
                <div>
                    <label>Nombre de la actividad: </label>
                    <input type="text" placeholder='Nombre...' name='name' onChange={e => handleChange(e)} value={input.name}/>
                </div>
                <div>
                    <label>Dificultad: </label>
                    <input type='number' placeholder='Dificultad entre 1 y 5...' name='difficulty' onChange={e => handleChange(e)} value={input.difficulty}/>
                </div>
                <div>
                    <label>Duracion: </label>
                    <input type='number' placeholder='Duracion en minutos...' name='duration' onChange={e => handleChange(e)} value={input.duration}/>
                </div>
                <div>
                    <label>Temporada: </label>
                    <select onChange={e => handleChange(e)}>
                        <option value="Summer" name='season'>Verano</option>
                        <option value="Autumn" name='season'>Otoño</option>
                        <option value="Spring" name='season'>Primavera</option>
                        <option value="Winter" name='season'>Invierno</option>
                    </select>
                </div>
                <div>
                    <label>Paises en los que se practica: </label>
                    <select onChange={e => handleCountries(e)}>
                        <option>Seleccione</option>
                        {
                            countries?.length &&
                            countries.map(el => {
                                return <option value={el.name} name='countries' key={el.cca3}>{el.name}</option>
                            })
                        }
                    </select>
                </div>
                <button type='submit' onSubmit={e => handleSubmit(e)}>Crear actividad turistica</button>
            </form>
        </div>
    );
}

/* 
cosas que me faltan:
    que me ande el post cuando submiteo el formulario
    hacer las validaciones del formulario
    que me ande el query cuando busco por pais
    hacer el paginado
*/

/* 
POST EN EL BACK{
    "name": "Rafting",
    "difficulty": 4,
    "duration": 120,
    "season": "Summer",
    "countries": ["Argentina"]
}
*/