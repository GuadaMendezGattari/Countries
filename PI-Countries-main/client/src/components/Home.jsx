import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
    getAllActivities, 
    getAllCountries, 
    filterByContinent, 
    orderByPopulation, 
    orderByAlf, 
    filterByActivity, 
    getCountryByName 
} from "../redux/actions";
import Card from './Card';

export default function Home() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getAllActivities());
    }, [dispatch]);

    const activities = useSelector(s => s.activities);
    const countries = useSelector(s => s.countries);

    function handleOrderByPopulation(e) {
        if(e.target.value !== 'All') dispatch(orderByPopulation(e.target.value));
        else dispatch(getAllCountries());
    }

    function handleOrderByAlf(e) {
        if(e.target.value !== 'All') dispatch(orderByAlf(e.target.value));
        else dispatch(getAllCountries());
    }

    function handleFilterContinent(e) {
        if(e.target.value !== 'All') dispatch(filterByContinent(e.target.value));
        else dispatch(getAllCountries());
    }

    function handleFilterByActivity(e) {
        if(e.target.value !== 'All') dispatch(filterByActivity(e.target.value));
        else dispatch(getAllCountries());
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getCountryByName(name))
        setName('');
    }

    return (
        <div>
            <nav>
                <div>
                    <span>Buscar por nombre </span>
                    <input 
                    type="text"
                    placeholder='Ingrese el pais...'
                    value={name}
                    onChange={e => handleChange(e)}
                    />
                    <button type='submit' onSubmit={e => handleSubmit(e)}>Buscar</button>
                </div>
                <div>
                    <span>Ordenar alfabeticamente</span>
                    <select onChange={e => handleOrderByAlf(e)}>
                        <option value="All">Seleccione</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
                <div>
                    <span>Ordenar por poblacion</span>
                    <select onChange={e => handleOrderByPopulation(e)}>
                        <option value="All">Seleccione</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
                <div>
                    <span>Filtrar por continente</span>
                    <select onChange={e => handleFilterContinent(e)}>
                        <option value="All">Todos los continentes</option>
                        <option value="Americas">America</option>
                        <option value="Europe">Europa</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
                <div>
                    <span>Filtrar por actividad turistica</span>
                    <select onChange={e => handleFilterByActivity(e)}>
                        <option value="All">Todos</option>
                        {
                            activities?.length && 
                            activities.map(el => {
                                return (
                                    <option 
                                    value={el.name} 
                                    key={el.id}>{el.name}</option>
                                );
                            })
                        }
                    </select>
                </div>
                <Link to='/activities'>
                    <button>Crear actividad turistica</button>
                </Link>
            </nav>
            <div>
                {
                    countries?.length > 0 ? 
                    countries.map(el => {
                        return (
                            <div>
                                <Link to={`/countries/${el.cca3}`}>
                                    <Card
                                    key={el.cca3}
                                    flag={el.flag}
                                    name={el.name}
                                    region={el.region}
                                    />
                                </Link>
                            </div>
                        );
                    }) : 
                    <h4>No hay paises</h4>
                }
            </div>
        </div>
    );
}