import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllCountries, orderByAlf, orderByPopulation } from '../redux/actions';

export default function Ordenamiento() {
    const dispatch = useDispatch();
    
    function handleOrderByPopulation(e) {
        if(e.target.value !== 'All') dispatch(orderByPopulation(e.target.value));
        else dispatch(getAllCountries());
    }

    function handleOrderByAlf(e) {
        if(e.target.value !== 'All') dispatch(orderByAlf(e.target.value));
        else dispatch(getAllCountries());
    }
    return (
        <div>
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
        </div>
    );
}