import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getCountryDetail } from "../redux/actions";
import { useParams, Link } from 'react-router-dom';

export default function CountryDetail() {
    const {idCountry} = useParams();
    const country = useSelector(s => s.countryDetail);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCountryDetail(idCountry));
    }, [dispatch, idCountry]);
    return (
        <div>
            <div>
                <h2>Nombre popular: {country.name}</h2>
                <img src={country.flag} alt="flag" />
                <h3>Codigo de país: {country.cca3}</h3>
                <h5>Continente: {country.region}</h5>
                <h5>Capital/es: {country.capital}</h5>
                <h5>Subregion: {country.subregion}</h5>
                <h5>Area o superficie: {country.area}km2</h5>
                <h5>Poblacion: {country.population} de habitantes</h5>
            </div>
            <div>
                <h5>Actividades turisticas: </h5>
                {
                    country.activities?.length ?
                    country.activities.map(el => {
                        return (
                            <div key={el.cca3}>
                                <ul>
                                    <li>{el.name}</li>
                                    <li>Dificultad (del 1 al 5): {el.difficulty}</li>
                                    <li>Duracion (en minutos): {el.duration}</li>
                                    <li>Estacion del año: {el.season}</li>
                                </ul>
                            </div>
                        )
                    })
                    :
                    <h5>No hay actividades turisticas para este pais</h5>
                }
            </div>
            <Link to='/home'>
                <button>Volver al home</button>
            </Link>
        </div>
    );
}