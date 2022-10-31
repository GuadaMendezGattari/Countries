import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByActivity, filterByContinent, getAllActivities, getAllCountries } from '../redux/actions';

export default function Filtrado() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllActivities());
    }, [dispatch]);

    const activities = useSelector(s => s.activities).sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    });

    function handleFilterContinent(e) {
        if(e.target.value !== 'All') dispatch(filterByContinent(e.target.value));
        else dispatch(getAllCountries());
    }

    function handleFilterByActivity(e) {
        if(e.target.value !== 'All') dispatch(filterByActivity(e.target.value));
        else dispatch(getAllCountries());
    }
    return (
        <div>
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
        </div>
    );
}