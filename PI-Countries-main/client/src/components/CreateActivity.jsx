import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createActivity, getAllCountries, getAllActivities } from '../redux/actions';
import {Link} from 'react-router-dom';

function validate(input) {
    let errores = {};
    if(!input.name) errores.name = 'Se requiere nombre';
    else if(/^\s*[a-zà-ÿ]+[\sa-zà-ÿ]*$/gi.test(input.name) === false) errores.name = 'El nombre no puede contener numeros o simbolos';
    if(!input.difficulty) errores.difficulty = 'Se requiere dificultad';
    else if(input.difficulty < 1 || input.difficulty > 5) errores.difficulty = 'La dificultad debe estar entre 1 y 5';
    if(!input.duration) errores.duration = 'Se requiere duracion aproximada';
    else if(input.duration <= 0) errores.duration = 'La duracion debe ser mayor a 0';
    if(!input.season) errores.season = 'Debe seleccionar la estacion en la que mas se practica';
    if(!input.countries.length) errores.countries = 'Se requiere por lo menos un pais en el que se practique';
    return errores
}

export default function CreateActivity() {
    const dispatch = useDispatch();
    
    const [input, setInput] = useState({
        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        countries: []
    });

    const [errors, setErrors] = useState({
        name: 'Se requiere nombre',
        difficulty: 'Se requiere dificultad',
        duration: 'Se requiere duracion aproximada',
        season: 'Debe seleccionar la estacion en la que mas se practica',
        countries: 'Se requiere por lo menos un pais en el que se practique'
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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleCountries(e) {
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
        setErrors(validate({
            ...input,
            countries: [...input.countries, e.target.value]
        }));
    }

    function handleTemporada(e) {
        if(e.target.value !== 'null') {
            setInput({
                ...input,
                season: e.target.value
            })
            setErrors(validate({
                ...input,
                season: e.target.value
            }));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(
            !errors.name &&
            !errors.difficulty &&
            !errors.duration &&
            !errors.season &&
            !errors.countries
        ) {
            dispatch(createActivity(input));
            setInput({
                name: '',
                difficulty: 0,
                duration: 0,
                season: '',
                countries: []
            });
            alert('Actividad creada con exito');
        } else {
            e.preventDefault();
            alert('Debe ingresar todos los datos correctamente');
        }
    }

    return (
        <div>
            <Link to='/home'><button>Volver al home</button></Link>
            <h2>Formulario de creacion de actividad</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre de la actividad: </label>
                    <input type="text" placeholder='Nombre...' name='name' onChange={e => handleChange(e)}/>
                    {
                        errors.name &&
                        <p>{errors.name}</p>
                    }
                </div>
                <div>
                    <label>Dificultad: </label>
                    <input type='number' placeholder='Dificultad entre 1 y 5...' name='difficulty' onChange={e => handleChange(e)}/>
                    {
                        errors.difficulty &&
                        <p>{errors.difficulty}</p>
                    }
                </div>
                <div>
                    <label>Duracion: </label>
                    <input type='number' placeholder='Duracion en minutos...' name='duration' onChange={e => handleChange(e)}/>
                    {
                        errors.duration &&
                        <p>{errors.duration}</p>
                    }
                </div>
                <div>
                    <label>Temporada: </label>
                    <select onChange={e => handleTemporada(e)}>
                        <option value="null">Seleccione</option>
                        <option value="Summer" name='season'>Verano</option>
                        <option value="Autumn" name='season'>Otoño</option>
                        <option value="Spring" name='season'>Primavera</option>
                        <option value="Winter" name='season'>Invierno</option>
                    </select>
                    {
                        errors.season &&
                        <p>{errors.season}</p>
                    }
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
                    {
                        errors.countries &&
                        <p>{errors.countries}</p>
                    }
                </div>
                <button type='submit'>Crear actividad turistica</button>
            </form>
            <div>
                <h2>Actividades creadas</h2>
                {
                    activities?.length > 0 ?
                    activities?.map(el => {
                        return (
                            <div key={el.id}>
                                <h5>{el.name}</h5>
                                <p>Dificultad: {el.difficulty}</p>
                                <p>Duracion: {el.duration}</p>
                                <p>Season: {el.season}</p>
                            </div>
                        );
                    })
                    :
                    <h3>No hay actividades</h3>
                }
            </div>
        </div>
    );
}

/* 
POST EN EL BACK{
    "name": "Rafting",
    "difficulty": 4,
    "duration": 120,
    "season": "Summer",
    "countries": ["Argentina"]
}
*/