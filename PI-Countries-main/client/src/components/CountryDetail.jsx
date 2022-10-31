import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { back, getCountryDetail } from "../redux/actions";
import { useParams, Link } from 'react-router-dom';

export default function CountryDetail() {
    const {idCountry} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetail(idCountry));
    }, [dispatch, idCountry]);

    const country = useSelector(s => s.countryDetail);

    function backHome(e) {
        dispatch(back());
    }

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
                                <h5>{el.name}</h5>
                                <p>Dificultad (del 1 al 5): {el.difficulty}</p>
                                <p>Duracion (en minutos): {el.duration}</p>
                                <p>Estacion del año: {el.season}</p>
                            </div>
                        )
                    })
                    :
                    <h5>No hay actividades turisticas para este pais</h5>
                }
            </div>
            <Link to='/home'><button onClick={e => backHome(e)}>Volver al home</button></Link>
        </div>
    );
}